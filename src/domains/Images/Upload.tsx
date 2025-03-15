import { useState } from "react";
import { uploadImage } from "../shared/services/imgaeService";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [dorsal, setDorsal] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Selecciona un archivo");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("dorsal", dorsal);

    const result = await uploadImage(formData);
    setMessage(result.message);
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">Subir Imagen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Dorsal"
          value={dorsal}
          onChange={(e) => setDorsal(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Subir
        </button>
      </form>
      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
}
