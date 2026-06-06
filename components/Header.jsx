import { Show, UserButton } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-black/[0.82] backdrop-blur-xl">
      <nav className="mx-auto flex h-[5.5rem] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center transition-opacity hover:opacity-90">
          <Image
            src="/logo.png"
            alt="PrepWise AI"
            width={200}
            height={50}
            priority
            className="h-9 w-auto object-contain brightness-110 sm:h-10"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Show when="signed-out">
            <Button
              asChild
              variant="ghost"
              className="h-9 rounded-full px-3 text-xs font-medium text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white sm:px-4 sm:text-sm"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button
              asChild
              className="h-9 rounded-full bg-white px-4 text-xs font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.98] sm:px-6 sm:text-sm shadow-[0_8px_20px_rgba(255,255,255,0.15)]"
            >
              <Link href="/sign-up">
                Get started
                <ArrowRight className="ml-1.5 size-3.5" />
              </Link>
            </Button>
          </Show>

          <Show when="signed-in">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] p-1 pr-3 backdrop-blur-xl">
              <UserButton />
              <span className="hidden text-xs font-medium text-white/50 sm:block">Dashboard</span>
            </div>
          </Show>
        </div>
      </nav>
    </header>
  )
}

export default Header
