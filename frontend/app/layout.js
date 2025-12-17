
import "./globals.css";

export const metadata = {
  title: "FastAPI CRUD Frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}
