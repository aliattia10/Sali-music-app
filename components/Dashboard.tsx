import React from 'react';
import ThemeToggle from './ThemeToggle';
import { ViewState } from '../types';

interface DashboardProps {
  onNavigate: (view: ViewState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 h-full p-6 border-r border-gray-100 dark:border-gray-800 bg-[#fcfcf8] dark:bg-[#1c1c0d]">
        <div className="flex items-center gap-3 px-2 mb-10 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="size-10 rounded-full bg-dark-card dark:bg-primary flex items-center justify-center text-primary dark:text-black">
            <span className="material-symbols-outlined">equalizer</span>
          </div>
          <div>
            <h1 className="text-dark-card dark:text-white text-lg font-bold leading-tight">Salimusic</h1>
            <p className="text-olive-text text-xs font-medium uppercase tracking-wider">Dashboard</p>
          </div>
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          <button className="flex items-center gap-4 px-4 py-3 rounded-full bg-primary text-dark-card transition-all shadow-sm group">
            <span className="material-symbols-outlined filled group-hover:scale-110 transition-transform">home</span>
            <span className="text-sm font-bold">Home</span>
          </button>
          <button className="flex items-center gap-4 px-4 py-3 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dark-card dark:hover:text-white transition-all group">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">person</span>
            <span className="text-sm font-medium">Profile</span>
          </button>
          <button className="flex items-center gap-4 px-4 py-3 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dark-card dark:hover:text-white transition-all group">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">shopping_bag</span>
            <span className="text-sm font-medium">Orders</span>
          </button>
          <button className="flex items-center gap-4 px-4 py-3 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dark-card dark:hover:text-white transition-all group">
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">favorite</span>
            <span className="text-sm font-medium">Wishlist</span>
          </button>
        </nav>
        <div className="mt-auto">
          <button className="flex w-full items-center gap-4 px-4 py-3 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-dark-card dark:hover:text-white transition-all">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </button>
          <div className="mt-6 p-4 rounded-xl bg-[#f4f4e6] dark:bg-[#2a2a1f] flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 shadow-inner" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCV0P0n26NrEzk4SuLUnm-0X62VOsXWODzfetdRcxNXuoYA6-JhRjZmslV1B1IJDvzyfo8Rm7O0CzfauyIWTZ5bLsWTNlwwnufGYKVfWSNviwqXQIkZT6YKsyR-rNPfYmvUnSSCmiBBIe_exUzyBdEkj6tU3RjP7yL57Z8lLnPCOAUViNiPAlf3lRHi8kYYrlGXNsfHkUepZg-EpGaYbTVy6OPt8Krx8bTNFja2cGQZjDbz05_AV9_rnL2piVRUc9Cd9QC2sR-TDKY')" }}></div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold text-dark-card dark:text-white">Alex Doe</span>
              <span className="text-[10px] text-olive-text uppercase tracking-wide">Premium User</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto scroll-smooth custom-scrollbar">
        <header className="w-full px-6 py-8 md:px-12 flex justify-between items-end">
          <div className="flex flex-col gap-2">
            <p className="text-olive-text text-sm font-medium tracking-widest uppercase">Your mix is ready</p>
            <h2 className="text-dark-card dark:text-white text-3xl md:text-5xl font-black leading-tight tracking-tight">Welcome back, Alex.</h2>
          </div>
          <div className="flex gap-4 items-center">
            <ThemeToggle className="bg-white dark:bg-[#1c1c0d] border border-gray-200 dark:border-gray-800 shadow-sm" />
            
            <button className="hidden md:flex size-12 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition text-dark-card dark:text-white">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button 
               onClick={() => onNavigate('landing')}
               className="hidden md:flex h-12 px-6 rounded-full bg-dark-card dark:bg-white text-white dark:text-black text-sm font-bold items-center gap-2 hover:opacity-90 transition"
            >
              <span>Disconnect Spotify</span>
              <span className="material-symbols-outlined text-sm">link_off</span>
            </button>
          </div>
        </header>

        <div className="px-6 md:px-12 pb-12 flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Top Songs */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-dark-card dark:text-white flex items-center gap-2">
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
                  <div key={i} className="group flex items-center gap-4 p-3 bg-white dark:bg-[#1c1c0d] rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
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
                      <h4 className="font-bold text-dark-card dark:text-white text-lg group-hover:text-primary transition-colors">{track.title}</h4>
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
                <h3 className="text-xl font-bold text-dark-card dark:text-white flex items-center gap-2">
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
                  <h2 className="text-3xl font-black leading-tight mt-2 cursor-default">Drop 004: <br /><span className="text-primary">The Synthwave Collection</span></h2>
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
                              <p className="text-primary text-xl font-bold">{val}</p>
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
                    className="w-full py-4 bg-primary rounded-xl text-dark-card font-black text-lg uppercase tracking-widest hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    Get Early Access
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div className="bg-[#f4f4e6] dark:bg-[#1c1c0d] p-6 rounded-[2rem] flex flex-col justify-between h-40 group hover:bg-dark-card dark:hover:bg-primary hover:text-white dark:hover:text-black transition-colors cursor-pointer border border-transparent dark:border-gray-800">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-3xl group-hover:text-primary dark:group-hover:text-black">history</span>
                <span className="text-xs font-bold uppercase opacity-50">Archive</span>
              </div>
              <div>
                <p className="text-3xl font-bold">12</p>
                <p className="text-sm font-medium opacity-70">Past Drops</p>
              </div>
            </div>
            <div className="bg-[#f4f4e6] dark:bg-[#1c1c0d] p-6 rounded-[2rem] flex flex-col justify-between h-40 group hover:bg-dark-card dark:hover:bg-primary hover:text-white dark:hover:text-black transition-colors cursor-pointer border border-transparent dark:border-gray-800">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-3xl group-hover:text-primary dark:group-hover:text-black">loyalty</span>
                <span className="text-xs font-bold uppercase opacity-50">Points</span>
              </div>
              <div>
                <p className="text-3xl font-bold">2,450</p>
                <p className="text-sm font-medium opacity-70">Salicoins earned</p>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2 bg-white dark:bg-[#1c1c0d] border border-gray-100 dark:border-gray-800 p-6 rounded-[2rem] flex items-center justify-between relative overflow-hidden group">
              <div className="relative z-10 flex flex-col gap-2">
                <h4 className="text-lg font-bold text-dark-card dark:text-white">Invite Friends</h4>
                <p className="text-sm text-gray-500 max-w-[200px]">Get 10% off your next order for every friend who joins.</p>
                <button className="mt-2 px-4 py-2 bg-dark-card dark:bg-white text-white dark:text-black text-xs font-bold uppercase rounded-full self-start hover:bg-primary dark:hover:bg-primary hover:text-dark-card transition">Copy Invite Link</button>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-cover bg-center opacity-80 group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAklEzA8W_kkFJXIMkU6yKr-p8KHxI2DHcr-CnAjvJstYGeASVE_P_NujRMcxZ4915IZw_VWHFPkdEdPA4INGFyrEczs7iTiOST8X_WFXLr7WN_wqXLv1QroVIMdxn3LjrSjhUkYEBq6YO79rdGt9Imzktq4yM4crUPzQFoBbfH7mmMNzgJ3yqPusRztUDtDSKWAutW4Rt12yWLK5fwo6OY8VRfYvPdrcd7Kfyeu44tVGhTpKYhaa4AZv-eHbHYJNq8mc5GRS72fIk')", maskImage: "linear-gradient(to left, black, transparent)", WebkitMaskImage: "linear-gradient(to left, black, transparent)" }}>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;