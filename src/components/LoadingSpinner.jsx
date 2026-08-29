export default function LoadingSpinner({ type }) {
  return (
    <div className="loading-container">
      <div className="spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="loading-text">
        {type === 'youtube'
          ? 'Analyzing video & generating SEO...'
          : 'Analyzing script & generating SEO...'}
      </p>
      <p className="loading-subtext">
        This may take 10-15 seconds
      </p>
    </div>
  );
}
