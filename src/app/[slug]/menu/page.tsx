import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";

interface RestaurantePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethod = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(
    consumptionMethod.toLocaleUpperCase(),
  );
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantePageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  if (!isConsumptionMethod(consumptionMethod)) return notFound();

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: { menuCategories: { include: { products: true } } },
  });
  if (!restaurant) return notFound();
  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
