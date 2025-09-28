'use client';

import { useState } from 'react';
import { Tweet } from '@/lib/types';
import { exportToCSV, exportToJSON } from '@/lib/utils';
import { Download, FileText, Code } from 'lucide-react';

interface ExportButtonProps {
  tweets: Tweet[];
  variant?: 'csv' | 'json';
}

export function ExportButton({ tweets, variant = 'csv' }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'csv' | 'json') => {
    if (tweets.length === 0) return;
    
    setIsExporting(true);
    
    try {
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `tweets_${timestamp}.${format}`;
      
      if (format === 'csv') {
        exportToCSV(tweets, filename);
      } else {
        exportToJSON(tweets, filename);
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  if (variant === 'csv' || variant === 'json') {
    return (
      <button
        onClick={() => handleExport(variant)}
        disabled={tweets.length === 0 || isExporting}
        className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isExporting ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-fg border-t-transparent" />
        ) : variant === 'csv' ? (
          <FileText className="w-4 h-4" />
        ) : (
          <Code className="w-4 h-4" />
        )}
        Export {variant.toUpperCase()}
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleExport('csv')}
        disabled={tweets.length === 0 || isExporting}
        className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isExporting ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-fg border-t-transparent" />
        ) : (
          <FileText className="w-4 h-4" />
        )}
        CSV
      </button>
      
      <button
        onClick={() => handleExport('json')}
        disabled={tweets.length === 0 || isExporting}
        className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isExporting ? (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-fg border-t-transparent" />
        ) : (
          <Code className="w-4 h-4" />
        )}
        JSON
      </button>
    </div>
  );
}
