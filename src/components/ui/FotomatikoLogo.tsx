import React from 'react';

interface FotomatikoLogoProps {
    className?: string;
}

export const FotomatikoLogo: React.FC<FotomatikoLogoProps> = ({
    className = "",
}) => {
    const logoPath = "/fotomatiko.png";

    return (
        <img
            src={logoPath}
            alt="Fotomatiko Logo"
            className={`w-full h-full object-contain filter grayscale opacity-30 hover:opacity-60 transition-opacity ${className}`}
        />
    );
};
