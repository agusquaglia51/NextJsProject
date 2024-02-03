import api from "@/api";
import RestaurantCard from "../components/RestaurantCard";
import Link from "next/link";

export async function generateMetadata({params: {id}}: {params: {id: string}}) {
  const restaurant = await api.fetch(id);
  return {
    title: `${restaurant?.name} - Restaurancy`,
    description: restaurant?.description,
  };
}

export async function generateStaticParams() {
  const restaurants = await api.list();
 
  return restaurants.map((restaurant) => ({
    id: restaurant.id,
  }));
}

export default async function RestaurantPage({ params: { id } }: { params: { id: string } }) {
  const restaurant = await api.fetch(id);
  
  return (
    <>
      <div className="mb-3">
        <Link prefetch={false} href={"/?q="}><h1 className="inline-flex gap-2 text-md font-semi-bold">← Home</h1></Link>
      </div>
      {restaurant && (<RestaurantCard restaurant={restaurant} />)}
    </>
  );
}