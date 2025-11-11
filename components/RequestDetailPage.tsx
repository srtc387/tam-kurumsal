import React from 'react';
import { SupplyRequestItem, Offer, CorporateUser } from '../types';
import OfferListItem from './OfferListItem';
import Icon from './Icon';
import { formatPriceRange, formatQuantity } from '../utils';
import BotStatusPanel from './BotStatusPanel';

interface RequestDetailPageProps {
  request: SupplyRequestItem;
  offers: Offer[];
  users: CorporateUser[];
  onViewProfile: (userId: number | string) => void;
  onOfferNowClick: (request: SupplyRequestItem) => void;
  onStartConversation: (user: CorporateUser) => void;
  isMyRequest: boolean;
}

const RequestDetailPage: React.FC<RequestDetailPageProps> = ({ request, offers, users, onViewProfile, onOfferNowClick, onStartConversation, isMyRequest }) => {
  
  const renderOfferSection = () => {
    if (request.assistantManaged) {
      if (request.assistantStatus === 'recommendation_ready' || request.assistantStatus === 'complete') {
        const recommendedOffer = offers.find(o => o.status === 'accepted') || offers[0];
         if (!recommendedOffer) return null;
         const seller = users.find(u => u.id === recommendedOffer.sellerId);
         if (!seller) return null;
         
        return (
          <>
            <h2 className="text-xl font-bold text-slate-800">
              <span className="text-indigo-600">Asistan'ın Önerisi</span>
            </h2>
             <div className="mt-4 space-y-4">
                <OfferListItem 
                    key={recommendedOffer.id} 
                    offer={recommendedOffer} 
                    seller={seller}
                    onSellerProfileClick={onViewProfile} 
                    onStartConversationClick={onStartConversation}
                />
            </div>
             {request.assistantStatus === 'complete' && (
                <div className="mt-6 text-center">
                    <button className="rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700">
                        Pro-Forma Faturayı İndir
                    </button>
                </div>
             )}
          </>
        )
      }
      return null;
    }

    return (
      <>
        <h2 className="text-xl font-bold text-slate-800">Gelen Teklifler ({offers.length})</h2>
        {offers.length > 0 ? (
          <div className="mt-4 space-y-4">
            {offers.map(offer => {
              const seller = users.find(u => u.id === offer.sellerId);
              if (!seller) return null;
              return <OfferListItem 
                        key={offer.id} 
                        offer={offer} 
                        seller={seller}
                        onSellerProfileClick={onViewProfile} 
                        onStartConversationClick={onStartConversation}
                      />;
            })}
          </div>
        ) : (
          <div className="mt-4 rounded-lg border-2 border-dashed border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-500">Bu talep için henüz teklif yapılmadı. İlk teklifi siz verebilirsiniz!</p>
          </div>
        )}
      </>
    );
  };
  
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl rounded-xl border bg-white p-6 shadow-sm">
        <div className="relative">
            <img
              src={request.image}
              alt={request.title}
              className="h-64 w-full rounded-lg object-cover"
            />
        </div>

        <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">{request.title}</h1>
        <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
          <span>{request.timeAgo} yayınlandı</span>
          <span className="font-semibold text-blue-800">{request.offerCount} Teklif</span>
        </div>
        
        {request.assistantManaged && (
          <div className="mt-6">
            <BotStatusPanel status={request.assistantStatus} />
          </div>
        )}
        
        <div className="mt-6 border-t border-b border-slate-200 py-4">
            <h2 className="text-base font-semibold text-slate-700">Talep Detayları</h2>
            <p className="mt-1 text-sm text-slate-600">{request.description}</p>
             <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs font-semibold text-slate-500">MİKTAR (TOPLAM / MİN. SİPARİŞ)</p>
                    <p className="font-medium text-slate-800">{formatQuantity(request)}</p>
                </div>
                {request.deliveryDeadline && (
                    <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs font-semibold text-slate-500">
                           {request.isDeadlineFlexible ? 'YAKLAŞIK TESLİMAT TARİHİ' : 'TESLİMAT TARİHİ (EN GEÇ)'}
                        </p>
                        <p className="font-medium text-slate-800">
                            {new Date(request.deliveryDeadline).toLocaleDateString('tr-TR')}
                            {request.isDeadlineFlexible && <span className="ml-2 text-xs font-normal text-slate-500">(Esnek)</span>}
                        </p>
                    </div>
                )}
                 <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs font-semibold text-slate-500">LOJİSTİK DURUMU</p>
                    <div className="flex items-center space-x-2">
                        <Icon name="truck" className="h-4 w-4 text-slate-600" />
                        <p className="font-medium text-slate-800">
                           {request.logisticsIncluded ? 'Teklife nakliye dahildir' : 'Nakliye alıcıya aittir'}
                        </p>
                    </div>
                </div>
                 <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs font-semibold text-slate-500">ÖDEME KOŞULU</p>
                    <div className="flex items-center space-x-2">
                        <Icon name="credit-card" className="h-4 w-4 text-slate-600" />
                        <p className="font-medium text-slate-800">
                           {request.hasPaymentTerm ? 'Vadeli ödeme kabul edilir' : 'Peşin ödeme beklenmektedir'}
                        </p>
                    </div>
                </div>
                 <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs font-semibold text-slate-500">İADE POLİTİKASI</p>
                    <div className="flex items-center space-x-2">
                        <Icon name={request.isReturnable ? "check-circle" : "x-circle"} className={`h-4 w-4 ${request.isReturnable ? 'text-green-600' : 'text-red-600'}`} />
                        <p className="font-medium text-slate-800">
                           {request.isReturnable ? 'Ürün iadesi kabul edilir' : 'Ürün iadesi yoktur'}
                        </p>
                    </div>
                </div>
                 {request.certificationsRequired && (
                    <div className="rounded-lg bg-slate-50 p-3">
                        <p className="text-xs font-semibold text-slate-500">ARANAN SERTİFİKALAR</p>
                        <p className="font-medium text-slate-800">{request.certificationsRequired}</p>
                    </div>
                )}
            </div>
        </div>

         <div className="mt-4 flex items-center justify-between rounded-lg bg-blue-50 p-4">
            <div>
                <p className="text-sm font-medium text-slate-600">
                   Bütçe (Toplam / Min. Teklif)
                </p>
                <p className="text-xl font-bold text-blue-700">
                     {formatPriceRange(request)}
                </p>
            </div>
            {!isMyRequest && !request.assistantManaged && (
                 <button 
                    onClick={() => onOfferNowClick(request)}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                 >
                    Teklif Ver
                </button>
            )}
        </div>
        
        <div className="mt-8">
          {renderOfferSection()}
        </div>

      </div>
    </div>
  );
};

export default RequestDetailPage;