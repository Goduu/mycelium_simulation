import { Header } from '@/components/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import 'aura-beam-annotator/dist/tailwind.css'
import SectionContainer from '@/components/SectionContainer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Evolutionary Algorithms',
  description: 'See how it goes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SectionContainer>
          <Header />
          <div className="flex h-screen flex-col justify-between font-sans">
            {children}
          </div>
        </SectionContainer>
      </body>
    </html>
  )
}
