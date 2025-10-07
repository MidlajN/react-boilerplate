import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" }
});

apiClient.interceptors.request.use((config) => {
    const access = localStorage.getItem('access_token')
    if (access) {
        config.headers.Authorization = `Bearer ${access}`
    }
    return config
})

let isRefreshing = false
let refreshQueue = []

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    refreshQueue.push({ resolve, reject })
                })
                .then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    return apiClient(originalRequest)
                })
                .catch(err => Promise.reject(err))
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const refresh = localStorage.getItem('refresh_token');
                if (!refresh) throw new Error('No Refresh Token Found');

                const res = await axios.post(`${BASE_URL}/auth/token/refresh`, {
                    refresh
                });

                const newAccessToken = res.data.access;

                apiClient.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
                refreshQueue.forEach((p) => p.resolve(newAccessToken))
                refreshQueue = []

                return apiClient(originalRequest);
            } catch (refreshError) {
                refreshQueue.forEach((p) => p.reject(refreshError));
                refreshQueue = [];
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error)
    }
)

export default apiClient