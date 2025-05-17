interface EyeIconProps {
    active?: boolean;
}

export default function EyeIcon({ active = false }: EyeIconProps) {
    return (
        <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" 
                fill={active ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle 
                cx="12" 
                cy="12" 
                r="3" 
                fill={active ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
} 