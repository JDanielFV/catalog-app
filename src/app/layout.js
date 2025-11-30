
import './globals.css';

export const metadata = {
  title: 'Catálogo Online',
  description: 'Catálogo de productos premium',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
