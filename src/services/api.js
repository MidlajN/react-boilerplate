import apiClient from "./apiClient";

export async function loginUser(email, password) {
    const { data } = await apiClient.post('/auth/login/', { email, password })
    console.log('data', data)
    return data
}

export async function signupUser(email, password1, password2) {
    try {
        const { data } = await apiClient.post('/auth/registration/', {
            email,
            password1,
            password2
        })
        console.log('data', data)
        return data
    } catch (error) {
        console.error(error.response?.data)
    }
}

export async function googleLogin(credential) {
    const { data } = await apiClient.post("/auth/social/google/", { credential });
    return data
}

// -----------------------------------------------------------------------
export async function verifyEmail(token) {
    const { data } = await apiClient.post("/auth/registration/verify-email", {
        key: token
    })
    return data
}

export async function getProducts() {
    const { data } = await apiClient.get("/products")

    return data
}

export async function getProductByID(id) {
    const { data } = await apiClient.get(`/products/${id}`)

    return data
}

export async function buyNow(id, quantity) {
    const { data } = await apiClient.post('orders/buy_now/', {
        "product_id": id,
        "quantity": quantity
    })

    return data
}