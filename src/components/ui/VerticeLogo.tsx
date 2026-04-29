import React from 'react';

interface VerticeLogoProps {
    className?: string;
}

export const VerticeLogo: React.FC<VerticeLogoProps> = ({
    className = "",
}) => {
    // Para tener un calco EXACTO del logo, usaremos una imagen real del logo 
    // con fondo transparente.
    // 
    // PASO REQUERIDO: 
    // 1. Recorta el fondo blanco del logo de Vértice que me enviaste.
    // 2. Guárdalo como PNG transparente.
    // 3. Coloca ese archivo en la carpeta "public/" de tu proyecto.
    // 4. Nómbralo "vertice-logo.png".
    const logoPath = "/vertice-logo.png";

    // Usamos el mismo truco de CSS "mask-image" que te expliqué antes. 
    // Esto toma la forma EXACTA de tu PNG (el triángulo, las letras y el subtítulo) 
    // y lo rellena dinámicamente con el color neutral/blanco del carrusel.
    return (
        <img
            src={logoPath}
            alt="Vértice Logo"
            className={`w-full h-full object-contain filter brightness-0 invert opacity-30 hover:opacity-60 transition-opacity ${className}`}
        />
    );
};
