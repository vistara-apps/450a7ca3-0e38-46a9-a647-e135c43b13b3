export interface Tweet {
  tweet_id: string;
  text: string;
  author_id: string;
  author_name: string;
  author_username: string;
  created_at: string;
  like_count: number;
  retweet_count: number;
  reply_count: number;
  sentiment_score: number;
  sentiment_label: 'positive' | 'negative' | 'neutral';
}

export interface UserQuery {
  query_id: string;
  query_text: string;
  created_at: string;
  filters: {
    dateRange?: {
      start: string;
      end: string;
    };
    sentiment?: 'positive' | 'negative' | 'neutral' | 'all';
    minEngagement?: number;
    maxEngagement?: number;
  };
}

export interface FilterOptions {
  dateRange: {
    start: string;
    end: string;
  };
  sentiment: 'all' | 'positive' | 'negative' | 'neutral';
  engagementRange: {
    min: number;
    max: number;
  };
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}
