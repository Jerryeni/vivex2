import React, { useEffect, useState } from "react";
import { Breadcrumb } from "../../../components/Breadcrumb";
import useCartStore from "../../../lib/store/useCartStore";
import toast from "react-hot-toast";
import HeroNav from "../../../components/layout/HeroNav";
import { formatCurrency } from "../../../lib/utils";

const breadcrumbItems = [
    { label: "Cart" },
];

const CartPage: React.FC = () => {
    const { cart, fetchCart, updateCartItem, removeFromCart, clearCart } = useCartStore();
    const [loading, setLoading] = useState(false);

    // Fetch cart items on component mount
    useEffect(() => {
        fetchCart();
    }, []);

    const handleQuantityChange = async (id: number, newQuantity: number) => {
        if (newQuantity > 0) {
            await updateCartItem(id, newQuantity);
        } else {
            await removeFromCart(id);
        }
        fetchCart(); // Ensure UI updates after changes
    };



    // Calculate subtotal
    const subtotal = Array.isArray(cart)
        ? cart.reduce((total, item) => total + (item?.sub_total || 0), 0)
        : 0;

    const shipping = 5.0;
    const total = subtotal + shipping;

    console.log(cart);

    return (
        <div className="font-sans bg-white min-h-screen">
            <div className="md:px-8 px-4">
                <HeroNav />

            </div>
            <div className="md:px-8 px-4 bg-gray-50">
                <Breadcrumb items={breadcrumbItems} />

            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <main className="container mx-auto p-4x flex flex-col md:flex-row gap-4 w-full">
                    <div className="bg-white border rounded w-full md:w-2/3 overflow-x-auto">
                        <h2 className="text-2xl font-semibold p-6 mb-4x">Shopping Cart</h2>

                        {/* Table Header */}
                        <div className="flex justify-between text-sm py-4 px-6 text-gray-600 font-normal mb-2 w-full bg-gray-100 overflow-x-auto">
                            <span className='w-full md:w-1/2 px-1 text-xs md:text-base'>PRODUCTS</span>
                            <div className="flex w-full md:w-1/2 justify-start text-xs md:text-base">
                                <span className='w-full px-1'>PRICE</span>
                                <span className='w-full px-1'>QUANTITY</span>
                                <span className='w-full px-1'>SUB-TOTAL</span>
                            </div>

                        </div>

                        {cart.length === 0 ? (
                            <p className="text-gray-500 px-4">Your cart is empty.</p>
                        ) : (
                            <div className="space-y-4 overflow-x-auto">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex justify-between px-4 w-full">
                                        <div className="flex items-center w-1/2">
                                            <button onClick={() => removeFromCart(item.id)} className="text-red-500 mr-2 border px-2 rounded-full">
                                                x
                                            </button>
                                            <img
                                                src={item.product?.images.length > 0 ? item.product?.images[0].image_url : "/placeholder.jpg"}
                                                alt={item.product?.name}
                                                className="w-16 h-10 mr-2"
                                            />
                                            <div>
                                                <h3 className="text-sm">{item.product?.name}</h3>
                                            </div>
                                        </div>
                                        <div className="w-1/2 flex items-center">
                                            <div className="w-full">

                                                {item.product?.discount_price && item.product?.discount_price !== 0 ? (
                                                    <>
                                                        {item.product?.discount_price !== item.product?.price && (
                                                            <span className="text-gray-500 line-through mr-1">
                                                                {formatCurrency(item.product?.price)}
                                                            </span>
                                                        )}
                                                        <span>{formatCurrency(item.product?.discount_price)}</span>
                                                    </>
                                                ) : (
                                                    <span>{formatCurrency(item.product?.price)}</span>
                                                )}

                                            </div>
                                            <div className="items-center flex gap-2 border w-fit mr-8">
                                                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="px-2 py-1">
                                                    -
                                                </button>
                                                <span className="w-6 text-center">{item.quantity}</span>
                                                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="px-2 py-1">
                                                    +
                                                </button>
                                            </div>
                                            <div className="w-full">{formatCurrency(item.sub_total)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex justify-between my-6 px-6 ">
                            <a href="/products" className="flex items-center border border-primary-default  px-4 py-2 text-primary-default">
                                &larr; RETURN TO SHOP
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col w-full md:w-1/3 bg-white border rounded p-6">
                        <h2 className="text-lg font-medium">Cart Totals</h2>
                        <div className="mt-2">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600 text-sm">Subtotal:</span>
                                <span className="text-sm">{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600 text-sm">Shipping:</span>
                                <span className="text-sm">₦{shipping.toFixed(2)}</span>
                            </div>
                            <hr />
                            <div className="flex justify-between mb-4 py-4 font-semibold">
                                <span className="text-gray-600 text-sm">Total:</span>
                                <span className="text-sm">{formatCurrency(total)}</span>
                            </div>
                            <div className="w-full relative flex text-center">
                                <a href="/checkout"

                                    className="bg-orange-500 text-white px-6 py-3  w-full"
                                >
                                    {loading ? "Processing..." : "Proceed to Checkout"}
                                </a>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CartPage;
