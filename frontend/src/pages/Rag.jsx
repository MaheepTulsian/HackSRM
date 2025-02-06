import React, { useState } from 'react';
import PdfViewer from '../components/PdfViewer';

function QueryComponent() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [summary, setSummary] = useState('');
  const [detailedExplanation, setDetailedExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isExplaining, setIsExplaining] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setResponse('');
    setSummary('');
    setDetailedExplanation('');

    try {
      const res = await fetch('http://127.0.0.1:8000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: query }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.response.tasks_output[0].raw);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse('An error occurred while fetching data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSummarize = async (event) => {
    event.preventDefault();
    setIsSummarizing(true);
    setSummary('');

    try {
      const res = await fetch('http://127.0.0.1:8000/summerize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: `Summarize the following: ${query}` }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setSummary(data.response.tasks_output[0].raw);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSummary('An error occurred while fetching data.');
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleExplain = async (event) => {
    event.preventDefault();
    setIsExplaining(true);
    setDetailedExplanation('');

    try {
      const res = await fetch('http://127.0.0.1:8000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: query }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setDetailedExplanation(data.response.tasks_output[0].raw);
    } catch (error) {
      console.error('Error fetching data:', error);
      setDetailedExplanation('An error occurred while fetching data.');
    } finally {
      setIsExplaining(false);
    }
  };

  return (
    <div className="flex max-w-full p-4">
      {/* Left side: PDF viewer */}
      <div className="w-2/3 p-2">
        <PdfViewer pdfUrl="https://files.catbox.moe/9paxb6.pdf" />
      </div>

      {/* Right side: Query form */}
      <div className="w-1/3 p-2">
        <form onSubmit={handleSubmit} className="">
          <label htmlFor="query" className="block text-sm font-medium ">
            Enter your query:
          </label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 
               text-gray-900 bg-white 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
               transition duration-200 ease-in-out hover:border-gray-400"
            required
          />
          <button
            type="submit"
            className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Extract Information'}
          </button>
        </form>

        <button
          onClick={handleSummarize}
          className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          disabled={isSummarizing}
        >
          {isSummarizing ? 'Summarizing...' : 'Summarize'}
        </button>

        <button
          onClick={handleExplain}
          className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          disabled={isExplaining}
        >
          {isExplaining ? 'Explaining...' : 'Explain in Detail'}
        </button>

        {response && (
          <div className="p-4 border border-gray-300 rounded-md mt-4">
            <h2 className="text-lg font-medium ">Response:</h2>
            <pre
              className="mt-2 text-sm  whitespace-pre-wrap overflow-y-auto"
              style={{ maxHeight: '500px' }} // Fixed height for scrollable area
            >
              {response}
            </pre>
          </div>
        )}

        {summary && (
          <div className="p-4 border border-gray-300 rounded-md mt-4">
            <h2 className="text-lg font-medium ">Summary:</h2>
            <pre
              className="mt-2 text-sm whitespace-pre-wrap overflow-y-auto"
              style={{ maxHeight: '500px' }} // Fixed height for scrollable area
            >
              {summary}
            </pre>
          </div>
        )}

        {detailedExplanation && (
          <div className="p-4 border border-gray-300 rounded-md mt-4">
            <h2 className="text-lg font-medium ">Detailed Explanation:</h2>
            <pre
              className="mt-2 text-sm whitespace-pre-wrap overflow-y-auto"
              style={{ maxHeight: '500px' }} // Fixed height for scrollable area
            >
              {detailedExplanation}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default QueryComponent;
