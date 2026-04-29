import React from 'react';

interface VitallyLogoProps {
    className?: string;
    color?: string;
}

export const VitallyLogo: React.FC<VitallyLogoProps> = ({
    className = "",
    color = "currentColor"
}) => {
    return (
        <svg
            viewBox="0 0 300 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ width: '100%', height: '100%', transform: 'scale(1.8)' }}
        >
            {/* Heart/leaf icon */}
            <g transform="translate(150, 30)">
                <path
                    d="M 0 14 C -2 9, -5 3, -11 -2 C -17 -7, -24 -7, -24 -2 C -24 5, -17 13, -9 17 C -5 20, -2 20, 0 18"
                    fill={color}
                />
                <path
                    d="M 0 14 C 2 9, 5 3, 11 -2 C 17 -7, 24 -7, 24 -2 C 24 5, 17 13, 9 17 C 5 20, 2 20, 0 18"
                    fill={color}
                />
            </g>

            {/* "vitally" text — tight viewBox for max legibility */}
            <text
                x="150"
                y="88"
                fill={color}
                fontFamily="'Playfair Display', 'Georgia', serif"
                fontSize="48"
                fontWeight="700"
                letterSpacing="1"
                textAnchor="middle"
            >
                vitally
            </text>
        </svg>
    );
};
