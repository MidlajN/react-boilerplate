import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { buyNow, getProductByID } from "../services/api";
import Navbar from "../components/ui/navbar";

export default function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [buyLoading, setBuyLoading] = useState(false); // loading state for Buy Now

    useEffect(() => {
        const fetchProduct = async () => {
        try {
            setLoading(true);
            const data = await getProductByID(id);
            setProduct(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load product. Please try again.");
        } finally {
            setLoading(false);
        }
        };
        fetchProduct();
    }, [id]);

    const handleBuyNow = async () => {
        if (!product) return;

        try {
        setBuyLoading(true); // start loading
        const order = await buyNow(product.id, 1); // quantity = 1
        alert(`Order created! Razorpay Order ID: ${order.razorpay_order_id}`);
        // Optionally redirect to payment page
        // navigate(`/payment/${order.id}`);
        } catch (err) {
        alert(err.response?.data?.error || "Failed to place order. Try again.");
        } finally {
        setBuyLoading(false); // end loading
        }
    };

    if (loading) {
        return (
        <div className="flex justify-center items-center min-h-screen">
            <p className="text-gray-500 text-lg animate-pulse">Loading product...</p>
        </div>
        );
    }

    if (error) {
        return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
            <p className="text-red-500 text-lg">{error}</p>
            <Button
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3"
            onClick={() => navigate(-1)}
            >
            Go Back
            </Button>
        </div>
        );
    }

    if (!product) {
        return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
            <p className="text-gray-500 text-lg">Product not found!</p>
            <Button
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3"
            onClick={() => navigate(-1)}
            >
            Go Back
            </Button>
        </div>
        );
    }

    return (
        <>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8 my-auto">
            {/* Product Image */}
            <div className="w-full h-fit rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300">
            <img
                src={
                product.photo ||
                "https://shorthand.com/the-craft/raster-images/assets/5kVrMqC0wp/sh-unsplash_5qt09yibrok-4096x2731.jpeg"
                }
                alt={product.name}
                className="w-full h-auto object-cover"
            />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between gap-6">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {product.name}
                </h1>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-2xl font-semibold text-indigo-600 mb-4">
                ₹{product.price}
                </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Button
                onClick={handleBuyNow}
                className={`px-6 py-3 text-white ${
                    buyLoading
                    ? "bg-indigo-400 cursor-not-allowed animate-pulse"
                    : "bg-indigo-600 hover:bg-indigo-500"
                }`}
                disabled={buyLoading}
                >
                {buyLoading ? "Processing..." : "Buy Now"}
                </Button>
            </div>
            </div>
        </div>
        </>
    );
}
