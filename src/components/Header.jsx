export default function Header({ activeTab, onTabChange }) {
  return (
    <header className="header">
      <div className="header-logo">
        <div className="header-icon">🚀</div>
        <h1>YouTube SEO Generator</h1>
      </div>
      <p>Generate powerful hashtags, keywords & SEO data for YouTube</p>

      <div className="tab-switcher">
        <button
          id="tab-youtube"
          className={`tab-btn ${activeTab === 'youtube' ? 'active' : ''}`}
          onClick={() => onTabChange('youtube')}
        >
          <span className="tab-btn-icon">▶️</span>
          YouTube URL
        </button>
        <button
          id="tab-script"
          className={`tab-btn ${activeTab === 'script' ? 'active' : ''}`}
          onClick={() => onTabChange('script')}
        >
          <span className="tab-btn-icon">📝</span>
          Video Script
        </button>
      </div>
    </header>
  );
}
