import { Inter } from "next/font/google";
import "./globals.css";
import 'dotenv/config';

// console.log("console log in layout",process.env.TAI_API_KEY);
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ProdGPT",
  description: "For product development",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
