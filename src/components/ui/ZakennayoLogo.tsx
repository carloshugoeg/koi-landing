import React from 'react';

interface ZakennayoLogoProps {
    className?: string;
}

export const ZakennayoLogo: React.FC<ZakennayoLogoProps> = ({
    className = "",
}) => {
    const logoPath = "/zknny-logo.png";

    return (
        <img
            src={logoPath}
            alt="Zakennayo Logo"
            className={`w-full h-full object-contain scale-[2.2] filter brightness-0 invert opacity-30 hover:opacity-60 transition-opacity ${className}`}
        />
    );
};
