'use client'
import Link from "next/link";
import React from "react";
import { DynamicFavoriteButton } from "./FavoriteButton";
import { Restaurant } from "../types";

export default function RestaurantCard({restaurant}:{restaurant: Restaurant}){

    return(
        <article key={restaurant.id}>
        <img
            alt={restaurant.name}
            className="mb-3 h-[400px] w-full object-cover"
            src={restaurant.image}
        />
        <h2 className="inline-flex gap-2 text-lg font-bold">
            <Link href={`/${restaurant.id}`}>
            <span>{restaurant.name}</span>
            </Link>
            <small className="inline-flex gap-1">
            <span>⭐</span>
            <span>{restaurant.score}</span>
            <span className="font-normal opacity-75">({restaurant.ratings})</span>
            </small>
            <DynamicFavoriteButton restaurant={restaurant} />
        </h2>
        <p className="opacity-90">{restaurant.description}</p>
        </article>
    );
}