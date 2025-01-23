'use client'

// import { Card, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'
// import { Download, Share2, ChevronDown } from 'lucide-react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useState, useEffect } from 'react'

// // Default sections in case report loading fails
// const defaultSections = [
//   { title: 'Academic Performance', content: 'Loading academic performance data...' },
//   { title: 'Study Habits', content: 'Loading study habits data...' },
//   { title: 'Extracurricular Activities', content: 'Loading extracurricular activities data...' },
//   { title: 'Career Aspirations', content: 'Loading career aspirations data...' },
//   { title: 'Recommendations', content: 'Loading recommendations...' },
// ]

// export default function Report() {
//   const [sections, setSections] = useState(defaultSections)
//   const [expandedSection, setExpandedSection] = useState<number | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     try {
//       const savedReport = JSON.parse(localStorage.getItem('report') || '{}')
//       if (savedReport.sections && savedReport.sections.length > 0) {
//         setSections(savedReport.sections)
//       }
//     } catch (error) {
//       console.error('Error loading report:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [])

//   const handleDownload = () => {
//     try {
//       const reportText = sections
//         .map(section => `${section.title}\n\n${section.content}\n\n`)
//         .join('---\n\n')
      
//       const blob = new Blob([reportText], { type: 'text/plain' })
//       const url = URL.createObjectURL(blob)
//       const a = document.createElement('a')
//       a.href = url
//       a.download = 'career-report.txt'
//       document.body.appendChild(a)
//       a.click()
//       document.body.removeChild(a)
//       URL.revokeObjectURL(url)
//     } catch (error) {
//       console.error('Error downloading report:', error)
//     }
//   }

//   const handleShare = async () => {
//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: 'My Career Report',
//           text: sections.map(section => `${section.title}: ${section.content}`).join('\n\n')
//         })
//       } else {
//         // Fallback if Web Share API is not available
//         alert('Sharing is not supported on this device/browser')
//       }
//     } catch (error) {
//       console.error('Error sharing report:', error)
//     }
//   }

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-8"
//     >
//       <h1 className="text-4xl font-bold text-center text-gray-900">Your Personalized Report</h1>
//       <Card className="bg-white shadow-lg">
//         <CardContent className="p-6">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-900">Report Summary</h2>
//           <p className="text-gray-600 mb-6">
//             Your personalized report has been generated based on the information you provided. 
//             Explore each section below for detailed insights and recommendations.
//           </p>
//           <div className="space-y-4">
//             {sections.map((section, index) => (
//               <motion.div key={index} layout>
//                 <Button
//                   variant="outline"
//                   className="w-full justify-between text-left text-blue-600 border-blue-600 hover:bg-blue-50"
//                   onClick={() => setExpandedSection(expandedSection === index ? null : index)}
//                 >
//                   <span>{section.title}</span>
//                   <ChevronDown 
//                     className={`h-4 w-4 transition-transform ${
//                       expandedSection === index ? 'rotate-180' : ''
//                     }`} 
//                   />
//                 </Button>
//                 <AnimatePresence>
//                   {expandedSection === index && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: 'auto' }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="bg-gray-50 p-4 rounded-b-lg"
//                     >
//                       <p className="text-gray-600">{section.content}</p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             ))}
//           </div>
//           <div className="flex justify-center space-x-4 mt-8">
//             <Button 
//               variant="default" 
//               className="bg-blue-600 text-white hover:bg-blue-700"
//               onClick={handleDownload}
//               disabled={isLoading}
//             >
//               <Download className="mr-2 h-4 w-4" /> Download Full Report
//             </Button>
//             <Button 
//               variant="outline" 
//               className="text-blue-600 border-blue-600 hover:bg-blue-50"
//               onClick={handleShare}
//               disabled={isLoading}
//             >
//               <Share2 className="mr-2 h-4 w-4" /> Share Report
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//       <div className="flex justify-start">
//         <Button asChild variant="secondary">
//           <Link href="/processing">Previous: Processing</Link>
//         </Button>
//       </div>
//     </motion.div>
//   )
// }
// app/report/page.tsx


// 'use client'
// import { useEffect, useState } from 'react'
// import { Card, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { motion } from 'framer-motion'
// import Markdown from 'react-markdown'
// import type { Report } from '../types/report'

// export default function Report() {
//   const [report, setReport] = useState<Report | null>(null)

//   useEffect(() => {
//     const reportData = localStorage.getItem('careerReport')
//     if (reportData) {
//       setReport(JSON.parse(reportData))
//     }
//   }, [])

//   const downloadReport = () => {
//     if (report) {
//       const blob = new Blob([report.content], { type: 'text/markdown' })
//       const url = window.URL.createObjectURL(blob)
//       const a = document.createElement('a')
//       a.href = url
//       a.download = `career_report_${new Date().toISOString()}.md`
//       document.body.appendChild(a)
//       a.click()
//       window.URL.revokeObjectURL(url)
//       document.body.removeChild(a)
//     }
//   }

