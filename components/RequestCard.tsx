import React from 'react';
import { SupplyRequestItem } from '../types';
import { formatPriceRange, formatQuantity } from '../utils';
import Icon from './Icon';

interface RequestCardProps {
  request: SupplyRequestItem;
  onViewDetail: (id: number) => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onViewDetail }) => {
  return (
    <div 
      onClick={() => onViewDetail(request.id)}
      className="relative flex cursor-pointer flex-col sm:flex-row sm:space-x-4 rounded-xl border bg-white p-4 shadow-sm transition duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex-shrink-0">
        <img
          src={request.image}
          alt={request.title}
          className="h-32 w-full sm:h-24 sm:w-24 rounded-lg object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between mt-4 sm:mt-0">
        <div>
          <div className="flex items-start justify-between">
            <h3 className="pr-2 text-base font-bold text-slate-800">{request.title}</h3>
            <span className="flex-shrink-0 pl-2 text-xs text-slate-400">{request.timeAgo}</span>
          </div>
           <div className="mt-1 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600">
                <p>Miktar: {formatQuantity(request)}</p>
                <span className="text-slate-300">|</span>
                <p>Bütçe: {formatPriceRange(request)}</p>
           </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-y-2">
            <div className="flex flex-wrap items-center gap-2">
                 {request.assistantManaged && (
                    <span className="flex items-center space-x-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800">
                        <Icon name="bot" className="h-3.5 w-3.5" />
                        <span>Asistan Yönetiminde</span>
                    </span>
                 )}
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${request.hasPaymentTerm ? 'bg-purple-100 text-purple-800' : 'bg-teal-100 text-teal-800'}`}>
                    {request.hasPaymentTerm ? 'Vadeli' : 'Peşin'}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${request.logisticsIncluded ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                    {request.logisticsIncluded ? 'Nakliye Dahil' : 'Nakliye Hariç'}
                </span>
                 <span className={`rounded-full px-3 py-1 text-xs font-semibold ${request.isReturnable ? 'bg-sky-100 text-sky-800' : 'bg-rose-100 text-rose-800'}`}>
                    {request.isReturnable ? 'İadeli' : 'İadesiz'}
                </span>
                 <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                  {request.offerCount} Teklif
                </span>
            </div>
          
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onViewDetail(request.id);
                }}
                className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Detayları Gör
            </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;