import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ye Dashboard',
  description: 'Control panel for Ye AI Assistant',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
