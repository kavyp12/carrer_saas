// 'use client'

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Textarea } from '@/components/ui/textarea'
// import { Card, CardContent } from '@/components/ui/card'
// import Link from 'next/link'
// import { motion, AnimatePresence } from 'framer-motion'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

// const questions = [
//   "What is your main goal for this academic year?",
//   "How do you prefer to study: alone or in groups?",
//   "What subject do you find most challenging?",
//   "How many hours per day do you dedicate to studying?",
//   "Do you have a specific study routine?",
//   "What learning resources do you use most often?",
//   "How do you prepare for exams?",
//   "What extracurricular activities are you involved in?",
//   "How do you balance your studies with other responsibilities?",
//   "What motivates you to study?",
//   "Do you have any specific career aspirations?",
//   "How do you handle academic stress?",
//   "What's your preferred learning style (visual, auditory, kinesthetic)?",
//   "How often do you seek help from teachers or tutors?",
//   "What's your biggest academic achievement so far?"
// ]

// export default function Questions() {
//   const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''))
//   const [currentQuestion, setCurrentQuestion] = useState(0)

//   const handleAnswerChange = (value: string) => {
//     const newAnswers = [...answers]
//     newAnswers[currentQuestion] = value
//     setAnswers(newAnswers)
//   }

//   const nextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1)
//     }
//   }

//   const prevQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1)
//     }
//   }

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-8"
//     >
//       <h1 className="text-4xl font-bold text-center text-gray-900">Questionnaire</h1>
//       <Card className="bg-white shadow-lg">
//         <CardContent className="p-6">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentQuestion}
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -50 }}
//               transition={{ duration: 0.3 }}
//             >
//               <h2 className="text-2xl font-semibold mb-4 text-gray-900">{`${currentQuestion + 1}. ${questions[currentQuestion]}`}</h2>
//               <Textarea
//                 value={answers[currentQuestion]}
//                 onChange={(e) => handleAnswerChange(e.target.value)}
//                 placeholder="Your answer here..."
//                 className="w-full bg-gray-50 text-gray-900 placeholder-gray-400"
//                 rows={6}
//               />
//             </motion.div>
//           </AnimatePresence>
//           <div className="flex justify-between mt-6">
//             <Button onClick={prevQuestion} disabled={currentQuestion === 0} variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
//               <ChevronLeft className="mr-2 h-4 w-4" /> Previous
//             </Button>
//             <Button onClick={nextQuestion} disabled={currentQuestion === questions.length - 1} variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
//               Next <ChevronRight className="ml-2 h-4 w-4" />
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//       <div className="flex justify-between">
//         <Button asChild variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700">
//           <Link href="/">Previous: Standards & Subjects</Link>
//         </Button>
//         <Button asChild variant="default" className="bg-blue-600 text-white hover:bg-blue-700">
//           <Link href="/processing">Next: Processing</Link>
//         </Button>
//       </div>
//     </motion.div>
//   )
// }

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const questions = [
  "What is your main goal for this academic year?",
  "How do you prefer to study: alone or in groups?",
  "What subject do you find most challenging?",
  "How many hours per day do you dedicate to studying?",
  "Do you have a specific study routine?",
  "What learning resources do you use most often?",
  "How do you prepare for exams?",
  "What extracurricular activities are you involved in?",
  "How do you balance your studies with other responsibilities?",
  "What motivates you to study?",
  "Do you have any specific career aspirations?",
  "How do you handle academic stress?",
  "What's your preferred learning style (visual, auditory, kinesthetic)?",
  "How often do you seek help from teachers or tutors?",
  "What's your biggest academic achievement so far?"
]

export default function Questions() {
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''))
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  const saveDataAndProceed = () => {
    localStorage.setItem('answers', JSON.stringify(answers))
    localStorage.setItem('academicInfo', JSON.stringify("Sample academic info")) // Replace with actual academic data
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h1 className="text-4xl font-bold text-center text-gray-900">Questionnaire</h1>
      <Card className="bg-white shadow-lg">
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">{`${currentQuestion + 1}. ${questions[currentQuestion]}`}</h2>
              <Textarea
                value={answers[currentQuestion]}
                onChange={(e) => handleAnswerChange(e.target.value)}
                placeholder="Your answer here..."
                className="w-full bg-gray-50 text-gray-900 placeholder-gray-400"
                rows={6}
              />
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between mt-6">
            <Button onClick={() => setCurrentQuestion(currentQuestion - 1)} disabled={currentQuestion === 0} variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={() => setCurrentQuestion(currentQuestion + 1)} disabled={currentQuestion === questions.length - 1} variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button asChild variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700">
          <Link href="/">Previous: Standards & Subjects</Link>
        </Button>
        <Button asChild variant="default" className="bg-blue-600 text-white hover:bg-blue-700" onClick={saveDataAndProceed}>
          <Link href="/processing">Next: Processing</Link>
        </Button>
      </div>
    </motion.div>
  )
}
