// 'use client'

// import { Card, CardContent } from '@/components/ui/card'
// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { motion } from 'framer-motion'
// import { useEffect, useState } from 'react'

// export default function Processing() {
//   const [progress, setProgress] = useState(0)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) => {
//         if (prevProgress >= 100) {
//           clearInterval(timer)
//           return 100
//         }
//         return prevProgress + 1
//       })
//     }, 50)

//     return () => clearInterval(timer)
//   }, [])

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="flex flex-col items-center justify-center min-h-[60vh]"
//     >
//       <Card className="w-full max-w-md bg-white shadow-lg">
//         <CardContent className="p-6 text-center">
//           <h1 className="text-3xl font-bold mb-4 text-gray-900">Processing Your Report</h1>
//           <p className="text-gray-600 mb-6">
//             We&apos;re currently generating your personalized report based on the information you&apos;ve provided. 
//             This may take a few moments. We&apos;ll notify you when it&apos;s ready for download.
//           </p>
//           <div className="relative pt-1">
//             <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
//               <motion.div 
//                 style={{ width: `${progress}%` }}
//                 className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
//                 initial={{ width: '0%' }}
//                 animate={{ width: `${progress}%` }}
//                 transition={{ duration: 0.5 }}
//               />
//             </div>
//           </div>
//           <p className="text-gray-900 font-semibold">{progress}% Complete</p>
//         </CardContent>
//       </Card>
//       <div className="mt-8">
//         <Button asChild variant="secondary">
//           <Link href="/questions">Previous: Questions</Link>
//         </Button>
//       </div>
//     </motion.div>
//   )
// }

// 'use client'

// import { Card, CardContent } from '@/components/ui/card'
// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { motion } from 'framer-motion'
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'

