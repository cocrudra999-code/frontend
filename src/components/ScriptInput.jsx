import { useState } from 'react';

export default function ScriptInput({ onGenerate, isLoading }) {
  const [script, setScript] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (script.trim().length >= 20 && !isLoading) {
      onGenerate(script.trim());
    }
  };

  return (
    <div className="input-section">
      <div className="glass-card">
        <form onSubmit={handleSubmit}>
          <label className="input-label" htmlFor="script-textarea">
            Paste Your Video Script
          </label>
          <textarea
            id="script-textarea"
            className="script-textarea"
            placeholder="Paste your video script here...&#10;&#10;Example: Today I'm going to show you how to build a React application using Vite. We'll cover component architecture, state management, and deployment..."
            value={script}
            onChange={(e) => setScript(e.target.value)}
            disabled={isLoading}
          />
          <div className="char-count">
            {script.length} characters
            {script.trim().length > 0 && script.trim().length < 20 && (
              <span style={{ color: '#f87171', marginLeft: '0.5rem' }}>
                (min 20 characters)
              </span>
            )}
          </div>
          <button
            id="generate-script-btn"
            type="submit"
            className="generate-btn"
            disabled={script.trim().length < 20 || isLoading}
          >
            {isLoading ? (
              <>Analyzing Script...</>
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
