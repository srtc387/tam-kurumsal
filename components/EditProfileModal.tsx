import React from 'react';
import { CorporateUser } from '../types';
import Icon from './Icon';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedUser: { name: string; avatar: string | null; entityType: 'legal' | 'sole'; taxId: string; }) => void;
  currentUser: CorporateUser;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, onSubmit, currentUser }) => {
  const [name, setName] = React.useState(currentUser.companyName);
  const [avatar, setAvatar] = React.useState<string | null>(null);
  const [entityType, setEntityType] = React.useState<'legal' | 'sole'>(currentUser.entityType);
  const [taxId, setTaxId] = React.useState(currentUser.taxId);
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.companyName);
      setEntityType(currentUser.entityType);
      setTaxId(currentUser.taxId);
      setAvatar(null); // Reset avatar preview on open
    }
  }, [isOpen, currentUser]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taxId.trim()) {
        alert('Vergi numarası alanı zorunludur.');
        return;
    }
    onSubmit({ name, avatar, entityType, taxId });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity"
      aria-labelledby="edit-profile-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative mx-4 w-full max-w-md transform rounded-xl bg-white p-6 text-left shadow-xl transition-all">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold leading-6 text-slate-900" id="edit-profile-title">
            Kurum Profilini Düzenle
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600" aria-label="Kapat">
            <Icon name="plus" className="h-6 w-6 rotate-45" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 max-h-[75vh] overflow-y-auto pr-2">
          <div>
            <label className="block text-sm font-medium text-slate-700">Kurum Logosu</label>
            <div className="mt-1 flex items-center space-x-4">
              <img
                src={avatar || currentUser.logo}
                alt="Profil"
                className="h-16 w-16 rounded-full object-contain"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Değiştir
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/png, image/jpeg"
              />
            </div>
          </div>

          <div>
            <label htmlFor="user-name" className="block text-sm font-medium text-slate-700">Kurum Adı</label>
            <input
              type="text"
              id="user-name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          
           <div>
            <label htmlFor="entity-type" className="block text-sm font-medium text-slate-700">Firma Türü</label>
            <select
              id="entity-type"
              value={entityType}
              onChange={(e) => setEntityType(e.target.value as 'legal' | 'sole')}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="legal">Tüzel Kişilik (Ltd., A.Ş. vb.)</option>
              <option value="sole">Şahıs Şirketi</option>
            </select>
          </div>

          <div>
            <label htmlFor="tax-id" className="block text-sm font-medium text-slate-700">
                Vergi Numarası (VKN / TCKN)
            </label>
            <input
              type="text"
              id="tax-id"
              value={taxId}
              onChange={e => setTaxId(e.target.value)}
              required
              placeholder="10 haneli VKN veya 11 haneli TCKN"
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
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
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;