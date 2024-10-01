import {RotatingLines} from "react-loader-spinner";

export default function Loading () {
    return (
        <div className="loading">
            <RotatingLines
                visible={true}
                width="96"
                strokeWidth="2"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                strokeColor={'white'}
            />
        </div>
    )
}
