export default {
  typeDefs: `
    """
    Custom GraphQL mutations for the Order workflow.
    """
    type Mutation {
      """
      Create a new order for a given customer.

      Arguments:
        - customerId (ID!): the ID of the customer placing the order.
        - items ([OrderItemInput!]!): the products and quantities to order.

      Returns:
        - An Order object containing:
          - id
          - status (always starts as PENDING)
          - total (calculated from item.qty * product.price)
          - placedAt (datetime of order creation)
          - items (array of products, quantities, and purchase price)
          - customer (basic info)
      """
      createOrder(customerId: ID!, items: [OrderItemInput!]!): Order!

      """
      Update the status of an existing order.

      Arguments:
        - id (ID!): the ID of the order to update.
        - status (OrderStatus!): the new status to set.
          Allowed transitions:
            PENDING → CONFIRMED
            CONFIRMED → PACKED → SHIPPED
            Any status → CANCELLED
            SHIPPED → DELIVERED

      Returns:
        - The updated Order object with new status and items.
        - May also update Inventory (reserved / onHand) depending on status.
      """
      updateOrderStatus(id: ID!, status: OrderStatus!): Order!
    }

    """
    Input object used when creating an order.
    Each item corresponds to a product being purchased.
    """
    input OrderItemInput {
      "ID of the product being purchased"
      productId: ID!
      "Quantity of this product to buy"
      qty: Int!
    }
  `,

  resolvers: {
    Mutation: {
      /**
       * createOrder:
       * - Validates stock for each requested item.
       * - Reserves inventory (increments reserved count).
       * - Computes total order price.
       * - Creates Order and OrderItems linked to Customer.
       * - Starts in status PENDING.
       *
       * Usage in GraphQL Playground:
       *
       * mutation {
       *   createOrder(customerId: "1", items: [{ productId: "2", qty: 3 }]) {
       *     id
       *     status
       *     total
       *     items {
       *       qty
       *       priceAtPurchase
       *       product { name sku }
       *     }
       *     customer { name email }
       *   }
       * }
       */
      async createOrder(parent, args, ctx) {
        const { customerId, items } = args;
        const strapi = ctx.strapi;

        if (!ctx.state.user || ctx.state.user.role?.name !== "ops") {
          throw new Error("Not authorized");
        }

        let total = 0;
        const orderItems = [];

        for (const item of items) {
          const product = await strapi.db
            .query("api::product.product")
            .findOne({
              where: { id: item.productId },
              populate: { inventory: true },
            });
          if (!product) throw new Error("Product not found");

          const available =
            product.inventory.onHand - product.inventory.reserved;
          if (available < item.qty) {
            throw new Error(`INSUFFICIENT_STOCK for ${product.name}`);
          }

          // reserve stock
          await strapi.db.query("api::inventory.inventory").update({
            where: { id: product.inventory.id },
            data: { reserved: product.inventory.reserved + item.qty },
          });

          total += item.qty * product.price;
          orderItems.push({
            product: product.id,
            qty: item.qty,
            priceAtPurchase: product.price,
          });
        }

        const order = await strapi.db.query("api::order.order").create({
          data: {
            customer: customerId,
            status: "PENDING",
            total,
            placedAt: new Date(),
            items: orderItems,
          },
          populate: { items: true, customer: true },
        });

        return order;
      },

      /**
       * updateOrderStatus:
       * - Allows ops users to update an order’s status.
       * - Applies business rules:
       *   - CANCELLED → releases reserved stock.
       *   - DELIVERED → decrements onHand, clears reserved.
       *   - Other transitions just change the status field.
       *
       * Usage in GraphQL Playground:
       *
       * mutation {
       *   updateOrderStatus(id: "1", status: DELIVERED) {
       *     id
       *     status
       *     items {
       *       qty
       *       product { name sku }
       *     }
       *   }
       * }
       *
       * Expected return: updated Order with new status.
       */
      async updateOrderStatus(parent, args, ctx) {
        const { id, status } = args;
        const strapi = ctx.strapi;

        if (!ctx.state.user || ctx.state.user.role?.name !== "ops") {
          throw new Error("Not authorized");
        }

        const order = await strapi.db.query("api::order.order").findOne({
          where: { id },
          populate: {
            items: { populate: { product: { populate: { inventory: true } } } },
          },
        });
        if (!order) throw new Error("Order not found");

        if (status === "CANCELLED") {
          for (const item of order.items) {
            await strapi.db.query("api::inventory.inventory").update({
              where: { id: item.product.inventory.id },
              data: { reserved: item.product.inventory.reserved - item.qty },
            });
          }
        }
        if (status === "DELIVERED") {
          for (const item of order.items) {
            await strapi.db.query("api::inventory.inventory").update({
              where: { id: item.product.inventory.id },
              data: {
                onHand: item.product.inventory.onHand - item.qty,
                reserved: item.product.inventory.reserved - item.qty,
              },
            });
          }
        }

        const updated = await strapi.db.query("api::order.order").update({
          where: { id },
          data: { status },
          populate: { items: true, customer: true },
        });

        return updated;
      },
    },
  },
};
