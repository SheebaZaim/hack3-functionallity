// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Product } from '../types/products';
// import { getcartItems, UPDATE_CART } from '../actions/actions';
// import Swal from 'sweetalert2';
// import { Button } from '../components/ui/button';
// import { Card, CardContent } from '../components/ui/card';
// import { Trash2, Plus, Minus } from 'lucide-react';
// import Image from 'next/image';
// import { urlFor } from '@/sanity/lib/image';
// import  { useRouter } from 'next/navigation';

// function Cartpage() {
//   const [cartItem, setCartItem] = useState<Product[]>([]);

//   useEffect(() => {
//     setCartItem(getcartItems());
//   }, []);

//   const handleRemoveFromCart = (productId: string) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You want to remove this item from cart',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, remove it!',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setCartItem(getcartItems().filter((item) => item._id !== productId));
//         Swal.fire('Deleted!', 'Your item has been removed from cart.', 'success');
//       }
//     });
//   };

//   const handleQuantityChange = (productId: string,quantity: number) => {
//     UPDATE_CART(productId,quantity);
//     setCartItem(getcartItems());
//   };

//   const handleIncrement = (productId: string) => {
//     const product = cartItem.find((item) => item._id === productId);
//     if (product) handleQuantityChange(productId, product.inventory + 1);
//   };

//   const handleDecrement = (productId: string) => {
//     const product = cartItem.find((item) => item._id === productId);
//     if (product && product.inventory > 1) handleQuantityChange(productId, product.inventory - 1);
//   };

//   const CalculatedTotal = () => {
//     return cartItem.reduce((total, item) => total + item.price * item.inventory, 0);
//   };
// const router=useRouter()
//   const handleProceed = () => {
//     Swal.fire({
//       title: 'Proceed to Checkout',
//       text: 'Please review your cart before checkout',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonColor: '#3003d6',
//       cancelButtonColor: '#d44',
//       confirmButtonText: 'Yes, Proceed!',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire('Thank You', 'Your order has been processed successfully!', 'success');
//       };
//       router.push('/checkout')
      
//       setCartItem([])
//     });
  
//   };

//   return (
//     <div className="container mx-auto mb-6 mt-6 py-12">
//       <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {cartItem.map((item) => (
//           <Card key={item._id} className="p-4 shadow-lg rounded-lg">
//             <CardContent>
//                 {item.image && (
//                 <Image
//                   src={urlFor(item.image).url()}
//                   alt={item.productName}
//                   width={500}
//                   height={500}
//                   className="w-full h-48 object-cover mb-4"
//                 />
//                 )}
//               <h2 className="text-lg font-semibold">{item.productName}</h2>
//               <p className="text-gray-600">Price: ${item.price}</p>
//               <div className="flex items-center mt-2 gap-2">
//                 <Button onClick={() => handleDecrement(item._id)} variant="outline" size="sm">
//                   <Minus size={16} />
//                 </Button>
//                 <span className="text-lg font-bold">{item.inventory}</span>
//                 <Button onClick={() => handleIncrement(item._id)} variant="outline" size="sm">
//                   <Plus size={16} />
//                 </Button>
//               </div>
//               <Button
//                 onClick={() => handleRemoveFromCart(item._id)}
//                 variant="destructive"
//                 className="mt-4 w-full flex items-center justify-center"
//               >
//                 <Trash2 size={16} className="mr-2" /> Remove
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold">Total: ${CalculatedTotal().toFixed(2)}</h2>
//         <Button onClick={handleProceed} className="mt-4 w-full">Proceed to Checkout</Button>
//       </div>
//     </div>
//   );
// }

// export default Cartpage;


'use client';
import React, { useState, useEffect } from 'react';
import { Product } from '../types/products';
import { getcartItems, UPDATE_CART } from '../actions/actions';
import Swal from 'sweetalert2';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { useRouter } from 'next/navigation';

function Cartpage() {
  const [cartItem, setCartItem] = useState<Product[]>([]);

  useEffect(() => {
    setCartItem(getcartItems());
  }, []);

  const handleRemoveFromCart = (productId: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to remove this item from cart',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setCartItem(getcartItems().filter((item) => item._id !== productId));
        Swal.fire('Deleted!', 'Your item has been removed from cart.', 'success');
      }
    });
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    UPDATE_CART(productId, quantity);
    setCartItem(getcartItems());
  };

  const handleIncrement = (productId: string) => {
    const product = cartItem.find((item) => item._id === productId);
    if (product) handleQuantityChange(productId, product.inventory + 1);
  };

  const handleDecrement = (productId: string) => {
    const product = cartItem.find((item) => item._id === productId);
    if (product && product.inventory > 1) handleQuantityChange(productId, product.inventory - 1);
  };

  const CalculatedTotal = () => {
    return cartItem.reduce((total, item) => total + item.price * item.inventory, 0);
  };

  const router = useRouter();

  const handleProceed = () => {
    Swal.fire({
      title: 'Proceed to Checkout',
      text: 'Please review your cart before checkout',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3003d6',
      cancelButtonColor: '#d44',
      confirmButtonText: 'Yes, Proceed!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Thank You', 'Your order has been processed successfully!', 'success');
      }
      router.push('/checkout');

      setCartItem([]);
    });
  };

  return (
    <div className="container mx-auto mb-6 mt-6 py-12">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cartItem.map((item) => (
          <Card key={item._id} className="p-4 shadow-lg rounded-lg">
            <CardContent>
              {item.image && (
                <div className="relative w-full h-48 mb-4 overflow-hidden"> {/* Added relative wrapper and overflow-hidden */}
                  <Image
                    src={urlFor(item.image).url()}
                    alt={item.productName}
                    width={500} // Or actual image width if available
                    height={500} // Or actual image height if available
                    layout="fill" // Use fill for the image to cover the container
                    objectFit="cover" // Use objectFit to control how the image scales
                    sizes="100vw" // Important for responsiveness
                    priority
                  />
                </div>
              )}
              <h2 className="text-lg font-semibold">{item.productName}</h2>
              <p className="text-gray-600">Price: ${item.price}</p>
              <div className="flex items-center mt-2 gap-2">
                <Button onClick={() => handleDecrement(item._id)} variant="outline" size="sm">
                  <Minus size={16} />
                </Button>
                <span className="text-lg font-bold">{item.inventory}</span>
                <Button onClick={() => handleIncrement(item._id)} variant="outline" size="sm">
                  <Plus size={16} />
                </Button>
              </div>
              <Button
                onClick={() => handleRemoveFromCart(item._id)}
                variant="destructive"
                className="mt-4 w-full flex items-center justify-center"
              >
                <Trash2 size={16} className="mr-2" /> Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Total: ${CalculatedTotal().toFixed(2)}</h2>
        <Button onClick={handleProceed} className="mt-4 w-full">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cartpage;