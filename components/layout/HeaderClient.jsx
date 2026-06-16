'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { UserButton, SignInButton, SignUpButton } from '@clerk/nextjs';
import { Show } from '@/components/auth';
import { Menu, X, ArrowUpCircle, LayoutDashboard } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import CreditButton from '@/components/CreditButton';
import UpgradeModal from '@/components/UpgradeModal';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Live Demo', href: '/#interactive' },
];

const HeaderClient = ({ user }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled ? "py-3" : "py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className={cn(
          "relative flex items-center justify-between transition-all duration-500",
          "rounded-full border px-4 py-2 md:px-8 md:py-3",
          isScrolled 
            ? "glass shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-white/10" 
            : "border-transparent bg-transparent"
        )}>
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-2 group">
            <div className="relative h-8 w-auto md:h-10">
              <Image
                src="/logo.png"
                alt="PrepWise AI"
                width={160}
                height={45}
                priority
                className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                className={cn(
                  "text-[12px] font-black transition-all tracking-[0.2em] uppercase relative group",
                  pathname === link.href ? "text-amber-400" : "text-white/40 hover:text-white"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-amber-400/50"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <div className="hidden md:flex items-center gap-2">
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    className="h-10 rounded-full px-5 text-xs font-black text-white/50 hover:text-white hover:bg-white/5 tracking-widest uppercase"
                  >
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    variant="gold"
                    className="h-10 rounded-full px-6 text-xs font-black shadow-[0_15px_30px_rgba(248,184,31,0.2)] hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest"
                  >
                    Start Free
                  </Button>
                </SignUpButton>
              </div>
            </Show>

            <Show when="signed-in">
              <div className="flex items-center gap-3">
                {/* Universal Dashboard Link */}
                <Button variant="ghost" className="h-10 rounded-full px-5 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white gap-2" asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard size={14} />
                    <span className="hidden md:inline">Dashboard</span>
                  </Link>
                </Button>

                {/* Custom Credit Button Component */}
                <div className="hidden sm:block">
                  <CreditButton role={user?.role} credits={user?.credits} />
                </div>

                {/* Upgrade Button (Only for Interviewees/Unassigned) */}
                {user?.role !== 'INTERVIEWER' && (
                  <div className="hidden md:block">
                    <Button 
                      onClick={() => setIsUpgradeModalOpen(true)}
                      className="h-10 rounded-full px-5 bg-linear-to-r from-amber-400 to-amber-600 text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                    >
                      <ArrowUpCircle size={14} className="mr-2" />
                      Upgrade
                    </Button>
                  </div>
                )}

                {/* Profile Section */}
                <div className="flex items-center gap-4 glass p-1.5 pr-5 rounded-full hover:bg-white/10 transition-all cursor-pointer">
                  <UserButton afterSignOutUrl="/" />
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-white tracking-widest uppercase truncate max-w-[100px]">
                        {user?.name?.split(' ')[0] || 'User'}
                     </span>
                     {user?.role !== 'UNASSIGNED' && (
                       <span className="text-[8px] font-bold text-amber-400/60 uppercase tracking-tighter">
                          {user?.role}
                       </span>
                     )}
                  </div>
                </div>
              </div>
            </Show>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Upgrade Modal Instance */}
      <UpgradeModal 
        open={isUpgradeModalOpen} 
        onOpenChange={setIsUpgradeModalOpen} 
        reason="Unlock unlimited sessions and premium AI feedback."
      />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full inset-x-4 mt-4 glass rounded-[2.5rem] p-8 lg:hidden shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-8">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-lg font-bold transition-colors tracking-widest uppercase",
                    pathname === link.href ? "text-amber-400" : "text-white/60 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-white/10" />
              <Show when="signed-out">
                <div className="flex flex-col gap-4">
                  <SignInButton mode="modal">
                    <Button
                      variant="ghost"
                      className="h-14 rounded-2xl text-sm font-black text-white uppercase tracking-widest bg-white/5"
                    >
                      Login
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button
                      variant="gold"
                      className="h-14 rounded-2xl text-sm font-black uppercase tracking-widest"
                    >
                      Start Preparing Free
                    </Button>
                  </SignUpButton>
                </div>
              </Show>

              <Show when="signed-in">
                 <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 mb-4">
                       <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Account</span>
                       <div className="flex items-center gap-3 glass p-3 rounded-2xl">
                          <UserButton afterSignOutUrl="/" />
                          <div className="flex flex-col">
                             <span className="text-sm font-bold text-white">{user?.name}</span>
                             <span className="text-[10px] font-medium text-amber-400/60 uppercase tracking-widest">{user?.role}</span>
                          </div>
                       </div>
                    </div>
                    
                    <CreditButton role={user?.role} credits={user?.credits} />
                    
                    {user?.role !== 'INTERVIEWER' && (
                      <Button 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsUpgradeModalOpen(true);
                        }}
                        className="h-14 w-full rounded-2xl bg-linear-to-r from-amber-400 to-amber-600 text-black text-xs font-black uppercase tracking-widest"
                      >
                        Upgrade Plan
                      </Button>
                    )}
                    
                    <div className="h-px bg-white/10 my-2" />
                    
                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full h-14 rounded-2xl text-sm font-black uppercase tracking-widest bg-white/5 gap-3">
                        <LayoutDashboard size={18} /> My Dashboard
                      </Button>
                    </Link>
                 </div>
              </Show>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default HeaderClient;
