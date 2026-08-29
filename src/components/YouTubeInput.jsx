import { useState } from 'react';

export default function YouTubeInput({ onGenerate, isLoading }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim() && !isLoading) {
      onGenerate(url.trim());
    }
  };

  return (
    <div className="input-section">
      <div className="glass-card">
        <form onSubmit={handleSubmit}>
          <label className="input-label" htmlFor="youtube-url-input">
            YouTube Video URL
          </label>
          <div className="url-input-wrapper">
            <span className="url-input-icon">🔗</span>
            <input
              id="youtube-url-input"
              type="url"
              className="url-input"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button
            id="generate-youtube-btn"
            type="submit"
            className="generate-btn"
            disabled={!url.trim() || isLoading}
          >
            {isLoading ? (
              <>Analyzing Video...</>
            ) : (
              <>
                <span className="generate-btn-icon">⚡</span>
                Generate SEO
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
