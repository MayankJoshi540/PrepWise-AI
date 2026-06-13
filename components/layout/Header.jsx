'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Show, UserButton, SignInButton, SignUpButton } from '@clerk/nextjs';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Live Demo', href: '/#interactive' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
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
              <div className="flex items-center gap-4 glass p-1.5 pr-5 rounded-full hover:bg-white/10 transition-all cursor-pointer">
                <UserButton afterSignOutUrl="/" />
                <span className="text-[10px] font-black text-white/60 tracking-widest uppercase">Dashboard</span>
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
