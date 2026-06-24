'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { UserButton, SignInButton, SignUpButton } from '@clerk/nextjs';
import { Show } from '@/components/auth';
import { Menu, X, ArrowUpCircle, LayoutDashboard, Compass, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import CreditButton from '@/components/CreditButton';
import UpgradeModal from '@/components/UpgradeModal';

const HeaderClient = ({ user }) => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = React.useState(false);
  const pathname = usePathname();

  const isCallPage = pathname?.startsWith('/call/');

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = React.useMemo(() => {
    if (!user) {
      return [
        { label: 'Home', href: '/' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Live Demo', href: '/#interactive' },
      ];
    }

    if (user.role === 'INTERVIEWER') {
      return [
        { label: 'Home', href: '/' },
        { label: 'Appointments', href: '/appointments' },
        { label: 'Pricing', href: '/pricing' },
      ];
    }

    // INTERVIEWEE or UNASSIGNED
    return [
      { label: 'Home', href: '/' },
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Explore', href: '/explore' },
      { label: 'Pricing', href: '/pricing' },
    ];
  }, [user]);

  const isActive = React.useCallback((linkHref) => {
    if (linkHref === '/') {
      return pathname === '/';
    }
    return pathname === linkHref || pathname.startsWith(linkHref + '/');
  }, [pathname]);

  if (isCallPage) return null;

  return (
    <header 
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled ? "py-3" : "py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className={cn(
          "relative flex items-center justify-between transition-all duration-300",
          "rounded-full border px-4 py-2 md:px-6 md:py-2.5",
          isScrolled 
            ? "bg-black/60 backdrop-blur-md border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.5)]" 
            : "bg-black/10 backdrop-blur-sm border-white/5 shadow-sm"
        )}>
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-2 group">
            <div className="relative h-8 w-auto md:h-10 flex items-center">
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
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link 
                  key={link.label} 
                  href={link.href}
                  className={cn(
                    "text-[11px] font-bold transition-all tracking-[0.2em] uppercase relative py-2 px-1 group",
                    active ? "text-amber-400" : "text-white/40 hover:text-white"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-amber-400 to-amber-500 rounded-full shadow-[0_0_8px_rgba(248,184,31,0.5)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <Show when="signed-out">
              <div className="hidden md:flex items-center gap-2.5">
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    className="h-10 rounded-full px-5 text-xs font-bold text-white/50 hover:text-white hover:bg-white/5 tracking-widest uppercase transition-all duration-300"
                  >
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    variant="gold"
                    className="h-10 rounded-full px-6 text-xs font-bold uppercase tracking-widest transition-all duration-300"
                  >
                    Start Free
                  </Button>
                </SignUpButton>
              </div>
            </Show>

            <Show when="signed-in">
              <div className="flex items-center gap-3">
                {/* Custom Credit Button Component */}
                {user?.role === 'INTERVIEWEE' && (
                  <div className="hidden sm:block">
                    <CreditButton 
                      role={user?.role} 
                      credits={user?.credits} 
                      className="h-10 rounded-full px-5 text-[10px]"
                    />
                  </div>
                )}

                {/* Upgrade Button (Only for Interviewees/Unassigned) */}
                {user?.role !== 'INTERVIEWER' && (
                  <div className="hidden md:block">
                    <Button 
                      onClick={() => setIsUpgradeModalOpen(true)}
                      className="h-10 rounded-full px-5 bg-linear-to-r from-amber-400 to-amber-600 text-black text-[10px] font-bold uppercase tracking-widest hover:scale-[1.03] hover:shadow-lg active:scale-95 transition-all duration-300"
                    >
                      <ArrowUpCircle size={14} className="mr-1.5" />
                      Upgrade
                    </Button>
                  </div>
                )}

                {/* Profile Section */}
                <div className="h-10 flex items-center gap-2.5 pl-1.5 pr-4 rounded-full glass hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                  <UserButton afterSignOutUrl="/" />
                  <div className="flex flex-col">
                     <span className="text-[10px] font-bold text-white tracking-widest uppercase truncate max-w-[80px]">
                        {user?.name?.split(' ')[0] || 'User'}
                     </span>
                     {user?.role !== 'UNASSIGNED' && (
                       <span className="text-[8px] font-semibold text-amber-400/60 uppercase tracking-wider">
                          {user?.role}
                       </span>
                     )}
                  </div>
                </div>
              </div>
            </Show>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
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
            className="absolute top-full inset-x-4 mt-4 glass rounded-[2.5rem] p-8 md:hidden shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link 
                      key={link.label} 
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "text-lg font-bold transition-colors tracking-widest uppercase py-1",
                        active ? "text-amber-400" : "text-white/60 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="h-px bg-white/10" />

              <Show when="signed-out">
                <div className="flex flex-col gap-4">
                  <SignInButton mode="modal">
                    <Button
                      variant="ghost"
                      className="h-14 rounded-2xl text-sm font-bold text-white uppercase tracking-widest bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      Login
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button
                      variant="gold"
                      className="h-14 rounded-2xl text-sm font-bold uppercase tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
                    >
                      Start Preparing Free
                    </Button>
                  </SignUpButton>
                </div>
              </Show>

              <Show when="signed-in">
                 <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                       <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Account</span>
                       <div className="flex items-center gap-3 glass p-3 rounded-2xl">
                          <UserButton afterSignOutUrl="/" />
                          <div className="flex flex-col">
                             <span className="text-sm font-bold text-white">{user?.name}</span>
                             <span className="text-[10px] font-semibold text-amber-400/60 uppercase tracking-widest">{user?.role}</span>
                          </div>
                       </div>
                    </div>
                    
                    {user?.role === 'INTERVIEWEE' && (
                      <CreditButton 
                        role={user?.role} 
                        credits={user?.credits} 
                        className="h-14 w-full rounded-2xl text-xs"
                      />
                    )}
                    
                    {user?.role !== 'INTERVIEWER' && (
                      <Button 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsUpgradeModalOpen(true);
                        }}
                        className="h-14 w-full rounded-2xl bg-linear-to-r from-amber-400 to-amber-600 text-black text-xs font-bold uppercase tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
                      >
                        Upgrade Plan
                      </Button>
                    )}
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
