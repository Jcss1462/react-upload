import { useState } from "react";
import { uploadImage } from "../shared/services/imageService";
import { ImageDataDto } from "../shared/dtos/imageDataDto";
import { useGlobalContext } from "../shared/contexts/GlobalContext";
import { toast } from "react-toastify";

export default function Upload() {
  const [imageData, setImageData] = useState<ImageDataDto>({
    name: "",
    dorsal: 0,
    data: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState<{ name: string; dorsal: string }>({
    name: "",
    dorsal: "",
  });

  const { setIsLoading } = useGlobalContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos
    if (!imageData.name || imageData.dorsal.toString() === "" || !file) {
      setFormErrors({
        name: !imageData.name ? "El nombre es requerido" : "",
        dorsal: !imageData.dorsal ? "El dorsal es requerido" : "",
      });
      return;
    }

    setIsLoading(true); // Activar el spinner antes de enviar la solicitud

    // Llamamos al servicio para subir la imagen
    uploadImage(file, imageData.name, imageData.dorsal)
      .then(() => {
        // Usamos toast.success para notificar éxito
        toast.success("Imagen subida con éxito");

        // Limpiar el formulario si la carga fue exitosa
        setImageData({
          name: "",
          dorsal: 0,
          data: "",
        });
        setFile(null); // Limpiar el archivo seleccionado
      })
      .catch((error) => {
        console.error("Error al subir la imagen:", error);
        // Usamos toast.error para mostrar el error
        toast.error("Hubo un error al subir la imagen");
      })
      .finally(() => {
        setIsLoading(false); // Desactivar el spinner cuando la solicitud termine
      });
  };

  // Funciones para manejar el cambio de los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setImageData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar errores si se corrige el campo
    if (name === "name" && value) {
      setFormErrors((prev) => ({ ...prev, name: "" }));
    }
    if (name === "dorsal" && value) {
      setFormErrors((prev) => ({ ...prev, dorsal: "" }));
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Subir Imagen</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Nombre</label>
          <input
            id="name"
            name="name" // Usar el atributo 'name' para identificar el campo
            type="text"
            placeholder="Ingresa el nombre"
            value={imageData.name}
            onChange={handleInputChange}
            className={`mt-2 border ${formErrors.name ? "border-red-500" : "border-gray-300"} rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400`}
          />
          {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
        </div>

        <div>
          <label htmlFor="dorsal" className="block text-lg font-medium text-gray-700">Dorsal</label>
          <input
            id="dorsal"
            name="dorsal" // Usar el atributo 'name' para identificar el campo
            type="number"
            placeholder="Ingresa el dorsal"
            value={imageData.dorsal}
            onChange={handleInputChange}
            className={`mt-2 border ${formErrors.dorsal ? "border-red-500" : "border-gray-300"} rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400`}
          />
          {formErrors.dorsal && <p className="text-red-500 text-sm mt-1">{formErrors.dorsal}</p>}
        </div>

        <div>
          <label htmlFor="file" className="block text-lg font-medium text-gray-700">Selecciona una imagen</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-2 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          type="submit"
          disabled={!imageData.name || imageData.dorsal.toString() === "" || !file}
          className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
        >
          Subir
        </button>
      </form>
    </div>
  );
}
