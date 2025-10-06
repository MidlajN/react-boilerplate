import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { GoogleLogin } from "@react-oauth/google";

export default function SignUpForm({ onSubmit }) {
    const [formData, setFormData] = useState({ email: "", password1: "", password2: "" });
    const [loading, setLoading] = useState(false);
    const [ passwordMatched, setPasswordMatched ] = useState(true)

    useEffect(() => {
        setPasswordMatched(formData.password1 === formData.password2)
    }, [formData.password1, formData.password2])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordMatched) {
            alert("Password Do Not Match")
            return
        }

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
                    required
                />
                <Input
                    label="Password"
                    name="password1"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password1}
                    onChange={handleChange}
                    required
                />
                <Input
                    label="Confirm Password"
                    name="password2"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password2}
                    onChange={handleChange}
                    required
                />
                {!passwordMatched && (
                    <p className="text-sm text-red-500">Passwords do not match</p>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing up..." : "Sign Up"}
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
