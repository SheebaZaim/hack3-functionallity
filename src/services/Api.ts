'use server';

import { client } from "@/sanity/lib/client";

export async function fetchData(){
    const res= await client.fetch(`{*[_type == "product"]{
  category,
     'image': image.asset->url,
productName,
    _id,
    description,
    price,
    slug,
    inventory,
    colors
    
}`)
return res
}