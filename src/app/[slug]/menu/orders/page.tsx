import { db } from "@/lib/prisma";

import EmailForm from "./components/email-form";
import OrderList from "./components/order-list";

interface OrdersPageProps {
  searchParams: Promise<{ email: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { email } = await searchParams;
  if (!email) {
    return <EmailForm />;
  }

  const orders = await db.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      customerEmail: email,
    },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });
  return <OrderList orders={orders} />;
};

export default OrdersPage;