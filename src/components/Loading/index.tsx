import './loading.css';

export default function Loading() {
    return (
        <div className="loading-container">
            <div className="loading-circle">
                <div className="loading-circle-inner"></div>
            </div>
            <div className="loading-text">Loading...</div>
        </div>
    );
}
