export default function SearchIcon ({active}:{active?:boolean}) {
    return (
        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14.0834 24.5C20.2045 24.5 25.1667 19.5378 25.1667 13.4167C25.1667 7.29552 20.2045 2.33334 14.0834 2.33334C7.96222 2.33334 3.00005 7.29552 3.00005 13.4167C3.00005 19.5378 7.96222 24.5 14.0834 24.5Z"
                stroke={active ? "#FEBB12" : "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M26.3334 25.6667L24 23.3333" stroke={active ? "#FEBB12" : "white"} strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    )
}
