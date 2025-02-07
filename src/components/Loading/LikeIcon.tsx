export default function LikeIcon ({active}:{active?: boolean}) {
    return (
        <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15.6389 1.25961C15.0998 1.07977 14.5328 1.00014 13.9649 1.00014C12.5 1.00013 11.4999 1.74037 10.5 2.49999C9.51763 1.75124 8.5 1.00014 7.05296 1.00014C6.49669 1.00014 5.91614 1.06007 5.38887 1.24083C2.03101 2.33329 0.834022 5.95694 1.85101 9.12429C2.42701 10.7429 3.3549 12.2111 4.56088 13.4181C6.37741 15.1601 8.35555 16.6798 10.5 18C12.6404 16.7147 14.6547 15.1552 16.4498 13.427C17.6638 12.22 18.5908 10.7429 19.1578 9.12429C20.1577 5.95694 18.9607 2.33329 15.6389 1.25961Z"
                stroke={active ? "#febb12" : 'white'} strokeWidth="1.5" fill={active ? "#febb12" : "transparent"}/>
        </svg>

    )
}
