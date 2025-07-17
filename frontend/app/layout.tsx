'use client'; // On ajoute cette ligne pour pouvoir utiliser le state de React

import { useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import DocumentationSlideout from '../components/DocumentationSlideout';
import CircuitBackground from '../components/CircuitBackground';
const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  // Fonctions pour contrôler le panneau
  const openDocs = () => setIsDocsOpen(true);
  const closeDocs = () => setIsDocsOpen(false);

  return (
    <html lang="fr">
      <body className={`${inter.className} bg-slate-950 text-slate-200`} suppressHydrationWarning={true}>
        {/* On passe la fonction d'ouverture au Navbar */}
        <CircuitBackground />
        <Navbar onDocsClick={openDocs} />
        <main className="container mx-auto px-6 py-12">{children}</main>

        {/* On rend le panneau de documentation et on lui passe son état et sa fonction de fermeture */}
        <DocumentationSlideout isOpen={isDocsOpen} onClose={closeDocs} />
      </body>
    </html>
  );
}