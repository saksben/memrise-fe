// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  
    return response.json();
  }