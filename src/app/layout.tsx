import { Analytics } from "@vercel/analytics/next"
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Analytics/>
      <body className={`${inter.className} ${montserrat.className}`}>
        {children}
      </body>
    </html>
  );
}