import React from 'react';

interface AquaxelaLogoProps {
    className?: string;
}

export const AquaxelaLogo: React.FC<AquaxelaLogoProps> = ({
    className = "",
}) => {
    const logoPath = "/aquaxela.png";

    return (
        <img
            src={logoPath}
            alt="AquaXela Logo"
            className={`w-full h-full object-contain scale-[0.8] filter brightness-0 invert opacity-30 hover:opacity-60 transition-opacity ${className}`}
        />
    );
};
