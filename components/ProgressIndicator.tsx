'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const steps = [
  { name: 'Standards & Subjects', href: '/' },
  { name: 'Questions', href: '/questions' },
  { name: 'Processing', href: '/processing' },
  { name: 'Report', href: '/report' },
]

export default function ProgressIndicator() {
  const pathname = usePathname()
  const currentStepIndex = steps.findIndex(step => step.href === pathname)

  return (
    <nav aria-label="Progress" className="py-4">
      <ol role="list" className="flex items-center justify-between">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className="relative flex-1">
            {stepIdx !== steps.length - 1 ? (
              <div className="absolute top-4 left-1/2 h-0.5 w-full bg-gray-200" aria-hidden="true" />
            ) : null}
            <motion.div 
              className="relative flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: stepIdx * 0.1 }}
            >
              <span
                className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-semibold ${
                  stepIdx <= currentStepIndex ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 border-2 border-gray-200'
                }`}
              >
                {stepIdx + 1}
              </span>
              <span className="absolute top-14 text-xs font-medium text-gray-500">
                {step.name}
              </span>
            </motion.div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

