import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { ViewState } from '../types';

interface DropPageProps {
  onNavigate: (view: ViewState) => void;
  onAddToCart: (item: { id: number; name: string; size: string; price: number; image: string }) => void;
  cartCount: number;
}

const DropPage: React.FC<DropPageProps> = ({ onNavigate, onAddToCart, cartCount }) => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart({
      id: 1,
      name: "The 'Midnight City' Drop",
      size: selectedSize,
      price: 45.00,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLxW_NjGmNlyoOdSdLF9q7ffanbCDIUL5wpmePL5tpND6kynceWM48gzLGGZKDYQv_F2-HbTiau4sZSrIhyGViVRL27pFuE64hPUzqBFT7pVnaoOduPF-ngicPGOPJDxa-ZUDI3Koau8FDWlD8sk5uULTOoNE8dOrWBUfPQMGIbJGlAMl47NoBetaqhLFkissHGH6fZkiWuxcrgu_z2xsiYIUmRgPO_mhP0HGU8VRTHYWfNwPjqHP4BcuBpKO2Vd947TQe_3d6nHY"
    });
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-[#e5e5e0] dark:border-[#3a3a2e] bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
        <div className="px-4 md:px-8 py-4 flex items-center justify-between max-w-[1440px] mx-auto">
          <button 
            onClick={() => onNavigate('landing')} 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <span className="material-symbols-outlined text-3xl">equalizer</span>
            <h1 className="text-xl font-bold tracking-tight uppercase">Salimusic</h1>
          </button>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <button 
              onClick={() => onNavigate('dashboard')}
              className="relative group p-2 rounded-full hover:bg-[#e5e5e0] dark:hover:bg-[#3a3a2e] transition-colors"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 size-4 bg-primary text-black text-[10px] font-bold flex items-center justify-center rounded-full animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col lg:flex-row max-w-[1440px] mx-auto w-full">
        {/* Left Column: Product Visuals */}
        <section className="lg:w-1/2 flex flex-col p-4 md:p-8 relative">
          <div className="mb-6 flex gap-2">
            <span className="px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-xs font-medium uppercase tracking-wider bg-white dark:bg-white/5">Limited Edition</span>
            <span className="px-3 py-1 rounded-full bg-primary text-black text-xs font-bold uppercase tracking-wider animate-pulse">Live Now</span>
          </div>
          
          <div className="relative flex-grow flex items-center justify-center min-h-[400px] lg:min-h-[600px] bg-[#f0f0eb] dark:bg-[#2a2a1f] rounded-xl overflow-hidden group">
            <div className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
              <img 
                alt="Black oversized t-shirt" 
                className="max-h-[80%] object-contain drop-shadow-2xl filter dark:brightness-90" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLxW_NjGmNlyoOdSdLF9q7ffanbCDIUL5wpmePL5tpND6kynceWM48gzLGGZKDYQv_F2-HbTiau4sZSrIhyGViVRL27pFuE64hPUzqBFT7pVnaoOduPF-ngicPGOPJDxa-ZUDI3Koau8FDWlD8sk5uULTOoNE8dOrWBUfPQMGIbJGlAMl47NoBetaqhLFkissHGH6fZkiWuxcrgu_z2xsiYIUmRgPO_mhP0HGU8VRTHYWfNwPjqHP4BcuBpKO2Vd947TQe_3d6nHY" 
              />
            </div>
            <div className="absolute bottom-6 right-6 p-3 bg-white dark:bg-black rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="material-symbols-outlined">zoom_in</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mt-4">
            <button className="aspect-square rounded-lg bg-[#f0f0eb] dark:bg-[#2a2a1f] overflow-hidden border-2 border-black dark:border-primary">
              <img alt="Front" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlMZtPI2sxduJfYldYCXgcV2PrB7XQlpt9smIqtLslJ_NbmkpPBt6I6ShjjAEGiM2O_X-210rzsbCcmYc_QOGej5Tza9o1SDMYOBc8Zn_DKtjuoxxN9BWVO-qhrN7VxS1MvR2XPCvK2pmzLKtFWLemCB_s7CVSWqWGyA1s0JWuQA0VV7rsd5XvQj0Olbyq39yOnOEGRiLs5a_XzgTi6xCwhg5xAYvnbXDV1PWGuvqhunV3hblGdBdeuPzwhZJFQKgbkFAvCksdCug"/>
            </button>
            <button className="aspect-square rounded-lg bg-[#f0f0eb] dark:bg-[#2a2a1f] overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
              <img alt="Texture" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhYo3scpbmGKT9FOjKgnt4RVQ86V24C1b21D7lZQFTDacGvAaQk4-hcjW3Gg-PMOjMuizTErlxl5TJPCcjI0JrBn7nRFpl2F_b-gGAgdnOxtF9pdwaWgKRAXMuYnl-UpE8O2BEyqu0KEyEstxF6-bM4X8FxojOX2uPJ_HGXeyXIAmRWUVbMFol7SXO4XiWIQXFuSoLLtQ34jlh0W5DfDj0GaVTWYdPnck1s3RFHpUwB_VCWYUDRv8-c3G1lG8zessnnn6zqZ1lw3M"/>
            </button>
            <button className="aspect-square rounded-lg bg-[#f0f0eb] dark:bg-[#2a2a1f] overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
              <img alt="Back" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUsAH8MeqhfFe5UZxZNK9Mg3__jU7zeAMfII4llK7wJ8BrvSgvvA663MHjPgIkcsScab-DFSud_nc_DJtRo3URHhBk_RJwZWCzc4P8fhzDTvxQhqqrAokAw1dkLMNX7yRpnjkIHADyT3NjdLMrpIAVy9sv6703TmiBIFbwzmf9jW8dES0DmqSCInNJaDCqZ619MXlLx7NM3JzHlgHfbv2W_Wtf-Qa4MgdljBg12amnfHOWKJfSL8uRTMkcyix45UHKIHOtxZbpIUo"/>
            </button>
            <div className="aspect-square rounded-lg bg-[#f0f0eb] dark:bg-[#2a2a1f] flex flex-col items-center justify-center text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined mb-1">360</span>
              View 360
            </div>
          </div>
        </section>

        {/* Right Column: Metadata & Controls */}
        <section className="lg:w-1/2 p-4 md:p-8 lg:pl-0 flex flex-col gap-6">
          <div className="space-y-4 border-b border-black/10 dark:border-white/10 pb-6">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tighter uppercase">
                The 'Midnight City'<br />Drop
              </h1>
              <span className="text-xl md:text-2xl font-bold font-mono">$45.00</span>
            </div>
            <p className="text-black/60 dark:text-white/60 text-lg font-medium max-w-md">
              100% Heavyweight Cotton | Puff Print | Boxy Fit
            </p>
            <div className="flex items-center gap-2 text-sm text-primary font-bold">
              <span className="material-symbols-outlined fill text-base">bolt</span>
              <span>Low Stock: Only 12 left in this size</span>
            </div>
          </div>

          <div className="bg-[#f0f0eb] dark:bg-[#2a2a1f] rounded-xl p-4 flex items-center gap-4 group hover:bg-[#e6e6df] dark:hover:bg-[#333325] transition-colors cursor-pointer ring-1 ring-black/5 dark:ring-white/5">
            <div className="relative size-16 shrink-0 rounded-lg overflow-hidden">
              <img alt="Album Cover" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDTpdi7o1xktswLRlF2SN7zc88NM_GAgRi9ShASo_qEUPmqd3DNkKQWYzoURtKIq32CDKRNqSRMZUCynrOm2jK8CSqIeKbtbpWw8QQwaw3v9zHuStfBOJCrGGKFB8wFnKCGaxf9aU4KWthZ_BX8teCTSEExHku_lZcOLeTlufQdhq3wXocyrfbeHTqapSmJfu11matBWw1xAFhbz8yEbJjJ5pNN5f94tGuAIs8hoaxYB4SQujcheATQmBLq-eZu_H0KMgZeBIkM8M"/>
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-white opacity-80 group-hover:scale-110 transition-transform">play_circle</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-lg truncate">Midnight City</h3>
                <span className="text-xs font-mono opacity-60">04:03</span>
              </div>
              <p className="text-sm font-medium opacity-60 truncate">M83 • Hurry Up, We're Dreaming</p>
              <div className="flex items-end gap-[2px] h-4 mt-2 opacity-50">
                <div className="w-1 bg-current h-[40%] rounded-full animate-pulse"></div>
                <div className="w-1 bg-current h-[70%] rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 bg-current h-[100%] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 bg-current h-[50%] rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-1 bg-current h-[80%] rounded-full animate-pulse" style={{ animationDelay: '0.15s' }}></div>
              </div>
            </div>
          </div>

          <div className="py-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold uppercase tracking-wider text-sm opacity-80">Select Size</h3>
              <button className="text-xs font-mono underline opacity-60 hover:opacity-100">Size Guide</button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: 'S', name: 'Small', length: '28"', disabled: false },
                { id: 'M', name: 'Medium', length: '29"', disabled: false },
                { id: 'L', name: 'Large', length: '30"', disabled: false },
                { id: 'XL', name: 'X-Large', length: '-', disabled: true }
              ].map((size, index) => (
                <label key={size.id} className={`relative group cursor-pointer ${size.disabled ? 'opacity-50' : ''}`}>
                  <input 
                    type="radio" 
                    name="size" 
                    className="peer sr-only" 
                    disabled={size.disabled} 
                    checked={selectedSize === size.id}
                    onChange={() => setSelectedSize(size.id)}
                  />
                  <div className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                    size.disabled 
                      ? 'border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 cursor-not-allowed'
                      : selectedSize === size.id
                        ? 'border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-lg scale-[1.02]'
                        : 'border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs opacity-50">0{index + 1}</span>
                      <span className={`font-bold ${size.disabled ? 'line-through' : ''}`}>{size.name}</span>
                    </div>
                    {size.disabled ? (
                      <span className="text-xs font-bold text-red-500 uppercase">Sold Out</span>
                    ) : (
                      <span className="text-xs font-mono opacity-60">Length: {size.length}</span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-px bg-black/10 dark:bg-white/10 rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
            <div className="bg-background-light dark:bg-background-dark p-4 flex flex-col gap-1">
              <span className="text-xs text-primary font-bold uppercase tracking-wider">Genre</span>
              <span className="font-medium">Synth-Pop / New Wave</span>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-4 flex flex-col gap-1">
              <span className="text-xs text-primary font-bold uppercase tracking-wider">BPM</span>
              <span className="font-mono font-medium">105</span>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-4 flex flex-col gap-1">
              <span className="text-xs text-primary font-bold uppercase tracking-wider">Mood</span>
              <span className="font-medium">Nostalgic, Euphoric</span>
            </div>
            <div className="bg-background-light dark:bg-background-dark p-4 flex flex-col gap-1">
              <span className="text-xs text-primary font-bold uppercase tracking-wider">Drop Date</span>
              <span className="font-mono font-medium">10.24.23</span>
            </div>
          </div>

          <div className="mt-auto pt-6 flex flex-col gap-4">
            <button 
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full bg-primary hover:bg-[#e6e205] text-black h-16 rounded-full font-bold text-lg uppercase tracking-wider flex items-center justify-between px-8 shadow-[0_4px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span className="flex items-center gap-2">
                {isAdding ? 'Adding...' : 'Secure Drop'}
                {isAdding && <span className="material-symbols-outlined animate-spin">sync</span>}
              </span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">shopping_bag</span>
            </button>
            <div className="text-center">
              <p className="text-xs opacity-60">Ships within 2-3 business days. Free returns on domestic orders.</p>
            </div>
          </div>
        </section>
      </main>

      <div className="bg-black text-white dark:bg-white dark:text-black py-3 overflow-hidden whitespace-nowrap border-t border-b border-transparent">
        <div className="inline-flex animate-marquee items-center gap-8">
          {[1,2,3,4,5,6,7,8].map(i => (
             <span key={i} className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-primary"></span> New drops every Friday
             </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropPage;