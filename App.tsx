import React, { useState, useEffect } from 'react';
import { Home, Repeat, History, Sparkles, Settings, ArrowUpRight, ArrowDownLeft, Info } from 'lucide-react';
import { BalanceCard } from './components/BalanceCard';
import { TransferModal } from './components/TransferModal';
import { getFinancialAdvice } from './services/geminiService';
import { Student, Transaction, AppView } from './types';
import { MOCK_HISTORY } from './constants';

const App: React.FC = () => {
  // State
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [balance, setBalance] = useState<number>(1250);
  const [transactions, setTransactions] = useState<Transaction[]>([...MOCK_HISTORY]);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  
  // AI State
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Initialize Telegram Web App
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand(); // Forces the app to open to full height
      
      // Example: Using Telegram user data if available
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user) {
        console.log("Hello Telegram User:", user.first_name);
      }
    }
  }, []);

  // Handlers
  const handleTransfer = (amount: number, recipient: Student) => {
    setBalance(prev => prev - amount);
    const newTx: Transaction = {
      id: Date.now().toString(),
      type: 'outgoing',
      amount: amount,
      counterparty: recipient.name,
      date: new Date().toISOString().split('T')[0],
      description: 'Перевод'
    };
    setTransactions(prev => [newTx, ...prev]);
    setIsTransferModalOpen(false);
    setView(AppView.HISTORY);
  };

  const handleAskAi = async () => {
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    const response = await getFinancialAdvice(balance, aiInput);
    setAiResponse(response);
    setIsAiLoading(false);
  };

  // Views
  const renderHome = () => (
    <div className="space-y-6 animate-fade-in">
      <BalanceCard balance={balance} />
      
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => setIsTransferModalOpen(true)}
          className="bg-surface hover:bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center space-y-2 transition-all active:scale-95"
        >
          <div className="p-3 bg-primary/20 text-primary rounded-full">
            <ArrowUpRight size={24} />
          </div>
          <span className="font-medium text-sm">Перевести</span>
        </button>
        <button 
          onClick={() => setView(AppView.HISTORY)}
          className="bg-surface hover:bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center space-y-2 transition-all active:scale-95"
        >
          <div className="p-3 bg-secondary/20 text-secondary rounded-full">
            <History size={24} />
          </div>
          <span className="font-medium text-sm">История</span>
        </button>
      </div>

      {/* Recent Activity Snippet */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">Последние операции</h3>
          <button onClick={() => setView(AppView.HISTORY)} className="text-primary text-sm font-medium">Все</button>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 3).map(tx => (
            <div key={tx.id} className="flex items-center justify-between p-3 bg-surface rounded-xl border border-white/5">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${tx.type === 'incoming' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                  {tx.type === 'incoming' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                </div>
                <div>
                  <p className="font-medium text-sm">{tx.counterparty}</p>
                  <p className="text-xs text-gray-400">{tx.description}</p>
                </div>
              </div>
              <span className={`font-bold ${tx.type === 'incoming' ? 'text-green-400' : 'text-white'}`}>
                {tx.type === 'incoming' ? '+' : '-'}{tx.amount} Exi
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-6">История</h2>
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pb-20">
        {transactions.map(tx => (
          <div key={tx.id} className="flex items-center justify-between p-4 bg-surface rounded-2xl border border-white/5">
             <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${tx.type === 'incoming' ? 'bg-green-500/10 text-green-500' : 'bg-white/5 text-white'}`}>
                  {tx.type === 'incoming' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                </div>
                <div>
                  <p className="font-bold">{tx.counterparty}</p>
                  <p className="text-xs text-gray-400">{tx.date} • {tx.description}</p>
                </div>
              </div>
              <span className={`font-bold text-lg ${tx.type === 'incoming' ? 'text-green-400' : 'text-white'}`}>
                {tx.type === 'incoming' ? '+' : '-'}{tx.amount} Exi
              </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAI = () => (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="text-yellow-400" /> AI Помощник
        </h2>
        <p className="text-sm text-gray-400 mt-1">Спроси совет по финансам</p>
      </div>

      <div className="flex-1 bg-surface rounded-3xl p-4 mb-4 border border-white/5 overflow-y-auto">
        {!aiResponse ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
            <Sparkles size={48} className="opacity-20" />
            <p>Я могу подсказать, как накопить на пиццу <br/> или распределить бюджет!</p>
          </div>
        ) : (
          <div className="space-y-4">
             <div className="flex justify-end">
                <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-none max-w-[80%]">
                  {aiInput}
                </div>
             </div>
             <div className="flex justify-start">
                <div className="bg-white/10 text-gray-200 p-3 rounded-2xl rounded-tl-none max-w-[90%] animate-fade-in">
                  {aiResponse}
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="relative">
        <input 
          type="text" 
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          placeholder="Как накопить 500 баллов?"
          className="w-full bg-surface border border-gray-700 rounded-xl py-4 pl-4 pr-12 focus:outline-none focus:border-primary transition-colors"
        />
        <button 
          onClick={handleAskAi}
          disabled={isAiLoading || !aiInput}
          className="absolute right-2 top-2 p-2 bg-primary rounded-lg text-white hover:bg-primary/80 disabled:opacity-50 transition-colors"
        >
          {isAiLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <ArrowUpRight size={20} />}
        </button>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Настройки</h2>
      <div className="bg-surface rounded-2xl overflow-hidden border border-white/5">
        <div className="p-4 hover:bg-white/5 cursor-pointer flex justify-between items-center text-red-400">
           <span>Выйти</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-white font-sans selection:bg-primary/30">
      {/* Main Content Area */}
      <main className="pb-24 p-6 max-w-lg mx-auto min-h-screen relative">
        {view === AppView.HOME && renderHome()}
        {view === AppView.HISTORY && renderHistory()}
        {view === AppView.AI_ASSISTANT && renderAI()}
        {view === AppView.SETTINGS && renderSettings()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl border-t border-white/5 px-6 py-4 pb-6 z-40">
        <div className="max-w-lg mx-auto flex justify-between items-center">
          <button 
            onClick={() => setView(AppView.HOME)}
            className={`flex flex-col items-center space-y-1 ${view === AppView.HOME ? 'text-primary' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Home size={24} strokeWidth={view === AppView.HOME ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Главная</span>
          </button>
          
          <button 
            onClick={() => setIsTransferModalOpen(true)}
            className="flex flex-col items-center space-y-1 text-gray-500 hover:text-gray-300"
          >
            <div className="bg-primary text-white p-3 rounded-full -mt-8 shadow-lg shadow-primary/40 ring-4 ring-background transform transition-transform active:scale-95">
               <Repeat size={24} />
            </div>
            <span className="text-[10px] font-medium">Перевод</span>
          </button>

          <button 
            onClick={() => setView(AppView.AI_ASSISTANT)}
            className={`flex flex-col items-center space-y-1 ${view === AppView.AI_ASSISTANT ? 'text-primary' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Sparkles size={24} strokeWidth={view === AppView.AI_ASSISTANT ? 2.5 : 2} />
            <span className="text-[10px] font-medium">AI Помощник</span>
          </button>

           <button 
            onClick={() => setView(AppView.SETTINGS)}
            className={`flex flex-col items-center space-y-1 ${view === AppView.SETTINGS ? 'text-primary' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Settings size={24} strokeWidth={view === AppView.SETTINGS ? 2.5 : 2} />
            <span className="text-[10px] font-medium">Меню</span>
          </button>
        </div>
      </nav>

      {/* Transfer Modal */}
      <TransferModal 
        isOpen={isTransferModalOpen} 
        onClose={() => setIsTransferModalOpen(false)}
        onTransfer={handleTransfer}
        currentBalance={balance}
      />
    </div>
  );
};

export default App;