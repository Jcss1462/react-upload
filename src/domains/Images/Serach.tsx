import { useState } from "react";
import { searchImages } from "../shared/services/imgaeService";
import { ImageData } from "../shared/models/imageDataModel";

export default function Search() {
  const [name, setName] = useState<string>("");
  const [dorsal, setDorsal] = useState<string>("");
  const [results, setResults] = useState<ImageData[]>([]);

  const handleSearch = async () => {
    const data = await searchImages({ name, dorsal: dorsal ? Number(dorsal) : undefined });
    setResults(data);
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">Buscar Imágenes</h1>
      <div className="space-y-4">
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
        <button onClick={handleSearch} className="bg-green-500 text-white p-2 w-full">
          Buscar
        </button>
      </div>

      <div className="mt-5">
        {results.length > 0 ? (
          results.map((img) => (
            <div key={img.id} className="border p-2 mt-2">
              <p><strong>Nombre:</strong> {img.name}</p>
              <p><strong>Dorsal:</strong> {img.dorsal}</p>
              <img src={`data:image/png;base64,${img.data}`} alt={img.name} className="mt-2 w-full" />
            </div>
          ))
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
}
