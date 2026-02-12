import React from 'react';
import { Wallet, TrendingUp } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
  return (
    <div className="relative w-full h-48 rounded-3xl overflow-hidden shadow-2xl transform transition-all hover:scale-[1.02]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"></div>
      
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-black opacity-10 rounded-full blur-2xl"></div>

      {/* Content */}
      <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium opacity-80">Ваш баланс</p>
            <h2 className="text-4xl font-bold mt-1 tracking-tight">{balance.toLocaleString('ru-RU')} Exi</h2>
          </div>
          <div className="p-2 bg-white/20 backdrop-blur-md rounded-full">
            <Wallet size={24} />
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex items-center space-x-2 bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
            <TrendingUp size={16} className="text-green-400" />
            <span className="text-xs font-medium">+150 на этой неделе</span>
          </div>
          <p className="text-xs opacity-60">Экси баллы</p>
        </div>
      </div>
    </div>
  );
};