//   if (!report) return <div>Loading...</div>

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <motion.div>
//         <Card>
//           <CardContent className="p-8">
//             <div className="flex justify-between items-center mb-6">
//               <h1 className="text-3xl font-bold">Career Guidance Report</h1>
//               <Button onClick={downloadReport}>Download Report</Button>
//             </div>
//             <div className="prose max-w-none">
//               <Markdown>{report.content}</Markdown>
//             </div>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   )
// // }
// 'use client'

// import { Card, CardContent } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'
// import { Download, Share2 } from 'lucide-react'
// import { motion } from 'framer-motion'
// import { useState, useEffect } from 'react'
// import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'

// export default function Report() {
//   const [reportContent, setReportContent] = useState<string>('')
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     try {
//       const savedReport = JSON.parse(localStorage.getItem('report') || '{}')
//       if (savedReport.sections && savedReport.sections[0]?.content) {
//         setReportContent(savedReport.sections[0].content)
//       }
//       setIsLoading(false)
//     } catch (error) {
//       console.error('Error loading report:', error)
//       setIsLoading(false)
//     }
//   }, [])

//   const handleDownload = () => {
//     try {
//       const blob = new Blob([reportContent], { type: 'text/markdown' })
//       const url = URL.createObjectURL(blob)
//       const a = document.createElement('a')
//       a.href = url
//       a.download = 'career-guidance-report.md'
//       document.body.appendChild(a)
//       a.click()
//       document.body.removeChild(a)
//       URL.revokeObjectURL(url)
//     } catch (error) {
//       console.error('Error downloading report:', error)
//     }
//   }

//   const handleShare = async () => {
//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: 'Career Guidance Report',
//           text: reportContent
//         })
//       } else {
//         alert('Sharing is not supported on this device/browser')
//       }
//     } catch (error) {
//       console.error('Error sharing report:', error)
//     }
//   }

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-8 p-4"
//     >
//       <h1 className="text-4xl font-bold text-center text-gray-900">Your Personalized Career Guidance Report</h1>
//       <Card className="bg-white shadow-lg">
//         <CardContent className="p-6">
//           {isLoading ? (
//             <p className="text-center text-gray-600">Loading report...</p>
//           ) : (
//             <div className="prose prose-sm max-w-none">
//               <ReactMarkdown 
//                 remarkPlugins={[remarkGfm]}
//                 className="markdown-content"
//               >
//                 {reportContent}
//               </ReactMarkdown>
//             </div>
//           )}
          
//           <div className="flex justify-center space-x-4 mt-8">
//             <Button 
//               variant="default" 
//               className="bg-blue-600 text-white hover:bg-blue-700"
//               onClick={handleDownload}
//               disabled={isLoading}
//             >
//               <Download className="mr-2 h-4 w-4" /> Download Report
//             </Button>
//             <Button 
//               variant="outline" 
//               className="text-blue-600 border-blue-600 hover:bg-blue-50"
//               onClick={handleShare}
//               disabled={isLoading}
//             >
//               <Share2 className="mr-2 h-4 w-4" /> Share Report
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//       <div className="flex justify-start">
//         <Button asChild variant="secondary">
//           <Link href="/processing">Previous: Processing</Link>
//         </Button>
//       </div>
//     </motion.div>
//   )
// }

'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Download, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Report() {
  const [reportContent, setReportContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const savedReport = JSON.parse(localStorage.getItem('report') || '{}')
      if (savedReport.sections && savedReport.sections[0]?.content) {
        setReportContent(savedReport.sections[0].content)
      }
      setIsLoading(false)
    } catch (error) {
      console.error('Error loading report:', error)
      setIsLoading(false)
    }
  }, [])

  const handleDownload = () => {
    try {
      const blob = new Blob([reportContent], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'career-guidance-report.md'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading report:', error)
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Career Guidance Report',
          text: reportContent
        })
      } else {
        alert('Sharing is not supported on this device/browser')
      }
    } catch (error) {
      console.error('Error sharing report:', error)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-4"
    >
      <h1 className="text-4xl font-bold text-center text-gray-900">Your Personalized Career Guidance Report</h1>
      <Card className="bg-white shadow-lg">
        <CardContent className="p-6">
          {isLoading ? (
            <p className="text-center text-gray-600">Loading report...</p>
          ) : (
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                className="markdown-content"
              >
                {reportContent}
              </ReactMarkdown>
            </div>
          )}
          
          <div className="flex justify-center space-x-4 mt-8">
            <Button 
              variant="default" 
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleDownload}
              disabled={isLoading}
            >
              <Download className="mr-2 h-4 w-4" /> Download Report
            </Button>
            <Button 
              variant="outline" 
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
              onClick={handleShare}
              disabled={isLoading}
            >
              <Share2 className="mr-2 h-4 w-4" /> Share Report
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-start">
        <Button asChild variant="secondary">
          <Link href="/processing">Previous: Processing</Link>
        </Button>
      </div>
    </motion.div>
  )
}