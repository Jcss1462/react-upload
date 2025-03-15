import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./domains/Images/Upload";
import Search from "./domains/Images/Serach";
import MainLayout from "./domains/shared/layouts/MainLayout";
import { GlobalProvider } from "./domains/shared/contexts/GlobalContext";


export default function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </MainLayout>
      </GlobalProvider>
    </BrowserRouter>
  );
}
