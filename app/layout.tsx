import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/navigation';
import './globals.css'
import {cn} from "@/libs/utils";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={'h-full'}>
      <body className={cn(inter.className, 'h-full bg-black')}>
      <Navigation />
      {children}
      </body>
    </html>
  )
}
