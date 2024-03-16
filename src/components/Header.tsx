import logo from '@/assets/logo.svg'
import { FC } from 'react'
import Image from 'next/image'
import headerNavLinks from './headerNavLinks'
import Link from 'next/link'
import MobileNav from './MobileNav'

export const Header: FC = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <Link href="/" aria-label="Introduction" className='flex gap-4 items-center'>
        <Image src={logo} width={50} height={50} alt="A representation of a DNA" />
        <div className="text-2xl md:text-4xl font-semibold sm:block">
          Evolutionary Algorithm
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
            >
              {link.title}
            </Link>
          ))}
        <MobileNav />
      </div>
    </header>
  )
}

