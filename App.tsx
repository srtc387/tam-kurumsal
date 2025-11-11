import React from 'react';
import { SupplyRequestItem, CorporateUser, Offer, EnrichedOffer, LogisticsFilter, PaymentTermFilter } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import CreateRequestCard from './components/CreateRequestCard';
import RequestCard from './components/RequestCard';
import FloatingActionButton from './components/FloatingActionButton';
import FilterSortPanel from './components/FilterSortPanel';
import Icon from './components/Icon';
import OfferModal from './components/OfferModal';
import CreateRequestModal from './components/CreateRequestModal';
import ProfilePage from './components/ProfilePage';
import EditProfileModal from './components/EditProfileModal';
import OffersPage from './components/OffersPage';
import RequestDetailPage from './components/RequestDetailPage';
import StartConversationModal from './components/StartConversationModal';
import Footer from './components/Footer';
import RatingModal from './components/RatingModal';


const mockCorporates: CorporateUser[] = [
  { 
    id: 1, 
    companyName: 'Metro Grossmarket', 
    logo: 'https://i.imgur.com/gUTM5k2.png', 
    registrationDate: 'Aralık 2023', 
    industry: "Gıda & Toptan Satış", 
    isVerified: true,
    rating: 4.8,
    reviewCount: 24,
    entityType: 'legal',
    taxId: '6220022222',
    references: [
      { clientName: 'Hilton Otelleri', projectName: 'Gıda Tedariği Anlaşması' },
      { clientName: 'Acıbadem Hastaneleri', projectName: 'Sarf Malzeme Tedariği' },
    ]
  },
  { 
    id: 2, 
    companyName: 'Zorlu Center AVM', 
    logo: 'https://i.imgur.com/K1A4s1j.png', 
    registrationDate: 'Kasım 2023', 
    industry: "Perakende", 
    isVerified: true,
    rating: 4.5,
    reviewCount: 15,
    entityType: 'legal',
    taxId: '9998887776',
  },
  { 
    id: 3, 
    companyName: 'Maslak Oto Sanayi', 
    logo: 'https://i.imgur.com/M8A8pcy.png', 
    registrationDate: 'Ekim 2023', 
    industry: "Otomotiv", 
    isVerified: false, 
    reviewCount: 3, 
    rating: 3.9,
    entityType: 'sole',
    taxId: '12345678901'
  },
];

