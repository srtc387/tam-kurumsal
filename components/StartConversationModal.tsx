import React from 'react';
import { CorporateUser } from '../types';
import Icon from './Icon';

interface StartConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
  targetUser: CorporateUser | null;
}

const StartConversationModal: React.FC<StartConversationModalProps> = ({ isOpen, onClose, onSubmit, targetUser }) => {
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    if (!isOpen) {
      setMessage('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      alert('Lütfen bir mesaj yazın.');
      return;
    }
    onSubmit(message);
  };

  if (!isOpen || !targetUser) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      aria-labelledby="conversation-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative mx-4 w-full max-w-md transform rounded-xl bg-white p-6 text-left shadow-xl transition-all">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold leading-6 text-slate-900" id="conversation-modal-title">
            Sohbet Başlat
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
            aria-label="Kapat"
          >
            <Icon name="plus" className="h-6 w-6 rotate-45" />
          </button>
        </div>

        <div className="mt-4 flex items-center space-x-3 border-t border-slate-200 pt-4">
          <img
            src={targetUser.logo}
            alt={targetUser.companyName}
            className="h-12 w-12 rounded-full object-contain"
          />
          <div>
            <p className="text-sm text-slate-500">Tedarikçi:</p>
            <p className="font-semibold text-slate-800">{targetUser.companyName}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="conversation-message" className="block text-sm font-medium text-slate-700">
              Mesajınız
            </label>
            <textarea
              id="conversation-message"
              name="conversation-message"
              rows={4}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder={`Merhaba ${targetUser.companyName}, teklifinizle ilgileniyoruz...`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mt-6 flex justify-end space-x-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              İptal
            </button>
            <button
              type="submit"
              className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Gönder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartConversationModal;
