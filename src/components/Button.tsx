export default function Button ({text,onclick}:{text:string, onclick:()=>void}) {
    return (
        <button onClick={onclick}>{text}</button>
    )
}
