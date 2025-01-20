export default function HomeIcon({active}:{active?:boolean}) {
    return (
        <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.8593 3.31124L4.57093 8.21124C3.52093 9.02791 2.66927 10.7662 2.66927 12.0846V20.7296C2.66927 23.4362 4.87427 25.6529 7.58093 25.6529H21.0909C23.7976 25.6529 26.0026 23.4362 26.0026 20.7412V12.2479C26.0026 10.8362 25.0576 9.02791 23.9026 8.22291L16.6926 3.17124C15.0593 2.02791 12.4343 2.08624 10.8593 3.31124Z"
                stroke={active ? '#FEBB12' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.1302 17C9.70331 18.7252 11.7246 20 14.1302 20C16.5358 20 18.5571 18.7252 19.1302 17"
                  stroke={active ? '#FEBB12' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )
}
