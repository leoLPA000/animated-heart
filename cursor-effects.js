// Efectos de cursor con partículas románticas
class CursorEffects {
    constructor() {
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.isTouch = false;
        this.container = document.getElementById('cursor-particles');
        this.customCursor = null;
        
        this.init();
    }
    
    init() {
        // Detectar si es dispositivo táctil
        this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (!this.isTouch) {
            // Para escritorio - crear cursor personalizado
            this.createCustomCursor();
            this.bindMouseEvents();
        } else {
            // Para móviles - usar eventos táctiles
            this.bindTouchEvents();
        }
        
        // Iniciar el loop de animación
        this.animate();
    }
    
    createCustomCursor() {
        this.customCursor = document.createElement('div');
        this.customCursor.className = 'custom-cursor';
        document.body.appendChild(this.customCursor);
    }
    
    bindMouseEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Actualizar cursor personalizado
            if (this.customCursor) {
                this.customCursor.style.left = (this.mouseX - 10) + 'px';
                this.customCursor.style.top = (this.mouseY - 10) + 'px';
            }
            
            // Crear partícula cada cierto movimiento
            if (Math.random() < 0.7) { // 70% de probabilidad
                this.createParticle(this.mouseX, this.mouseY);
            }
        });
        
        document.addEventListener('mousedown', () => {
            if (this.customCursor) {
                this.customCursor.classList.add('clicking');
            }
            // Crear ráfaga de partículas al hacer clic
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    this.createParticle(
                        this.mouseX + (Math.random() - 0.5) * 20,
                        this.mouseY + (Math.random() - 0.5) * 20
                    );
                }, i * 50);
            }
        });
        
        document.addEventListener('mouseup', () => {
            if (this.customCursor) {
                this.customCursor.classList.remove('clicking');
            }
        });
    }
    
    bindTouchEvents() {
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.mouseX = touch.clientX;
            this.mouseY = touch.clientY;
            
            // Crear partícula en cada movimiento táctil
            this.createParticle(this.mouseX, this.mouseY);
        }, { passive: false });
        
        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            this.mouseX = touch.clientX;
            this.mouseY = touch.clientY;
            
            // Crear partículas al tocar
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    this.createParticle(
                        this.mouseX + (Math.random() - 0.5) * 15,
                        this.mouseY + (Math.random() - 0.5) * 15
                    );
                }, i * 30);
            }
        });
    }
    
    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        
        // Tipos de partículas románticas
        const types = ['heart', 'sparkle', 'bubble', 'star'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        
        particle.classList.add(randomType);
        
        // Contenido según el tipo
        if (randomType === 'heart') {
            const hearts = ['💕', '💖', '💗', '💝', '💘', '❤️', '💙', '💜'];
            particle.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            particle.style.fontSize = (Math.random() * 8 + 8) + 'px';
        }
        
        // Posición inicial
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // Variaciones aleatorias
        const randomDelay = Math.random() * 200;
        const randomDuration = 800 + Math.random() * 400;
        const randomDirection = (Math.random() - 0.5) * 60;
        
        particle.style.animationDelay = randomDelay + 'ms';
        particle.style.animationDuration = randomDuration + 'ms';
        
        // Añadir movimiento lateral aleatorio
        particle.style.setProperty('--random-x', randomDirection + 'px');
        
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            birthTime: Date.now(),
            duration: randomDuration + randomDelay
        });
        
        // Eliminar partícula después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, randomDuration + randomDelay);
    }
    
    animate() {
        // Limpiar partículas viejas
        const now = Date.now();
        this.particles = this.particles.filter(particle => {
            if (now - particle.birthTime > particle.duration) {
                if (particle.element.parentNode) {
                    particle.element.parentNode.removeChild(particle.element);
                }
                return false;
            }
            return true;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Efectos adicionales para mejorar la experiencia
class RomanticEnhancements {
    constructor() {
        this.addHoverEffects();
        this.addClickRipples();
    }
    
    addHoverEffects() {
        // Efecto especial cuando el cursor está sobre el mensaje
        const message = document.querySelector('.message');
        if (message) {
            message.addEventListener('mouseenter', () => {
                message.style.transform = 'translate(-50%, -50%) scale(1.05)';
                message.style.textShadow = '0 0 20px #FFB6C1, 2px 2px 4px rgba(139, 0, 0, 0.8)';
            });
            
            message.addEventListener('mouseleave', () => {
                message.style.transform = 'translate(-50%, -50%) scale(1)';
                message.style.textShadow = '2px 2px 4px rgba(139, 0, 0, 0.8)';
            });
        }
    }
    
    addClickRipples() {
        document.addEventListener('click', (e) => {
            // Prevenir selección de texto
            e.preventDefault();
            
            // Crear efecto de ondas al hacer clic
            const ripple = document.createElement('div');
            ripple.style.position = 'fixed';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            ripple.style.width = '0px';
            ripple.style.height = '0px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'radial-gradient(circle, rgba(255, 182, 193, 0.4), transparent)';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '9998';
            ripple.style.animation = 'rippleEffect 0.6s ease-out forwards';
            ripple.style.userSelect = 'none';
            
            document.body.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
        
        // Prevenir selección en eventos de mouse
        document.addEventListener('selectstart', (e) => {
            e.preventDefault();
            return false;
        });
        
        document.addEventListener('dragstart', (e) => {
            e.preventDefault();
            return false;
        });
    }
}

// Inicializar efectos cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new CursorEffects();
        new RomanticEnhancements();
    });
} else {
    new CursorEffects();
    new RomanticEnhancements();
}