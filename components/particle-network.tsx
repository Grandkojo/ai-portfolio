"use client";

import { useEffect, useRef } from "react";

export function ParticleNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const particles: Particle[] = [];
        const properties = {
            bgColor: "rgba(5, 1, 23, 1)", // Match --background #050117
            particleColor: "rgba(123, 44, 191, 0.5)", // Match --primary #7b2cbf
            particleRadius: 3,
            particleCount: 60,
            lineLength: 150,
            particleVelocity: 0.5,
        };

        class Particle {
            x: number;
            y: number;
            velocityX: number;
            velocityY: number;

            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.velocityX = Math.random() * (properties.particleVelocity * 2) - properties.particleVelocity;
                this.velocityY = Math.random() * (properties.particleVelocity * 2) - properties.particleVelocity;
            }

            position() {
                this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0
                    ? (this.velocityX *= -1)
                    : this.velocityX;
                this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0
                    ? (this.velocityY *= -1)
                    : this.velocityY;
                this.x += this.velocityX;
                this.y += this.velocityY;
            }

            reDraw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = properties.particleColor;
                ctx.fill();
            }
        }

        function reDrawBackground() {
            if (!ctx) return;
            ctx.fillStyle = properties.bgColor;
            ctx.fillRect(0, 0, w, h);
        }

        function drawLines() {
            if (!ctx) return;
            let x1, y1, x2, y2, length, opacity;
            for (let i = 0; i < particles.length; i++) {
                for (let j = 0; j < particles.length; j++) {
                    x1 = particles[i].x;
                    y1 = particles[i].y;
                    x2 = particles[j].x;
                    y2 = particles[j].y;
                    length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    if (length < properties.lineLength) {
                        opacity = 1 - length / properties.lineLength;
                        ctx.lineWidth = 0.5;
                        ctx.strokeStyle = `rgba(123, 44, 191, ${opacity})`;
                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.closePath();
                        ctx.stroke();
                    }
                }
            }
        }

        function reDrawParticles() {
            for (let i = 0; i < particles.length; i++) {
                particles[i].position();
                particles[i].reDraw();
            }
        }

        function loop() {
            reDrawBackground();
            reDrawParticles();
            drawLines();
            requestAnimationFrame(loop);
        }

        function init() {
            for (let i = 0; i < properties.particleCount; i++) {
                particles.push(new Particle());
            }
            loop();
        }

        init();

        const handleResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />;
}
