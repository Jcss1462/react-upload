import { ImageData } from "../models/imageDataModel";

const API_URL = import.meta.env.VITE_API_URL;

export const uploadImage = async (file: File, name: string, dorsal: number): Promise<{ message: string; id: number }> => {
    const formData = new FormData();
    formData.append("file", file); // Aquí agregamos el archivo
  
    const url = new URL(`${API_URL}/upload`);
    url.searchParams.append("name", name); // Agregamos el nombre a la query string
    url.searchParams.append("dorsal", dorsal.toString()); // Agregamos el dorsal a la query string
  
    const response = await fetch(url.toString(), {
      method: "POST",
      body: formData, // Enviar el FormData con el archivo
    });
  
    if (!response.ok) {
      throw new Error("Error al subir la imagen");
    }
  
    return response.json();
  };
  
export const searchImages = async (query: { name?: string; dorsal?: number }): Promise<ImageData[]> => {
    const url = new URL(`${API_URL}/search`);
    if (query.name) url.searchParams.append("name", query.name);
    if (query.dorsal || query.dorsal==0) url.searchParams.append("dorsal", query.dorsal.toString());
   
    const response = await fetch(url);
    return response.json();
};