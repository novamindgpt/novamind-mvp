export const metadata = {
  title: "NovaMind",
  description: "Generador de ideas con IA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}