'use client';

import { useState } from 'react';
import { FilterOptions } from '@/lib/types';

interface FilterSliderProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  variant?: 'range' | 'single';
}

export function FilterSlider({ filters, onFiltersChange, variant = 'range' }: FilterSliderProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value,
      },
    });
  };

  const handleSentimentChange = (sentiment: 'all' | 'positive' | 'negative' | 'neutral') => {
    onFiltersChange({
      ...filters,
      sentiment,
    });
  };

  const handleEngagementChange = (field: 'min' | 'max', value: number) => {
    onFiltersChange({
      ...filters,
      engagementRange: {
        ...filters.engagementRange,
        [field]: value,
      },
    });
  };

  return (
    <div className="glass-card p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="text-lg font-semibold text-fg">Filters</h3>
        <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-6 animate-slide-up">
          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-fg mb-2">Date Range</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1">From</label>
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleDateChange('start', e.target.value)}
                  className="input-field w-full text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">To</label>
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleDateChange('end', e.target.value)}
                  className="input-field w-full text-sm"
                />
              </div>
            </div>
          </div>

          {/* Sentiment Filter */}
          <div>
            <label className="block text-sm font-medium text-fg mb-2">Sentiment</label>
            <div className="grid grid-cols-4 gap-2">
              {(['all', 'positive', 'neutral', 'negative'] as const).map((sentiment) => (
                <button
                  key={sentiment}
                  onClick={() => handleSentimentChange(sentiment)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    filters.sentiment === sentiment
                      ? 'bg-accent text-bg'
                      : 'bg-surface text-text-secondary hover:text-fg hover:bg-opacity-80'
                  }`}
                >
                  {sentiment === 'all' ? 'All' : sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Engagement Range Filter */}
          <div>
            <label className="block text-sm font-medium text-fg mb-2">Engagement Range</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1">Min</label>
                <input
                  type="number"
                  min="0"
                  value={filters.engagementRange.min}
                  onChange={(e) => handleEngagementChange('min', parseInt(e.target.value) || 0)}
                  className="input-field w-full text-sm"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">Max</label>
                <input
                  type="number"
                  min="0"
                  value={filters.engagementRange.max}
                  onChange={(e) => handleEngagementChange('max', parseInt(e.target.value) || 10000)}
                  className="input-field w-full text-sm"
                  placeholder="10000"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