const mockSupplyRequests: SupplyRequestItem[] = [
  {
    id: 1,
    ownerId: 2,
    image: 'https://i.imgur.com/R3Q3g8d.jpeg',
    title: 'AVM için 5000 adet LED aydınlatma',
    timeAgo: '2 saat önce',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    description: 'AVM genel alanlarında kullanılmak üzere, 12W, 4000K, gün ışığı renginde, en az 2 yıl garantili 5000 adet LED spot lamba tedariği.',
    priceMin: 60000, // min offer
    priceMax: 250000, // total budget
    offerCount: 8,
    allowOffersOutsideRange: false,
    requiresPhotoInOffers: true,
    quantity: 5000,
    minOrderQuantity: 1000,
    unit: 'adet',
    deliveryDeadline: new Date('2024-09-01'),
    isDeadlineFlexible: false,
    certificationsRequired: 'CE, TSE',
    logisticsIncluded: true,
    hasPaymentTerm: true,
    isReturnable: true,
    assistantManaged: true,
    assistantStatus: 'searching',
  },
  {
    id: 2,
    ownerId: 1,
    image: 'https://i.imgur.com/9v4J1Y5.jpeg',
    title: 'Haftalık 2 Ton Taze Domates Tedariği',
    timeAgo: '4 saat önce',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    description: 'Grossmarket reyonları için haftalık düzenli olarak 2 ton, salkım tipi, organik sertifikalı taze domates alımı yapılacaktır. Uzun dönemli tedarikçi aranmaktadır.',
    priceMax: 65000,
    offerCount: 12,
    allowOffersOutsideRange: true,
    requiresPhotoInOffers: true,
    quantity: 2,
    unit: 'ton',
    certificationsRequired: 'Organik Tarım Sertifikası',
    logisticsIncluded: false,
    hasPaymentTerm: false,
    isReturnable: false,
  },
  {
    id: 3,
    ownerId: 3,
    image: 'https://i.imgur.com/D4PA6sY.jpeg',
    title: '10 Palet Motor Yağı (5W-30)',
    timeAgo: '6 saat önce',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    description: 'Sanayi dükkanları için 10 palet, tam sentetik, 5W-30 viskoziteli, bilinen markalara ait motor yağı. Varil veya 4 litrelik ambalajlarda olabilir.',
    priceMin: 50000,
    priceMax: 420000,
    offerCount: 5,
    allowOffersOutsideRange: false,
    requiresPhotoInOffers: false,
    quantity: 10,
    minOrderQuantity: 2,
    unit: 'palet',
    deliveryDeadline: new Date('2024-08-15'),
    isDeadlineFlexible: true,
    logisticsIncluded: true,
    hasPaymentTerm: true,
    isReturnable: false,
  },
   {
    id: 4,
    ownerId: 1,
    image: 'https://i.imgur.com/8Qp2j6y.jpeg',
    title: 'Ofisler için 100 Adet Ergonomik Sandalye',
    timeAgo: '1 gün önce',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    description: 'Yeni açılacak ofis katımız için 100 adet, bel destekli, ayarlanabilir kollu, fileli sırta sahip ergonomik ofis sandalyesi aranmaktadır.',
    priceMax: 150000,
    offerCount: 3,
    allowOffersOutsideRange: true,
    requiresPhotoInOffers: false,
    quantity: 100,
    unit: 'adet',
    logisticsIncluded: false,
    hasPaymentTerm: false,
    isReturnable: true,
  },
];

const mockOffers: Offer[] = [
    {
      id: 1,
      requestId: 1,
      sellerId: 1,
      amount: 235000,
      status: 'pending',
      message: 'Merhaba, istenilen özelliklerde, 3 yıl garantili Philips marka LED spotları sağlayabiliriz. Stoklarımızda mevcuttur.',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), 
      image: 'https://i.imgur.com/R3Q3g8d.jpeg',
    },
    {
      id: 2,
      requestId: 2,
      sellerId: 3, 
      amount: 62000,
      status: 'accepted',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      isRated: false,
    },
    {
      id: 3,
      requestId: 3,
      sellerId: 2, 
      amount: 400000,
      status: 'pending',
      message: 'Elimizde Castrol marka, 4 litrelik ambalajlarda 10 palet 5W-30 yağ mevcuttur. Hemen teslim edebiliriz.',
      createdAt: new Date(Date.now() - 30 * 60 * 1000), 
      image: 'https://i.imgur.com/D4PA6sY.jpeg',
    },
     {
      id: 4,
      requestId: 4,
      sellerId: 2, 
      amount: 170000,
      status: 'rejected',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), 
    },
    {
      id: 5,
      requestId: 1,
      sellerId: 3,
      amount: 245000,
      status: 'accepted',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), 
      isRated: true,
    }
];

const CURRENT_USER_ID = 1;
const ITEMS_PER_PAGE = 5;

