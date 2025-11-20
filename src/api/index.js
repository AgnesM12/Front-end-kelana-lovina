// ===============================
// API BASE URL
// ===============================
const API_BASE = "http://localhost:4000/api";

// Helper untuk GET
async function getRequest(endpoint) {
    const res = await fetch(`${API_BASE}${endpoint}`);
    return res.json();
}

// Helper untuk POST
async function postRequest(endpoint, data) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}

// Helper dengan Authorization
async function postAuth(endpoint, data) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

// ===============================
// AUTH (LOGIN / REGISTER)
// ===============================
export function registerUser(data) {
    return postRequest("/auth/register", data);
}

export function loginUser(data) {
    return postRequest("/auth/login", data);
}

// ===============================
// EVENTS
// ===============================
export function getEvents() {
    return getRequest("/events");
}

export function getEventById(id) {
    return getRequest(`/events/${id}`);
}

// ===============================
// DESTINATIONS
// ===============================
export function getDestinations() {
    return getRequest("/destinations");
}

export function getDestinationById(id) {
    return getRequest(`/destinations/${id}`);
}

// ===============================
// PACKAGES
// ===============================
export function getPackages() {
    return getRequest("/packages");
}

export function getPackageById(id) {
    return getRequest(`/packages/${id}`);
}

// ===============================
// ORDERS (PEMESANAN TIKET)
// ===============================

// Buat pesanan (order)
export function createOrder(data) {
    return postRequest("/orders", data);
}

// Ambil daftar order milik user login
export function getMyOrders() {
    return getRequest("/orders/myorders");
}

// Ambil detail tiket berdasarkan id
export function getOrderById(id) {
    return getRequest(`/orders/${id}`);
}
