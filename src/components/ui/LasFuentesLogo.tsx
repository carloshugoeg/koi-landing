import React from 'react';

interface LasFuentesLogoProps {
    className?: string;
}

export const LasFuentesLogo: React.FC<LasFuentesLogoProps> = ({
    className = "",
}) => {
    const logoPath = "/lasfuentes.png";

    return (
        <img
            src={logoPath}
            alt="Las Fuentes Logo"
            className={`w-full h-full object-contain scale-[1.4] filter brightness-0 invert opacity-30 hover:opacity-60 transition-opacity ${className}`}
        />
    );
};
