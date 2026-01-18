import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
