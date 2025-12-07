import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";



export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div  className="max-w-7xl mx-auto">
        <Navbar />
      <div>
        <main>{children}</main>
              <Toaster position="top-right" />
      </div>
        <Footer />
    </div>
  );
}
