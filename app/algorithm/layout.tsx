import { ShopSideBar } from '@/components/mycelium/ShopSideBar';


export const metadata = {
  title: 'Mycelium',
  description: 'Evolution game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}

    </>
  )
}
