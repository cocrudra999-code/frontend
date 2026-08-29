import { useState, useCallback } from 'react';

/**
 * Hook to copy text with feedback.
 */
function useCopy() {
  const [copiedKey, setCopiedKey] = useState(null);

  const copy = useCallback(async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  }, []);

  return { copiedKey, copy };
}

/**
 * Circular SVG score gauge.
 */
function ScoreGauge({ score }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Color based on score
  let color;
  if (score >= 80) color = '#22c55e';
  else if (score >= 60) color = '#00d4ff';
  else if (score >= 40) color = '#f59e0b';
  else color = '#ef4444';

  return (
    <div className="score-gauge">
      <svg viewBox="0 0 64 64">
        <circle className="score-bg-circle" cx="32" cy="32" r={radius} />
        <circle
          className="score-fg-circle"
          cx="32"
          cy="32"
          r={radius}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="score-value">{score}</div>
    </div>
  );
}

export default function SEOResults({ data }) {
  const { copiedKey, copy } = useCopy();

  if (!data) return null;

  const {
    hashtags = [],
    relatedHashtags = [],
    keywords = [],
    longTailKeywords = [],
    titleSuggestions = [],
    seoScores = [],
    source,
    detectedTopic,
    detectedSubTopics = [],
  } = data;

  // Copy all hashtags
  const allHashtags = [...hashtags, ...relatedHashtags].join(' ');
  const allKeywords = keywords.join(', ');



  return (
    <div className="results-container">
      <div className="glass-card">
        <div className="results-header">
          <h2 className="results-title">
            <span className="results-title-icon">✨</span>
            SEO Results
          </h2>
        </div>

        {/* Video Info (YouTube mode only) */}
        {source && (
          <div className="video-preview">
            {source.thumbnail && (
              <img
                className="video-thumbnail"
                src={source.thumbnail}
                alt={source.title}
              />
            )}
            <div className="video-info">
              <h3>{source.title}</h3>
              {source.author && <p>Channel: {source.author}</p>}
              <div className="video-meta">
                {source.topic && <span>🎯 {source.topic}</span>}
                {source.hasTranscript && <span>📜 Transcript Analyzed</span>}
              </div>
            </div>
          </div>
        )}

        {/* Detected Topic (Script mode only) */}
        {detectedTopic && (
          <div className="detected-topic">
            <div className="detected-topic-label">Detected Topic</div>
            <div className="detected-topic-value">{detectedTopic}</div>
            {detectedSubTopics.length > 0 && (
              <div className="detected-subtopics">
                {detectedSubTopics.map((sub, i) => (
                  <span key={i} className="subtopic-chip">{sub}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Primary Hashtags */}
        {hashtags.length > 0 && (
          <div className="seo-section">
            <div className="seo-section-header">
              <div className="seo-section-title">
                <span className="section-icon">#️⃣</span>
                Primary Hashtags
              </div>
              <button
                className={`copy-section-btn ${copiedKey === 'primary' ? 'copied' : ''}`}
                onClick={() => copy(hashtags.join(' '), 'primary')}
              >
                {copiedKey === 'primary' ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>
            <div className="tags-grid">
              {hashtags.map((tag, i) => (
                <span
                  key={i}
                  className={`tag-pill tag-primary ${copiedKey === `tag-${tag}` ? 'tag-copied' : ''}`}
                  onClick={() => copy(tag, `tag-${tag}`)}
                  title="Click to copy"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Hashtags */}
        {relatedHashtags.length > 0 && (
          <div className="seo-section">
            <div className="seo-section-header">
              <div className="seo-section-title">
                <span className="section-icon">🔗</span>
                Related Hashtags
              </div>
              <button
                className={`copy-section-btn ${copiedKey === 'related' ? 'copied' : ''}`}
                onClick={() => copy(relatedHashtags.join(' '), 'related')}
              >
                {copiedKey === 'related' ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>
            <div className="tags-grid">
              {relatedHashtags.map((tag, i) => (
                <span
                  key={i}
                  className={`tag-pill tag-related ${copiedKey === `rtag-${tag}` ? 'tag-copied' : ''}`}
                  onClick={() => copy(tag, `rtag-${tag}`)}
                  title="Click to copy"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Keywords */}
        {keywords.length > 0 && (
          <div className="seo-section">
            <div className="seo-section-header">
              <div className="seo-section-title">
                <span className="section-icon">🔑</span>
                Keywords
              </div>
              <button
                className={`copy-section-btn ${copiedKey === 'keywords' ? 'copied' : ''}`}
                onClick={() => copy(allKeywords, 'keywords')}
              >
                {copiedKey === 'keywords' ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>
            <div className="tags-grid">
              {keywords.map((kw, i) => (
                <span
                  key={i}
                  className={`tag-pill tag-keyword ${copiedKey === `kw-${kw}` ? 'tag-copied' : ''}`}
                  onClick={() => copy(kw, `kw-${kw}`)}
                  title="Click to copy"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Long-Tail Keywords */}
        {longTailKeywords.length > 0 && (
          <div className="seo-section">
            <div className="seo-section-header">
              <div className="seo-section-title">
                <span className="section-icon">🎯</span>
                Long-Tail Keywords
              </div>
              <button
                className={`copy-section-btn ${copiedKey === 'longtail' ? 'copied' : ''}`}
                onClick={() => copy(longTailKeywords.join(', '), 'longtail')}
              >
                {copiedKey === 'longtail' ? '✓ Copied' : '📋 Copy'}
              </button>
            </div>
            <div className="tags-grid">
              {longTailKeywords.map((kw, i) => (
                <span
                  key={i}
                  className={`tag-pill tag-longtail ${copiedKey === `lt-${kw}` ? 'tag-copied' : ''}`}
                  onClick={() => copy(kw, `lt-${kw}`)}
                  title="Click to copy"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Title Suggestions */}
        {titleSuggestions.length > 0 && (
          <div className="seo-section">
            <div className="seo-section-header">
              <div className="seo-section-title">
                <span className="section-icon">💡</span>
                Title Suggestions
              </div>
            </div>
            <div className="title-suggestions">
              {titleSuggestions.map((title, i) => (
                <div key={i} className="title-suggestion-item">
                  <span className="title-text">{title}</span>
                  <button
                    className={`title-copy-btn ${copiedKey === `title-${i}` ? 'copied' : ''}`}
                    onClick={() => copy(title, `title-${i}`)}
                    title="Copy title"
                  >
                    {copiedKey === `title-${i}` ? '✓' : '📋'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Scores */}
        {seoScores.length > 0 && (
          <div className="seo-section">
            <div className="seo-section-header">
              <div className="seo-section-title">
                <span className="section-icon">📊</span>
                SEO Scores
              </div>
            </div>
            <div className="score-cards">
              {seoScores.map((score, i) => (
                <div key={i} className="score-card">
                  <ScoreGauge score={score.overall} />
                  <div className="score-tag">{score.tag}</div>
                  <div className="score-details">
                    <div className="score-detail">
                      <span className="score-detail-label">Relevance</span>
                      <span className="score-detail-value">{score.relevance}</span>
                    </div>
                    <div className="score-detail">
                      <span className="score-detail-label">Volume</span>
                      <span className="score-detail-value">{score.searchVolume}</span>
                    </div>
                    <div className="score-detail">
                      <span className="score-detail-label">Competition</span>
                      <span className="score-detail-value">{score.competition}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Copy All Bar */}
        <div className="copy-all-bar">
          <button
            className={`copy-all-btn ${copiedKey === 'all-hashtags' ? 'copied' : ''}`}
            onClick={() => copy(allHashtags, 'all-hashtags')}
          >
            {copiedKey === 'all-hashtags' ? '✓ Copied All Hashtags' : '📋 Copy All Hashtags'}
          </button>
          <button
            className={`copy-all-btn ${copiedKey === 'all-keywords' ? 'copied' : ''}`}
            onClick={() => copy(allKeywords, 'all-keywords')}
          >
            {copiedKey === 'all-keywords' ? '✓ Copied All Keywords' : '📋 Copy All Keywords'}
          </button>
        </div>
      </div>
    </div>
  );
}
