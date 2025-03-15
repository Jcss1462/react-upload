import { ImageData } from "../models/imageDataModel";

const API_URL = import.meta.env.VITE_API_URL;

export const uploadImage = async (formData: FormData): Promise<{ message: string; id: number }> => {
    const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
    });
    return response.json();
};
  
export const searchImages = async (query: { name?: string; dorsal?: number }): Promise<ImageData[]> => {
    const url = new URL(`${API_URL}/search`);
    if (query.name) url.searchParams.append("name", query.name);
    if (query.dorsal) url.searchParams.append("dorsal", query.dorsal.toString());

    const response = await fetch(url);
    return response.json();
};