'use client';

import { useState } from 'react';
import { jsPDF } from 'jspdf';

import html2canvas from 'html2canvas';

// On définit le type des props que le composant attend
type DownloadButtonProps = {
  elementIdToCapture: string; // L'ID de l'élément HTML à capturer
};

export default function DownloadButton({ elementIdToCapture }: DownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPdf = async () => {
    // On cible le conteneur du dashboard par son ID
    const input = document.getElementById(elementIdToCapture);
    if (!input) {
        console.error("L'élément à capturer n'a pas été trouvé !");
        return;
    }

    setIsLoading(true);

    html2canvas(input, { 
        scale: 2, // Améliore la résolution de l'image
        backgroundColor: '#0d1117' // On s'assure que le fond est bien sombre
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('rapport-prediction-auto.pdf');
        setIsLoading(false);
      });
  };

  return (
    <button
        onClick={handleDownloadPdf}
        disabled={isLoading}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2 disabled:bg-slate-600"
    >
        {isLoading ? 'Génération...' : 'Télécharger en PDF'}
    </button>
  );
}