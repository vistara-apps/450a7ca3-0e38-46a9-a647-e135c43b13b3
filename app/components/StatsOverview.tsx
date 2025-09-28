'use client';

import { Tweet } from '@/lib/types';
import { formatNumber } from '@/lib/utils';
import { TrendingUp, MessageSquare, Heart, Repeat2 } from 'lucide-react';

interface StatsOverviewProps {
  tweets: Tweet[];
}

export function StatsOverview({ tweets }: StatsOverviewProps) {
  const totalTweets = tweets.length;
  const totalLikes = tweets.reduce((sum, tweet) => sum + tweet.like_count, 0);
  const totalRetweets = tweets.reduce((sum, tweet) => sum + tweet.retweet_count, 0);
  const totalReplies = tweets.reduce((sum, tweet) => sum + tweet.reply_count, 0);
  
  const avgSentiment = tweets.length > 0 
    ? tweets.reduce((sum, tweet) => sum + tweet.sentiment_score, 0) / tweets.length 
    : 0;
  
  const sentimentLabel = avgSentiment > 0.6 ? 'Positive' : avgSentiment < 0.4 ? 'Negative' : 'Neutral';
  const sentimentColor = avgSentiment > 0.6 ? 'text-green-400' : avgSentiment < 0.4 ? 'text-red-400' : 'text-yellow-400';

  const stats = [
    {
      label: 'Total Tweets',
      value: formatNumber(totalTweets),
      icon: MessageSquare,
      color: 'text-blue-400',
    },
    {
      label: 'Total Likes',
      value: formatNumber(totalLikes),
      icon: Heart,
      color: 'text-red-400',
    },
    {
      label: 'Total Retweets',
      value: formatNumber(totalRetweets),
      icon: Repeat2,
      color: 'text-green-400',
    },
    {
      label: 'Avg Sentiment',
      value: sentimentLabel,
      icon: TrendingUp,
      color: sentimentColor,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm font-medium">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
            </div>
            <stat.icon className={`w-8 h-8 ${stat.color} opacity-60`} />
          </div>
        </div>
      ))}
    </div>
  );
}
