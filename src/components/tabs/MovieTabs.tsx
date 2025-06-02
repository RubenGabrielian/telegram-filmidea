import './movieTabs.css';
import BookmarkIcon from '../svgs/BookmarkIcon';
import EyeIcon from '../svgs/EyeIcon';

interface MovieTabsProps {
    onTabChange: (tab: 'watchlist' | 'watched') => void;
    activeTab: 'watchlist' | 'watched';
}

export default function MovieTabs({ onTabChange, activeTab }: MovieTabsProps) {
    return (
        <div className="movie-tabs">
            <div className="tabs-container">
                <button 
                    className={`tab ${activeTab === 'watchlist' ? 'active' : ''}`}
                    onClick={() => onTabChange('watchlist')}
                >
                    <BookmarkIcon active={activeTab === 'watchlist'} />
                </button>
                <button 
                    className={`tab ${activeTab === 'watched' ? 'active' : ''}`}
                    onClick={() => onTabChange('watched')}
                >
                    <EyeIcon active={activeTab === 'watched'} />
                </button>
            </div>
        </div>
    );
} 