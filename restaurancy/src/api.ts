
import { Restaurant } from "./app/types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  list: async (): Promise<Restaurant[]> => {
     // Obtenemos la información de Google Sheets en formato texto y la dividimos por líneas (nos saltamos la primera línea porque es el encabezado)
     const [, ...data] = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSM7hMRRZGD3UXqyHWPQ5uKb9pO2mZcVXRtlAYzOKVF6qqGz7uD_kVtHPU3a8aNFTK3ZtgIk_s5ltVk/pub?gid=0&single=true&output=csv',  { next: { tags: ['restaurants'] } }).then(res => res.text()).then(text => text.split('\n'))

     // Convertimos cada línea en un objeto Restaurant
     const restaurants: Restaurant[] = data.map((row) => {
      const [id, name, description, address, score, ratings, image] = row.split(',')
      return {
        id,
        name,
        description,
        address,
        score: Number(score),
        ratings: Number(ratings),
        image
      }
    })

    // Lo retornamos
    return restaurants;
  },
  fetch: async (id: Restaurant["id"]): Promise<Restaurant | undefined> => {


    const restaurant = api.list().then((restaurants) =>
      restaurants.find((restaurant) =>
        restaurant.id === id
      )
    )

    if (!restaurant) {
      throw new Error(`Restaurant with id ${id} not found`);
    }

    return restaurant;
  },
  search: async (query: string): Promise<Restaurant[]> => {
    let results;
    if(query){
      // Obtenemos los restaurantes
     results = await api.list().then((restaurants) =>
      // Los filtramos por nombre
      restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(query?.toLowerCase()),
      ),
    )
    }else{
      results =await api.list()
    }

    // Los retornamos
    return results;
  },
};

export default api;
