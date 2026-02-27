import React from 'react';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { ViewState } from '../types';

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="relative flex flex-col min-h-screen w-full">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-800 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 md:px-10 py-4 transition-colors duration-300">
        <Logo />
        <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
          <div className="hidden md:flex items-center gap-9">
            <a className="text-neutral-800 dark:text-neutral-200 text-sm font-medium hover:text-primary transition-colors" href="#">Shop</a>
            <a className="text-neutral-800 dark:text-neutral-200 text-sm font-medium hover:text-primary transition-colors" href="#">About</a>
            <a className="text-neutral-800 dark:text-neutral-200 text-sm font-medium hover:text-primary transition-colors" href="#">FAQ</a>
          </div>
          
          <ThemeToggle />

          <button 
            onClick={() => onNavigate('dashboard')}
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary text-black text-sm font-bold leading-normal tracking-wide hover:brightness-110 transition-all"
          >
            <span className="truncate flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">login</span>
              Connect Spotify
            </span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-12 md:py-24">
        <div className="layout-content-container flex flex-col max-w-[1200px] w-full">
          <div className="@container">
            <div className="flex flex-col-reverse gap-10 md:flex-row md:items-center md:justify-between">
              {/* Hero Content */}
              <div className="flex flex-col gap-8 md:w-1/2 md:pr-10">
                <div className="flex flex-col gap-4 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 w-fit">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-wider opacity-70">New Collection Live</span>
                  </div>
                  <h1 className="text-neutral-900 dark:text-white text-5xl md:text-7xl font-display font-black leading-[0.95] tracking-tighter uppercase">
                    Music you <br />
                    <span className="text-primary italic">wear.</span>
                  </h1>
                  <h2 className="text-neutral-600 dark:text-neutral-400 text-lg md:text-xl font-normal leading-relaxed max-w-lg">
                    We analyze your listening habits to drop limited edition streetwear. One drop per month, unique to your taste.
                  </h2>
                </div>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => onNavigate('drop')}
                    className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-neutral-900 dark:bg-white text-primary dark:text-neutral-900 text-base font-bold tracking-wide hover:scale-105 transition-transform duration-200 shadow-lg shadow-primary/20"
                  >
                    <span className="truncate">Start Creating</span>
                  </button>
                  <button 
                    onClick={() => onNavigate('drop')}
                    className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-8 bg-transparent border-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white text-base font-bold tracking-wide hover:bg-neutral-900 hover:text-primary dark:hover:bg-white dark:hover:text-neutral-900 transition-all duration-200"
                  >
                    <span className="truncate">View Gallery</span>
                  </button>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark bg-gray-300 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAh25_6In-UotPmZLjW6-42ooqfv1KYjYJ58wMHf0N70j3Zodzyh-zRN5r8J-YqTrf0uTqdGAwD9FCwQLL1G9jRy287myT78SYa16VoiPytNIyxG-kvCIfrFjy4MBh9lCqLEoxI8zjtLKzQdjBXG0hreWFVlnle7nmCnIuHPke8wj1c4k9C-7X6L0O0rj--3rijmXvjRzdTnUOcdfVOqOiEKoklfG2-R7CcCRktKF3gdbgHfk9qP6kpghyNqCQ3WXjms5XPF0MgNjE')" }}></div>
                    <div className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark bg-gray-300 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlUcuLnYHmshS6pQlAaZ6pYW33h54p4Zlc0jUjmseMGZYZapwsnQwcn0MpyAznh7iLHIVZXGyMXTy4J21LecaqYKq2Zk_LREJl4UjSLyMGPHXGd0Dp4QW-AuANALgvegQrrlM768O6ODRLEbLFZTdZHiu9fYa_VWXhh7uhNxhK4i12spiUEEbGPUKB33jHk4MA_qBaG3UaGXEdXTdh1oEDnZFVI-O0iFHSNPcs_PAt_DhCN2xjbX3zPyHGBaPL2PNj_NBWO3TiIK4')" }}></div>
                    <div className="w-10 h-10 rounded-full border-2 border-background-light dark:border-background-dark bg-gray-300 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYdpeVzw5qs0ZFjlKiHd1YQH-6sZj-wLQZy1SCohQzxy6BJzQCsAu-tMG2of5nPi82XS6rIXpTNihPrNG5SjVVuW1p4jfauzKWDx3Nu_dWIYjTKygmesPArKE7B2Ge082gJJKinDcykLANvzIynSr07vVKSFnb1rSP5uBAkLxzu7qdz4eQ38rIK013qKNZiiybtjp0yjPVjV4w6f5yp_aHgFqNib9uzSIn9qU7-ybJNsgVPgSjKOrWNdrjAgQ1uWYFXYFFwcpL-Wg')" }}></div>
                  </div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Join 10k+ creators</p>
                </div>
              </div>
              {/* Hero Image */}
              <div className="md:w-1/2 relative group">
                <div className="absolute inset-0 bg-primary blur-[100px] opacity-20 rounded-full scale-75 group-hover:scale-90 transition-transform duration-700"></div>
                <div className="w-full aspect-[4/5] md:aspect-square rounded-[2.5rem] bg-gray-100 dark:bg-neutral-900 overflow-hidden border border-gray-200 dark:border-gray-800 relative shadow-2xl">
                  <div className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcV0gIVdCyP0VwhhX5zQsBUtNaTaGCT-B7Br_ZxqsDv2IX4bIZ1ncUwyy8QRId0XoZjb76v8U7wBBMwYpZuU9mVtGPKBNo9LBH3lrP8L4RBd-SaFxYdwpNK9HA7fov5z2BEpiS2wld8pGla7f1T9BmSA2sBSh2SDtBCvbl7aYD9aiaPOf-iqzhUwV_rcqD5bDjM00q5nnoCMr4VFU8XCTuqWg1MjczAZvxSahu-ETytkUlfizorI-9GlxArSOEOdfe9ejkjwpKY1w')" }}>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-black/80 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Now Playing</span>
                        <span className="text-sm font-bold text-black dark:text-white">Midnight City - M83</span>
                      </div>
                      <span className="material-symbols-outlined text-primary animate-pulse">graphic_eq</span>
                    </div>
                    <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-2/3 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="w-full bg-primary overflow-hidden py-4 transform -skew-y-1">
        <div className="whitespace-nowrap flex animate-marquee">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <span key={i} className="text-xl md:text-3xl font-black text-black mx-4 uppercase tracking-wider">
              NEXT DROP INCOMING /// LIMITED EDITION /// DATA DRIVEN STYLE ///
            </span>
          ))}
        </div>
      </div>

      {/* Timer Section */}
      <section className="flex justify-center py-16 bg-white dark:bg-neutral-900">
        <div className="layout-content-container flex flex-col max-w-[960px] w-full px-4">
          <div className="text-center mb-8">
            <h2 className="text-lg font-bold tracking-widest uppercase text-neutral-500 dark:text-neutral-400">Unlock Phase Begins In</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-24 w-full md:w-32 items-center justify-center rounded-[2rem] bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-800 shadow-sm">
                <p className="text-neutral-900 dark:text-primary text-5xl font-display font-black tracking-tighter tabular-nums">04</p>
              </div>
              <p className="text-sm font-bold uppercase tracking-wider opacity-60">Days</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-24 w-full md:w-32 items-center justify-center rounded-[2rem] bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-800 shadow-sm">
                <p className="text-neutral-900 dark:text-primary text-5xl font-display font-black tracking-tighter tabular-nums">12</p>
              </div>
              <p className="text-sm font-bold uppercase tracking-wider opacity-60">Hours</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-24 w-full md:w-32 items-center justify-center rounded-[2rem] bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-800 shadow-sm">
                <p className="text-neutral-900 dark:text-primary text-5xl font-display font-black tracking-tighter tabular-nums">45</p>
              </div>
              <p className="text-sm font-bold uppercase tracking-wider opacity-60">Minutes</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-24 w-full md:w-32 items-center justify-center rounded-[2rem] bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-800 shadow-sm">
                <p className="text-neutral-900 dark:text-primary text-5xl font-display font-black tracking-tighter tabular-nums">30</p>
              </div>
              <p className="text-sm font-bold uppercase tracking-wider opacity-60">Seconds</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 bg-background-light dark:bg-background-dark">
        <div className="layout-content-container flex flex-col max-w-[1200px] w-full gap-16">
          <div className="flex flex-col md:flex-row gap-8 justify-between items-end">
            <div className="flex flex-col gap-4 max-w-2xl">
              <h2 className="text-neutral-900 dark:text-white text-4xl md:text-5xl font-display font-black leading-none tracking-tighter uppercase">
                From Data <br />
                to <span className="text-primary">Thread</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg font-normal leading-relaxed">
                Our algorithm visualizes your top genres, beats, and moods into a unique design.
              </p>
            </div>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-primary text-black text-base font-bold tracking-wide hover:shadow-lg hover:shadow-primary/30 transition-shadow">
              <span className="truncate">How it works</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group flex flex-col gap-6 rounded-[2rem] border border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-900 p-8 hover:border-primary dark:hover:border-primary transition-colors duration-300">
              <div className="size-16 rounded-2xl bg-primary/20 flex items-center justify-center text-neutral-900 dark:text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                <span className="material-symbols-outlined text-4xl">music_note</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-neutral-900 dark:text-white text-xl font-display font-bold uppercase tracking-tight">1. Connect & Stream</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Link your Spotify account. We don't post anything, we just listen to what you listen to.
                </p>
              </div>
            </div>
            <div className="group flex flex-col gap-6 rounded-[2rem] border border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-900 p-8 hover:border-primary dark:hover:border-primary transition-colors duration-300">
              <div className="size-16 rounded-2xl bg-primary/20 flex items-center justify-center text-neutral-900 dark:text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                <span className="material-symbols-outlined text-4xl">equalizer</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-neutral-900 dark:text-white text-xl font-display font-bold uppercase tracking-tight">2. We Analyze</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Our engine breaks down your rotation into color palettes, patterns, and glitch art.
                </p>
              </div>
            </div>
            <div className="group flex flex-col gap-6 rounded-[2rem] border border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-900 p-8 hover:border-primary dark:hover:border-primary transition-colors duration-300">
              <div className="size-16 rounded-2xl bg-primary/20 flex items-center justify-center text-neutral-900 dark:text-primary group-hover:bg-primary group-hover:text-black transition-colors duration-300">
                <span className="material-symbols-outlined text-4xl">checkroom</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-neutral-900 dark:text-white text-xl font-display font-bold uppercase tracking-tight">3. The Drop</h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Once a month, your personal collection unlocks. High quality cotton, limited run.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-900 py-12 px-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <Logo />
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">© 2024 Salimusic Inc. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a className="text-neutral-900 dark:text-neutral-200 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
            <a className="text-neutral-900 dark:text-neutral-200 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
            <a className="text-neutral-900 dark:text-neutral-200 hover:text-primary transition-colors" href="#"><span className="material-symbols-outlined">help</span></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;