import { CartProvider } from '@/context/CartContext';
import './globals.css';

export const metadata = {
  title: 'Catálogo Online',
  description: 'Catálogo de productos premium',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
