import './globals.css'
import { Poppins } from 'next/font/google'
import ProgressIndicator from '../components/ProgressIndicator'
import Header from '../components/Header'

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Advanced SaaS Frontend',
  description: 'Magnificent SaaS Frontend with stunning visuals and interactions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans`}>
      <body className="bg-gradient-to-br from-gray-50 to-white text-gray-900">
        <div className="min-h-screen">
          <main className="container mx-auto px-4 py-8">
            <Header />
            <ProgressIndicator />
            <div className="mt-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}

