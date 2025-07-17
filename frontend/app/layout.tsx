
'use client'; // Permet d'utiliser le state de React

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import DocumentationSlideout from '../components/DocumentationSlideout';
import CircuitBackground from '../components/CircuitBackground';

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({ children }: { children: React.ReactNode }) {
  // State pour le panneau de documentation
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  // Ouvre le panneau de documentation
  const openDocs = () => setIsDocsOpen(true);
  // Ferme le panneau de documentation
  const closeDocs = () => setIsDocsOpen(false);

  return (
    <html lang="fr">
      <body
        className={`${inter.className} bg-slate-950 text-slate-200`}
        suppressHydrationWarning={true}
      >
        {/* Fond visuel */}
        <CircuitBackground />

        {/* Barre de navigation avec bouton d'ouverture de la documentation */}
        <Navbar onDocsClick={openDocs} />

        {/* Contenu principal */}
        <main className="container mx-auto px-6 py-12">
          {children}
        </main>

        {/* Panneau latéral de documentation */}
        <DocumentationSlideout isOpen={isDocsOpen} onClose={closeDocs} />
      </body>
    </html>
  );
}