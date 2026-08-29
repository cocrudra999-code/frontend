import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import YouTubeInput from './components/YouTubeInput';
import ScriptInput from './components/ScriptInput';
import LoadingSpinner from './components/LoadingSpinner';
import SEOResults from './components/SEOResults';
import { generateYouTubeSEO, generateScriptSEO } from './api/seoApi';

function App() {
  const [activeTab, setActiveTab] = useState('youtube');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setResults(null);
    setError(null);
  };

  const handleYouTubeGenerate = async (url) => {
    setIsLoading(true);
    setResults(null);
    setError(null);

    try {
      const response = await generateYouTubeSEO(url);
      if (response.success) {
        setResults(response.data);
      } else {
        setError(response.error || 'Something went wrong.');
      }
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || 'Failed to connect to server.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScriptGenerate = async (script) => {
    setIsLoading(true);
    setResults(null);
    setError(null);

    try {
      const response = await generateScriptSEO(script);
      if (response.success) {
        setResults(response.data);
      } else {
        setError(response.error || 'Something went wrong.');
      }
    } catch (err) {
      const message =
        err.response?.data?.error || err.message || 'Failed to connect to server.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      {/* Animated Background Orbs */}
      <div className="bg-orbs">
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
        <div className="bg-orb"></div>
      </div>

      <main className="app-container">
        <Header activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Input Section */}
        {activeTab === 'youtube' ? (
          <YouTubeInput onGenerate={handleYouTubeGenerate} isLoading={isLoading} />
        ) : (
          <ScriptInput onGenerate={handleScriptGenerate} isLoading={isLoading} />
        )}

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && <LoadingSpinner type={activeTab} />}

        {/* Results */}
        {!isLoading && results && <SEOResults data={results} />}
      </main>
    </div>
  );
}

export default App;
