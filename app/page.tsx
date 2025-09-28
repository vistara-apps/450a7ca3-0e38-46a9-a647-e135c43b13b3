'use client';

import { useState, useEffect } from 'react';
import { Tweet, FilterOptions } from '@/lib/types';
import { generateMockTweets } from '@/lib/mockData';
import { filterTweets } from '@/lib/utils';
import { SearchInput } from './components/SearchInput';
import { TweetCard } from './components/TweetCard';
import { FilterSlider } from './components/FilterSlider';
import { ChartDisplay } from './components/ChartDisplay';
import { ExportButton } from './components/ExportButton';
import { StatsOverview } from './components/StatsOverview';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { BarChart3, PieChart, TrendingUp, Zap } from 'lucide-react';

export default function HomePage() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [filteredTweets, setFilteredTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chartVariant, setChartVariant] = useState<'bar' | 'line' | 'pie'>('bar');
  
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    },
    sentiment: 'all',
    engagementRange: {
      min: 0,
      max: 10000,
    },
  });

  // Apply filters whenever tweets or filters change
  useEffect(() => {
    const filtered = filterTweets(tweets, filters);
    setFilteredTweets(filtered);
  }, [tweets, filters]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock tweets based on query
      const mockTweets = generateMockTweets(query, 25);
      setTweets(mockTweets);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b border-gray-700 bg-surface bg-opacity-50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-bg" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">TweetMiner</h1>
                <p className="text-text-secondary text-sm">AI-Powered Twitter Research</p>
              </div>
            </div>
            
            <Wallet>
              <ConnectWallet>
                <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-lg border border-gray-700">
                  <Avatar className="w-6 h-6" />
                  <Name className="text-fg font-medium" />
                </div>
              </ConnectWallet>
            </Wallet>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-fg mb-4">
            Unearth Insights from <span className="text-gradient">Twitter Conversations</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            Fetch, enrich, filter, and visualize tweets with AI-powered research tools. 
            Turn social media data into actionable insights.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <SearchInput 
              onSearch={handleSearch}
              loading={loading}
              variant="withClearButton"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 bg-surface px-6 py-4 rounded-lg border border-gray-700">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-accent border-t-transparent" />
              <span className="text-fg font-medium">Mining tweets for "{searchQuery}"...</span>
            </div>
          </div>
        )}

        {/* Results Section */}
        {tweets.length > 0 && !loading && (
          <div className="space-y-8">
            {/* Stats Overview */}
            <StatsOverview tweets={filteredTweets} />

            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="lg:w-1/3">
                <FilterSlider 
                  filters={filters}
                  onFiltersChange={setFilters}
                />
              </div>
              
              <div className="lg:w-2/3">
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-fg">Visualization</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setChartVariant('bar')}
                        className={`p-2 rounded-md transition-colors duration-200 ${
                          chartVariant === 'bar' ? 'bg-accent text-bg' : 'text-text-secondary hover:text-fg'
                        }`}
                      >
                        <BarChart3 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setChartVariant('line')}
                        className={`p-2 rounded-md transition-colors duration-200 ${
                          chartVariant === 'line' ? 'bg-accent text-bg' : 'text-text-secondary hover:text-fg'
                        }`}
                      >
                        <TrendingUp className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setChartVariant('pie')}
                        className={`p-2 rounded-md transition-colors duration-200 ${
                          chartVariant === 'pie' ? 'bg-accent text-bg' : 'text-text-secondary hover:text-fg'
                        }`}
                      >
                        <PieChart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <ChartDisplay tweets={filteredTweets} variant={chartVariant} />
                </div>
              </div>
            </div>

            {/* Export Controls */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-fg">
                  Results ({filteredTweets.length} tweets)
                </h3>
                <p className="text-text-secondary text-sm">
                  Showing filtered results for "{searchQuery}"
                </p>
              </div>
              <ExportButton tweets={filteredTweets} />
            </div>

            {/* Tweet Results */}
            <div className="space-y-4">
              {filteredTweets.length > 0 ? (
                filteredTweets.map((tweet) => (
                  <TweetCard key={tweet.tweet_id} tweet={tweet} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="glass-card p-8">
                    <p className="text-text-secondary text-lg">
                      No tweets match your current filters. Try adjusting your criteria.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty State */}
        {tweets.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-accent bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-12 h-12 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-fg mb-4">Ready to Mine Tweets?</h3>
              <p className="text-text-secondary mb-6">
                Enter a keyword, hashtag, or username above to start discovering insights 
                from Twitter conversations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="bg-surface p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-fg mb-2">Keywords</h4>
                  <p className="text-text-secondary">Search for specific topics or terms</p>
                </div>
                <div className="bg-surface p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-fg mb-2">Hashtags</h4>
                  <p className="text-text-secondary">Find trending conversations</p>
                </div>
                <div className="bg-surface p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-fg mb-2">Users</h4>
                  <p className="text-text-secondary">Analyze specific accounts</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-surface bg-opacity-50 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-text-secondary">
              Built with ❤️ on Base • Powered by OnchainKit
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
