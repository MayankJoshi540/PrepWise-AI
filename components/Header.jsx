import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

const header = () => {
  return (
    <div>
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-3 sm:px-10 py-3 border-b border-white/7 backdrop-blur-xl">
        
        {/* Logo */}
        <Link href={'/'}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={100}
            
          />
        </Link>

        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton />
            <SignUpButton>
              <Button variant="secondary">
                sign up
              </Button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </nav>
    </div>
  )
}

export default header