import { createContext, useContext, useEffect, useState } from "react";
import { getProducts, googleLogin, loginUser, signupUser } from "../services/api";
import { googleLogout } from "@react-oauth/google";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(() => {
        const savedUser = localStorage.getItem('user')
        return savedUser ? JSON.parse(savedUser) : null
    });

    const [ accessToken, setAccessToken ] = useState(localStorage.getItem('access_token'));
    const [ refreshToken, setRefreshToken ] = useState(localStorage.getItem('refresh_token'));
    const [ loading, setLoading ] = useState(false);

    const logIn = async (email, password) => {
        try {
            setLoading(true);
            const data = await loginUser(email, password);
            setAccessToken(data.access_token);
            setRefreshToken(data.refresh_token);
            setUser(data.user);

            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('user', JSON.stringify(data.user));
        } catch (error) {
            console.warn('Login Error : ', error)
        } finally {
            setLoading(false);
        }
    }

    const loginWithGoogle = async (credentialResponse) => {
        try {
            setLoading(true);
            const data = await googleLogin(credentialResponse.credential);
            setAccessToken(data.access_token);
            setRefreshToken(data.refresh_token);
            setUser(data.user);

            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
            localStorage.setItem('user', JSON.stringify(data.user));
        } catch (error) {
            console.warn('Google Login Error : ', error)
        } finally {
            setLoading(false)
        }
    }

    const signUp = async (email, password1, password2) => {
        try {
            setLoading(true);
            const data = await signupUser(email, password1, password2);
            console.log(data)
            setAccessToken(data.access);
            setRefreshToken(data.refresh);
            setUser(data.user);
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            localStorage.setItem("user", JSON.stringify(data.user));
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        googleLogout()

        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        localStorage.clear()
    }

    const value = {
        user,
        accessToken,
        refreshToken,
        logIn,
        signUp,
        loginWithGoogle,
        logout,
        loading
    }

    useEffect(() => {
        const getProduct = async () => {
            const data = getProducts()
        }
        getProduct()

    }, [])

    useEffect(() => {
        console.log(accessToken, refreshToken, user)
    }, [accessToken, refreshToken, user])

    return <AuthContext.Provider value={value}>{ children }</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)