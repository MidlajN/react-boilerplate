import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/button";
import reactLogo from "../assets/react.svg";
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import Navbar from "../components/ui/navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [hoveredFeature, setHoveredFeature] = useState(null);
    const [ products, setProducts ] = useState(null)
    const navigate = useNavigate()

    const features = [
        {
            variant: "imageOverlay",
            image: "https://shorthand.com/the-craft/raster-images/assets/5kVrMqC0wp/sh-unsplash_5qt09yibrok-4096x2731.jpeg",
            title: "Beautiful UI",
            description: "TailwindCSS styling for clean, responsive components.",
            buttonText: "Learn More",
            buttonOnClick: () => alert("Button clicked!")
        },
        {
            image: "https://shorthand.com/the-craft/raster-images/assets/5kVrMqC0wp/sh-unsplash_5qt09yibrok-4096x2731.jpeg",
            title: "Beautiful UI",
            description: "TailwindCSS styling for clean, responsive components.",
            buttonText: "Learn More",
            buttonOnClick: () => alert("Button clicked!")
        },
        {
            variant: "imageOverlay",
            image: "https://shorthand.com/the-craft/raster-images/assets/5kVrMqC0wp/sh-unsplash_5qt09yibrok-4096x2731.jpeg",
            title: "Beautiful UI",
            description: "TailwindCSS styling for clean, responsive components.",
            buttonText: "Learn More",
            buttonOnClick: () => alert("Button clicked!")
        },

    ];

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts()
            const mappedProducts = data.map(product => ({
                variant: product.photo ? "imageOverlay" : "default",
                image: product.photo || "https://shorthand.com/the-craft/raster-images/assets/5kVrMqC0wp/sh-unsplash_5qt09yibrok-4096x2731.jpeg", // fallback if no photo
                title: product.name,
                description: product.description,
                buttonText: "View Product",
                buttonOnClick: () => navigate(`/products/${product.id}`),
            }))
            setProducts(mappedProducts)
        }
        fetchProducts()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-gray-800 flex flex-col items-center">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <main className="flex flex-col items-center text-center mt-16 px-4">
                <img
                src={reactLogo}
                alt="React"
                className="w-20 h-20 mb-4 animate-spin-slow hover:animate-spin-fast cursor-pointer"
                />
                <h2 className="text-4xl font-bold mb-3">React + Django Starter</h2>
                <p className="text-gray-600 max-w-xl mb-8">
                A modern full-stack boilerplate combining Django REST Framework and React
                with TailwindCSS. Start building APIs and UIs faster with prebuilt auth and routing.
                </p>
                <div className="flex gap-4">
                <Button className="px-6 py-3 transform transition hover:scale-105">
                    <a href="/signup">Get Started</a>
                </Button>
                <Button className="px-6 py-3 transform transition hover:scale-105 bg-gray-100 text-gray-800">
                    <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
                    View on GitHub
                    </a>
                </Button>
                </div>
            </main>

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 px-4 max-w-6xl w-full">
                {products?.map((feature, idx) => (
                    <Card
                        key={idx}
                        title={feature.title}
                        description={feature.description}
                        image={feature.image}
                        buttonText={feature.buttonText}
                        buttonOnClick={feature.buttonOnClick}
                        showLikeButton
                        initialLikes={3}
                        onMouseEnter={() => setHoveredFeature(idx)}
                        onMouseLeave={() => setHoveredFeature(null)}
                        className={`${ hoveredFeature === idx ? "scale-105 bg-indigo-50" : ""}`}
                    />
                
                ))}
            </section>
            {/* Footer */}
            <footer className="mt-auto py-8 text-gray-500 text-sm text-center">
                <p>Built with ❤️ using Django & React</p>
            </footer>
        </div>
    );
}
