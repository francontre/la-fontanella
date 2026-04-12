// ============================================
// LA FONTANELLA - FUNCIONES JAVASCRIPT
// ============================================

// Menú móvil
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Cerrar menú al hacer clic en un enlace (móvil)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    }
});

// Galería - Filtros
function filtrar(categoria) {
    const items = document.querySelectorAll('.galeria-item');
    const botones = document.querySelectorAll('.filtro-btn');
    
    // Actualizar botones activos
    botones.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(categoria) || 
            (categoria === 'todos' && btn.textContent === 'Todos')) {
            btn.classList.add('active');
        }
    });
    
    // Filtrar items
    items.forEach(item => {
        if (categoria === 'todos' || item.dataset.categoria === categoria) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Galería - Lightbox
document.querySelectorAll('.galeria-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.galeria-overlay span');
        
        document.getElementById('lightbox-img').src = img.src;
        document.getElementById('lightbox-caption').textContent = overlay ? overlay.textContent : '';
        document.getElementById('lightbox').classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function cerrarLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Cerrar lightbox con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        cerrarLightbox();
    }
});

// Formulario de reserva
function enviarReserva(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const personas = document.getElementById('personas').value;
    const notas = document.getElementById('notas').value;
    
    // Crear mensaje para WhatsApp
    const mensaje = `Hola, quiero hacer una reserva en La Fontanella:%0A%0A` +
                   `*Nombre:* ${nombre}%0A` +
                   `*Teléfono:* ${telefono}%0A` +
                   `*Fecha:* ${fecha}%0A` +
                   `*Hora:* ${hora}%0A` +
                   `*Personas:* ${personas}%0A` +
                   `*Notas:* ${notas || 'Ninguna'}`;
    
    // Abrir WhatsApp
    window.open(`https://wa.me/34600123456?text=${mensaje}`, '_blank');
    
    // Mostrar confirmación
    alert('Te estamos redirigiendo a WhatsApp para confirmar tu reserva. ¡Gracias!');
    
    return false;
}

// Establecer fecha mínima (hoy) en el formulario
document.addEventListener('DOMContentLoaded', () => {
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        const hoy = new Date().toISOString().split('T')[0];
        fechaInput.setAttribute('min', hoy);
    }
    
    // Animación de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar tarjetas
    document.querySelectorAll('.plato-card, .menu-item, .valor, .testimonio').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});