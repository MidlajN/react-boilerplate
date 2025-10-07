import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/ui/navbar";

export default function AddProduct() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
        // --- Placeholder: replace with API call ---
        const newProduct = { name, price, quantity, description, photo };
        console.log("Product to add:", newProduct);

        alert("Product added successfully!");
        navigate("/dashboard"); // redirect to dashboard after adding
        } catch (err) {
        console.error(err);
        alert("Failed to add product. Try again.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10">
            <div className="bg-white shadow-md rounded-lg w-full max-w-2xl p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>

            <form className="space-y-4" onSubmit={handleAddProduct}>
                {/* Product Name */}
                <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Product Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                </div>

                {/* Price */}
                <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Price (₹)</label>
                <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter product price"
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                </div>

                {/* Quantity */}
                <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Quantity</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter stock quantity"
                    required
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                </div>

                {/* Description */}
                <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter product description"
                    rows="4"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                ></textarea>
                </div>

                {/* Photo */}
                <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">Product Image</label>
                <input
                    type="file"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    accept="image/*"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
                </div>

                {/* Submit Button */}
                <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
                >
                {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
            </div>
        </div>
        </>
    );
}
