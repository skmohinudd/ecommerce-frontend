import axios from "axios";

const API_URL = "/api";

function generateRequestId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `req-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function buildHeaders() {
  const requestId = generateRequestId();

  return {
    "x-request-id": requestId,
    "x-correlation-id": requestId,
  };
}

export const getOrders = async () => {
  const start = Date.now();
  const headers = buildHeaders();

  try {
    console.log("[frontend] orders fetch started", {
      event: "frontend_orders_fetch_started",
      api_url: `${API_URL}/orders`,
      request_id: headers["x-request-id"],
    });

    const response = await axios.get(`${API_URL}/orders`, { headers });

    console.log("[frontend] orders fetch success", {
      event: "frontend_orders_fetch_success",
      api_url: `${API_URL}/orders`,
      request_id: headers["x-request-id"],
      duration_ms: Date.now() - start,
      order_count: Array.isArray(response.data) ? response.data.length : 0,
    });

    return response.data;
  } catch (error) {
    console.error("[frontend] orders fetch failed", {
      event: "frontend_orders_fetch_failed",
      api_url: `${API_URL}/orders`,
      request_id: headers["x-request-id"],
      duration_ms: Date.now() - start,
      error_message: error.message,
    });

    throw error;
  }
};

export const createOrder = async (orderData) => {
  const start = Date.now();
  const headers = {
    ...buildHeaders(),
    "Content-Type": "application/json",
  };

  try {
    console.log("[frontend] create order started", {
      event: "frontend_order_create_started",
      api_url: `${API_URL}/orders`,
      request_id: headers["x-request-id"],
      item_count: Array.isArray(orderData?.cart) ? orderData.cart.length : 0,
    });

    const response = await axios.post(`${API_URL}/orders`, orderData, {
      headers,
    });

    console.log("[frontend] create order success", {
      event: "frontend_order_create_success",
      api_url: `${API_URL}/orders`,
      request_id: headers["x-request-id"],
      duration_ms: Date.now() - start,
      status_code: response.status,
      order_id: response?.data?.order?._id || null,
    });

    return response.data;
  } catch (error) {
    console.error("[frontend] create order failed", {
      event: "frontend_order_create_failed",
      api_url: `${API_URL}/orders`,
      request_id: headers["x-request-id"],
      duration_ms: Date.now() - start,
      error_message: error.message,
      status_code: error?.response?.status || null,
      response_data: error?.response?.data || null,
    });

    throw error;
  }
};

export const getProducts = async () => {
  const start = Date.now();
  const headers = buildHeaders();

  try {
    console.log("[frontend] products fetch started", {
      event: "frontend_products_fetch_started",
      api_url: `${API_URL}/products`,
      request_id: headers["x-request-id"],
    });

    const response = await axios.get(`${API_URL}/products`, { headers });

    console.log("[frontend] products fetch success", {
      event: "frontend_products_fetch_success",
      api_url: `${API_URL}/products`,
      request_id: headers["x-request-id"],
      duration_ms: Date.now() - start,
      product_count: Array.isArray(response.data) ? response.data.length : 0,
    });

    return response.data;
  } catch (error) {
    console.error("[frontend] products fetch failed", {
      event: "frontend_products_fetch_failed",
      api_url: `${API_URL}/products`,
      request_id: headers["x-request-id"],
      duration_ms: Date.now() - start,
      error_message: error.message,
      status_code: error?.response?.status || null,
    });

    throw error;
  }
};