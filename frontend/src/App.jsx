import { useEffect, useState } from 'react';
import { useAuthStore, useGameStore } from './store';

export default function App() {
  const { isAuthenticated, user } = useAuthStore();
  const { balance } = useGameStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check health on mount
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        console.log('✅ Backend connected:', data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Backend connection failed:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">🎰 NeonBet Casino</h1>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-4 shadow">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">🎰 NeonBet Casino</h1>
          {isAuthenticated && (
            <div className="flex gap-4 items-center">
              <span className="text-lg">💰 Balance: ${balance.toFixed(2)}</span>
              <span className="text-sm text-gray-400">User: {user?.username}</span>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!isAuthenticated ? (
          <div className="text-center py-16">
            <h2 className="text-2xl mb-4">Welcome to NeonBet Casino</h2>
            <p className="text-gray-400 mb-8">Virtual currency casino with provably-fair games</p>
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded">
              Login / Register
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">🎲 Dice</h3>
              <p className="text-gray-400 mb-4">Roll the dice with adjustable odds</p>
              <button className="bg-purple-600 hover:bg-purple-700 w-full py-2 rounded">
                Play Dice
              </button>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">🎰 Slots</h3>
              <p className="text-gray-400 mb-4">Classic 3-reel slot machine</p>
              <button className="bg-purple-600 hover:bg-purple-700 w-full py-2 rounded">
                Play Slots
              </button>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">📈 Crash</h3>
              <p className="text-gray-400 mb-4">Real-time multiplier game</p>
              <button className="bg-purple-600 hover:bg-purple-700 w-full py-2 rounded">
                Play Crash
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
