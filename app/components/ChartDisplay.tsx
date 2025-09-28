'use client';

import { Tweet, ChartData } from '@/lib/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface ChartDisplayProps {
  tweets: Tweet[];
  variant?: 'bar' | 'line' | 'pie';
}

export function ChartDisplay({ tweets, variant = 'bar' }: ChartDisplayProps) {
  const generateChartData = (): ChartData[] => {
    switch (variant) {
      case 'pie':
        // Sentiment distribution
        const sentimentCounts = tweets.reduce((acc, tweet) => {
          acc[tweet.sentiment_label] = (acc[tweet.sentiment_label] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        return Object.entries(sentimentCounts).map(([name, value]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          value,
        }));

      case 'line':
        // Tweet volume over time
        const dateGroups = tweets.reduce((acc, tweet) => {
          const date = new Date(tweet.created_at).toLocaleDateString();
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        return Object.entries(dateGroups)
          .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
          .map(([date, value]) => ({
            name: date,
            value,
            date,
          }));

      default:
        // Engagement distribution
        const engagementRanges = [
          { name: '0-10', min: 0, max: 10 },
          { name: '11-50', min: 11, max: 50 },
          { name: '51-100', min: 51, max: 100 },
          { name: '101-500', min: 101, max: 500 },
          { name: '500+', min: 501, max: Infinity },
        ];
        
        return engagementRanges.map(range => ({
          name: range.name,
          value: tweets.filter(tweet => {
            const engagement = tweet.like_count + tweet.retweet_count + tweet.reply_count;
            return engagement >= range.min && engagement <= range.max;
          }).length,
        }));
    }
  };

  const data = generateChartData();
  const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];

  const renderChart = () => {
    switch (variant) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#f9fafb'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#ffd700" 
                strokeWidth={2}
                dot={{ fill: '#ffd700', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                stroke="#9ca3af"
                fontSize={12}
              />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#f9fafb'
                }}
              />
              <Bar dataKey="value" fill="#ffd700" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  const getChartTitle = () => {
    switch (variant) {
      case 'pie':
        return 'Sentiment Distribution';
      case 'line':
        return 'Tweet Volume Over Time';
      default:
        return 'Engagement Distribution';
    }
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-fg mb-4">{getChartTitle()}</h3>
      {data.length > 0 ? (
        renderChart()
      ) : (
        <div className="h-64 flex items-center justify-center text-text-secondary">
          <p>No data available for visualization</p>
        </div>
      )}
    </div>
  );
}
