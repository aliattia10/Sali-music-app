import React, { useState, useMemo } from 'react';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { ViewState } from '../types';
import { CartItem } from '../App';

interface DashboardProps {
  onNavigate: (view: ViewState) => void;
  cartItems: CartItem[];
  updateQuantity: (id: number, size: string, delta: number) => void;
  removeItem: (id: number, size: string) => void;
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

type DashboardTab = 'home' | 'profile' | 'orders' | 'wishlist' | 'settings' | 'cart';
type CheckoutStep = 'cart' | 'details' | 'success';

const CROSS_SELL_ITEMS = [
  {
    id: 101,
    name: 'Beanie',
    size: 'OS',
    price: 25.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqWZFM3_lJIWdS6DyxkZkpBD1klo8bY4Q5eEVzhe3_Hq7JrbtfMywzqhA350-VQB509LZgwOzFp-8jov5zIm0xSCNfRUG25oNWFbbEIxvgNzUcED85cXXm_htvdQK_AJ0y-YReVfRGBiAx5YlQutQAkwcSWsJ5hxUKWvmA3yX1mAlTttb2vyL_B-6JZAhwi0fP7URwEyFZ3D9raqxLT4SvGWtHpSa2BV9qmJBUjxWPSC68lus31k2kHSj54XTY_DOlvPDXuizRylU"
  },
  {
    id: 102,
    name: 'Socks',
    size: 'OS',
    price: 15.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhYo3scpbmGKT9FOjKgnt4RVQ86V24C1b21D7lZQFTDacGvAaQk4-hcjW3Gg-PMOjMuizTErlxl5TJPCcjI0JrBn7nRFpl2F_b-gGAgdnOxtF9pdwaWgKRAXMuYnl-UpE8O2BEyqu0KEyEstxF6-bM4X8FxojOX2uPJ_HGXeyXIAmRWUVbMFol7SXO4XiWIQXFuSoLLtQ34jlh0W5DfDj0GaVTWYdPnck1s3RFHpUwB_VCWYUDRv8-c3G1lG8zessnnn6zqZ1lw3M"
  }
];

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, cartItems, updateQuantity, removeItem, setCartItems }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');
  const [isProcessing, setIsProcessing] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cartItems]);

  const shipping = subtotal > 0 ? 12 : 0;
  const total = subtotal + shipping;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep('success');
    }, 2000);
  };

  const handleRemove = (id: number, size: string) => {
    setRemovingId(`${id}-${size}`);
    setTimeout(() => {
      removeItem(id, size);
      setRemovingId(null);
    }, 300);
  };

  const renderContent = () => {
    if (activeTab === 'cart') {
      if (checkoutStep === 'success') {
        return (
          <div className="flex flex-col items-center justify-center h-full min-h-[600px] gap-8 px-6 animate-shimmer" style={{ animation: 'none' }}>
            <div className="size-32 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-6xl text-green-500">check_circle</span>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-5xl font-display font-black text-dark-card dark:text-white uppercase tracking-tighter">Order Confirmed</h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">Order #88291 is on its way.</p>
            </div>
            <div className="bg-white dark:bg-[#1c1c0d] p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 w-full max-w-md shadow-sm">
                <div className="space-y-4">
                    {cartItems.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center mb-2 last:mb-0">
                            <div className="size-16 bg-gray-100 dark:bg-gray-800 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }}></div>
                            <div className="flex-1">
                                <p className="font-bold text-dark-card dark:text-white text-sm">{item.name}</p>
                                <p className="text-xs text-gray-500">Qty: {item.quantity} • Size {item.size}</p>
                            </div>
                            <span className="font-mono text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 mt-4 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-medium dark:text-gray-300">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Shipping</span>
                        <span className="font-medium dark:text-gray-300">${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2 text-dark-card dark:text-white">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <button 
                onClick={() => {
                    setCheckoutStep('cart');
                    setActiveTab('home');
                    setCartItems([]);
                }}
                className="px-8 py-4 bg-primary text-black font-bold rounded-full uppercase tracking-wider hover:bg-white hover:scale-105 transition-all shadow-lg shadow-primary/20"
            >
                Continue Shopping
            </button>
          </div>
        );
      }

      if (cartItems.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center h-full min-h-[500px] gap-6 px-6 text-center animate-in fade-in zoom-in duration-500">
            <div className="size-24 rounded-full bg-[#f4f4e6] dark:bg-[#2a2a1f] flex items-center justify-center text-gray-400">
              <span className="material-symbols-outlined text-5xl">shopping_cart_off</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-display font-black text-dark-card dark:text-white uppercase tracking-tighter">Your bag is empty</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">Looks like you haven't added anything to your collection yet.</p>
            </div>
            <button 
              onClick={() => onNavigate('drop')}
              className="mt-4 px-8 py-3 bg-dark-card dark:bg-primary text-white dark:text-black font-bold rounded-full uppercase tracking-wider hover:scale-105 transition-all shadow-lg"
            >
              Start Shopping
            </button>
          </div>
        );
      }

      return (
        <div className="flex flex-col gap-8 px-6 md:px-12 pb-12 w-full max-w-6xl mx-auto h-full">
            {/* Header */}
            <div className="flex flex-col gap-2 pt-8 shrink-0">
                <button 
                    onClick={() => checkoutStep === 'details' ? setCheckoutStep('cart') : setActiveTab('home')}
                    className="self-start text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-1 mb-2"
                >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    {checkoutStep === 'details' ? 'Back to Bag' : 'Back Home'}
                </button>
                <div className="flex items-center justify-between">
                  <h2 className="text-dark-card dark:text-white text-3xl md:text-5xl font-display font-black leading-tight tracking-tighter uppercase">
                    {checkoutStep === 'cart' ? 'Your Bag' : 'Checkout'}
                  </h2>
                  <div className="md:hidden">
                    <ThemeToggle />
                  </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full pb-8">
                {/* Left Column */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    {checkoutStep === 'cart' ? (
                        /* Cart List */
                        <div className="flex flex-col gap-4">
                             {cartItems.map((item) => (
                               <div 
                                  key={`${item.id}-${item.size}`} 
                                  className={`bg-white dark:bg-[#1c1c0d] p-4 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex gap-6 items-center shadow-sm group transition-all duration-300 ${removingId === `${item.id}-${item.size}` ? 'opacity-0 scale-95 translate-x-4' : 'opacity-100 scale-100 translate-x-0'}`}
                                >
                                  <div className="size-32 bg-[#f0f0eb] dark:bg-[#2a2a1f] rounded-2xl flex items-center justify-center p-2 shrink-0 overflow-hidden">
                                      <img src={item.image} className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal transform group-hover:scale-110 transition-transform" alt="Product" />
                                  </div>
                                  <div className="flex flex-col flex-1 py-2">
                                      <div className="flex justify-between items-start">
                                          <div>
                                              <h3 className="font-display font-bold text-xl text-dark-card dark:text-white uppercase tracking-tight">{item.name}</h3>
                                              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Limited Edition • Drop 003</p>
                                          </div>
                                          <button 
                                            onClick={() => handleRemove(item.id, item.size)}
                                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                          >
                                              <span className="material-symbols-outlined text-xl">delete</span>
                                          </button>
                                      </div>
                                      <div className="flex items-end justify-between mt-auto">
                                          <div className="flex items-center gap-3">
                                              <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-bold border border-gray-200 dark:border-gray-700">Size: {item.size}</div>
                                              <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                                  <button 
                                                    onClick={() => updateQuantity(item.id, item.size, -1)}
                                                    className="size-6 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors active:scale-90"
                                                  >
                                                    <span className="material-symbols-outlined text-sm">remove</span>
                                                  </button>
                                                  <span className="text-sm font-bold w-6 text-center tabular-nums">{item.quantity}</span>
                                                  <button 
                                                    onClick={() => updateQuantity(item.id, item.size, 1)}
                                                    className="size-6 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded-md transition-colors active:scale-90"
                                                  >
                                                    <span className="material-symbols-outlined text-sm">add</span>
                                                  </button>
                                              </div>
                                          </div>
                                          <p className="text-xl font-bold font-mono text-dark-card dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                                      </div>
                                  </div>
                               </div>
                             ))}
                             
                             {/* Cross Sell */}
                             <div className="mt-4">
                                <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                                  <span className="material-symbols-outlined text-sm">add_circle</span>
                                  Complete your fit
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    {CROSS_SELL_ITEMS.map(item => {
                                        const inCart = cartItems.some(ci => ci.id === item.id);
                                        return (
                                            <div key={item.id} className="bg-white dark:bg-[#1c1c0d] p-3 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-3 cursor-pointer hover:border-primary transition-colors group">
                                                <div className="size-16 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shrink-0">
                                                   <div className="size-full bg-cover bg-center group-hover:scale-110 transition-transform" style={{ backgroundImage: `url('${item.image}')` }}></div>
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-bold text-sm text-dark-card dark:text-white truncate">{item.name}</span>
                                                    <span className="text-xs text-gray-500 font-mono">${item.price.toFixed(2)}</span>
                                                </div>
                                                {inCart ? (
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); removeItem(item.id, item.size); }}
                                                        className="ml-auto shrink-0 size-8 rounded-full bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">delete</span>
                                                    </button>
                                                ) : (
                                                    <button 
                                                        onClick={(e) => { 
                                                            e.stopPropagation(); 
                                                            setCartItems(prev => [...prev, { ...item, quantity: 1 }]); 
                                                        }}
                                                        className="ml-auto shrink-0 size-8 rounded-full bg-dark-card dark:bg-white text-white dark:text-black flex items-center justify-center hover:bg-primary dark:hover:bg-primary hover:text-black transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">add</span>
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                             </div>
                        </div>
                    ) : (
                        /* Checkout Form */
                        <div className="flex flex-col gap-6 animate-in fade-in duration-300">
                            {/* Shipping */}
                            <div className="flex flex-col gap-4">
                                <h3 className="font-display font-bold text-lg text-dark-card dark:text-white flex items-center gap-2 uppercase tracking-tight">
                                    <span className="size-6 rounded-full bg-primary text-black flex items-center justify-center text-xs">1</span>
                                    Shipping Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="First Name" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1c1c0d] border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-primary transition-all" />
                                    <input type="text" placeholder="Last Name" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1c1c0d] border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-primary transition-all" />
                                    <input type="text" placeholder="Address" className="col-span-2 w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1c1c0d] border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-primary transition-all" />
                                    <input type="text" placeholder="City" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1c1c0d] border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-primary transition-all" />
                                    <input type="text" placeholder="Postal Code" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1c1c0d] border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-primary transition-all" />
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="flex flex-col gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <h3 className="font-display font-bold text-lg text-dark-card dark:text-white flex items-center gap-2 uppercase tracking-tight">
                                    <span className="size-6 rounded-full bg-primary text-black flex items-center justify-center text-xs">2</span>
                                    Payment Method
                                </h3>
                                
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black text-white shadow-xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                                    <div className="relative z-10 flex flex-col justify-between h-40">
                                        <div className="flex justify-between items-start">
                                            <span className="font-mono text-sm opacity-70">Debit</span>
                                            <span className="material-symbols-outlined text-3xl">contactless</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="text-2xl font-mono tracking-widest flex gap-4">
                                                <span>••••</span><span>••••</span><span>••••</span><span>4242</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase opacity-70 tracking-wider">Cardholder</span>
                                                <span className="font-bold tracking-wide">ALEX DOE</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase opacity-70 tracking-wider">Expires</span>
                                                <span className="font-bold tracking-wide">12/25</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="Card Number" className="col-span-2 w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1c1c0d] border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-primary" />
                                    <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1c1c0d] border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-primary" />
                                    <input type="text" placeholder="CVC" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1c1c0d] border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-primary" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Summary */}
                <div className="lg:col-span-5">
                    <div className="sticky top-8 bg-white dark:bg-[#1c1c0d] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex flex-col gap-6 shadow-xl shadow-gray-200/50 dark:shadow-none">
                        <h3 className="text-xl font-display font-bold text-dark-card dark:text-white uppercase tracking-tight">Order Summary</h3>
                        
                        <div className="flex flex-col gap-3 pb-6 border-b border-gray-100 dark:border-gray-800">
                            <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                <span>Subtotal</span>
                                <span className="font-mono text-dark-card dark:text-white">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                <span>Shipping</span>
                                <span className="font-mono text-dark-card dark:text-white">${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                <span>Tax</span>
                                <span className="font-mono text-dark-card dark:text-white">$0.00</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end">
                            <span className="text-lg font-bold text-dark-card dark:text-white">Total</span>
                            <div className="flex flex-col items-end">
                                <span className="text-3xl font-black text-dark-card dark:text-white tracking-tight">${total.toFixed(2)}</span>
                                <span className="text-xs text-gray-400">USD</span>
                            </div>
                        </div>

                        {checkoutStep === 'cart' ? (
                            <button 
                                onClick={() => setCheckoutStep('details')}
                                className="w-full py-4 bg-dark-card dark:bg-white text-white dark:text-black font-bold text-lg rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg"
                            >
                                Proceed to Checkout
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        ) : (
                            <button 
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full py-4 bg-primary text-black font-bold text-lg rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
                            >
                                {isProcessing ? (
                                    <span className="flex items-center gap-2">
                                        <span className="size-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                                        Processing...
                                    </span>
                                ) : (
                                    <>
                                        Pay ${total.toFixed(2)}
                                        <span className="material-symbols-outlined">lock</span>
                                    </>
                                )}
                            </button>
                        )}
                        
                        <div className="flex items-center justify-center gap-4 text-gray-300 dark:text-gray-700">
                            <span className="material-symbols-outlined text-2xl">credit_card</span>
                            <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                            <span className="material-symbols-outlined text-2xl">payments</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
    }

    if (activeTab === 'settings') {
      return (
        <div className="flex flex-col gap-8 px-6 md:px-12 pb-12 w-full max-w-5xl mx-auto animate-in fade-in duration-300">
            {/* Settings Header */}
            <div className="flex flex-col gap-2 pt-8">
                <p className="text-olive-text text-sm font-medium tracking-widest uppercase">Preferences</p>
                <div className="flex items-center justify-between">
                  <h2 className="text-dark-card dark:text-white text-3xl md:text-5xl font-display font-black leading-tight tracking-tighter uppercase">Settings</h2>
                  <div className="md:hidden">
                    <ThemeToggle />
                  </div>
                </div>
            </div>

            {/* Account Settings */}
            <section className="flex flex-col gap-6">
                <h3 className="text-xl font-display font-bold text-dark-card dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 uppercase tracking-tight">Account</h3>
                <div className="bg-white dark:bg-[#1c1c0d] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex flex-col md:flex-row gap-8 items-start shadow-sm">
                    <div className="flex flex-col gap-4 items-center self-center md:self-start">
                        <div className="size-32 rounded-full bg-gray-200 dark:bg-gray-800 bg-cover bg-center border-4 border-background-light dark:border-background-dark shadow-inner" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCV0P0n26NrEzk4SuLUnm-0X62VOsXWODzfetdRcxNXuoYA6-JhRjZmslV1B1IJDvzyfo8Rm7O0CzfauyIWTZ5bLsWTNlwwnufGYKVfWSNviwqXQIkZT6YKsyR-rNPfYmvUnSSCmiBBIe_exUzyBdEkj6tU3RjP7yL57Z8lLnPCOAUViNiPAlf3lRHi8kYYrlGXNsfHkUepZg-EpGaYbTVy6OPt8Krx8bTNFja2cGQZjDbz05_AV9_rnL2piVRUc9Cd9QC2sR-TDKY')" }}></div>
                        <button className="text-sm font-bold text-primary hover:text-dark-card dark:hover:text-white transition-colors underline decoration-2 underline-offset-4">Change Avatar</button>
                    </div>
                    <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Display Name</label>
                            <input type="text" defaultValue="Alex Doe" className="w-full px-4 py-3 rounded-xl bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 text-dark-card dark:text-white focus:outline-none focus:border-primary transition-colors font-medium" />
                         </div>
                         <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Email Address</label>
                            <input type="email" defaultValue="alex@example.com" className="w-full px-4 py-3 rounded-xl bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 text-dark-card dark:text-white focus:outline-none focus:border-primary transition-colors font-medium" />
                         </div>
                         <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Spotify Username</label>
                            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 text-gray-500 cursor-not-allowed">
                                <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                <span className="font-medium">alex_doe_88</span>
                            </div>
                         </div>
                         <div className="flex flex-col gap-2 md:col-span-2">
                           <label className="text-sm font-bold text-gray-500 dark:text-gray-400">Bio</label>
                           <textarea className="w-full px-4 py-3 rounded-xl bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-700 text-dark-card dark:text-white focus:outline-none focus:border-primary transition-colors font-medium resize-none h-24" defaultValue="Music lover, streetwear enthusiast, and coffee addict."></textarea>
                         </div>
                         <div className="flex flex-col gap-2 justify-end md:col-span-2">
                            <button className="px-6 py-3 bg-dark-card dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-opacity w-full md:w-auto self-end">Save Changes</button>
                         </div>
                    </div>
                </div>
            </section>

             {/* Notifications */}
             <section className="flex flex-col gap-6">
                <h3 className="text-xl font-display font-bold text-dark-card dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2 uppercase tracking-tight">Notifications</h3>
                 <div className="bg-white dark:bg-[#1c1c0d] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 flex flex-col gap-6 shadow-sm">
                    {[
                        { title: 'Drop Alerts', desc: 'Get notified 24h before a new collection drops.', checked: true },
                        { title: 'Order Updates', desc: 'Receive shipping and delivery updates.', checked: true },
                        { title: 'Marketing Emails', desc: 'Receive news, promotions, and product updates.', checked: false },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 dark:border-gray-800 last:border-0 last:pb-0">
                            <div className="flex flex-col pr-4">
                                <span className="font-bold text-dark-card dark:text-white">{item.title}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</span>
                            </div>
                             <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                            </label>
                        </div>
                    ))}
                 </div>
             </section>

             {/* Danger Zone */}
             <section className="flex flex-col gap-6 pb-12">
                <h3 className="text-xl font-display font-bold text-red-500 border-b border-gray-200 dark:border-gray-800 pb-2 uppercase tracking-tight">Danger Zone</h3>
                <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-[2rem] border border-red-100 dark:border-red-900/20 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col text-center md:text-left">
                         <span className="font-bold text-red-600 dark:text-red-400">Delete Account</span>
                         <span className="text-sm text-red-500/70 dark:text-red-400/70">Once you delete your account, there is no going back. Please be certain.</span>
                    </div>
                    <button className="px-6 py-3 bg-white dark:bg-red-950 text-red-500 font-bold rounded-xl border border-red-100 dark:border-red-900 hover:bg-red-500 hover:text-white dark:hover:bg-red-900 dark:hover:text-red-100 transition-colors">Delete Account</button>
                </div>
             </section>
        </div>
      );
    }

    // Default Home View
    return (
        <div className="animate-in fade-in duration-500 h-full overflow-y-auto">
        <header className="w-full px-6 py-8 md:px-12 flex justify-between items-end">
          <div className="flex flex-col gap-2">
            <p className="text-olive-text text-sm font-medium tracking-widest uppercase">Your mix is ready</p>
            <h2 className="text-dark-card dark:text-white text-3xl md:text-5xl font-display font-black leading-tight tracking-tighter uppercase">Welcome back, Alex.</h2>
          </div>
          <div className="flex gap-4 items-center">
            <ThemeToggle className="bg-white dark:bg-[#1c1c0d] border border-gray-200 dark:border-gray-800 shadow-sm" />
            
            <button className="hidden md:flex size-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition text-dark-card dark:text-white">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button 
               onClick={() => onNavigate('landing')}
               className="hidden md:flex h-12 px-6 rounded-full bg-dark-card dark:bg-white text-white dark:text-black text-sm font-bold items-center gap-2 hover:opacity-90 transition shadow-sm"
            >
              <span>Disconnect Spotify</span>
              <span className="material-symbols-outlined text-sm">link_off</span>
            </button>
          </div>
        </header>

        <div className="px-6 md:px-12 pb-24 flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Top Songs */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-display font-bold text-dark-card dark:text-white flex items-center gap-2 uppercase tracking-tight">
                  <span className="material-symbols-outlined filled text-olive-text">graphic_eq</span>
                  Your Top Tracks
                </h3>
                <button className="text-sm font-bold underline decoration-2 decoration-primary underline-offset-4 hover:text-olive-text transition">View All</button>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { title: "Midnight City", artist: "M83 • Hurry Up, We're Dreaming", time: "4:03", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnHb1IoIPhhWNECpnICXzzcHv7AzytFRZN4McdzndsWQZT1JTsL8tnzznlNuRW9BDqa1gAbVO1kSFX3frJynBuOCY6SsBv8lywMaLZ3i9PEL-yMBZD6hlIzAEm9fp-ZD2cISCn4bEHuAZgUs40GV5ikcYMZ4zl5Bi5am8K7DReZu_cW_hiUCWcAHxd6JQR-05W0KrUKlW121m4_RWqioZHd7CTWGnv0vIhUglzD-Q4vsok8suCOlqnNcs9Y05BQsXg4H67puKOuEI" },
                  { title: "Instant Crush", artist: "Daft Punk • Random Access Memories", time: "5:37", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxSG99VhVol6Gm4Swl1zg7jruZEoKpORs2z-NwCbZaFcOFdHZEk1P0cXc_YGkFwxyPyOtlsWniIUreBvWCdtP9bsV8loCAuNXStQhYMmeFtnsHnxR-sUp0hj6WzVl6_rjat6WX7EDt2cYBaj7Z_dY0MzeGW3wO9OiqzUeK2-lB5g_oxvzYHyzAd45sewSzKWqpuCGRZaMq1FeOjusa975jIi97RSnyirVJPIrSJhLg0xAQwt0lW3KOnqrCYb-pJxTJnI1S19Fng_8" },
                  { title: "Blinding Lights", artist: "The Weeknd • After Hours", time: "3:20", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYHLdVIHxDSkaEv8pX-kgl-d2RWVbZImtm4D-iJ3k6ERyNTdO38r4yBgnDWVLKOYQ6W8MMEu1HX_eBLyAWTy2IY6DeOATQwf1kbTUee-1NGmOEmTx7K5KyDE-C6ZbYxhdil7pYIMHrDcrX1Wq6BjZKZuj35Z-l4DBsqSRqhj6ircTyDAwCJGvBHboVE-A7RJ-GgYkfsR9ZiiTI69hcCQKsX-lP8e8NMtmjA3wGLl_HlTAJKwNzfx8rBxrddqlarEOe-Y6PM8Wg3to" },
                  { title: "Nightcall", artist: "Kavinsky • OutRun", time: "4:18", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1cPhFU9W92pYIocscVbcvGidOqfCWs0F8Fyip8xuU7l9UUDsPl0IRHkVKVBcxDZ1DYKea87-38R6wm5svlbquh9Yp4UMCTDkbpYUs67SjEDj42a86T1ATZmS1jlsQvG680LfJYi7Nw740d5RZ1UH9QTOdp1xlBwOnNPuWdgJj9eR4efJlN1G09gdHFcOQuhBWTTuPnSxmmefqC_GvL0xnvM67Ssl2RQ7l5YhHXsZgUWJ_4B7GglLE4ye9M3u-Zgb_3IdNWhLj2wY" }
                ].map((track, i) => (
                  <div key={i} className="group flex items-center gap-4 p-3 bg-white dark:bg-[#1c1c0d] rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-sm">
                    <div className="relative size-16 rounded-lg overflow-hidden shrink-0">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                      <div className="size-full bg-cover bg-center" style={{ backgroundImage: `url('${track.img}')` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <div className="size-8 bg-primary rounded-full flex items-center justify-center shadow-md">
                          <span className="material-symbols-outlined text-dark-card text-sm">play_arrow</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col grow">
                      <h4 className="font-display font-bold text-dark-card dark:text-white text-lg group-hover:text-primary transition-colors uppercase tracking-tight">{track.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{track.artist}</p>
                    </div>
                    <span className="text-sm font-bold text-gray-400 pr-2">{track.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Next Drop */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-display font-bold text-dark-card dark:text-white flex items-center gap-2 uppercase tracking-tight">
                  <span className="material-symbols-outlined filled text-olive-text">timer</span>
                  Next Drop
                </h3>
              </div>
              <div className="relative flex flex-col justify-between bg-dark-card dark:bg-[#12120a] text-white rounded-[2rem] p-8 overflow-hidden min-h-[500px] shadow-2xl group border border-transparent dark:border-gray-800">
                <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuADG8ayVXK-oVqmWjc1UcLVVGlFwdANLv9GD8_J78NAwDCNxN-dnOObOgYlrFBNmysEw6g2em13iu8RU5Ai65h6Qmo8G8pwJDrRZ9RGYcLYgSqxxgt2qOELO-tocwY6KBi8ZXL9XziXQZyKmvKvdIjU-ezMfaMIsqOqcHeT90w9SnOsLV_O5kM5rVigNHHRMsJqwEMaCqS-ZiCK545AcgbOa8TZxohRf3uqjagKDFM9fHNZjgUSx2tWnjVH7HoXru23zRx8f6UYsLE')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-card/50 to-dark-card dark:to-[#12120a]"></div>
                
                <div className="relative z-10 flex flex-col gap-2">
                  <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30">
                    <span className="size-2 bg-primary rounded-full animate-pulse"></span>
                    <span className="text-primary text-xs font-bold uppercase tracking-wider">Limited Edition</span>
                  </div>
                  <h2 className="text-3xl font-display font-black leading-tight mt-2 cursor-default uppercase tracking-tighter">Drop 004: <br /><span className="text-primary">The Synthwave Collection</span></h2>
                </div>

                <div className="relative z-10 flex-1 flex items-center justify-center py-6">
                  <div className="bg-center bg-contain bg-no-repeat h-48 w-full transition-transform hover:scale-110 duration-500" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAqWZFM3_lJIWdS6DyxkZkpBD1klo8bY4Q5eEVzhe3_Hq7JrbtfMywzqhA350-VQB509LZgwOzFp-8jov5zIm0xSCNfRUG25oNWFbbEIxvgNzUcED85cXXm_htvdQK_AJ0y-YReVfRGBiAx5YlQutQAkwcSWsJ5hxUKWvmA3yX1mAlTttb2vyL_B-6JZAhwi0fP7URwEyFZ3D9raqxLT4SvGWtHpSa2BV9qmJBUjxWPSC68lus31k2kHSj54XTY_DOlvPDXuizRylU')", filter: "drop-shadow(0 0 10px rgba(249, 245, 6, 0.3))" }}></div>
                </div>

                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex gap-2 justify-between px-2">
                    {['02 Days', '14 Hrs', '45 Min', '00 Sec'].map((time, i) => {
                      const [val, unit] = time.split(' ');
                      return (
                        <React.Fragment key={i}>
                          <div className="flex flex-col items-center gap-1">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur border border-white/10">
                              <p className="text-primary text-xl font-bold tabular-nums">{val}</p>
                            </div>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest">{unit}</span>
                          </div>
                          {i < 3 && <div className="text-2xl font-light text-gray-600 mt-2">:</div>}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  <button 
                    onClick={() => onNavigate('drop')}
                    className="w-full py-4 bg-primary rounded-xl text-dark-card font-black text-lg uppercase tracking-widest hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    Get Early Access
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="bg-[#f4f4e6] dark:bg-[#1c1c0d] p-6 rounded-[2rem] flex flex-col justify-between h-40 group hover:bg-dark-card dark:hover:bg-primary hover:text-white dark:hover:text-black transition-colors cursor-pointer border border-transparent dark:border-gray-800 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-3xl group-hover:text-primary dark:group-hover:text-black">history</span>
                <span className="text-xs font-bold uppercase opacity-50">Archive</span>
              </div>
              <div>
                <p className="text-3xl font-bold">12</p>
                <p className="text-sm font-medium opacity-70">Past Drops</p>
              </div>
            </div>
            <div className="bg-[#f4f4e6] dark:bg-[#1c1c0d] p-6 rounded-[2rem] flex flex-col justify-between h-40 group hover:bg-dark-card dark:hover:bg-primary hover:text-white dark:hover:text-black transition-colors cursor-pointer border border-transparent dark:border-gray-800 shadow-sm">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-3xl group-hover:text-primary dark:group-hover:text-black">loyalty</span>
                <span className="text-xs font-bold uppercase opacity-50">Points</span>
              </div>
              <div>
                <p className="text-3xl font-bold tabular-nums">2,450</p>
                <p className="text-sm font-medium opacity-70">Salicoins earned</p>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 bg-white dark:bg-[#1c1c0d] border border-gray-100 dark:border-gray-800 p-6 rounded-[2rem] flex items-center justify-between relative overflow-hidden group shadow-sm">
              <div className="relative z-10 flex flex-col gap-2">
                <h4 className="text-lg font-display font-bold text-dark-card dark:text-white uppercase tracking-tight">Invite Friends</h4>
                <p className="text-sm text-gray-500 max-w-[200px]">Get 10% off your next order for every friend who joins.</p>
                <button className="mt-2 px-4 py-2 bg-dark-card dark:bg-white text-white dark:text-black text-xs font-bold uppercase rounded-full self-start hover:bg-primary dark:hover:bg-primary hover:text-dark-card transition shadow-md">Copy Invite Link</button>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-cover bg-center opacity-80 group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAklEzA8W_kkFJXIMkU6yKr-p8KHxI2DHcr-CnAjvJstYGeASVE_P_NujRMcxZ4915IZw_VWHFPkdEdPA4INGFyrEczs7iTiOST8X_WFXLr7WN_wqXLv1QroVIMdxn3LjrSjhUkYEBq6YO79rdGt9Imzktq4yM4crUPzQFoBbfH7mmMNzgJ3yqPusRztUDtDSKWAutW4Rt12yWLK5fwo6OY8VRfYvPdrcd7Kfyeu44tVGhTpKYhaa4AZv-eHbHYJNq8mc5GRS72fIk')", maskImage: "linear-gradient(to left, black, transparent)", WebkitMaskImage: "linear-gradient(to left, black, transparent)" }}>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 h-full p-6 border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-neutral-900">
        <div className="flex items-center gap-3 px-2 mb-10 cursor-pointer" onClick={() => onNavigate('landing')}>
          <Logo />
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-4 px-4 py-3 rounded-full transition-all shadow-sm group ${
                activeTab === 'home' 
                ? 'bg-primary text-dark-card' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dark-card dark:hover:text-white'
            }`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'home' ? 'filled' : ''} group-hover:scale-110 transition-transform`}>home</span>
            <span className="text-sm font-bold">Home</span>
          </button>
          
          <button 
             onClick={() => setActiveTab('cart')}
             className={`flex items-center gap-4 px-4 py-3 rounded-full transition-all group ${
                activeTab === 'cart'
                ? 'bg-primary text-dark-card shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dark-card dark:hover:text-white'
            }`}
          >
            <div className="relative">
                <span className={`material-symbols-outlined ${activeTab === 'cart' ? 'filled' : ''} group-hover:scale-110 transition-transform`}>shopping_bag</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 size-4 bg-black text-primary dark:bg-primary dark:text-black text-[9px] flex items-center justify-center rounded-full font-bold border-2 border-white dark:border-[#1c1c0d] animate-in zoom-in">
                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                  </span>
                )}
            </div>
            <span className="text-sm font-medium">Bag</span>
          </button>

          <button 
             onClick={() => setActiveTab('profile')}
             className={`flex items-center gap-4 px-4 py-3 rounded-full transition-all group ${
                activeTab === 'profile'
                ? 'bg-primary text-dark-card shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dark-card dark:hover:text-white'
            }`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'profile' ? 'filled' : ''} group-hover:scale-110 transition-transform`}>person</span>
            <span className="text-sm font-medium">Profile</span>
          </button>
          <button 
             onClick={() => setActiveTab('orders')}
             className={`flex items-center gap-4 px-4 py-3 rounded-full transition-all group ${
                activeTab === 'orders'
                ? 'bg-primary text-dark-card shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dark-card dark:hover:text-white'
            }`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'orders' ? 'filled' : ''} group-hover:scale-110 transition-transform`}>list_alt</span>
            <span className="text-sm font-medium">Orders</span>
          </button>
          <button 
             onClick={() => setActiveTab('wishlist')}
             className={`flex items-center gap-4 px-4 py-3 rounded-full transition-all group ${
                activeTab === 'wishlist'
                ? 'bg-primary text-dark-card shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dark-card dark:hover:text-white'
            }`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'wishlist' ? 'filled' : ''} group-hover:scale-110 transition-transform`}>favorite</span>
            <span className="text-sm font-medium">Wishlist</span>
          </button>
        </nav>
        <div className="mt-auto">
          <button 
             onClick={() => setActiveTab('settings')}
             className={`flex w-full items-center gap-4 px-4 py-3 rounded-full transition-all ${
                activeTab === 'settings'
                ? 'bg-dark-card dark:bg-white text-white dark:text-dark-card shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dark-card dark:hover:text-white'
            }`}
          >
            <span className={`material-symbols-outlined ${activeTab === 'settings' ? 'filled' : ''}`}>settings</span>
            <span className="text-sm font-medium">Settings</span>
          </button>
          <div className="mt-6 p-4 rounded-xl bg-[#f4f4e6] dark:bg-[#2a2a1f] flex items-center gap-3 cursor-pointer hover:opacity-80 transition shadow-inner">
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 shadow-md" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCV0P0n26NrEzk4SuLUnm-0X62VOsXWODzfetdRcxNXuoYA6-JhRjZmslV1B1IJDvzyfo8Rm7O0CzfauyIWTZ5bLsWTNlwwnufGYKVfWSNviwqXQIkZT6YKsyR-rNPfYmvUnSSCmiBBIe_exUzyBdEkj6tU3RjP7yL57Z8lLnPCOAUViNiPAlf3lRHi8kYYrlGXNsfHkUepZg-EpGaYbTVy6OPt8Krx8bTNFja2cGQZjDbz05_AV9_rnL2piVRUc9Cd9QC2sR-TDKY')" }}></div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-dark-card dark:text-white">Alex Doe</span>
              <span className="text-[10px] text-olive-text uppercase tracking-wide">Premium User</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto scroll-smooth custom-scrollbar relative">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;