import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./domains/Images/upload";
import Search from "./domains/Images/Serach";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}
