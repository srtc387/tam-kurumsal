import React from 'react';
import { SupplyRequestItem } from '../types';
import Icon from './Icon';
import { formatPriceRange, formatCurrency } from '../utils';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (offer: { amount: string; message: string, image?: string }) => void;
  request: SupplyRequestItem | null;
}

const OfferModal: React.FC<OfferModalProps> = ({ isOpen, onClose, onSubmit, request }) => {
  const [amount, setAmount] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [image, setImage] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);


  React.useEffect(() => {
    if (!isOpen) {
      setAmount('');
      setMessage('');
      setImage(null);
       if (fileInputRef.current) {
         fileInputRef.current.value = '';
       }
    }
  }, [isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request) return;

    if (request.requiresPhotoInOffers && !image) {
        alert('Bu talep için teklifinize bir fotoğraf eklemeniz zorunludur.');
        return;
    }

    const offerAmount = parseFloat(amount);
    if (isNaN(offerAmount) || offerAmount <= 0) {
      alert('Lütfen geçerli bir teklif tutarı girin.');
      return;
    }
    
    // Check against minimum offer value if specified
    if (request.priceMin && offerAmount < request.priceMin) {
        alert(`Teklifiniz, alıcının beklediği minimum teklif tutarının (${formatCurrency(request.priceMin)}) altında. Lütfen teklifinizi gözden geçirin.`);
        return;
    }

    if (!request.allowOffersOutsideRange) {
      // Check against total budget if specified
      const { priceMax } = request;
      const isTooHigh = priceMax !== undefined && offerAmount > priceMax;

      if (isTooHigh) {
        alert(
          `Teklifiniz, bu talep için belirlenen toplam bütçeyi (${formatCurrency(priceMax)}) aşıyor ve aralık dışı tekliflere izin verilmiyor.`
        );
        return; 
      }
    }
    
    onSubmit({ amount, message, image: image ?? undefined });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative mx-4 w-full max-w-md transform rounded-xl bg-white p-6 text-left shadow-xl transition-all">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold leading-6 text-slate-900" id="modal-title">
            Tedarik Teklifi Oluştur
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
            aria-label="Kapat"
          >
            <Icon name="plus" className="h-6 w-6 rotate-45" />
          </button>
        </div>
        
        {request && (
             <div className="mt-4 border-t border-slate-200 pt-4">
                <p className="text-sm font-semibold text-slate-800">{request.title}</p>
                <p className="mt-1 text-sm text-slate-500">
                    Alıcı Bütçesi: {formatPriceRange(request)}
                </p>
                 {request.priceMin && 
                    <p className="mt-1 text-xs text-slate-500">
                        (Minimum teklif beklentisi: {formatCurrency(request.priceMin)})
                    </p>
                 }
            </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
           <div>
            <label className="block text-sm font-medium text-slate-700">{request?.requiresPhotoInOffers ? "Ürün Fotoğrafı Ekle (Zorunlu)" : "Ürün Fotoğrafı Ekle (İsteğe Bağlı)"}</label>
            <div
              className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 pt-5 pb-6 transition-colors hover:border-blue-500 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {image ? (
                <img src={image} alt="Preview" className="max-h-32 rounded-lg object-contain" />
              ) : (
                <div className="space-y-1 text-center">
                  <Icon name="photo" className="mx-auto h-10 w-10 text-slate-400" />
                  <p className="text-xs text-slate-600">
                    Bir fotoğraf yüklemek için tıklayın
                  </p>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/png, image/jpeg"
            />
          </div>

          <div>
            <label htmlFor="offer-amount" className="block text-sm font-medium text-slate-700">
              Teklifiniz (₺)
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <input
                    type="number"
                    name="offer-amount"
                    id="offer-amount"
                    className="block w-full rounded-md border-slate-300 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="0.00"
                    aria-describedby="price-currency"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-slate-500 sm:text-sm" id="price-currency">
                        TRY
                    </span>
                </div>
            </div>
          </div>
          <div>
            <label htmlFor="offer-message" className="block text-sm font-medium text-slate-700">
              Talep sahibine notunuz (İsteğe bağlı)
            </label>
            <textarea
              id="offer-message"
              name="offer-message"
              rows={3}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Ürünün durumu, teslimat koşulları gibi konularda ek bilgi verebilirsiniz."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
              Teklifi Gönder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferModal;