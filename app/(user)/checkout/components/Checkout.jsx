"use client";

import { useAuth } from "@/context/AuthContext";
import { createCheckoutCODAndGetId } from "@/lib/firestore/checkout/write";
import { CircularProgress } from "@mui/material";
import { Button } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { CheckSquare2Icon, Square } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Checkout({ productList }) {
    const [isLoading, setIsLoading] = useState(false);
    const [paymentMode, setPaymentMode] = useState("cod");
    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        country: "India",
        streetAddress: "",
        city: "",
        state: "",
        pinCode: "",
        phone: "",
        email: ""
    });
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const { user } = useAuth();

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const totalPrice = productList?.reduce((prev, curr) => {
        return prev + curr?.quantity * curr?.product?.salePrice;
    }, 0);

    const tax = totalPrice * 0.065; // 6.5% tax
    const shippingFee = 100; // Fixed shipping fee
    const totalDue = totalPrice + tax + shippingFee;

    const validateForm = () => {
        const newErrors = {};
        if (!address.firstName) newErrors.firstName = "First name is required";
        if (!address.streetAddress) newErrors.streetAddress = "Address is required";
        if (!address.city) newErrors.city = "City is required";
        if (!address.state) newErrors.state = "State is required";
        if (!address.pinCode) newErrors.pinCode = "PIN code is required";
        if (!address.phone) newErrors.phone = "Phone is required";
        if (!address.email) newErrors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(address.email)) newErrors.email = "Email is invalid";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = async () => {
        if (!validateForm()) {
            toast.error("Please fill all required fields correctly");
            return;
        }

        setIsLoading(true);
        try {
            if (totalPrice <= 0) {
                throw new Error("Price should be greater than 0");
            }
            if (!productList || productList?.length === 0) {
                throw new Error("Product List Is Empty");
            }
            if (paymentMode === "prepaid") {
                throw new Error("Online Payment Option Not Available");
            } else {
                const checkoutId = await createCheckoutCODAndGetId({
                    uid: user?.uid,
                    products: productList,
                    address: {
                        fullName: `${address.firstName} ${address.lastName}`,
                        mobile: address.phone,
                        email: address.email,
                        addressLine1: address.streetAddress,
                        city: address.city,
                        state: address.state,
                        pincode: address.pinCode,
                        country: address.country
                    },
                });

                toast.success("Successfully Placed! Redirecting...");
                confetti();
                router.push(`/checkout-cod?checkout_id=${checkoutId}`);
            }
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <div className="md:h-screen w-full flex flex-col justify-center items-center bg-gray-100">
                <CircularProgress size={50} thickness={4} color="primary" />
                <p className="mt-4 text-gray-600 font-medium">Please Wait...</p>
            </div>
        );
    }

    return (
        <div className="max-w-8xl w-full mx-auto px-4 md:px-14">

            <h2 className='text-4xl font-bold text-start md:py-2'>Checkout</h2>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column - Billing Details */}
                <div className="lg:w-2/3 w-full">
                    <div className="bg-white p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Billing Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={address.firstName}
                                    onChange={handleAddressChange}
                                    className={`w-full px-3 py-2 border rounded-md  ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={address.lastName}
                                    onChange={handleAddressChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Country/Region</label>
                            <select
                                name="country"
                                value={address.country}
                                onChange={handleAddressChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value="" disabled>Select Country/Region</option>
                                <option value="India">India</option>
                                <option value="USA">United States</option>
                                <option value="UK">United Kingdom</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                            <input
                                type="text"
                                name="streetAddress"
                                value={address.streetAddress}
                                onChange={handleAddressChange}
                                className={`w-full px-3 py-2 border rounded-md ${errors.streetAddress ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="House number and street name"
                            />
                            {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Town/City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={address.city}
                                    onChange={handleAddressChange}
                                    className={`w-full px-3 py-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={address.state}
                                    onChange={handleAddressChange}
                                    className={`w-full px-3 py-2 border rounded-md ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                                <input
                                    type="text"
                                    name="pinCode"
                                    value={address.pinCode}
                                    onChange={handleAddressChange}
                                    className={`w-full px-3 py-2 border rounded-md ${errors.pinCode ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={address.phone}
                                    onChange={handleAddressChange}
                                    className={`w-full px-3 py-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={address.email}
                                    onChange={handleAddressChange}
                                    className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Order Summary and Payment */}
                <div className="lg:w-1/3 w-full">
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            {productList?.map((item, index) => (
                                <div key={index} className="flex justify-between items-center border-b pb-3">
                                    <div className="flex items-center">
                                        <img
                                            src={item?.product?.featureImageURL || "/product-img.png"}
                                            alt={item?.product?.title}
                                            className="w-12 h-12 object-cover rounded mr-3"
                                        />
                                        <div>
                                            <p className="font-medium">{item?.product?.title || "Iphone Display"}</p>
                                            <p className="text-sm text-gray-500">Qty: {item?.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-medium">₹{item?.product?.salePrice * item?.quantity}</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{totalPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Sales tax (6.5%)</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping Fee</span>
                                <span>₹{shippingFee}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                <span>Total due</span>
                                <span>₹{totalDue.toFixed(2)}</span>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>

                            <div className="space-y-4 mb-6">
                                <div
                                    className={`p-4 border rounded-md cursor-pointer ${paymentMode === 'cod' ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                    onClick={() => setPaymentMode('cod')}
                                >
                                    <div className="flex items-center">
                                        {paymentMode === 'cod' ? (
                                            <CheckSquare2Icon className="text-red-500 mr-2" size={16} />
                                        ) : (
                                            <Square className="text-gray-400 mr-2" size={16} />
                                        )}
                                        <span className="font-medium">Cash on Delivery</span>
                                    </div>
                                    <p className="text-sm text-gray-500 ml-6 mt-1">Pay with cash on delivery</p>
                                </div>

                                <div
                                    className={`p-4 border rounded-md cursor-pointer ${paymentMode === 'prepaid' ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                    onClick={() => setPaymentMode('prepaid')}
                                >
                                    <div className="flex items-center">
                                        {paymentMode === 'prepaid' ? (
                                            <CheckSquare2Icon className="text-red-500 mr-2" size={16} />
                                        ) : (
                                            <Square className="text-gray-400 mr-2" size={16} />
                                        )}
                                        <div className="flex items-center">
                                            <span className="font-medium">Credit/Debit Cards</span>
                                            <div className="flex ml-2">
                                                <img src="/icon/visa.svg" alt="visa" className="h-5 mx-1" />
                                                <img src="/icon/express.svg" alt="express" className="h-5 mx-1" />
                                                <img src="/icon/maestro.svg" alt="maestro" className="h-5 mx-1" />
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 ml-6 mt-1">Pay with your Credit / Debit Card</p>
                                    {paymentMode === 'prepaid' && (
                                        <div className="mt-3 ml-6 space-y-2">
                                            <input
                                                type="text"
                                                placeholder="Card number"
                                                className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md"
                                            />
                                            <input
                                                type="text"
                                                placeholder="MM / YY"
                                                className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 border border-gray-300 rounded-md">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Square className="text-gray-400 mr-2" size={16} />
                                            <span className="font-medium">Other Payment Methods</span>
                                        </div>
                                        <div className="flex ml-2">
                                            <img src="/icon/payment.svg" alt="payment" className="h-5 mx-1" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 ml-6 mt-1">Make payment through UPI, Paytm etc</p>
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                <CheckSquare2Icon className="text-red-500 mr-2" size={16} />
                                <p className="text-sm">
                                    I agree with the <a href="#" className="text-red-600">terms & conditions</a>
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <Button
                                    onClick={() => window.history.back()}
                                    className="border border-red-500 text-red-500 py-3 px-10 rounded-md font-medium hover:bg-red-50"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handlePlaceOrder}
                                    className=" bg-red-500 text-white py-3 px-10 rounded-md font-medium"
                                    isLoading={isLoading}
                                >
                                    Pay ₹{totalDue.toFixed(2)}
                                </Button>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}