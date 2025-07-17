"use client";

import React, { useRef, useEffect } from 'react';
const CircuitBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Fonction pour ajuster la taille du canvas à la fenêtre
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    // Appeler la fonction de redimensionnement au début
    resizeCanvas();

    // ✅ CORRIGÉ: Initialisation en tant que tableau vide
    let particles = [];
    // Le nombre de particules est maintenant calculé dans init()
    let particleCount = 0;

    // Classe pour représenter une particule (un point de "courant")
    class Particle {
      constructor() {
        // Position de départ aléatoire
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Vitesse et direction initiales aléatoires
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        // Durée de vie
        this.life = 0;
        this.maxLife = Math.random() * 200 + 150;
        // ✅ CORRIGÉ: Initialisation de l'historique en tant que tableau vide
        this.history = [];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        // Changement de direction à angle droit de manière aléatoire
        if (Math.random() < 0.02) {
          const isHorizontal = Math.random() < 0.5;
          this.vx = isHorizontal ? (Math.random() - 0.5) * 0.7 : 0;
          this.vy = isHorizontal ? 0 : (Math.random() - 0.5) * 0.7;
        }
        
        // Garder un historique des positions pour tracer la ligne
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > 25) {
          this.history.shift();
        }

        // ✅ CORRIGÉ: Utilisation de l'opérateur logique OU (||)
        // Réinitialiser la particule si elle sort de l'écran ou si sa vie est terminée
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height || this.life > this.maxLife) {
          this.reset();
        }
      }

      draw() {
        // Ne rien dessiner si l'historique est trop court
        if (this.history.length < 2) return;

        ctx.beginPath();
        // ✅ CORRIGÉ: Démarrer le tracé au premier point de l'historique
        ctx.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 1; i < this.history.length; i++) {
          ctx.lineTo(this.history[i].x, this.history[i].y);
        }
        ctx.lineWidth = 1;
        // La ligne devient plus brillante au fur et à mesure de sa vie
        ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 + (this.life / this.maxLife) * 0.5})`;
        ctx.stroke();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.life = 0;
        // ✅ CORRIGÉ: Réinitialisation de l'historique
        this.history = [];
      }
    }

    function init() {
      // ✅ CORRIGÉ: Réinitialisation en tant que tableau vide
      particles = [];
      // Calcule le nombre de particules en fonction de la taille de l'écran
      particleCount = Math.floor((canvas.width * canvas.height) / 25000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      // Effet de traînée pour estomper les anciens tracés et créer un effet de phosphorescence
      ctx.fillStyle = 'rgba(2, 16, 39, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = window.requestAnimationFrame(animate);
    }

    // Initialiser et démarrer l'animation
    init();
    animate();

    // Gérer le redimensionnement de la fenêtre
    const handleResize = () => {
      resizeCanvas();
      init(); // Réinitialiser l'animation avec la nouvelle taille
    };

    window.addEventListener('resize', handleResize);

    // Nettoyage au démontage du composant
    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []); // ✅ CORRIGÉ: Le tableau de dépendances vide assure que l'effet ne s'exécute qu'une fois au montage

 return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          background: '#021027'
        }}
      />
      <img
        src="/assets/img/robo_bg.png"
        alt="AutoPredict Robot"
        style={{
          position: 'fixed',
          bottom: '0px',
          right: '0px',
          width: '450px',       // Largeur de l'image
          maxWidth: '30%',      // Assure qu'elle n'est pas trop large sur petits écrans
          height: 'auto',
          zIndex: -1,           // Garde l'image en arrière-plan
          pointerEvents: 'none' // Empêche l'image de capturer les clics
        }}
      />
    </>
  );
};

export default CircuitBackground;