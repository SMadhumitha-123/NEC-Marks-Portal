import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
  );
}