const App: React.FC = () => {
  const [supplyRequests, setSupplyRequests] = React.useState<SupplyRequestItem[]>(mockSupplyRequests);
  const [offers, setOffers] = React.useState<Offer[]>(mockOffers);
  const [users, setUsers] = React.useState<CorporateUser[]>(mockCorporates);
  const [showFilters, setShowFilters] = React.useState(false);

  // Active filters
  const [activeSortKey, setActiveSortKey] = React.useState('newest');
  const [activePriceRange, setActivePriceRange] = React.useState({ min: '', max: '' });
  const [activeSearchTerm, setActiveSearchTerm] = React.useState('');
  const [activeLogisticsFilter, setActiveLogisticsFilter] = React.useState<LogisticsFilter>('all');
  const [activePaymentTermFilter, setActivePaymentTermFilter] = React.useState<PaymentTermFilter>('all');

  // Staged filters
  const [stagedSortKey, setStagedSortKey] = React.useState('newest');
  const [stagedPriceRange, setStagedPriceRange] = React.useState({ min: '', max: '' });
  const [stagedSearchTerm, setStagedSearchTerm] = React.useState('');
  const [stagedLogisticsFilter, setStagedLogisticsFilter] = React.useState<LogisticsFilter>('all');
  const [stagedPaymentTermFilter, setStagedPaymentTermFilter] = React.useState<PaymentTermFilter>('all');


  const [currentPage, setCurrentPage] = React.useState(1);
  const [isOfferModalOpen, setIsOfferModalOpen] = React.useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isConversationModalOpen, setIsConversationModalOpen] = React.useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = React.useState(false);
  const [requestForOffer, setRequestForOffer] = React.useState<SupplyRequestItem | null>(null);
  const [conversationTargetUser, setConversationTargetUser] = React.useState<CorporateUser | null>(null);
  const [offerToRate, setOfferToRate] = React.useState<Offer | null>(null);
  const [view, setView] = React.useState<{ page: string; id?: number | string }>({ page: 'home' });
  const [currentUser, setCurrentUser] = React.useState<CorporateUser>(users.find(u => u.id === CURRENT_USER_ID)!);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = React.useState(false);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeSortKey, activePriceRange, activeSearchTerm, activeLogisticsFilter, activePaymentTermFilter]);

  React.useEffect(() => {
    const assistantManagedRequest = supplyRequests.find(r => r.id === 1 && r.assistantManaged);
    if (assistantManagedRequest && assistantManagedRequest.assistantStatus !== 'complete') {
        const statuses: SupplyRequestItem['assistantStatus'][] = ['searching', 'collecting', 'analyzing', 'recommendation_ready', 'complete'];
        const currentStatusIndex = statuses.indexOf(assistantManagedRequest.assistantStatus);
        if (currentStatusIndex < statuses.length - 1) {
            const nextStatus = statuses[currentStatusIndex + 1];
            const delay = 5000 + Math.random() * 3000;
            const timer = setTimeout(() => {
                setSupplyRequests(prev => prev.map(r => 
                    r.id === 1 ? { ...r, assistantStatus: nextStatus } : r
                ));
            }, delay);
            return () => clearTimeout(timer);
        }
    }
  }, [supplyRequests]);

  const displayedRequests = React.useMemo(() => {
    let filtered = [...supplyRequests];

    if (activeSearchTerm.trim() !== '') {
        const lowercasedTerm = activeSearchTerm.toLowerCase();
        filtered = filtered.filter(r => 
            r.title.toLowerCase().includes(lowercasedTerm) || 
            r.description.toLowerCase().includes(lowercasedTerm)
        );
    }

    const minPrice = parseFloat(activePriceRange.min);
    const maxPrice = parseFloat(activePriceRange.max);
    if (!isNaN(minPrice)) {
      filtered = filtered.filter(r => (r.priceMax ?? Infinity) >= minPrice);
    }
    if (!isNaN(maxPrice)) {
      filtered = filtered.filter(r => (r.priceMin ?? 0) <= maxPrice);
    }
    
    if (activeLogisticsFilter !== 'all') {
        const mustIncludeLogistics = activeLogisticsFilter === 'included';
        filtered = filtered.filter(r => r.logisticsIncluded === mustIncludeLogistics);
    }
    
    if (activePaymentTermFilter !== 'all') {
        const mustHavePaymentTerm = activePaymentTermFilter === 'term';
        filtered = filtered.filter(r => r.hasPaymentTerm === mustHavePaymentTerm);
    }

    switch (activeSortKey) {
      case 'price_asc':
        filtered.sort((a, b) => (a.priceMax ?? 0) - (b.priceMax ?? 0));
        break;
      case 'price_desc':
        filtered.sort((a, b) => (b.priceMax ?? Infinity) - (a.priceMax ?? Infinity));
        break;
      case 'offers_desc':
        filtered.sort((a, b) => b.offerCount - a.offerCount);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
    }

    return filtered;
  }, [supplyRequests, activeSortKey, activePriceRange, activeSearchTerm, activeLogisticsFilter, activePaymentTermFilter]);

  const handleApplyFilters = () => {
    setActiveSortKey(stagedSortKey);
    setActivePriceRange(stagedPriceRange);
    setActiveSearchTerm(stagedSearchTerm);
    setActiveLogisticsFilter(stagedLogisticsFilter);
    setActivePaymentTermFilter(stagedPaymentTermFilter);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setStagedSortKey('newest');
    setStagedPriceRange({ min: '', max: '' });
    setStagedSearchTerm('');
    setStagedLogisticsFilter('all');
    setStagedPaymentTermFilter('all');
    setActiveSortKey('newest');
    setActivePriceRange({ min: '', max: '' });
    setActiveSearchTerm('');
    setActiveLogisticsFilter('all');
    setActivePaymentTermFilter('all');
  };
  
  const handleClearStagedSearchTerm = () => {
      setStagedSearchTerm('');
  };

  const handlePriceRangeChange = (field: 'min' | 'max', value: string) => {
    setStagedPriceRange(prev => ({ ...prev, [field]: value }));
  };

  const handleOpenOfferModal = (request: SupplyRequestItem) => {
    setRequestForOffer(request);
    setIsOfferModalOpen(true);
  };
  const handleCloseOfferModal = () => {
    setIsOfferModalOpen(false);
    setTimeout(() => setRequestForOffer(null), 300);
  };

  const handleSubmitOffer = (offer: { amount: string; message: string; image?: string }) => {
    if (!requestForOffer) return;
    console.log(`Offer submitted for request ID ${requestForOffer.id}:`, offer);
    alert(`Tedarik teklifiniz başarıyla gönderildi!`);
    handleCloseOfferModal();
  };

  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  const handleCreateRequest = (newRequestData: Omit<SupplyRequestItem, 'id' | 'timeAgo' | 'createdAt' | 'offerCount' | 'ownerId'>) => {
    const newId = supplyRequests.length > 0 ? Math.max(...supplyRequests.map(r => r.id)) + 1 : 1;
    const requestToAdd: SupplyRequestItem = {
      ...newRequestData,
      id: newId,
      ownerId: CURRENT_USER_ID,
      timeAgo: 'şimdi',
      createdAt: new Date(),
      offerCount: 0,
      assistantStatus: newRequestData.assistantManaged ? 'searching' : undefined,
    };
    setSupplyRequests(prev => [requestToAdd, ...prev]);
    handleCloseCreateModal();
    alert('Tedarik talebiniz başarıyla yayınlandı! Şimdi size özel teklifleri bekleyin.');
  };

  const handleOpenEditProfileModal = () => setIsEditProfileModalOpen(true);
  const handleCloseEditProfileModal = () => setIsEditProfileModalOpen(false);

  const handleUpdateProfile = (updatedUser: { name: string; avatar: string | null; entityType: 'legal' | 'sole'; taxId: string; }) => {
    const updatedUserData = {
      companyName: updatedUser.name,
      logo: updatedUser.avatar ?? currentUser.logo,
      entityType: updatedUser.entityType,
      taxId: updatedUser.taxId,
    };
    setCurrentUser(prev => ({ ...prev, ...updatedUserData }));
    setUsers(prevUsers => prevUsers.map(u => 
      u.id === CURRENT_USER_ID ? { ...u, ...updatedUserData } : u
    ));
    handleCloseEditProfileModal();
    alert('Kurum profiliniz başarıyla güncellendi!');
  };

  const handleNavigate = (page: string) => setView({ page });
  const handleViewDetail = (requestId: number) => setView({ page: 'requestDetail', id: requestId });
  const handleViewProfile = (userId: number | string) => setView({ page: 'profile', id: userId });
  const handleGoBack = () => setView({ page: 'home' });

  const handleOpenConversationModal = (user: CorporateUser) => {
    setConversationTargetUser(user);
    setIsConversationModalOpen(true);
  };
  const handleCloseConversationModal = () => {
    setIsConversationModalOpen(false);
    setConversationTargetUser(null);
  };
  const handleSendMessage = (message: string) => {
    if (!conversationTargetUser) return;
    console.log(`Message to ${conversationTargetUser.companyName}: "${message}"`);
    alert(`${conversationTargetUser.companyName} adlı kuruma mesajınız gönderildi.`);
    handleCloseConversationModal();
  };

  const handleOpenRatingModal = (offer: Offer) => {
    setOfferToRate(offer);
    setIsRatingModalOpen(true);
  };
  const handleCloseRatingModal = () => {
    setIsRatingModalOpen(false);
    setOfferToRate(null);
  };
  const handleSubmitRating = ({ rating, comment }: { rating: number; comment: string }) => {
      if (!offerToRate) return;
      setUsers(prevUsers => prevUsers.map(user => {
          if (user.id === offerToRate.sellerId) {
              const oldRatingTotal = (user.rating ?? 0) * (user.reviewCount ?? 0);
              const newReviewCount = (user.reviewCount ?? 0) + 1;
              const newAverageRating = (oldRatingTotal + rating) / newReviewCount;
              return { ...user, rating: parseFloat(newAverageRating.toFixed(1)), reviewCount: newReviewCount };
          }
          return user;
      }));
      setOffers(prevOffers => prevOffers.map(o => o.id === offerToRate.id ? { ...o, isRated: true } : o));
      console.log(`Rating for offer ${offerToRate.id}: ${rating} stars, comment: "${comment}"`);
      alert('Değerlendirmeniz için teşekkür ederiz!');
      handleCloseRatingModal();
  };

  const handleLoadMore = () => setCurrentPage(prev => prev + 1);

  const renderHomeView = () => {
    const itemsToShow = displayedRequests.slice(0, currentPage * ITEMS_PER_PAGE);
    return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        <CreateRequestCard onCreateClick={handleOpenCreateModal} />
      </div>
      <div className="px-4 sm:px-6 lg:p-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Aktif Tedarik Talepleri</h2>
          <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-1.5 rounded-full border bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Icon name="filter" className="h-4 w-4 text-slate-600" />
                <span>Filtrele & Sırala</span>
              </button>
          </div>
        </div>
        
        {showFilters && (
          <FilterSortPanel
            sortKey={stagedSortKey} onSortKeyChange={setStagedSortKey}
            priceRange={stagedPriceRange} onPriceRangeChange={handlePriceRangeChange}
            searchTerm={stagedSearchTerm} onSearchTermChange={setStagedSearchTerm}
            logisticsFilter={stagedLogisticsFilter} onLogisticsFilterChange={setStagedLogisticsFilter}
            paymentTermFilter={stagedPaymentTermFilter} onPaymentTermFilterChange={setStagedPaymentTermFilter}
            onApply={handleApplyFilters} onClear={handleClearFilters}
            onClearSearch={handleClearStagedSearchTerm}
          />
        )}

        <div className="space-y-4">
          {itemsToShow.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              onViewDetail={handleViewDetail}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
            {itemsToShow.length < displayedRequests.length && (
                <button
                    onClick={handleLoadMore}
                    className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Daha Fazla Göster
                </button>
            )}
            {displayedRequests.length > 0 && itemsToShow.length === displayedRequests.length && (
                <p className="text-slate-500">Tüm sonuçlar bunlar.</p>
            )}
            {displayedRequests.length === 0 && (
                 <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
                    <p className="font-semibold text-slate-700">Bu kriterlere uyan bir talep bulunamadı.</p>
                    <p className="mt-1">Farklı filtreler deneyerek aradığınızı bulun!</p>
                  </div>
            )}
        </div>
      </div>
    </>
  );
}

  const renderContent = () => {
    switch (view.page) {
      case 'home':
        return renderHomeView();
      case 'requestDetail': {
        const request = supplyRequests.find(r => r.id === view.id);
        if (!request) return <div>Talep bulunamadı.</div>;
        const requestOffers = offers.filter(o => o.requestId === request.id);
        return <RequestDetailPage 
                  request={request}
                  offers={requestOffers}
                  users={users}
                  onViewProfile={handleViewProfile}
                  onOfferNowClick={handleOpenOfferModal}
                  isMyRequest={request.ownerId === CURRENT_USER_ID}
                  onStartConversation={handleOpenConversationModal}
               />;
      }
      case 'offers': {
          const myRequestIds = supplyRequests.filter(r => r.ownerId === CURRENT_USER_ID).map(r => r.id);
          const receivedOffers = offers.filter(o => myRequestIds.includes(o.requestId));
          const sentOffers = offers.filter(o => o.sellerId === CURRENT_USER_ID);

          const allOfferData: EnrichedOffer[] = [...receivedOffers, ...sentOffers]
            .map(offer => {
                const request = supplyRequests.find(r => r.id === offer.requestId);
                const seller = users.find(u => u.id === offer.sellerId);
                // If request or seller is not found (e.g., deleted), filter out this offer
                if (!request || !seller) {
                    return null;
                }
                return {
                    ...offer,
                    request,
                    seller,
                    isMyOffer: offer.sellerId === CURRENT_USER_ID,
                };
            })
            .filter((offer): offer is EnrichedOffer => offer !== null);

        return <OffersPage allOffers={allOfferData} onViewProfile={handleViewProfile} onRateOffer={handleOpenRatingModal} />;
      }
      case 'profile': {
        const profileId = view.id ?? CURRENT_USER_ID;
        const userToView = users.find(u => u.id === profileId);
        if (!userToView) return <div>Kurum bulunamadı.</div>;
        return <ProfilePage 
                  user={userToView} 
                  onEditClick={handleOpenEditProfileModal}
                  isCurrentUser={userToView.id === CURRENT_USER_ID}
               />;
      }
      default:
         return <div className="p-8 text-center text-slate-500"><h2 className="text-xl font-bold">Yakında Burada</h2></div>;
    }
  };

  return (
    <div className="font-sans">
      <Header
        onProfileClick={() => handleViewProfile(CURRENT_USER_ID)}
        showBackButton={view.page !== 'home'}
        onBackClick={handleGoBack}
      />
      <main className="mx-auto max-w-4xl py-4 pb-24">
        {renderContent()}
      </main>
      <Footer />
      <div className="md:hidden">
        {view.page === 'home' && <FloatingActionButton onClick={handleOpenCreateModal} />}
        <BottomNav 
          currentView={view.page}
          onNavigate={handleNavigate}
          onTalepClick={handleOpenCreateModal} 
        />
      </div>
      <OfferModal
        isOpen={isOfferModalOpen}
        onClose={handleCloseOfferModal}
        onSubmit={handleSubmitOffer}
        request={requestForOffer}
      />
      <CreateRequestModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onSubmit={handleCreateRequest}
      />
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={handleCloseEditProfileModal}
        onSubmit={handleUpdateProfile}
        currentUser={currentUser}
      />
      <StartConversationModal
        isOpen={isConversationModalOpen}
        onClose={handleCloseConversationModal}
        onSubmit={handleSendMessage}
        targetUser={conversationTargetUser}
      />
       <RatingModal
        isOpen={isRatingModalOpen}
        onClose={handleCloseRatingModal}
        onSubmit={handleSubmitRating}
        seller={users.find(u => u.id === offerToRate?.sellerId) ?? null}
      />
    </div>
  );
};

export default App;