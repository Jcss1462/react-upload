import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./domains/Images/Upload";
import Search from "./domains/Images/Serach";
import MainLayout from "./domains/shared/layouts/MainLayout";


export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
