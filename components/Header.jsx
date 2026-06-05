import { Show, UserButton } from '@clerk/nextjs'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-black/[0.28] backdrop-blur-2xl">
      <nav className="mx-auto flex h-[5.3rem] max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="PrepWise AI"
            width={132}
            height={42}
            priority
            className="h-auto w-[110px] sm:w-[132px]"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Show when="signed-out">
            <Button
              asChild
              variant="ghost"
              className="h-11 rounded-full px-3 text-sm font-medium text-white hover:bg-white/[0.06] hover:text-white sm:px-4"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button
              asChild
              className="h-11 rounded-2xl bg-[#f8b81f] px-4 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(248,184,31,0.22)] hover:bg-[#ffc73c] sm:px-5"
            >
              <Link href="/sign-up">
                Get started
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Show>

          <Show when="signed-in">
            <div className="rounded-full border border-white/10 bg-white/[0.05] p-1 backdrop-blur-xl">
              <UserButton />
            </div>
          </Show>
        </div>
      </nav>
    </header>
  )
}

export default Header
