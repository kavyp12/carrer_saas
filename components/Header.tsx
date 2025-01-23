import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="py-6 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">SaaSApp</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Button variant="ghost" className="text-gray-600 hover:text-blue-600 transition-colors duration-200" asChild><Link href="/">Home</Link></Button></li>
            <li><Button variant="ghost" className="text-gray-600 hover:text-blue-600 transition-colors duration-200" asChild><Link href="/questions">Questions</Link></Button></li>
            <li><Button variant="ghost" className="text-gray-600 hover:text-blue-600 transition-colors duration-200" asChild><Link href="/report">Report</Link></Button></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

