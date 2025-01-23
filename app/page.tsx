// 'use client'

// import { useState } from 'react'
// import { PlusCircle, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Card, CardContent } from '@/components/ui/card'
// import Link from 'next/link'
// import { motion, AnimatePresence } from 'framer-motion'

// interface Subject {
//   id: string
//   name: string
//   marks: number
// }

// interface Standard {
//   id: string
//   name: string
//   subjects: Subject[]
// }

// export default function StandardsAndSubjects() {
//   const [standards, setStandards] = useState<Standard[]>([
//     { id: '1', name: 'Standard 1', subjects: [{ id: '1', name: 'Subject 1', marks: 0 }] }
//   ])
//   const [expandedStandard, setExpandedStandard] = useState<string | null>('1')

//   const addStandard = () => {
//     const newStandard = { 
//       id: Date.now().toString(), 
//       name: `Standard ${standards.length + 1}`, 
//       subjects: [{ id: Date.now().toString(), name: 'New Subject', marks: 0 }] 
//     }
//     setStandards([...standards, newStandard])
//     setExpandedStandard(newStandard.id)
//   }

//   const removeStandard = (standardId: string) => {
//     setStandards(standards.filter(s => s.id !== standardId))
//     if (expandedStandard === standardId) {
//       setExpandedStandard(null)
//     }
//   }

//   const addSubject = (standardId: string) => {
//     setStandards(standards.map(s => {
//       if (s.id === standardId) {
//         return { ...s, subjects: [...s.subjects, { id: Date.now().toString(), name: 'New Subject', marks: 0 }] }
//       }
//       return s
//     }))
//   }

//   const removeSubject = (standardId: string, subjectId: string) => {
//     setStandards(standards.map(s => {
//       if (s.id === standardId) {
//         return { ...s, subjects: s.subjects.filter(sub => sub.id !== subjectId) }
//       }
//       return s
//     }))
//   }

//   const updateSubject = (standardId: string, subjectId: string, field: 'name' | 'marks', value: string | number) => {
//     setStandards(standards.map(s => {
//       if (s.id === standardId) {
//         return {
//           ...s,
//           subjects: s.subjects.map(sub => {
//             if (sub.id === subjectId) {
//               return { ...sub, [field]: value }
//             }
//             return sub
//           })
//         }
//       }
//       return s
//     }))
//   }

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-8"
//     >
//       <h1 className="text-4xl font-bold text-center text-gray-900">Standards and Subjects</h1>
//       <AnimatePresence>
//         {standards.map((standard) => (
//           <motion.div
//             key={standard.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Card className="overflow-hidden bg-white shadow-lg">
//               <CardContent className="p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <h2 className="text-2xl font-semibold text-gray-900">{standard.name}</h2>
//                   <div className="flex space-x-2">
//                     <Button 
//                       variant="secondary" 
//                       size="icon"
//                       onClick={() => setExpandedStandard(expandedStandard === standard.id ? null : standard.id)}
//                     >
//                       {expandedStandard === standard.id ? (
//                         <ChevronUp className="h-6 w-6 text-gray-900" />
//                       ) : (
//                         <ChevronDown className="h-6 w-6 text-gray-900" />
//                       )}
//                     </Button>
//                     <Button variant="outline" size="icon" onClick={() => removeStandard(standard.id)}>
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//                 <AnimatePresence>
//                   {expandedStandard === standard.id && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: 'auto' }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.3 }}
//                     >
//                       <div className="space-y-4">
//                         {standard.subjects.map((subject) => (
//                           <motion.div 
//                             key={subject.id} 
//                             className="flex space-x-4 items-center"
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             exit={{ opacity: 0, x: 20 }}
//                             transition={{ duration: 0.2 }}
//                           >
//                             <Input
//                               value={subject.name}
//                               onChange={(e) => updateSubject(standard.id, subject.id, 'name', e.target.value)}
//                               placeholder="Subject Name"
//                               className="flex-grow bg-gray-50 text-gray-900 placeholder-gray-400"
//                             />
//                             <Input
//                               type="number"
//                               value={subject.marks}
//                               onChange={(e) => updateSubject(standard.id, subject.id, 'marks', parseInt(e.target.value))}
//                               placeholder="Marks"
//                               className="w-24 bg-gray-50 text-gray-900 placeholder-gray-400"
//                             />
//                             <Button variant="outline" size="icon" onClick={() => removeSubject(standard.id, subject.id)}>
//                               <Trash2 className="h-4 w-4" />
//                             </Button>
//                           </motion.div>
//                         ))}
//                       </div>
//                       <Button variant="outline" className="mt-4 text-blue-600 border-blue-600 hover:bg-blue-50" onClick={() => addSubject(standard.id)}>
//                         <PlusCircle className="h-4 w-4 mr-2" /> Add Subject
//                       </Button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </AnimatePresence>
//       <div className="flex justify-center space-x-4">
//         <Button onClick={addStandard} variant="default" className="bg-blue-600 text-white hover:bg-blue-700">
//           <PlusCircle className="h-4 w-4 mr-2" /> Add Standard
//         </Button>
//         <Button asChild>
//           <Link href="/questions">Next: Questions</Link>
//         </Button>
//       </div>
//     </motion.div>
//   )
// }



