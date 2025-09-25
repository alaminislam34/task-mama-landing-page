import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Header/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import "./globals.css";
import Providers from "@/context/SessionProvider";
import { CourseProvider } from "@/context/CourseContext";

export const metadata = {
  title: "TaskMama",
  description: "Less chaos. More breathing room Meet TaskMama",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <CourseProvider>
            <Navbar />
            {children}
            <Footer />
            <ScrollToTop />
            <ToastContainer position="top-right" autoClose={1500} />
          </CourseProvider>
        </Providers>
      </body>
    </html>
  );
}
