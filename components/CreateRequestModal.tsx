import React from 'react';
import { SupplyRequestItem } from '../types';
import Icon from './Icon';

interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newRequest: Omit<SupplyRequestItem, 'id' | 'timeAgo' | 'createdAt' | 'offerCount' | 'ownerId'>) => void;
}

const CreateRequestModal: React.FC<CreateRequestModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [priceMin, setPriceMin] = React.useState('');
  const [priceMax, setPriceMax] = React.useState('');
  const [image, setImage] = React.useState<string | null>(null);
  const [allowOffersOutsideRange, setAllowOffersOutsideRange] = React.useState(true);
  const [requiresPhotoInOffers, setRequiresPhotoInOffers] = React.useState(false);
  
  // B2B Fields
  const [quantity, setQuantity] = React.useState('');
  const [minOrderQuantity, setMinOrderQuantity] = React.useState('');
  const [unit, setUnit] = React.useState<'adet' | 'kg' | 'ton' | 'koli' | 'palet'>('adet');
  const [deliveryDeadline, setDeliveryDeadline] = React.useState('');
  const [isDeadlineFlexible, setIsDeadlineFlexible] = React.useState(false);
  const [certificationsRequired, setCertificationsRequired] = React.useState('');
  const [logisticsIncluded, setLogisticsIncluded] = React.useState(false);
  const [hasPaymentTerm, setHasPaymentTerm] = React.useState(false);
  const [isReturnable, setIsReturnable] = React.useState(false);
  
  // TAM Assistant Field
  const [assistantManaged, setAssistantManaged] = React.useState(false);


  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriceMin('');
    setPriceMax('');
    setImage(null);
    setAllowOffersOutsideRange(true);
    setRequiresPhotoInOffers(false);
    setQuantity('');
    setMinOrderQuantity('');
    setUnit('adet');
    setDeliveryDeadline('');
    setIsDeadlineFlexible(false);
    setCertificationsRequired('');
    setLogisticsIncluded(false);
    setHasPaymentTerm(false);
    setIsReturnable(false);
    setAssistantManaged(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  React.useEffect(() => {
    if (!isOpen) {
      setTimeout(resetForm, 300);
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
    if (!title || !description || !image) {
      alert('Lütfen Talep Başlığı, Talep Detayları ve Fotoğraf alanlarını doldurun.');
      return;
    }
    onSubmit({
      title,
      description,
      priceMin: priceMin ? parseFloat(priceMin) : undefined,
      priceMax: priceMax ? parseFloat(priceMax) : undefined,
      image,
      allowOffersOutsideRange,
      requiresPhotoInOffers,
      quantity: quantity ? parseInt(quantity, 10) : undefined,
      minOrderQuantity: minOrderQuantity ? parseInt(minOrderQuantity, 10) : undefined,
      unit,
      deliveryDeadline: deliveryDeadline ? new Date(deliveryDeadline) : undefined,
      isDeadlineFlexible,
      certificationsRequired: certificationsRequired || undefined,
      logisticsIncluded,
      hasPaymentTerm,
      isReturnable,
      assistantManaged,
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      aria-labelledby="create-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative mx-4 w-full max-w-lg transform rounded-xl bg-white p-6 text-left shadow-xl transition-all">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold leading-6 text-slate-900" id="create-modal-title">
            Yeni Tedarik Talebi Oluştur
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600" aria-label="Kapat">
            <Icon name="plus" className="h-6 w-6 rotate-45" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 max-h-[75vh] overflow-y-auto pr-2">
           <div>
            <label className="block text-sm font-medium text-slate-700">Örnek Ürün Fotoğrafı</label>
            <div
              className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 pt-5 pb-6 transition-colors hover:border-blue-500 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {image ? (
                <img src={image} alt="Preview" className="max-h-48 rounded-lg object-contain" />
              ) : (
                <div className="space-y-1 text-center">
                  <Icon name="photo" className="mx-auto h-12 w-12 text-slate-400" />
                  <p className="text-sm text-slate-600">
                    Bir fotoğraf yüklemek için tıklayın
                  </p>
                  <p className="text-xs text-slate-500">PNG veya JPG</p>
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
            <label htmlFor="request-title" className="block text-sm font-medium text-slate-700">Talep Başlığı</label>
            <input
              type="text"
              id="request-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Örn: Restoran için 2 Ton Domates"
            />
          </div>

          <div>
            <label htmlFor="request-description" className="block text-sm font-medium text-slate-700">Talep Detayları</label>
            <textarea
              id="request-description"
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Ürün cinsi, marka, kalite, paketleme gibi aradığınız özellikleri ve diğer detayları belirtin."
            ></textarea>
          </div>
          
           <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
             <div className="sm:col-span-2">
                <label htmlFor="quantity" className="block text-sm font-medium text-slate-700">Toplam Miktar</label>
                <input type="number" id="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="5000" />
             </div>
             <div>
                <label htmlFor="unit" className="block text-sm font-medium text-slate-700">Birim</label>
                <select id="unit" value={unit} onChange={e => setUnit(e.target.value as 'adet'|'kg'|'ton'|'koli'|'palet')} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    <option value="adet">Adet</option>
                    <option value="kg">Kilogram</option>
                    <option value="ton">Ton</option>
                    <option value="koli">Koli</option>
                    <option value="palet">Palet</option>
                </select>
             </div>
          </div>

           <div>
              <label htmlFor="min-order-quantity" className="block text-sm font-medium text-slate-700">Minimum Sipariş Miktarı (Opsiyonel)</label>
              <input type="number" id="min-order-quantity" value={minOrderQuantity} onChange={e => setMinOrderQuantity(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="500 (Tedarikçi en az bu kadar satmalı)" />
           </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Bütçe (Opsiyonel)</label>
            <div className="mt-1 flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min. Teklif Değeri"
                aria-label="Minimum Teklif Değeri"
                value={priceMin}
                onChange={e => setPriceMin(e.target.value)}
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <span className="text-slate-500">-</span>
              <input
                type="number"
                placeholder="Toplam Bütçe (Maks.)"
                aria-label="Toplam Bütçe"
                value={priceMax}
                onChange={e => setPriceMax(e.target.value)}
                className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="delivery-deadline" className="block text-sm font-medium text-slate-700">Teslimat Tarihi (En Geç)</label>
                <input type="date" id="delivery-deadline" value={deliveryDeadline} onChange={e => setDeliveryDeadline(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="certifications" className="block text-sm font-medium text-slate-700">Aranan Sertifikalar (Opsiyonel)</label>
                <input type="text" id="certifications" value={certificationsRequired} onChange={e => setCertificationsRequired(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="ISO 9001, Helal vb." />
              </div>
          </div>
          
          <div className="space-y-3 pt-2">
               <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                <div>
                  <label className="font-medium text-slate-700 text-sm">
                    Ürün iadesi kabul ediliyor
                  </label>
                  <p className="text-xs text-slate-500">Açıksa, ürünlerin iade edilebilir olduğu belirtilir.</p>
                </div>
                <button type="button" onClick={() => setIsReturnable(!isReturnable)} className={`${ isReturnable ? 'bg-blue-600' : 'bg-slate-200' } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`} role="switch" aria-checked={isReturnable}>
                  <span aria-hidden="true" className={`${ isReturnable ? 'translate-x-5' : 'translate-x-0' } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                </button>
              </div>
               <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                <div>
                  <label className="font-medium text-slate-700 text-sm">
                    Lojistik/Nakliye Dahil
                  </label>
                  <p className="text-xs text-slate-500">Açıksa, nakliye bedelinin teklife dahil edilmesi beklenir.</p>
                </div>
                <button type="button" onClick={() => setLogisticsIncluded(!logisticsIncluded)} className={`${ logisticsIncluded ? 'bg-blue-600' : 'bg-slate-200' } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`} role="switch" aria-checked={logisticsIncluded}>
                  <span aria-hidden="true" className={`${ logisticsIncluded ? 'translate-x-5' : 'translate-x-0' } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                </button>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                <div>
                  <label className="font-medium text-slate-700 text-sm">
                    Vadeli Ödeme Seçeneği Sunuluyor
                  </label>
                  <p className="text-xs text-slate-500">Açıksa, tedarikçiler vadeli ödeme koşullarıyla teklif verebilir.</p>
                </div>
                <button type="button" onClick={() => setHasPaymentTerm(!hasPaymentTerm)} className={`${ hasPaymentTerm ? 'bg-blue-600' : 'bg-slate-200' } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`} role="switch" aria-checked={hasPaymentTerm}>
                  <span aria-hidden="true" className={`${ hasPaymentTerm ? 'translate-x-5' : 'translate-x-0' } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                </button>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                <div>
                  <label className="font-medium text-slate-700 text-sm">
                    Teslimat tarihi esnek mi?
                  </label>
                  <p className="text-xs text-slate-500">Açıksa, tedarikçiler bu tarihe yakın teslimatlar önerebilir.</p>
                </div>
                <button type="button" onClick={() => setIsDeadlineFlexible(!isDeadlineFlexible)} className={`${ isDeadlineFlexible ? 'bg-blue-600' : 'bg-slate-200' } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`} role="switch" aria-checked={isDeadlineFlexible}>
                  <span aria-hidden="true" className={`${ isDeadlineFlexible ? 'translate-x-5' : 'translate-x-0' } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                </button>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                <div>
                  <label className="font-medium text-slate-700 text-sm">
                    Bütçe aralığı dışındaki tekliflere izin ver
                  </label>
                  <p className="text-xs text-slate-500">Kapalıysa, tedarikçiler sadece bu aralıkta teklif verebilir.</p>
                </div>
                <button type="button" onClick={() => setAllowOffersOutsideRange(!allowOffersOutsideRange)} className={`${ allowOffersOutsideRange ? 'bg-blue-600' : 'bg-slate-200' } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`} role="switch" aria-checked={allowOffersOutsideRange}>
                  <span aria-hidden="true" className={`${ allowOffersOutsideRange ? 'translate-x-5' : 'translate-x-0' } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                </button>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                <div>
                  <label className="font-medium text-slate-700 text-sm">
                    Tekliflerde fotoğraf gönderilmesini zorunlu tut
                  </label>
                  <p className="text-xs text-slate-500">Açıksa, tedarikçiler tekliflerine ürün fotoğrafı eklemek zorunda kalır.</p>
                </div>
                <button type="button" onClick={() => setRequiresPhotoInOffers(!requiresPhotoInOffers)} className={`${ requiresPhotoInOffers ? 'bg-blue-600' : 'bg-slate-200' } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`} role="switch" aria-checked={requiresPhotoInOffers}>
                  <span aria-hidden="true" className={`${ requiresPhotoInOffers ? 'translate-x-5' : 'translate-x-0' } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                </button>
              </div>
          </div>
          
           {/* TAM Asistan Section */}
           <div className="space-y-3 pt-4 border-t border-slate-200">
               <div className="flex items-start justify-between rounded-lg bg-indigo-50 border border-indigo-200 p-4">
                  <div className="flex-grow">
                     <div className="flex items-center space-x-2">
                         <Icon name="bot" className="h-5 w-5 text-indigo-600" />
                         <label className="font-semibold text-indigo-800">
                           TAM Asistan'ı Aktif Et
                         </label>
                     </div>
                     <p className="text-xs text-indigo-700 mt-1">
                       Yapay zeka asistanımız en iyi tedarikçileri bulsun, teklifleri analiz etsin ve size en uygun olanı önererek süreci sizin için yönetsin.
                       <br/>
                       <span className="font-semibold">Hizmet bedeli, kabul edilen teklif üzerinden %2'dir.</span>
                     </p>
                  </div>
                  <button type="button" onClick={() => setAssistantManaged(!assistantManaged)} className={`${ assistantManaged ? 'bg-indigo-600' : 'bg-slate-200' } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`} role="switch" aria-checked={assistantManaged}>
                     <span aria-hidden="true" className={`${ assistantManaged ? 'translate-x-5' : 'translate-x-0' } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                  </button>
               </div>
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
              Talebi Yayınla
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequestModal;