// src/features/complianceReporting/components/SmartFiling.jsx

import React from 'react';
import { Sparkles, Send, FileCheck2 } from 'lucide-react';

const SmartFiling = ({ reports, onFileNow }) => {
  const reportsToSubmit = reports.filter(
    (report) => report.status === 'Pending Submission'
  );

  return (
    <div className="theme-bg-card p-6 rounded-xl shadow-lg theme-text-primary animate-fade-in">
      <div className="flex items-center mb-6">
        <div className="bg-yellow-400/10 p-3 rounded-lg mr-4">
            <Sparkles className="h-8 w-8 theme-text-highlight-color" />
        </div>
        <div>
            <h2 className="text-2xl font-bold theme-text-highlight-color">AI-Powered Smart Filing</h2>
            <p className="theme-text-secondary">
                This is the final queue for reports that have been reviewed and are ready for submission.
            </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold theme-text-primary border-b theme-border-color pb-2">
          Queue: Ready for Submission
        </h3>
        {reportsToSubmit.length > 0 ? (
          reportsToSubmit.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 bg-gray-800/60 rounded-lg border theme-border-color">
              <div>
                <p className="font-bold theme-text-primary">{report.name}</p>
                <p className="text-sm theme-text-secondary">
                  Regulator: <span className="font-semibold">{report.regulator}</span> | Status:
                  <span className="font-semibold text-cyan-400 ml-1 inline-flex items-center">
                    <FileCheck2 size={14} className="mr-1.5" />
                    {report.status}
                  </span>
                </p>
              </div>
              <button
                onClick={() => onFileNow(report)}
                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-500 transition-colors flex items-center"
              >
                <Send size={16} className="mr-2" />
                File Now
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-12 theme-text-secondary">
            <p className="font-semibold">The submission queue is empty.</p>
            <p className="text-sm mt-1">Reports marked as "Ready for Submission" will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartFiling;