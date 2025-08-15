import React, { useState } from 'react';
import { AlertCircle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

export default function AIDebugPanel() {
  const [loading, setLoading] = useState(false);
  const [diagnosticData, setDiagnosticData] = useState<any>(null);
  const [testResults, setTestResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const runDiagnostics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Check system status
      const statusResponse = await fetch('/api/diagnostic/status');
      const statusData = await statusResponse.json();
      setDiagnosticData(statusData);
      
      // Run AI tests
      const testResponse = await fetch('/api/diagnostic/test-ai');
      const testData = await testResponse.json();
      setTestResults(testData);
    } catch (err: any) {
      setError(err.message || 'Failed to run diagnostics');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
      case 'connected':
      case 'available':
      case 'configured':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
      case 'not_available':
      case 'not_configured':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          AI System Diagnostics
        </h2>
        <button
          onClick={runDiagnostics}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          Run Diagnostics
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {diagnosticData && (
        <div className="space-y-4">
          <div className="border dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Environment Status</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Database (D1)</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(diagnosticData.environment?.has_db ? 'available' : 'not_available')}
                  <span className="text-sm">{diagnosticData.database?.status || 'Unknown'}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">KV Storage</span>
                {getStatusIcon(diagnosticData.environment?.has_kv ? 'available' : 'not_available')}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Cloudflare AI</span>
                {getStatusIcon(diagnosticData.environment?.has_ai ? 'available' : 'not_available')}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">OpenRouter API Key</span>
                {getStatusIcon(diagnosticData.environment?.has_openrouter_key ? 'configured' : 'not_configured')}
              </div>
            </div>
          </div>

          {diagnosticData.database?.tables && (
            <div className="border dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Database Tables</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {diagnosticData.database.tables.join(', ')}
              </div>
            </div>
          )}
        </div>
      )}

      {testResults && (
        <div className="mt-4 space-y-4">
          <div className="border dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">AI Provider Tests</h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Cloudflare AI</span>
                  {getStatusIcon(testResults.tests?.cloudflare_ai?.status)}
                </div>
                {testResults.tests?.cloudflare_ai?.response && (
                  <div className="text-sm bg-gray-50 dark:bg-gray-900 p-2 rounded">
                    Response: {testResults.tests.cloudflare_ai.response}
                  </div>
                )}
                {testResults.tests?.cloudflare_ai?.error && (
                  <div className="text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded text-red-600 dark:text-red-400">
                    Error: {testResults.tests.cloudflare_ai.error}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">OpenRouter</span>
                  {getStatusIcon(testResults.tests?.openrouter?.status)}
                </div>
                {testResults.tests?.openrouter?.response && (
                  <div className="text-sm bg-gray-50 dark:bg-gray-900 p-2 rounded">
                    Response: {testResults.tests.openrouter.response}
                  </div>
                )}
                {testResults.tests?.openrouter?.error && (
                  <div className="text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded text-red-600 dark:text-red-400">
                    Error: {testResults.tests.openrouter.error}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            Last tested: {new Date(testResults.timestamp).toLocaleString()}
          </div>
        </div>
      )}

      {!diagnosticData && !loading && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Click "Run Diagnostics" to check AI system status
        </div>
      )}
    </div>
  );
}