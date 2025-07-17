"use client";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import DocumentationSlideout from "../components/DocumentationSlideout";
import CircuitBackground from "../components/CircuitBackground";
import LoadingScreen from "@/components/LoadingScreen";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // State pour le panneau de documentation
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Ce minuteur simule un chargement de 2 secondes.
    // Dans une vraie application, vous pourriez attendre le chargement de données réelles.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2000 millisecondes = 2 secondes

    // Nettoyer le minuteur si le composant est démonté
    return () => clearTimeout(timer);
  }, []); // Le tableau vide assure que l'effet ne s'exécute qu'une fois au montage

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
        {/* ✅ AJOUT : Affichage conditionnel */}
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <CircuitBackground />
            <Navbar onDocsClick={openDocs} />
            <main className="container mx-auto px-6 py-12">{children}</main>
            <DocumentationSlideout isOpen={isDocsOpen} onClose={closeDocs} />
          </>
        )}
      </body>
    </html>
  );
}
