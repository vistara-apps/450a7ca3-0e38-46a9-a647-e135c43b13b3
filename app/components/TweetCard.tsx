'use client';

import { Tweet } from '@/lib/types';
import { formatNumber, formatDate, getSentimentColor, getSentimentEmoji } from '@/lib/utils';
import { Heart, MessageCircle, Repeat2, User } from 'lucide-react';

interface TweetCardProps {
  tweet: Tweet;
  variant?: 'default' | 'compact';
}

export function TweetCard({ tweet, variant = 'default' }: TweetCardProps) {
  const isCompact = variant === 'compact';
  
  return (
    <div className={`tweet-card ${isCompact ? 'p-4' : 'p-6'} animate-fade-in`}>
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-accent bg-opacity-20 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-fg truncate">{tweet.author_name}</h3>
            <span className="text-text-secondary text-sm">@{tweet.author_username}</span>
          </div>
          <p className="text-text-secondary text-sm">{formatDate(tweet.created_at)}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${getSentimentColor(tweet.sentiment_label)}`}>
            {getSentimentEmoji(tweet.sentiment_label)}
          </span>
          <span className="text-xs text-text-secondary bg-surface px-2 py-1 rounded-full">
            {(tweet.sentiment_score * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Tweet Content */}
      <div className={`mb-4 ${isCompact ? 'text-sm' : 'text-base'}`}>
        <p className="text-fg leading-relaxed">{tweet.text}</p>
      </div>

      {/* Engagement Metrics */}
      <div className="flex items-center gap-6 text-text-secondary">
        <div className="flex items-center gap-2 hover:text-red-400 transition-colors duration-200">
          <Heart className="w-4 h-4" />
          <span className="text-sm font-medium">{formatNumber(tweet.like_count)}</span>
        </div>
        
        <div className="flex items-center gap-2 hover:text-green-400 transition-colors duration-200">
          <Repeat2 className="w-4 h-4" />
          <span className="text-sm font-medium">{formatNumber(tweet.retweet_count)}</span>
        </div>
        
        <div className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-200">
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm font-medium">{formatNumber(tweet.reply_count)}</span>
        </div>
        
        <div className="ml-auto">
          <span className="text-xs bg-surface px-2 py-1 rounded-full">
            {formatNumber(tweet.like_count + tweet.retweet_count + tweet.reply_count)} total
          </span>
        </div>
      </div>
    </div>
  );
}
