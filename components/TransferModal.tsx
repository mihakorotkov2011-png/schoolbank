import React, { useState, useMemo } from 'react';
import { X, Search, Send, User } from 'lucide-react';
import { STUDENTS_DB } from '../constants';
import { Student } from '../types';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransfer: (amount: number, recipient: Student) => void;
  currentBalance: number;
}

export const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose, onTransfer, currentBalance }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [amount, setAmount] = useState('');

  const filteredStudents = useMemo(() => {
    return STUDENTS_DB.filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.grade?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setStep(2);
  };

  const handleSend = () => {
    if (!selectedStudent || !amount) return;
    const value = parseInt(amount);
    if (isNaN(value) || value <= 0 || value > currentBalance) return;
    
    onTransfer(value, selectedStudent);
    // Reset state
    setStep(1);
    setSearchTerm('');
    setSelectedStudent(null);
    setAmount('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="bg-surface w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 h-[85vh] sm:h-auto sm:max-h-[600px] flex flex-col shadow-2xl border-t border-white/10 sm:border">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">
            {step === 1 ? 'Выберите получателя' : 'Сумма перевода'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Step 1: Select Student */}
        {step === 1 && (
          <div className="flex flex-col h-full overflow-hidden">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="Поиск по имени или классу..."
                className="w-full bg-background border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-2">
              {filteredStudents.map(student => (
                <div 
                  key={student.id} 
                  onClick={() => handleSelectStudent(student)}
                  className="flex items-center p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/10 active:scale-[0.98] transform duration-100"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold mr-3 shrink-0">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium">{student.name}</p>
                    <p className="text-gray-400 text-sm">{student.grade}</p>
                  </div>
                </div>
              ))}
              {filteredStudents.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                  Никого не найдено
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Amount */}
        {step === 2 && selectedStudent && (
          <div className="flex flex-col items-center justify-between h-full">
            <div className="w-full flex flex-col items-center mt-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg">
                {selectedStudent.name.charAt(0)}
              </div>
              <h4 className="text-xl font-semibold text-white">{selectedStudent.name}</h4>
              <p className="text-gray-400 mb-8">{selectedStudent.grade}</p>

              <div className="relative w-full max-w-[200px]">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  autoFocus
                  className="w-full bg-transparent text-center text-5xl font-bold text-white placeholder-gray-700 focus:outline-none"
                />
                <span className="absolute top-2 -right-8 text-xl text-gray-500 font-medium">Exi</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Доступно: {currentBalance} Exi</p>
            </div>

            <div className="w-full mt-auto space-y-3">
               <button 
                onClick={handleSend}
                disabled={!amount || parseInt(amount) > currentBalance}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition-all ${
                  !amount || parseInt(amount) > currentBalance
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-primary/50'
                }`}
              >
                <span>Перевести</span>
                <Send size={20} />
              </button>
              <button 
                onClick={() => setStep(1)}
                className="w-full py-3 text-gray-400 font-medium hover:text-white transition-colors"
              >
                Назад
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};