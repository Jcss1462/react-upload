import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow p-4">{children}</main>
          <Footer />
        </div>
      );
};
    