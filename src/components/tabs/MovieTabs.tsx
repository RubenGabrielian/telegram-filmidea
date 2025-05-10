import './movieTabs.css';
import HeartIcon from '../svgs/HeartIcon';
import EyeIcon from '../svgs/EyeIcon';

interface MovieTabsProps {
    onTabChange: (tab: 'liked' | 'watched') => void;
    activeTab: 'liked' | 'watched';
}

export default function MovieTabs({ onTabChange, activeTab }: MovieTabsProps) {
    return (
        <div className="movie-tabs">
            <div className="tabs-container">
                <button 
                    className={`tab ${activeTab === 'liked' ? 'active' : ''}`}
                    onClick={() => onTabChange('liked')}
                >
                    <HeartIcon active={activeTab === 'liked'} />
                    <span>Liked</span>
                </button>
                <button 
                    className={`tab ${activeTab === 'watched' ? 'active' : ''}`}
                    onClick={() => onTabChange('watched')}
                >
                    <EyeIcon active={activeTab === 'watched'} />
                    <span>Watched</span>
                </button>
            </div>
        </div>
    );
} 