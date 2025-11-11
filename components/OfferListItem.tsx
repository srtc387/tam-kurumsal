import React from 'react';
import { Offer, CorporateUser } from '../types';
import StarRating from './StarRating';

interface OfferListItemProps {
  offer: Offer;
  seller: CorporateUser;
  onSellerProfileClick: (userId: number | string) => void;
  onStartConversationClick: (user: CorporateUser) => void;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value).replace('₺', '₺ ');
};

const ONE_HOUR_IN_MS = 60 * 60 * 1000;

const OfferListItem: React.FC<OfferListItemProps> = ({ offer, seller, onSellerProfileClick, onStartConversationClick }) => {
    const [isButtonActive, setIsButtonActive] = React.useState(false);
    
    React.useEffect(() => {
        const checkTime = () => {
            const timeSinceOffer = Date.now() - new Date(offer.createdAt).getTime();
            if (timeSinceOffer >= ONE_HOUR_IN_MS) {
                setIsButtonActive(true);
                return;
            }
            
            const timeUntilActive = ONE_HOUR_IN_MS - timeSinceOffer;
            const timerId = setTimeout(() => {
                setIsButtonActive(true);
            }, timeUntilActive);

            return () => clearTimeout(timerId);
        };

        return checkTime();
    }, [offer.createdAt]);

  return (
    <div className="rounded-lg border bg-slate-50 p-4 transition-shadow hover:shadow-md">
        <div className="flex items-start justify-between">
            <div 
                className="flex items-start space-x-3 cursor-pointer group"
                onClick={() => onSellerProfileClick(seller.id)}
            >
                <img 
                    src={seller.logo} 
                    alt={seller.companyName}
                    className="h-10 w-10 rounded-full object-contain"
                />
                <div>
                    <p className="font-semibold text-slate-900 group-hover:text-blue-600">{seller.companyName}</p>
                    {seller.rating && seller.reviewCount && seller.reviewCount > 0 ? (
                        <div className="flex items-center space-x-1">
                           <StarRating rating={seller.rating} size="sm" />
                           <span className="text-xs text-slate-500">{seller.rating.toFixed(1)} ({seller.reviewCount})</span>
                        </div>
                    ) : (
                        <p className="text-xs text-slate-500">Henüz değerlendirilmedi</p>
                    )}
                </div>
            </div>
             <p className="font-semibold text-blue-600">{formatCurrency(offer.amount)}</p>

        </div>
        {offer.message && (
            <p className="mt-3 pl-13 text-sm text-slate-600 border-t border-slate-200 pt-2">{offer.message}</p>
        )}
        <div className="mt-3 pl-13 flex justify-start">
             <button 
                onClick={() => onStartConversationClick(seller)}
                disabled={!isButtonActive}
                className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-100 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
                İlgileniyorum
            </button>
        </div>
    </div>
  );
};

export default OfferListItem;