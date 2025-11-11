import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50 py-6">
      <div className="mx-auto max-w-4xl px-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        <p>© 2024 TAM - Kurumsal Tedarik Merkezi. Tüm hakları saklıdır.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-blue-600">Kullanım Koşulları</a>
          <span className="text-slate-300">|</span>
          <a href="#" className="hover:text-blue-600">Gizlilik Politikası</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;