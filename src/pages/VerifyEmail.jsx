import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyEmail } from "../services/api";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("Verifying...");
    const token = searchParams.get("key");

    useEffect(() => {
        const verify = async () => {
            try {
                const data = await verifyEmail(token);
                setStatus("Email verified successfully! You can now log in.");
            } catch (err) {
                setStatus("Verification failed or link expired.");
            }
        };
        if (token) verify();
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-2xl font-bold">{status}</h1>
        </div>
    );
};

export default VerifyEmail;
