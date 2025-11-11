import React from 'react';
// FIX: Moved EnrichedOffer to types.ts to avoid circular dependencies.
import { Offer, EnrichedOffer } from '../types';
import OfferCard from './OfferCard';

interface OffersPageProps {
  allOffers: EnrichedOffer[];
  onViewProfile: (userId: number | string) => void;
  onRateOffer: (offer: Offer) => void;
}

type Tab = 'received' | 'sent';

const OffersPage: React.FC<OffersPageProps> = ({ allOffers, onViewProfile, onRateOffer }) => {
  const [activeTab, setActiveTab] = React.useState<Tab>('received');

  const receivedOffers = allOffers.filter(offer => !offer.isMyOffer);
  const sentOffers = allOffers.filter(offer => offer.isMyOffer);

  const offersToShow = activeTab === 'received' ? receivedOffers : sentOffers;

  const TabButton: React.FC<{ tabName: Tab; label: string }> = ({ tabName, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`w-full py-3 text-sm font-semibold transition-colors ${
        activeTab === tabName
          ? 'border-b-2 border-blue-600 text-blue-600'
          : 'border-b-2 border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-800">Tekliflerim</h1>
      
      <div className="mt-4 border-b border-slate-200">
        <div className="-mb-px flex">
          <TabButton tabName="received" label={`Gelen Teklifler (${receivedOffers.length})`} />
          <TabButton tabName="sent" label={`Verdiğim Teklifler (${sentOffers.length})`} />
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {offersToShow.length > 0 ? (
          offersToShow.map(offer => <OfferCard key={offer.id} offer={offer} onViewProfile={onViewProfile} onRateClick={onRateOffer}/>)
        ) : (
          <div className="rounded-xl border bg-white p-6 text-center text-slate-500 shadow-sm">
            <p>
              {activeTab === 'received'
                ? 'Henüz size gelen bir teklif yok.'
                : 'Henüz hiç teklif vermediniz.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersPage;