'use client';

import { useState } from 'react';

export default function Home() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const testEndpoint = async (endpoint: string, body: Record<string, unknown>) => {
    setLoading(true);
    setResult('Loading...');
    setShowModal(true);
    try {
      const url = `/api/validate/${endpoint}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      const result = {
        request: {
          method: 'POST',
          url: url,
          body: body,
        },
        response: {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
          data: data,
        },
      };
      setResult(JSON.stringify(result, null, 2));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResult(JSON.stringify({
        request: {
          method: 'POST',
          url: `/api/validate/${endpoint}`,
          body: body,
        },
        error: errorMessage,
        type: 'Network or parsing error',
      }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setResult('');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">CountriesDB Validation API Examples</h1>
      <p className="mb-4">
        This Next.js app demonstrates all 8 validation scenarios using the <code className="bg-gray-100 px-1 py-0.5 rounded">@countriesdb/validator</code> package.
      </p>
      <p className="text-red-600 font-bold mb-8">
        ⚠️ Make sure to set your API key in each route file before testing!
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Test API Routes</h2>

        <div className="grid gap-4 mt-4">
          <div className="border border-gray-300 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">1. Basic Country Validation</h3>
            <button
              onClick={() => testEndpoint('country', { code: 'US' })}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed mr-2"
            >
              Test US
            </button>
            <button
              onClick={() => testEndpoint('country', { code: 'XX' })}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test Invalid
            </button>
          </div>

          <div className="border border-gray-300 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">2. Country with followUpward</h3>
            <button
              onClick={() => testEndpoint('country-follow-upward', { code: 'US' })}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test
            </button>
          </div>

          <div className="border border-gray-300 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">3. Multiple Countries</h3>
            <button
              onClick={() => testEndpoint('multiple-countries', { code: ['US', 'CA', 'MX', 'FR'] })}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test Multiple
            </button>
          </div>

          <div className="border border-gray-300 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">4. Basic Subdivision</h3>
            <button
              onClick={() => testEndpoint('subdivision', { country: 'US', code: 'US-CA' })}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed mr-2"
            >
              Test US-CA
            </button>
            <button
              onClick={() => testEndpoint('subdivision', { country: 'US', code: 'US-XX' })}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test Invalid
            </button>
          </div>

          <div className="border border-gray-300 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">5. Subdivision with followRelated</h3>
            <button
              onClick={() => testEndpoint('subdivision-follow-related', { country: 'FR', code: 'FR-40' })}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test
            </button>
          </div>

          <div className="border border-gray-300 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">6. Subdivision with allowParentSelection</h3>
            <button
              onClick={() => testEndpoint('subdivision-allow-parent', { country: 'FR', code: 'FR-ARA' })}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test
            </button>
          </div>

          <div className="border border-gray-300 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">7. Multiple Subdivisions</h3>
            <button
              onClick={() => testEndpoint('multiple-subdivisions', { country: 'US', code: ['US-CA', 'US-NY', 'US-TX'] })}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test Multiple
            </button>
          </div>

          <div className="border border-gray-300 p-4 rounded">
            <h3 className="text-lg font-semibold mb-2">8. Empty Subdivision</h3>
            <button
              onClick={() => testEndpoint('empty-subdivision', { country: 'AQ', code: '' })}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test (Antarctica)
            </button>
          </div>
        </div>

        {showModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-8 z-[1000]"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[80vh] overflow-auto relative shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-gray-100 border-none rounded w-8 h-8 cursor-pointer text-xl flex items-center justify-center hover:bg-gray-200"
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="mt-0 mb-4 text-xl font-semibold">Response</h2>
              <pre className="bg-gray-100 p-4 rounded overflow-auto m-0 text-sm leading-relaxed">
                {result}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
