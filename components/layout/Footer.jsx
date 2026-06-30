'use client';

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  
  const isCallPage = pathname?.startsWith('/call/');
  if (isCallPage) return null;

  const isDashboard = pathname?.startsWith("/dashboard") || 
                      pathname?.startsWith("/appointments") || 
                      pathname?.startsWith("/explore") || 
                      pathname?.startsWith("/call") || 
                      pathname?.startsWith("/session") || 
                      pathname?.startsWith("/onboarding");

  if (isDashboard) {
    return (
      <footer className="border-t border-white/5 bg-[#050505] py-6 mt-auto">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/20">
          <p>© {new Date().getFullYear()} PrepWise AI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-white/5 bg-black pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
               <Image src="/logo.png" alt="PrepWise AI" width={140} height={40} className="object-contain" />
            </div>
            <p className="text-sm text-white/40 max-w-sm leading-relaxed">
              The world&apos;s most advanced technical interview simulation platform. Practice with elite AI mentors and get hired faster.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-6">Product</h4>
            <ul className="space-y-4">
              {[
                { label: 'Interactive Demo', href: '/#interactive' },
                { label: 'Platform Features', href: '/#features' },
                { label: 'Pricing Plans', href: '/pricing' }
              ].map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm font-medium text-white/40 hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-6">Company</h4>
            <ul className="space-y-4">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Insights Blog', href: '/blog' },
                { label: 'Join Our Network', href: '/about#careers' },
                { label: 'Contact Support', href: '/contact' }
              ].map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm font-medium text-white/40 hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs font-medium text-white/20">
          <p>© {new Date().getFullYear()} PrepWise AI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
