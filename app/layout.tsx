import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Problem Coffin', description: 'Find problems worth bringing back to life.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
