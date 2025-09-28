'use client';

import { useTheme } from '../components/ThemeProvider';
import { Zap, Heart, MessageCircle, Repeat2 } from 'lucide-react';

export default function ThemePreview() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'default', name: 'Professional Finance', description: 'Dark navy with gold accents' },
    { id: 'celo', name: 'CELO', description: 'Black with yellow accents' },
    { id: 'solana', name: 'Solana', description: 'Dark purple with magenta accents' },
    { id: 'base', name: 'Base', description: 'Dark blue with Base blue accents' },
    { id: 'coinbase', name: 'Coinbase', description: 'Dark navy with Coinbase blue accents' },
  ] as const;

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-gray-700 bg-surface bg-opacity-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-bg" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">Theme Preview</h1>
              <p className="text-text-secondary text-sm">Test different blockchain themes</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Theme Selector */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-fg mb-4">Select Theme</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                  theme === t.id
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-gray-700 bg-surface hover:border-accent hover:border-opacity-50'
                }`}
              >
                <h3 className="font-semibold text-fg">{t.name}</h3>
                <p className="text-text-secondary text-sm">{t.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Preview Components */}
        <div className="space-y-8">
          {/* Cards Preview */}
          <div>
            <h3 className="text-lg font-semibold text-fg mb-4">Cards & Surfaces</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="glass-card p-6">
                <h4 className="font-semibold text-fg mb-2">Glass Card</h4>
                <p className="text-text-secondary">This is a glass card with backdrop blur effect.</p>
              </div>
              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm font-medium">Total Tweets</p>
                    <p className="text-2xl font-bold text-accent mt-1">1.2K</p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-accent opacity-60" />
                </div>
              </div>
              <div className="tweet-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold">U</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-fg">User Name</h4>
                    <p className="text-text-secondary text-sm">@username</p>
                  </div>
                </div>
                <p className="text-fg mb-4">This is a sample tweet card showing how content looks in the current theme.</p>
                <div className="flex items-center gap-4 text-text-secondary">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">42</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Repeat2 className="w-4 h-4" />
                    <span className="text-sm">12</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons Preview */}
          <div>
            <h3 className="text-lg font-semibold text-fg mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
              <button className="btn-primary" disabled>Disabled Button</button>
            </div>
          </div>

          {/* Form Elements Preview */}
          <div>
            <h3 className="text-lg font-semibold text-fg mb-4">Form Elements</h3>
            <div className="max-w-md space-y-4">
              <input
                type="text"
                placeholder="Search tweets..."
                className="input-field w-full"
              />
              <select className="input-field w-full">
                <option>All Sentiments</option>
                <option>Positive</option>
                <option>Negative</option>
                <option>Neutral</option>
              </select>
            </div>
          </div>

          {/* Typography Preview */}
          <div>
            <h3 className="text-lg font-semibold text-fg mb-4">Typography</h3>
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-fg">Display Text</h1>
              <h2 className="text-2xl font-semibold text-fg">Heading Text</h2>
              <p className="text-base text-fg">Body text with normal weight and good readability.</p>
              <p className="text-sm text-text-secondary">Caption text in secondary color.</p>
              <p className="text-gradient">Gradient text with accent colors.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
