'use client'

import { useState } from 'react'
import headerNavLinks from './headerNavLinks'
import Link from 'next/link'
import Image from 'next/image'
import { Close, IoMenu } from './Icons'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <>
      <button aria-label="Toggle Menu" onClick={onToggleNav} className="sm:hidden h-8 w-8">
        <IoMenu className='fill-current' />
      </button>
      <div
        className={`fixed left-0 top-0 z-10 h-full w-full transform duration-300 ease-in-out bg-gray-950 opacity-[0.98] ${navShow ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex justify-end">
          <button className="mr-8 mt-11 h-8 w-8" aria-label="Toggle Menu" onClick={onToggleNav}>
            <Close className='fill-current' />
          </button>
        </div>
        <nav className="fixed mt-8 h-full">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12 py-4">
              <Link
                href={link.href}
                className="text-2xl font-bold tracking-widest text-gray-100"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}

export default MobileNav
