import { Tweet } from './types';

// Mock data generator for demonstration
export function generateMockTweets(query: string, count: number = 20): Tweet[] {
  const sentiments: Array<'positive' | 'negative' | 'neutral'> = ['positive', 'negative', 'neutral'];
  const authors = [
    { name: 'Alex Chen', username: 'alexchen_dev' },
    { name: 'Sarah Johnson', username: 'sarahj_crypto' },
    { name: 'Mike Rodriguez', username: 'mike_blockchain' },
    { name: 'Emma Wilson', username: 'emmaw_defi' },
    { name: 'David Kim', username: 'davidk_web3' },
    { name: 'Lisa Zhang', username: 'lisaz_nft' },
    { name: 'Tom Anderson', username: 'toma_crypto' },
    { name: 'Rachel Green', username: 'rachelg_dao' },
  ];

  const tweetTemplates = [
    `Just discovered ${query} and I'm impressed by the innovation! 🚀`,
    `${query} is changing the game in ways we never imagined. Bullish! 📈`,
    `Not sure about ${query} yet. Need to see more real-world adoption. 🤔`,
    `${query} has some interesting use cases, but the market is still volatile. ⚠️`,
    `The technology behind ${query} is fascinating. Great potential ahead! 💡`,
    `${query} community is growing strong. Love the engagement! 💪`,
    `Concerns about ${query} scalability issues. Hope they address this soon. 🔧`,
    `${query} partnership announcements are exciting! Big things coming. 🤝`,
    `${query} price action is wild today. HODL or sell? 🎢`,
    `Research shows ${query} adoption is accelerating. Interesting trends! 📊`,
  ];

  return Array.from({ length: count }, (_, i) => {
    const author = authors[Math.floor(Math.random() * authors.length)];
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    const template = tweetTemplates[Math.floor(Math.random() * tweetTemplates.length)];
    
    const baseEngagement = Math.floor(Math.random() * 1000);
    const sentimentMultiplier = sentiment === 'positive' ? 1.5 : sentiment === 'negative' ? 0.7 : 1;
    
    return {
      tweet_id: `tweet_${Date.now()}_${i}`,
      text: template,
      author_id: `user_${author.username}`,
      author_name: author.name,
      author_username: author.username,
      created_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      like_count: Math.floor(baseEngagement * sentimentMultiplier * Math.random()),
      retweet_count: Math.floor(baseEngagement * sentimentMultiplier * 0.3 * Math.random()),
      reply_count: Math.floor(baseEngagement * sentimentMultiplier * 0.2 * Math.random()),
      sentiment_score: sentiment === 'positive' ? 0.7 + Math.random() * 0.3 : 
                      sentiment === 'negative' ? Math.random() * 0.3 : 
                      0.3 + Math.random() * 0.4,
      sentiment_label: sentiment,
    };
  });
}

export function analyzeSentiment(text: string): { score: number; label: 'positive' | 'negative' | 'neutral' } {
  // Simple mock sentiment analysis
  const positiveWords = ['great', 'amazing', 'love', 'excellent', 'fantastic', 'bullish', 'impressed', 'exciting'];
  const negativeWords = ['bad', 'terrible', 'hate', 'awful', 'disappointing', 'bearish', 'concerns', 'issues'];
  
  const words = text.toLowerCase().split(' ');
  let score = 0.5; // neutral baseline
  
  words.forEach(word => {
    if (positiveWords.some(pos => word.includes(pos))) {
      score += 0.1;
    }
    if (negativeWords.some(neg => word.includes(neg))) {
      score -= 0.1;
    }
  });
  
  score = Math.max(0, Math.min(1, score)); // clamp between 0 and 1
  
  const label = score > 0.6 ? 'positive' : score < 0.4 ? 'negative' : 'neutral';
  
  return { score, label };
}
