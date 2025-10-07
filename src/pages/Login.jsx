// src/pages/Login.jsx
import LoginForm from "../components/forms/LoginForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const { logIn, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      await logIn(data.email, data.password)
      navigate('/')
    } catch {
      alert("Network error");
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
                    <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1>
                    <p className="text-sm text-gray-500">Sign in to continue to your dashboard</p>
                </div>
                <LoginForm onSubmit={handleLogin} onGoogleLogin={handleGoogleLogin} />
                <div className="text-center text-sm text-gray-500">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">Sign up</a>
                </div>
            </div>

        </div>
    );
}
