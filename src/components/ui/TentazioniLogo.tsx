import React from 'react';

interface TentazioniLogoProps {
    className?: string;
}

export const TentazioniLogo: React.FC<TentazioniLogoProps> = ({
    className = "",
}) => {
    const logoPath = "/tentazioni.png";

    return (
        <img
            src={logoPath}
            alt="Tentazioni Logo"
            className={`w-full h-full object-contain scale-[0.85] filter brightness-0 invert opacity-30 hover:opacity-60 transition-opacity ${className}`}
        />
    );
};
