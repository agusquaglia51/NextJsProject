import dynamic from "next/dynamic";
import { Restaurant } from "../types";

function FavoriteButton({restaurant}: {restaurant:Restaurant}){
    const isFavourite = window.localStorage.getItem('favorites')?.includes(restaurant.id)
  
    return (
      <button type="button" className={`text-red-500 text-xl ${isFavourite ? 'opacity-100' : 'opacity-20'}`}>♥</button>
    )
  }

  // Creamos un componente dinámico para que no se renderice en el servidor
export const DynamicFavoriteButton = dynamic(async () => FavoriteButton, { ssr: false });