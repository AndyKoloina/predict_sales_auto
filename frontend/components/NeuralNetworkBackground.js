'use client';

import React, { useRef, useEffect } from 'react';

const NeuralNetworkBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();

        // --- Configuration du réseau ---
        const LAYER_CONFIG = [5, 7, 7, 5]; // Nombre de neurones dans chaque couche
        const NEURON_RADIUS = 3;
        const CONNECTION_COLOR = 'rgba(0, 255, 255, 0.1)';
        const NEURON_COLOR = 'rgba(0, 255, 255, 0.7)';
        const NEURON_GLOW_COLOR = 'rgba(0, 255, 255, 0.2)';
        const SIGNAL_COLOR = 'rgba(255, 255, 255, 1)';
        const SIGNAL_SPEED = 0.025; // progression par frame
        const SIGNAL_SPAWN_PROBABILITY = 0.04; // Chance de créer un nouveau signal à chaque frame

        let layers = [];
        let signals = [];

        // --- Classes pour les éléments du réseau ---
        class Neuron {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.radius = NEURON_RADIUS;
            }

            draw() {
                // Dessine l'auréole lumineuse
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3);
                gradient.addColorStop(0, NEURON_GLOW_COLOR);
                gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
                ctx.fillStyle = gradient;
                ctx.fill();

                // Dessine le coeur du neurone
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = NEURON_COLOR;
                ctx.fill();
            }
        }

        class Signal {
            constructor(startNeuron, endNeuron) {
                this.start = startNeuron;
                this.end = endNeuron;
                this.progress = 0;
            }

            update() {
                this.progress += SIGNAL_SPEED;
                return this.progress < 1; // Retourne `false` quand le signal a atteint sa destination
            }

            draw() {
                const x = this.start.x + (this.end.x - this.start.x) * this.progress;
                const y = this.start.y + (this.end.y - this.start.y) * this.progress;

                ctx.beginPath();
                ctx.arc(x, y, NEURON_RADIUS / 1.5, 0, Math.PI * 2);
                ctx.fillStyle = SIGNAL_COLOR;
                ctx.shadowBlur = 5;
                ctx.shadowColor = SIGNAL_COLOR;
                ctx.fill();
                ctx.shadowBlur = 0; // Réinitialiser l'ombre
            }
        }

        // --- Fonctions d'initialisation et d'animation ---
        function init() {
            layers = [];
            signals = [];
            const layerCount = LAYER_CONFIG.length;
            const layerSpacing = canvas.width / (layerCount + 1);

            LAYER_CONFIG.forEach((neuronCount, i) => {
                const layer = [];
                const x = layerSpacing * (i + 1);
                const neuronSpacing = canvas.height / (neuronCount + 1);
                for (let j = 0; j < neuronCount; j++) {
                    const y = neuronSpacing * (j + 1);
                    layer.push(new Neuron(x, y));
                }
                layers.push(layer);
            });
        }

        function animate() {
            ctx.fillStyle = 'rgba(2, 16, 39, 0.15)'; // Effet de fondu pour créer des traînées
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Dessine les connexions statiques entre les neurones
            ctx.strokeStyle = CONNECTION_COLOR;
            ctx.lineWidth = 0.5;
            for (let i = 0; i < layers.length - 1; i++) {
                for (const startNeuron of layers[i]) {
                    for (const endNeuron of layers[i + 1]) {
                        ctx.beginPath();
                        ctx.moveTo(startNeuron.x, startNeuron.y);
                        ctx.lineTo(endNeuron.x, endNeuron.y);
                        ctx.stroke();
                    }
                }
            }

            // Dessine les neurones
            layers.forEach(layer => layer.forEach(neuron => neuron.draw()));

            // Crée de nouveaux signaux de manière aléatoire
            if (Math.random() < SIGNAL_SPAWN_PROBABILITY && signals.length < 100) {
                const startLayerIndex = Math.floor(Math.random() * (layers.length - 1));
                const endLayerIndex = startLayerIndex + 1;

                const startNeuronIndex = Math.floor(Math.random() * layers[startLayerIndex].length);
                const endNeuronIndex = Math.floor(Math.random() * layers[endLayerIndex].length);

                signals.push(new Signal(layers[startLayerIndex][startNeuronIndex], layers[endLayerIndex][endNeuronIndex]));
            }

            // Met à jour et dessine les signaux, et supprime ceux qui sont arrivés
            signals = signals.filter(signal => {
                const alive = signal.update();
                if (alive) {
                    signal.draw();
                }
                return alive;
            });

            animationFrameId = window.requestAnimationFrame(animate);
        }

        // --- Lancement et gestion des événements ---
        init();
        animate();

        const handleResize = () => {
            resizeCanvas();
            init();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                background: '#021027', // Un fond bleu très sombre
            }}
        />
    );
};

export default NeuralNetworkBackground;

