import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Header/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import "./globals.css";
import { AuthProvider } from "@/context/SessionProvider";

export const metadata = {
  title: "TaskMama",
  description: "Less chaos. More breathing room Meet TaskMama",
  icons: {
    shortcut: "/favicon.ico", // Google + browser tab friendly
  },
  openGraph: {
    title: "TaskMama",
    description: "Less chaos. More breathing room Meet TaskMama",
    images: [
      {
        url: "/icons/favicon.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
          <ToastContainer position="top-right" autoClose={1500} />
        </AuthProvider>
      </body>
    </html>
  );
}
