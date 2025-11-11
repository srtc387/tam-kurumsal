import React from 'react';
import { Offer, EnrichedOffer } from '../types';
import { formatCurrency } from '../utils';
import StarRating from './StarRating';
import Icon from './Icon';

interface OfferCardProps {
  offer: EnrichedOffer;
  onViewProfile: (userId: number | string) => void;
  onRateClick?: (offer: Offer) => void;
}

const StatusBadge: React.FC<{ status: EnrichedOffer['status'] }> = ({ status }) => {
    const statusStyles = {
        pending: 'bg-yellow-100 text-yellow-800',
        accepted: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
    };
    const statusText = {
        pending: 'Değerlendiriliyor',
        accepted: 'Kabul Edildi',
        rejected: 'Reddedildi',
    };
    return (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}>
            {statusText[status]}
        </span>
    );
};

const OfferCard: React.FC<OfferCardProps> = ({ offer, onViewProfile, onRateClick }) => {
  const canRate = !offer.isMyOffer && offer.status === 'accepted' && !offer.isRated && onRateClick;

  if (!offer.request || !offer.seller) {
    // Render a fallback or null if critical data is missing
    return (
         <div className="rounded-xl border bg-white p-4 shadow-sm opacity-50">
            <p className="text-sm text-slate-500">Bu teklife ait bilgiler yüklenemedi.</p>
        </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
        {/* Request Info */}
        <div className="flex items-center space-x-3 border-b border-slate-200 pb-3">
             <img 
                src={offer.request.image} 
                alt={offer.request.title} 
                className="h-12 w-12 flex-shrink-0 rounded-md object-cover bg-slate-100"
                onError={(e) => (e.currentTarget.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7')}
            />
            <div className="min-w-0">
                <p className="text-xs text-slate-500">Teklif yapılan talep:</p>
                <h4 className="truncate font-semibold text-slate-800">{offer.request.title}</h4>
            </div>
        </div>

        {/* Offer Details */}
        <div className="mt-3">
            <div className="flex items-start justify-between">
                {/* Seller/User Info */}
                <div 
                    className="flex items-center space-x-3 cursor-pointer group"
                    onClick={() => onViewProfile(offer.seller.id)}
                >
                    <img 
                        src={offer.seller.logo} 
                        alt={offer.seller.companyName}
                        className="h-10 w-10 rounded-full object-contain"
                    />
                    <div>
                        <p className="font-semibold text-slate-900 group-hover:text-blue-600">{offer.seller.companyName}</p>
                        {offer.seller.rating && (
                            <div className="flex items-center space-x-1">
                                <StarRating rating={offer.seller.rating} size="sm" />
                                <span className="text-xs text-slate-500">{offer.seller.rating.toFixed(1)}</span>
                            </div>
                        )}
                    </div>
                </div>
                 {/* Amount */}
                <div className="text-right">
                    <p className="font-bold text-blue-600 text-lg">{formatCurrency(offer.amount)}</p>
                </div>
            </div>

            {offer.image && (
                <div className="mt-3">
                    <img src={offer.image} alt="Teklif fotoğrafı" className="max-h-48 w-full rounded-lg object-cover" />
                </div>
            )}

            {offer.message && (
                <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                    <p><strong>Tedarikçi Notu:</strong> {offer.message}</p>
                </div>
            )}
        </div>

        {/* Actions / Status */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3">
             <StatusBadge status={offer.status} />

            {offer.isMyOffer ? (
                <div></div> // My own offer, no action needed here from my side
            ) : (
                <div className="flex items-center space-x-2">
                    {canRate && (
                         <button 
                            onClick={() => onRateClick(offer)}
                            className="rounded-md bg-yellow-400 px-3 py-1.5 text-xs font-semibold text-yellow-900 shadow-sm hover:bg-yellow-500">
                            Puan Ver
                        </button>
                    )}
                    {offer.status === 'pending' && (
                        <>
                            <button className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
                                Reddet
                            </button>
                            <button className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700">
                                Kabul Et
                            </button>
                        </>
                    )}
                </div>
            )}
        </div>
    </div>
  );
};

export default OfferCard;