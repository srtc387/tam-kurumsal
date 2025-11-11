import React from 'react';
import { CorporateUser } from '../types';
import Icon from './Icon';
import StarRating from './StarRating';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: { rating: number; comment: string }) => void;
  seller: CorporateUser | null;
}

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, onSubmit, seller }) => {
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');

  React.useEffect(() => {
    if (!isOpen) {
      setRating(0);
      setComment('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Lütfen 1 ile 5 arasında bir puan verin.');
      return;
    }
    onSubmit({ rating, comment });
  };

  if (!isOpen || !seller) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      aria-labelledby="rating-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative mx-4 w-full max-w-md transform rounded-xl bg-white p-6 text-left shadow-xl transition-all">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold leading-6 text-slate-900" id="rating-modal-title">
            Tedarikçiyi Değerlendir
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
            aria-label="Kapat"
          >
            <Icon name="plus" className="h-6 w-6 rotate-45" />
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center border-t border-slate-200 pt-4">
          <img
            src={seller.logo}
            alt={seller.companyName}
            className="h-16 w-16 rounded-full object-contain"
          />
          <p className="mt-2 font-semibold text-slate-800">{seller.companyName}</p>
          <p className="text-sm text-slate-500">Bu tedarikçi ile olan deneyiminizi puanlayın.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="flex flex-col items-center">
             <label className="block text-sm font-medium text-slate-700 mb-2">Puanınız</label>
             <StarRating rating={rating} onRatingChange={setRating} size="lg" />
          </div>
          <div>
            <label htmlFor="rating-comment" className="block text-sm font-medium text-slate-700">
              Yorumunuz (İsteğe bağlı)
            </label>
            <textarea
              id="rating-comment"
              name="rating-comment"
              rows={3}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Deneyiminizle ilgili detayları paylaşabilirsiniz."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
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
              Değerlendirmeyi Gönder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;
