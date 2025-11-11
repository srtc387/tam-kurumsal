import { SupplyRequestItem } from './types';

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value).replace('₺', '₺ ');
};

export const formatPriceRange = (request: Pick<SupplyRequestItem, 'priceMin' | 'priceMax'>) => {
    const { priceMin, priceMax } = request;

    if (priceMax !== undefined && priceMin !== undefined) {
        return `${formatCurrency(priceMax)} / Min. ${formatCurrency(priceMin)}`;
    }
    if (priceMax !== undefined) {
        return `${formatCurrency(priceMax)}'ye kadar`;
    }
    if (priceMin !== undefined) {
        return `Min. ${formatCurrency(priceMin)} teklif`;
    }
    return `Tekliflere Açık`;
};

export const formatQuantity = (request: Pick<SupplyRequestItem, 'quantity' | 'minOrderQuantity' | 'unit'>) => {
    const { quantity, minOrderQuantity, unit } = request;

    if (!quantity || !unit) {
        return "Belirtilmemiş";
    }

    if (minOrderQuantity !== undefined) {
        return `${quantity} ${unit} / Min. ${minOrderQuantity} ${unit}`;
    }

    return `${quantity} ${unit}`;
};