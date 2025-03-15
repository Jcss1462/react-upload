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
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Buscar Imágenes</h1>
      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">Nombre</label>
          <input
            id="name"
            type="text"
            placeholder="Ingresa el nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label htmlFor="dorsal" className="block text-lg font-medium text-gray-700">Dorsal</label>
          <input
            id="dorsal"
            type="number"
            placeholder="Ingresa el dorsal"
            value={dorsal}
            onChange={(e) => setDorsal(e.target.value)}
            className="mt-2 border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          onClick={handleSearch}
          className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
        >
          Buscar
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.length > 0 ? (
          results.map((img) => (
            <div key={img.id} className="border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-lg transition-shadow">
              <p className="text-lg font-semibold text-gray-800"><strong>Nombre:</strong> {img.name}</p>
              <p className="text-md text-gray-600"><strong>Dorsal:</strong> {img.dorsal}</p>
              <div className="mt-4">
                <img
                  src={`data:image/png;base64,${img.data}`}
                  alt={img.name}
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No se encontraron resultados</p>
        )}
      </div>
    </div>
  );
}
