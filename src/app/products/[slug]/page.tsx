// import { groq } from "next-sanity";
// import { Product } from "../../types/products"
// import { client } from "@/sanity/lib/client"
// import { urlFor } from "@/sanity/lib/image";

// interface ProductPageProps {
//     params: { slug: string };
// }

//   async function getProduct(slug:string):Promise<Product>{
//     return client.fetch(
//         groq`*[_type == "product" && slug.current == $slug][0] {
//         _id,
//         productName,
//         slug,
//         price,
//         description,
//         'image': image.asset->url,
//         color,status,
//         inventory,
//         }`, {slug})
//   }
//   export default async function ProductPage({params}:ProductPageProps){ 
//     const { slug } = params;
//     const product = await getProduct(slug)
//     return (
//         <div className="max-w-7xl mx-auto px-4 ">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//                 <div className="aspect-square">
//                     {product.image && 
//                     <img src={ urlFor(product.image).url()} 
//                     alt={product.productName} 
//                     height={400}
//                     width={400}
//                     className="rounded-lg shadow-md"
//                     />}
//                     </div>
//                     <div className="flex flex-col justify-center">
//                         <h1 className="text-2xl font-bold">{product.productName}</h1>
//                        <p className="text-lg">{product.description}</p>
//                        <p className="text-lg text-gray-500">${product.price}</p>
//             </div>
//         </div>
//         </div>
//     )
// }
// import { urlFor } from "@/sanity/lib/image";
// import { client } from "@/sanity/lib/client";
// import { groq } from "next-sanity";
// import PageProps from "next";

// interface Product {
//   _id: string;
//   productName: string;
//   slug: { current: string };
//   price: number;
//   description: string;
//   image?: string;
//   color?: string;
//   status?: string;
//   inventory?: number;
// }

// // Ensure the props match Next.js's expected type
// interface ProductPageProps extends PageProps {
//   params: { slug: string };
// }

// async function getProduct(slug: string): Promise<Product | null> {
//   try {
//     const product = await client.fetch(
//       groq`*[_type == "product" && slug.current == $slug][0] {
//         _id,
//         productName,
//         slug,
//         price,
//         description,
//         "image": image.asset->url,
//         color,
//         status,
//         inventory
//       }`,
//       { slug }
//     );
//     return product || null;
//   } catch (error) {
//     console.error("Error fetching product:", error);
//     return null;
//   }
// }

// export default async function ProductPage({ params }: ProductPageProps) {
//   const { slug } = params;
//   const product = await getProduct(slug);

//   if (!product) {
//     return <div className="text-center text-red-500">Product not found</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//         <div className="aspect-square">
//           {product.image && (
//             <img
//               src={urlFor(product.image).url()}
//               alt={product.productName}
//               height={400}
//               width={400}
//               className="rounded-lg shadow-md"
//             />
//           )}
//         </div>
//         <div className="flex flex-col justify-center">
//           <h1 className="text-2xl font-bold">{product.productName}</h1>
//           <p className="text-lg">{product.description}</p>
//           <p className="text-lg text-gray-500">${product.price}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { urlFor } from "@/sanity/lib/image";  // Ensure this imports correctly
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { NextPage } from "next";  // Correct import for Next.js page component
 
interface Product {
  _id: string;
  productName: string;
  slug: { current: string };
  price: number;
  description: string;
  image?: string;
  color?: string;
  status?: string;
  inventory?: number;
}

// Updated PageProps interface to use NextPage
interface ProductPageProps {
  params: { slug: string };
}

async function getProduct(slug: string): Promise<Product|any >{
  try {
    const product = await client.fetch(
      groq`*[_type == "product" && slug.current == $slug][0] {
        _id,
        productName,
        slug,
        price,
        description,
        "image": image.asset->url,
        color,
        status,
        inventory
      }`,
      { slug }
    );
    return product ;
  } catch (error) {
    console.error("Error fetching product:", error);
    
  }
}

const ProductPage: NextPage<ProductPageProps> = async ({ params }) => {
  const { slug } = params;
  const product = await getProduct(slug);

  if (!product) {
    return <div className="text-center text-red-500">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square">
          {product.image && (
            <img
              src={urlFor(product.image).url()}  // Corrected usage of `urlFor`
              alt={product.productName}
              height={400}
              width={400}
              className="rounded-lg shadow-md"
            />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold">{product.productName}</h1>
          <p className="text-lg">{product.description}</p>
          <p className="text-lg text-gray-500">${product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
