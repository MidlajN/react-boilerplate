import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/ui/navbar";

export default function Dashboard() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- Dummy Data ---
    const dummyProducts = [
        { id: 1, name: "Rynox 1", price: 199.99, quantity: 10 },
        { id: 2, name: "Rynox 2", price: 299.99, quantity: 0 },
        { id: 3, name: "Rynox 3", price: 399.99, quantity: 5 },
    ];

    const dummyCustomers = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
    ];

    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);
            setProducts(dummyProducts);
            setCustomers(dummyCustomers);
        } finally {
            setLoading(false);
        }
        };
        fetchData();
    }, []);

    const totalProducts = products.length;
    const outOfStock = products.filter((p) => !p.quantity || p.quantity <= 0).length;
    const totalCustomers = customers.length;

    const handleUpdateProduct = (id) => alert(`Update Product ID: ${id}`);
    const handleDeleteProduct = (id) => {
        alert(`Delete Product ID: ${id}`);
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const handleAddProduct = () => {
        navigate("/dashboard/add-product");
      };
      

    if (loading) {
        return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <p className="text-gray-400 text-lg animate-pulse">Loading dashboard...</p>
        </div>
        );
    }

    return (
        <>
        <Navbar />
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-72 bg-white shadow-md flex flex-col p-6">
            <div className="flex flex-col items-center mb-8">
                <img
                src="https://i.pravatar.cc/100"
                alt="Profile"
                className="w-24 h-24 rounded-full mb-4 border border-gray-200"
                />
                <h2 className="text-xl font-semibold text-gray-800">Admin User</h2>
                <p className="text-gray-500 text-sm">Staff Dashboard</p>
            </div>
            <nav className="flex flex-col gap-3">
                <button
                onClick={() => navigate("/dashboard")}
                className="text-gray-700 px-4 py-2 rounded hover:bg-gray-100 text-left transition"
                >
                Dashboard
                </button>
                <button
                onClick={() => navigate("/dashboard/add-product")}
                className="text-gray-700 px-4 py-2 rounded hover:bg-gray-100 text-left transition"
                >
                Add Product
                </button>
                <button
                onClick={() => navigate("/dashboard/profile")}
                className="text-gray-700 px-4 py-2 rounded hover:bg-gray-100 text-left transition"
                >
                Profile
                </button>
            </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                { title: "Total Products", value: totalProducts, color: "text-indigo-600" },
                { title: "Out of Stock", value: outOfStock, color: "text-red-500" },
                { title: "Total Customers", value: totalCustomers, color: "text-green-500" },
                { title: "Add Product", value: "", color: "text-gray-800", action: handleAddProduct },
                ].map((card, idx) => (
                <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col justify-center items-center hover:shadow-md transition cursor-pointer"
                    onClick={card.action}
                >
                    <h2 className="text-lg font-medium text-gray-700 mb-2">{card.title}</h2>
                    {card.value !== "" && (
                    <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
                    )}
                </div>
                ))}
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>
                <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                    <th className="px-6 py-3 text-left text-gray-600 uppercase text-sm">ID</th>
                    <th className="px-6 py-3 text-left text-gray-600 uppercase text-sm">Name</th>
                    <th className="px-6 py-3 text-left text-gray-600 uppercase text-sm">Price</th>
                    <th className="px-6 py-3 text-left text-gray-600 uppercase text-sm">Stock</th>
                    <th className="px-6 py-3 text-left text-gray-600 uppercase text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, idx) => (
                    <tr
                        key={product.id}
                        className={`border-b ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                    >
                        <td className="px-6 py-4">{product.id}</td>
                        <td className="px-6 py-4">{product.name}</td>
                        <td className="px-6 py-4">₹{product.price}</td>
                        <td className="px-6 py-4">{product.quantity}</td>
                        <td className="px-6 py-4 flex gap-2">
                        <button
                            onClick={() => handleUpdateProduct(product.id)}
                            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded text-sm transition"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm transition"
                        >
                            Delete
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </main>
        </div>
    </>
  );
}
