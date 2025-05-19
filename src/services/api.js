const API_URL = "https://crud-mongo-sepia.vercel.app";

export const api = {
  get: async (endpoint) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    return response.json();
  },

  post: async (endpoint, data) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    return response.json();
  },

  put: async (endpoint, data) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    return response.json();
  },

  delete: async (endpoint) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    return response.json();
  },
};
