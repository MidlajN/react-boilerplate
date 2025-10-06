import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { GoogleLogin } from "@react-oauth/google";
export default function LoginForm({ onSubmit }) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(formData);
        setLoading(false);
    };

    return (
        
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                </Button>
            </form>

            <div className="flex items-center my-2">
                <hr className="flex-1 border-gray-300" />
                <span className="mx-2 text-gray-400 text-sm">OR</span>
                <hr className="flex-1 border-gray-300" />
            </div>

            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse)
                }}
                onError={() => {
                    alert('Google Sign-In Failed');
                }}
            />
        </div>
    );
}
