import { Show, UserButton } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-4 md:top-6 z-50 flex justify-center px-4">
      <nav className="group flex h-[3.5rem] md:h-[4rem] w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-4 md:px-8 backdrop-blur-2xl transition-all hover:bg-white/[0.05] hover:border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
        
        {/* Subtle internal golden glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

        <Link href="/" className="relative z-10 flex items-center transition-all hover:scale-105 active:scale-95">
          <Image
            src="/logo.png"
            alt="PrepWise AI"
            width={160}
            height={45}
            priority
            className="h-8 w-auto object-contain sm:h-9"
          />
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {['Features', 'Explore', 'Pricing'].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-[13px] font-semibold text-white/50 hover:text-white transition-colors tracking-wide uppercase"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <Show when="signed-out">
            <Button
              asChild
              variant="ghost"
              className="h-10 rounded-full px-4 text-xs font-bold text-white/60 transition-colors hover:bg-white/[0.08] hover:text-white sm:text-sm"
            >
              <Link href="/sign-in">Login</Link>
            </Button>
            <Button
              asChild
              variant="gold"
              className="h-10 rounded-full px-6 text-xs font-black sm:text-sm shadow-[0_15px_30px_rgba(248,184,31,0.25)] hover:shadow-[0_20px_40px_rgba(248,184,31,0.35)]"
            >
              <Link href="/sign-up">
                Sign Up
              </Link>
            </Button>
          </Show>

          <Show when="signed-in">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] p-1.5 pr-5 backdrop-blur-xl hover:bg-white/[0.06] transition-all cursor-pointer">
              <UserButton />
              <span className="hidden text-[11px] font-black text-white/70 sm:block tracking-widest uppercase">Dashboard</span>
            </div>
          </Show>
        </div>
      </nav>
    </header>
  )
}

export default Header
