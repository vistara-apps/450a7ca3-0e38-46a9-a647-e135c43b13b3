import { Tweet, FilterOptions } from './types';

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function filterTweets(tweets: Tweet[], filters: FilterOptions): Tweet[] {
  return tweets.filter(tweet => {
    // Date filter
    const tweetDate = new Date(tweet.created_at);
    const startDate = new Date(filters.dateRange.start);
    const endDate = new Date(filters.dateRange.end);
    
    if (tweetDate < startDate || tweetDate > endDate) {
      return false;
    }
    
    // Sentiment filter
    if (filters.sentiment !== 'all' && tweet.sentiment_label !== filters.sentiment) {
      return false;
    }
    
    // Engagement filter
    const totalEngagement = tweet.like_count + tweet.retweet_count + tweet.reply_count;
    if (totalEngagement < filters.engagementRange.min || totalEngagement > filters.engagementRange.max) {
      return false;
    }
    
    return true;
  });
}

export function exportToCSV(tweets: Tweet[], filename: string = 'tweets.csv'): void {
  const headers = [
    'Tweet ID',
    'Text',
    'Author Name',
    'Author Username',
    'Created At',
    'Likes',
    'Retweets',
    'Replies',
    'Sentiment Score',
    'Sentiment Label'
  ];
  
  const csvContent = [
    headers.join(','),
    ...tweets.map(tweet => [
      tweet.tweet_id,
      `"${tweet.text.replace(/"/g, '""')}"`,
      tweet.author_name,
      tweet.author_username,
      tweet.created_at,
      tweet.like_count,
      tweet.retweet_count,
      tweet.reply_count,
      tweet.sentiment_score.toFixed(3),
      tweet.sentiment_label
    ].join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToJSON(tweets: Tweet[], filename: string = 'tweets.json'): void {
  const jsonContent = JSON.stringify(tweets, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function calculateEngagementRate(tweet: Tweet): number {
  const totalEngagement = tweet.like_count + tweet.retweet_count + tweet.reply_count;
  // Assuming follower count is not available, use a simple metric
  return totalEngagement;
}

export function getSentimentColor(sentiment: string): string {
  switch (sentiment) {
    case 'positive':
      return 'text-green-400';
    case 'negative':
      return 'text-red-400';
    default:
      return 'text-yellow-400';
  }
}

export function getSentimentEmoji(sentiment: string): string {
  switch (sentiment) {
    case 'positive':
      return '😊';
    case 'negative':
      return '😞';
    default:
      return '😐';
  }
}
