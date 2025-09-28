'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  loading?: boolean;
  placeholder?: string;
  variant?: 'default' | 'withClearButton';
}

export function SearchInput({ 
  onSearch, 
  loading = false, 
  placeholder = "Search tweets by keyword, hashtag, or @username",
  variant = 'default'
}: SearchInputProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-text-secondary" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          className="input-field w-full pl-12 pr-20 text-lg"
        />
        
        {variant === 'withClearButton' && query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-16 flex items-center pr-2 text-text-secondary hover:text-fg transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="absolute inset-y-0 right-0 flex items-center pr-4"
        >
          <div className="btn-primary px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-bg border-t-transparent" />
            ) : (
              'Search'
            )}
          </div>
        </button>
      </div>
    </form>
  );
}
