// src/pages/Login.jsx
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/forms/SignupForm";
import { Card, CardBody, CardFooter, CardHeader }  from '../components/ui/Card'
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const { signUp, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    try {
      await signUp(data.email, data.password1, data.password2);
      navigate('/')
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      await loginWithGoogle(credentialResponse)
      navigate('/');
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login with Google failed. Please check your credentials.");
    }
  };

    return (   
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-md">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-800">Create Account</h1>
                    <p className="text-sm text-gray-500">Sign up to get started</p>
                </div>
                <SignUpForm onSubmit={ handleSignUp } onGoogleLogin={ handleGoogleLogin } />
                <div className="text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">Sign In</a>
                </div>
            </div>
        </div>
    );
}
