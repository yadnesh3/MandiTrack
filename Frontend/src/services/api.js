const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper to make HTTP requests
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("manditrack_token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth APIs
export const registerApi = (userData) => {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginApi = (credentials) => {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const getMeApi = () => {
  return request("/auth/me", {
    method: "GET",
  });
};

// Farmer Lot APIs
export const createLotApi = (lotData) => {
  return request("/lots/create", {
    method: "POST",
    body: JSON.stringify(lotData),
  });
};

export const getMyLotsApi = () => {
  return request("/lots/my-lots", {
    method: "GET",
  });
};

export const getLotByIdApi = (lotId) => {
  return request(`/lots/${lotId}`, {
    method: "GET",
  });
};

// Officer Lot APIs
export const getAllLotsApi = () => {
  return request("/lots/all", {
    method: "GET",
  });
};

export const getPendingLotsApi = () => {
  return request("/lots/pending", {
    method: "GET",
  });
};

export const updateLotStatusApi = (lotId, status) => {
  return request(`/lots/${lotId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
};

export const advanceCheckpointApi = (lotId, checkpointData) => {
  return request(`/lots/${lotId}/checkpoint`, {
    method: "PUT",
    body: JSON.stringify(checkpointData),
  });
};

// Mandi Price API
export const getMandiPricesApi = () => {
  return request("/mandi-prices", {
    method: "GET",
  });
};

// Admin Overview API
export const getAdminOverviewApi = () => {
  return request("/admin/overview", {
    method: "GET",
  });
};

// Admin Officer Management APIs
export const createOfficerApi = (officerData) => {
  return request("/admin/officers", {
    method: "POST",
    body: JSON.stringify(officerData),
  });
};

export const getOfficersApi = () => {
  return request("/admin/officers", {
    method: "GET",
  });
};