// export default function Processing() {
//   const [progress, setProgress] = useState(0)
//   const [error, setError] = useState<string | null>(null)
//   const router = useRouter()

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) => {
//         if (prevProgress >= 100) {
//           clearInterval(timer)
//           return 100
//         }
//         return prevProgress + 10
//       })
//     }, 500)

//     // Call the backend API once the component mounts
//     const generateReport = async () => {
//       try {
//         const academicInfo = JSON.parse(localStorage.getItem('academicInfo') || '{}')
//         const answers = JSON.parse(localStorage.getItem('answers') || '[]')

//         const response = await fetch('http://127.0.0.1:3001/api/generate-report', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             academicInfo,
//             answers,
//           }),
//         })

//         if (!response.ok) {
//           throw new Error('Failed to generate the report. Please try again.')
//         }

//         const data = await response.json()

//         if (data.success) {
//           localStorage.setItem('report', JSON.stringify({ sections: [{ title: 'Report', content: data.report }] }))
//           router.push('/report')
//         } else {
//           throw new Error(data.error || 'An unknown error occurred.')
//         }
//       } catch (err) {
//         setError((err as Error).message)
//       }
//     }

//     generateReport()

//     return () => clearInterval(timer)
//   }, [router])

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="flex flex-col items-center justify-center min-h-[60vh]"
//     >
//       <Card className="w-full max-w-md bg-white shadow-lg">
//         <CardContent className="p-6 text-center">
//           <h1 className="text-3xl font-bold mb-4 text-gray-900">Processing Your Report</h1>
//           <p className="text-gray-600 mb-6">
//             {error
//               ? `Error: ${error}`
//               : "We're currently generating your personalized report. This may take a few moments."}
//           </p>
//           <div className="relative pt-1">
//             <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
//               <motion.div 
//                 style={{ width: `${progress}%` }}
//                 className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
//                 initial={{ width: '0%' }}
//                 animate={{ width: `${progress}%` }}
//                 transition={{ duration: 0.5 }}
//               />
//             </div>
//           </div>
//           <p className="text-gray-900 font-semibold">{progress}% Complete</p>
//         </CardContent>
//       </Card>
//       <div className="mt-8">
//         <Button asChild variant="secondary">
//           <Link href="/questions">Previous: Questions</Link>
//         </Button>
//       </div>
//     </motion.div>
//   )
// }



// import { useEffect, useState } from 'react'
// import { Card, CardContent } from '@/components/ui/card'
// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { motion } from 'framer-motion'
// import { useRouter } from 'next/navigation'

// export default function Processing() {
//   const [progress, setProgress] = useState(0)
//   const [report, setReport] = useState(null)
//   const router = useRouter()

//   useEffect(() => {
//     const generateReport = async () => {
//       try {
//         const answers = JSON.parse(localStorage.getItem('answers') || '[]')
//         const standards = JSON.parse(localStorage.getItem('standards') || '[]')
        
//         // Format academic info
//         const academicInfo = standards.map((std: { subjects: any[] }) => 
//           std.subjects.map(sub => 
//             `${sub.name}: ${sub.marks}%`
//           ).join(', ')
//         ).join('. ')
    
//         const userData = {
//           academicInfo,
//           answers
//         }
    
//         // First save the user data
//         await fetch('http://localhost:5000/api/save-user-data', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(userData),
//         })
    
//         // Then generate the report
//         const response = await fetch('http://localhost:5000/api/generate-report', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(userData),
//         })
    
//         const data = await response.json()
//         setReport(data)
//         setProgress(100)
        
//         localStorage.setItem('careerReport', JSON.stringify(data))
//         setTimeout(() => router.push('/report'), 1000)
//       } catch (error) {
//         console.error('Error generating report:', error)
//       }
//     }
//     generateReport()
//   }, [router])

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="flex flex-col items-center justify-center min-h-[60vh]"
//     >
//       <Card className="w-full max-w-md bg-white shadow-lg">
//         <CardContent className="p-6 text-center">
//           <h1 className="text-3xl font-bold mb-4 text-gray-900">Processing Your Report</h1>
//           <p className="text-gray-600 mb-6">
//             We're analyzing your information and generating personalized career recommendations.
//           </p>
//           <div className="relative pt-1">
//             <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
//               <motion.div 
//                 style={{ width: `${progress}%` }}
//                 className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
//                 initial={{ width: '0%' }}
//                 animate={{ width: `${progress}%` }}
//                 transition={{ duration: 0.5 }}
//               />
//             </div>
//           </div>
//           <p className="text-gray-900 font-semibold">{progress}% Complete</p>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }



'use client'

import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Processing() {
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return prevProgress + 10
      })
    }, 500)

    const generateReport = async () => {
      try {
        // Ensure data exists before sending
        const academicInfo = localStorage.getItem('academicInfo')
        const answersRaw = localStorage.getItem('answers')

        if (!academicInfo || !answersRaw) {
          throw new Error('Missing academic information or answers')
        }

        const answers = JSON.parse(answersRaw)

        console.log('Sending data:', { academicInfo, answers }) // Logging request data

        const response = await fetch('http://127.0.0.1:3001/api/generate-report', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            academicInfo,
            answers,
          }),
        })

        console.log('Response status:', response.status) // Logging response status

        if (!response.ok) {
          const errorText = await response.text()
          console.error('Error response:', errorText)
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }

        const data = await response.json()
        console.log('Received data:', data) // Logging received data

        if (data.success) {
          localStorage.setItem('report', JSON.stringify({ 
            sections: [{ title: 'Full Report', content: data.report }] 
          }))
          router.push('/report')
        } else {
          throw new Error(data.error || 'An unknown error occurred during report generation')
        }
      } catch (err) {
        console.error('Full error:', err)
        setError(err instanceof Error ? err.message : String(err))
      }
    }

    generateReport()

    return () => clearInterval(timer)
  }, [router])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <Card className="w-full max-w-md bg-white shadow-lg">
          <CardContent className="p-6 text-center">
            <h1 className="text-3xl font-bold mb-4 text-red-600">Error</h1>
            <p className="text-gray-700 mb-6">{error}</p>
            <Button asChild variant="destructive">
              <Link href="/questions">Go Back to Questions</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[60vh]"
    >
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardContent className="p-6 text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Processing Your Report</h1>
          <p className="text-gray-600 mb-6">
            We're currently generating your personalized report. This may take a few moments.
          </p>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
              <motion.div 
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <p className="text-gray-900 font-semibold">{progress}% Complete</p>
        </CardContent>
      </Card>
      <div className="mt-8">
        <Button asChild variant="secondary">
          <Link href="/questions">Previous: Questions</Link>
        </Button>
      </div>
    </motion.div>
  )
}