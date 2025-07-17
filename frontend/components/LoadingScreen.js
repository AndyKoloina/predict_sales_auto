// components/CreativeLoadingScreen.js

'use client';
import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  // Le texte à "décoder"
  const targetText = "AUTO PREDICT";
  const [text, setText] = useState("");

  useEffect(() => {
    let interval = null;
    let iteration = 0;
    const chars = "AZERTYUIOPQSDFGHJKLMWXCVBN0123456789";

    // On efface l'ancien intervalle s'il existe
    clearInterval(interval);

    interval = setInterval(() => {
      // Pour chaque lettre du mot cible...
      setText(
        targetText
          .split("")
          .map((letter, index) => {
            // Si l'index de la lettre est déjà passé, on affiche la bonne lettre
            if(index < iteration) {
              return targetText[index];
            }
            // Sinon, on affiche un caractère aléatoire pour l'effet de "glitch"
            if (letter === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      );

      // Arrête l'animation une fois que tout le mot est révélé
      if(iteration >= targetText.length){
        clearInterval(interval);
      }

      // Vitesse à laquelle les lettres se "fixent"
      iteration += 1 / 3;
    }, 40); // Vitesse du "glitch" (en ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-slate-950 overflow-hidden">
      <h1
        className="font-mono text-2xl md:text-4xl lg:text-5xl text-cyan-300 tracking-widest"
        style={{ textShadow: '0 0 5px rgba(0, 255, 255, 0.4), 0 0 10px rgba(0, 255, 255, 0.3)' }}
      >
        {text}
      </h1>
    </div>
  );
};

export default LoadingScreen;