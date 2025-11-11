import React from 'react';
import { CorporateUser } from '../types';
import Icon from './Icon';
import StarRating from './StarRating';

interface ProfilePageProps {
  user: CorporateUser;
  onEditClick: () => void;
  isCurrentUser: boolean;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onEditClick, isCurrentUser }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-md">
        <div className="flex flex-col items-center">
          <img
            src={user.logo}
            alt={user.companyName}
            className="h-28 w-28 rounded-full object-contain ring-4 ring-blue-200"
          />
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl font-bold text-slate-800">{user.companyName}</h1>
                {user.isVerified && (
                    <div className="flex-shrink-0" title="Vergi Numarası Doğrulanmış Kurum">
                        <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12c0 .379-.043.748-.128 1.103a4.49 4.49 0 01-1.205 3.242A4.49 4.49 0 0116.5 19.5a4.49 4.49 0 01-3.242 1.205 4.49 4.49 0 01-1.103.128 4.49 4.49 0 01-3.497-1.307 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.498-1.307zm2.366 12.152a.75.75 0 00-1.06-1.06L9 15.586l-1.95-1.95a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.06 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}
            </div>
            <p className="mt-1 text-sm text-slate-500">{user.industry}</p>
            
            {user.rating && user.reviewCount && user.reviewCount > 0 && (
                <div className="mt-2 flex items-center justify-center space-x-2">
                    <StarRating rating={user.rating} size="sm" />
                    <span className="text-sm font-semibold text-slate-600">{user.rating.toFixed(1)}</span>
                    <span className="text-sm text-slate-500">({user.reviewCount} değerlendirme)</span>
                </div>
            )}
            
            <p className="mt-2 text-xs text-slate-400">Kayıt tarihi: {user.registrationDate}</p>
          </div>

          {isCurrentUser && (
            <button
              onClick={onEditClick}
              className="mt-6 flex items-center justify-center space-x-2 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Icon name="pencil" className="h-4 w-4" />
              <span>Kurum Profilini Düzenle</span>
            </button>
          )}
        </div>
        
         <div className="mt-6 border-t border-slate-200 pt-5">
            <h3 className="text-base font-semibold text-slate-700 text-center mb-4">Kurumsal Bilgiler</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start space-x-3 rounded-lg bg-slate-50 p-3">
                    <Icon name="building-office-2" className="h-5 w-5 text-slate-500 mt-0.5" />
                    <div>
                        <p className="font-medium text-slate-800">Firma Türü</p>
                        <p className="text-slate-600">{user.entityType === 'legal' ? 'Tüzel Kişilik' : 'Şahıs Şirketi'}</p>
                    </div>
                </div>
                 <div className="flex items-start space-x-3 rounded-lg bg-slate-50 p-3">
                    <Icon name="identification" className="h-5 w-5 text-slate-500 mt-0.5" />
                    <div>
                        <p className="font-medium text-slate-800">Vergi Numarası</p>
                        <p className="text-slate-600">{user.taxId}</p>
                    </div>
                </div>
            </div>
        </div>

        {user.references && user.references.length > 0 && (
            <div className="mt-8 border-t border-slate-200 pt-6">
                <h2 className="text-lg font-bold text-slate-800 text-center">Referanslar</h2>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {user.references.map((ref, index) => (
                        <div key={index} className="rounded-lg border bg-slate-50 p-4">
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <Icon name="briefcase" className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-700">{ref.projectName}</p>
                                    <p className="text-sm text-slate-500">{ref.clientName}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;