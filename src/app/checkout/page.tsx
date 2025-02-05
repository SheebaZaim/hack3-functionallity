'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import Image from 'next/image';
import { Product } from '../types/products';
import { getcartItems, REMOVE_FROM_CART } from '../actions/actions';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';
import { CgChevronRightO } from 'react-icons/cg';

const CheckOut = () => {
  const [cartItem, setCartItem] = useState<Product[]>([]);
  const [discount, SetDiscount] = useState<number>(0);
  const [formError, setFormError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    zipcode: '',
    city: '',
  });
  const [formValue, SetformValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    zipcode: '',
    city: '',
  });

  useEffect(() => {
    setCartItem(getcartItems());
    const appliedDiscount = localStorage.getItem('appliedDiscount');
    if (appliedDiscount) {
      SetDiscount(Number(appliedDiscount));
    }
  }, []);

  const subTotal = cartItem.reduce((total, Item) => total + Item.price * Item.inventory, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetformValue({
      ...formValue,
      [e.target.id]: e.target.value,
    });
  };

  const validationForm = () => {
    const errors = {
      firstName: formValue.firstName ? '' : 'First Name is required',
      lastName: formValue.lastName ? '' : 'Last Name is required',
      email: formValue.email ? '' : 'Email is required',
      phone: formValue.phone ? '' : 'Phone is required',
      address: formValue.address ? '' : 'Address is required',
      zipcode: formValue.zipcode ? '' : 'Zipcode is required',
      city: formValue.city ? '' : 'City is required',
    };
    setFormError(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handlePlaceOrder = () => {
    if (validationForm()) {
      localStorage.removeItem('appliedDiscount');
      // Proceed with order placement logic
    }
  };

  const handleRemove = (productId: string) => {
    console.log(`Removing product with ID: ${productId}`);
    const updatedCart = REMOVE_FROM_CART(productId);
    console.log('Updated cart:', updatedCart);
    setCartItem(updatedCart);
  };

  return (
    <div className="main min-h-screen bg-gray-50 mt-8 py-12">
      <div className="mt-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-4">
            <Link href={'/cart'} className="text-[#666666] hover:text-black transition text-sm">
              Cart
            </Link>
            <CgChevronRightO />
            <span>Checkout</span>
          </nav>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 space-y-4">
              <h2 className="text-lg font-semibold mb-4">Order summary</h2>
              {cartItem.length > 0 ? (
                cartItem.map((item) => (
                  <div key={item._id} className="flex items-center space-x-4">
                    <div className="image">
                      {item.image && (
                        <Image
                          src={urlFor(item.image).url()}
                          alt={item.productName}
                          width={50}
                          height={50}
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.productName}</h3>
                      <p className="text-xs text-gray-500">Quantity: {item.inventory}</p>
                    </div>
                    <p>${item.price * item.inventory}</p>
                    <button onClick={() => handleRemove(item._id)} className="text-red-500 hover:text-red-700">
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs font-medium">No items in the cart.</p>
              )}
              <div className="text-right pt-4">
                <p className="text-sm">
                  SubTotal: <span>${subTotal}</span>
                </p>
                <p className="text-sm">
                  Discount: <span>${discount}</span>
                </p>
                <p className="text-lg font-semibold">
                  Total: <span>${(subTotal - discount).toFixed(2)}</span>
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 space-y-4">
              <h2 className="text-xl font-semibold">Billing Information</h2>
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter your First Name"
                  value={formValue.firstName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                {formError.firstName && (
                  <span className="text-red-500 text-xs">
                    <p>{formError.firstName}</p>
                  </span>
                )}
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter your Last Name"
                  value={formValue.lastName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                {formError.lastName && (
                  <span className="text-red-500 text-xs">
                    <p>{formError.lastName}</p>
                  </span>
                )}
              </div>
              <div>
                <label>Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Enter your address"
                  value={formValue.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                {formError.address && (
                  <span className="text-red-500 text-xs">
                    <p>{formError.address}</p>
                  </span>
                )}
              </div>
              <div>
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your Email"
                  value={formValue.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                {formError.email && (
                  <span className="text-red-500 text-xs">
                    <p>{formError.email}</p>
                  </span>
                )}
              </div>
              <div>
                <label>City</label>
                <input
                  type="text"
                  id="city"
                  placeholder="Enter your city"
                  value={formValue.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
                {formError.city && (
                  <span className="text-red-500 text-xs">
                    <p>{formError.city}</p>
                  </span>
                )}
              </div>
              <button onClick={handlePlaceOrder} className="w-full h-12 bg-green-700 hover:bg-green-900 text-white rounded">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;


