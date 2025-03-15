import { Link } from "react-router-dom";

export default function Header() {
    return (
      <header className="bg-[#0A192F] text-[#E5E7EB] p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">ImageAPP</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-[#64FFDA] transition-colors duration-300">Buscar</Link>
            </li>
            <li>
              <Link to="/upload" className="hover:text-[#64FFDA] transition-colors duration-300">Subir Imagen</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  };
  