const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const submitResponse = async (payload) => {
  const res = await fetch(`${API_BASE_URL}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to submit response");
  }

  return res.json();
};

export const fetchResponses = async ({ profession = "", search = "", authToken = "" }) => {
  const params = new URLSearchParams();
  if (profession) params.set("profession", profession);
  if (search) params.set("search", search);

  const res = await fetch(`${API_BASE_URL}/responses?${params.toString()}`, {
    headers: {
      Authorization: `Basic ${authToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized or failed to fetch responses");
  }

  return res.json();
};

export const exportResponsesCsv = ({ profession = "", authToken = "" }) => {
  const params = new URLSearchParams();
  if (profession) params.set("profession", profession);
  const url = `${API_BASE_URL}/responses/export?${params.toString()}`;

  return fetch(url, {
    headers: {
      Authorization: `Basic ${authToken}`,
    },
  });
};

export const deleteResponse = async ({ id, authToken }) => {
  const res = await fetch(`${API_BASE_URL}/responses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${authToken}`,
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to delete response");
  }

  return res.json();
};

export const fetchDeletedResponses = async ({ profession = "", search = "", authToken = "" }) => {
  const params = new URLSearchParams();
  if (profession) params.set("profession", profession);
  if (search) params.set("search", search);

  const res = await fetch(`${API_BASE_URL}/responses/deleted?${params.toString()}`, {
    headers: {
      Authorization: `Basic ${authToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized or failed to fetch deleted responses");
  }

  return res.json();
};

export const restoreResponse = async ({ id, authToken }) => {
  const res = await fetch(`${API_BASE_URL}/responses/${id}/restore`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authToken}`,
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to restore response");
  }

  return res.json();
};
