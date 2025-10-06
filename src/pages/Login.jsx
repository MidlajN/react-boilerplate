// src/pages/Login.jsx
import LoginForm from "../components/forms/LoginForm";
// import { useAuth } from "../context/AuthContext";
import { Card, CardBody, CardFooter, CardHeader }  from '../components/ui/Card'
import { Button } from "../components/ui/button";

export default function Login() {
//   const { login } = useAuth();

  const handleLogin = async (data) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
    //   if (response.ok) login(result.user);
    //   else alert(result.detail || "Login failed");
    } catch {
      alert("Network error");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/auth/google-login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const result = await response.json();
    //   if (response.ok) login(result.user);
    //   else alert(result.detail || "Google login failed");
    } catch {
      alert("Network error");
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
