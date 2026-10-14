import type { Metadata } from 'next';
import './style.css';
export const metadata: Metadata = { title: 'Sajan Sajan — OLED Lyrics Edit', description: 'A Gotham-inspired software OLED lyrics visualizer' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
