import { Spinner } from "../components/Spinner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useGlobalContext } from "../contexts/GlobalContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {

  const { isLoading } = useGlobalContext();
    return (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow p-4">{children}</main>
          <Footer />
          {isLoading && <Spinner />}
        </div>
      );
};
    