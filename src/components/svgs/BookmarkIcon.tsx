interface BookmarkIconProps {
    active?: boolean;
    className?: string;
}

export default function BookmarkIcon({ active = false, className = "" }: BookmarkIconProps) {
    return (
        <svg 
            width="32" 
            height="32" 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path 
                d="M8 8C8 6.89543 8.89543 6 10 6H22C23.1046 6 24 6.89543 24 8V26.5C24 27.3284 23.3284 28 22.5 28C22.1902 28 21.8889 27.893 21.65 27.7L16 23.0833L10.35 27.7C10.1111 27.893 9.80981 28 9.5 28C8.67157 28 8 27.3284 8 26.5V8Z" 
                stroke={active ? "#febe13" : "currentColor"} 
                fill="none"
                strokeWidth="1" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>
    );
} 