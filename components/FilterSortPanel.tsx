import React from 'react';
import Icon from './Icon';
import { LogisticsFilter, PaymentTermFilter } from '../types';

interface FilterSortPanelProps {
  sortKey: string;
  onSortKeyChange: (key: string) => void;
  priceRange: { min: string; max: string };
  onPriceRangeChange: (field: 'min' | 'max', value: string) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  logisticsFilter: LogisticsFilter;
  onLogisticsFilterChange: (value: LogisticsFilter) => void;
  paymentTermFilter: PaymentTermFilter;
  onPaymentTermFilterChange: (value: PaymentTermFilter) => void;
  onApply: () => void;
  onClear: () => void;
  onClearSearch: () => void;
}

const sortOptions = [
  { key: 'newest', label: 'En Yeni' },
  { key: 'price_asc', label: 'Bütçeye Göre (Artan)' },
  { key: 'price_desc', label: 'Bütçeye Göre (Azalan)' },
  { key: 'offers_desc', label: 'Teklif Sayısı (Çoktan Aza)' },
];

const TriStateToggle: React.FC<{ label: string; value: string; options: {key: string; label: string}[]; onChange: (key: string) => void;}> = ({ label, value, options, onChange }) => (
    <div>
        <label className="text-base font-semibold text-slate-700">{label}</label>
        <div className="mt-1 grid grid-cols-3 gap-1 rounded-lg bg-slate-100 p-1">
            {options.map(option => (
                <button
                    key={option.key}
                    type="button"
                    onClick={() => onChange(option.key)}
                    className={`rounded-md px-2 py-1 text-sm font-semibold transition-colors ${
                        value === option.key ? 'bg-white text-blue-600 shadow-sm' : 'bg-transparent text-slate-600 hover:bg-slate-200'
                    }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    </div>
);

const FilterSortPanel: React.FC<FilterSortPanelProps> = ({
  sortKey, onSortKeyChange,
  priceRange, onPriceRangeChange,
  searchTerm, onSearchTermChange,
  logisticsFilter, onLogisticsFilterChange,
  paymentTermFilter, onPaymentTermFilterChange,
  onApply, onClear, onClearSearch
}) => {
  return (
    <div className="mb-4 rounded-xl border bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div className="md:col-span-2">
          <label htmlFor="search-input" className="text-base font-semibold text-slate-700">Arama Yap</label>
          <div className="relative mt-1">
             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
               <Icon name="search" className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              id="search-input"
              value={searchTerm}
              onChange={(e) => onSearchTermChange(e.target.value)}
              placeholder="Talep başlığında veya açıklamada ara..."
              className="block w-full rounded-md border-slate-300 py-2 pl-10 pr-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
             {searchTerm && (
                <button
                    onClick={onClearSearch}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                    aria-label="Aramayı temizle"
                >
                    <Icon name="x-circle" className="h-5 w-5" />
                </button>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="sort-select" className="text-base font-semibold text-slate-700">Sırala</label>
          <select
            id="sort-select"
            value={sortKey}
            onChange={(e) => onSortKeyChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-base font-semibold text-slate-700">Toplam Bütçe Aralığı (₺)</label>
          <div className="mt-1 flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => onPriceRangeChange('min', e.target.value)}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <span className="text-slate-500">-</span>
            <input
              type="number"
              placeholder="Maks"
              value={priceRange.max}
              onChange={(e) => onPriceRangeChange('max', e.target.value)}
              className="block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
        
        <TriStateToggle 
            label="Lojistik Durumu"
            value={logisticsFilter}
            onChange={(v) => onLogisticsFilterChange(v as LogisticsFilter)}
            options={[
                { key: 'all', label: 'Tümü' },
                { key: 'included', label: 'Dahil' },
                { key: 'excluded', label: 'Hariç' }
            ]}
        />
        
         <TriStateToggle 
            label="Ödeme Koşulu"
            value={paymentTermFilter}
            onChange={(v) => onPaymentTermFilterChange(v as PaymentTermFilter)}
            options={[
                { key: 'all', label: 'Tümü' },
                { key: 'term', label: 'Vadeli' },
                { key: 'cash', label: 'Peşin' }
            ]}
        />
        
      </div>

      <div className="mt-6 flex justify-end space-x-3 border-t border-slate-200 pt-4">
        <button
          onClick={onClear}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Temizle
        </button>
        <button
          onClick={onApply}
          className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Filtrele
        </button>
      </div>
    </div>
  );
};

export default FilterSortPanel;