'use client'

import { useState } from 'react'
import { PlusCircle, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface Subject {
  id: string
  name: string
  marks: number
  potential?: string
}

interface Standard {
  id: string
  name: string
  subjects: Subject[]
}

export default function StandardsAndSubjects() {
  const [standards, setStandards] = useState<Standard[]>([
    { 
      id: '1', 
      name: 'Standard 1', 
      subjects: [
        { 
          id: '1', 
          name: 'Subject 1', 
          marks: 0,
          potential: ''
        }
      ] 
    }
  ])
  const [expandedStandard, setExpandedStandard] = useState<string | null>('1')

  const addStandard = () => {
    const newStandard = { 
      id: Date.now().toString(), 
      name: `Standard ${standards.length + 1}`, 
      subjects: [
        { 
          id: Date.now().toString(), 
          name: 'New Subject', 
          marks: 0,
          potential: ''
        }
      ] 
    }
    setStandards([...standards, newStandard])
    setExpandedStandard(newStandard.id)
  }

  const removeStandard = (standardId: string) => {
    setStandards(standards.filter(s => s.id !== standardId))
    if (expandedStandard === standardId) {
      setExpandedStandard(null)
    }
  }

  const addSubject = (standardId: string) => {
    setStandards(standards.map(s => {
      if (s.id === standardId) {
        return { 
          ...s, 
          subjects: [
            ...s.subjects, 
            { 
              id: Date.now().toString(), 
              name: 'New Subject', 
              marks: 0,
              potential: ''
            }
          ] 
        }
      }
      return s
    }))
  }

  const removeSubject = (standardId: string, subjectId: string) => {
    setStandards(standards.map(s => {
      if (s.id === standardId) {
        return { 
          ...s, 
          subjects: s.subjects.filter(sub => sub.id !== subjectId) 
        }
      }
      return s
    }))
  }

  const updateSubject = (
    standardId: string, 
    subjectId: string, 
    field: 'name' | 'marks' | 'potential', 
    value: string | number
  ) => {
    setStandards(standards.map(s => {
      if (s.id === standardId) {
        return {
          ...s,
          subjects: s.subjects.map(sub => {
            if (sub.id === subjectId) {
              return { ...sub, [field]: value }
            }
            return sub
          })
        }
      }
      return s
    }))
  }

  const saveAcademicInfo = () => {
    // Generate a detailed academic summary
    const academicSummary = standards.map(standard => 
      standard.subjects.map(subject => 
        `${standard.name} - ${subject.name}: ${subject.marks}% ${subject.potential ? `(${subject.potential})` : ''}`
      ).join('; ')
    ).join('. ')

    localStorage.setItem('academicInfo', academicSummary)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <h1 className="text-4xl font-bold text-center text-gray-900">Academic Profile</h1>
      <AnimatePresence>
        {standards.map((standard) => (
          <motion.div
            key={standard.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">{standard.name}</h2>
                  <div className="flex space-x-2">
                    <Button 
                      variant="secondary" 
                      size="icon"
                      onClick={() => setExpandedStandard(expandedStandard === standard.id ? null : standard.id)}
                    >
                      {expandedStandard === standard.id ? (
                        <ChevronUp className="h-6 w-6 text-gray-900" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-gray-900" />
                      )}
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => removeStandard(standard.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <AnimatePresence>
                  {expandedStandard === standard.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="space-y-4">
                        {standard.subjects.map((subject) => (
                          <motion.div 
                            key={subject.id} 
                            className="space-y-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex space-x-4 items-center">
                              <Input
                                value={subject.name}
                                onChange={(e) => updateSubject(standard.id, subject.id, 'name', e.target.value)}
                                placeholder="Subject Name"
                                className="flex-grow bg-gray-50 text-gray-900 placeholder-gray-400"
                              />
                              <Input
                                type="number"
                                value={subject.marks}
                                onChange={(e) => updateSubject(standard.id, subject.id, 'marks', parseInt(e.target.value))}
                                placeholder="Marks"
                                className="w-24 bg-gray-50 text-gray-900 placeholder-gray-400"
                              />
                              <Button variant="outline" size="icon" onClick={() => removeSubject(standard.id, subject.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <Input
                              value={subject.potential || ''}
                              onChange={(e) => updateSubject(standard.id, subject.id, 'potential', e.target.value)}
                              placeholder="Potential Career/Field"
                              className="w-full bg-gray-50 text-gray-900 placeholder-gray-400"
                            />
                          </motion.div>
                        ))}
                      </div>
                      <Button variant="outline" className="mt-4 text-blue-600 border-blue-600 hover:bg-blue-50" onClick={() => addSubject(standard.id)}>
                        <PlusCircle className="h-4 w-4 mr-2" /> Add Subject
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="flex justify-center space-x-4">
        <Button onClick={addStandard} variant="default" className="bg-blue-600 text-white hover:bg-blue-700">
          <PlusCircle className="h-4 w-4 mr-2" /> Add Standard
        </Button>
        <Button 
          asChild 
          onClick={saveAcademicInfo}
        >
          <Link href="/questions">Next: Questions</Link>
        </Button>
      </div>
    </motion.div>
  )
}