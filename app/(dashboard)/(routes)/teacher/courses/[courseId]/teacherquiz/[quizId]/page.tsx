// // QuizPage.tsx
// "use client";

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import axios from 'axios';
// import QuestionCard from './QuestionCard';
// import { v4 as uuidv4 } from 'uuid';
// import { Textarea } from '@/components/ui/textarea';
// import { getQuizzes } from "@/actions/get-quizzes";

// interface QuizFormProps {
//   title: string;
//   description?: string;
//   score: number;
// }

// interface Question {
//   id: string;
//   quizId: string;
//   questionId: number;
//   questionDescription: string;
//   questionType: string;
//   choices: string;
//   correct: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const quizSchema = z.object({
//   title: z.string().min(1),
//   description: z.string().optional(),
//   score: z.number().int(),
// });

// const QuizPage = () => {
//   const [quizData, setQuizData] = useState<QuizFormProps | null>(null);
//   const [questions, setQuestions] = useState<Question[]>([]);

//   const form = useForm<QuizFormProps>({
//     resolver: zodResolver(quizSchema),
//   });

//   const { handleSubmit, register, formState } = form;

//   const { isValid, isSubmitting } = formState;

//   const handleEditQuestion = (questionId: number, updatedQuestion: Partial<Question>) => {
//     setQuestions((prevQuestions) => {
//       return prevQuestions.map((prevQuestion) => {
//         if (prevQuestion.questionId === questionId) {
//           return { ...prevQuestion, ...updatedQuestion };
//         }
//         return prevQuestion;
//       });
//     });
//   };

//   const addQuestion = () => {
//     setQuestions((prevQuestions) => [
//       ...prevQuestions,
//       {
//         id: uuidv4(),
//         quizId: uuidv4(),
//         questionId: prevQuestions.length + 1,
//         questionDescription: '',
//         questionType: '',
//         choices: '',
//         correct: '',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//     ]);
  
//     // Set quiz score equal to the number of questions
//     form.setValue('score', questions.length + 1);
//   };
  
  
  

//   const removeQuestion = (index: number) => {
//     setQuestions((prevQuestions) => {
//       const updatedQuestions = [...prevQuestions];
//       updatedQuestions.splice(index, 1);

//       // Reassign question IDs based on their index
//       const sortedQuestions = updatedQuestions.map((question, newIndex) => ({
//         ...question,
//         questionId: newIndex + 1,
//       }));

//       // Decrement quiz score when removing a question
//       const currentScore = form.getValues('score') as number;
//       form.setValue('score', currentScore - 1);

//       return sortedQuestions;
//     });
//   };

//   const onSubmit = async (data: QuizFormProps) => {
//     try {
//       // Send quiz data to the server
//       const response = await axios.post('/api/quiz', { ...data, questions });

//       // Update the state or perform other actions as needed
//       setQuizData(response.data);

//       // Fetch quizzes after successful submission
//       const staticUserId = 'yourStaticUserId'; // Replace 'yourStaticUserId' with your static user ID
//       const quizzes = await getQuizzes({ userId: staticUserId });
//       console.log('Quizzes:', quizzes);

//       // Reset the form if needed
//       form.reset();
//       setQuestions([]); // Clear the questions array after submission
//     } catch (error) {
//       console.error('Error submitting quiz:', error);
//       // Handle error
//     }
//   };

//   return (
//     <div className='px-3 flex flex-col items-center justify-center min-h-screen bg-blue-100'>
//       <div className="bg-white p-8 rounded-md shadow-inner" style={{ boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)', width: '80%' }}>
//         <h1 className="font-medium text-2xl flex items-center justify-between">Create/Edit Quiz</h1>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4">
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700 py-3">
//               Quiz Title
//             </label>
//             <Input
//               type="text"
//               id="title"
//               {...register('title')}
//               placeholder="Enter quiz title"
//               required
//               className="w-full"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 py-3">
//               Quiz Description
//             </label>
//             <Textarea
//               id="description"
//               {...register('description')}
//               placeholder="Enter quiz description"
//               className="w-full h-16 resize none"
//             />
//           </div>
//           <div className="mb-4">
//             <div className="flex flex-col">
//               <label className="block text-sm font-medium text-gray-700 py-1">
//                 Quiz Score
//               </label>
//               <div className="flex items-center">
//                 <div className="w-16 mr-2">
//                   <Input
//                     type="number"
//                     id="score"
//                     {...register('score')}
//                     placeholder="0"
//                     required
//                     readOnly
//                     className="w-full text-center" 
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-center gap-4 mb-6">
//             <Button
//               type="button"
//               onClick={addQuestion}
//               className={`transition-transform transform-gpu ${
//                 isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//             >
//               Add Question
//             </Button>
//             <Button
//               type="submit"
//               className={`transition-transform transform-gpu ${
//                 isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//               }`}
//               style={{ paddingLeft: '-5px', paddingRight: '-5px' }}
//             >
//               Save Quiz
//             </Button>
//           </div>
//           {/* Display QuestionCards for added questions */}
//           {questions.map((question, index) => (
//             <div key={question.id} className="flex flex-col mb-4">
//               <div className="w-full">
//                 <QuestionCard
//                   question={question}
//                   onEdit={(questionId, updatedQuestion) =>
//                     handleEditQuestion(questionId, updatedQuestion)
//                   }
//                 />
//               </div>
//               <Button
//                 type="button"
//                 onClick={() => removeQuestion(index)}
//                 className={`mt-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 style={{ backgroundColor: '#EE334B', color: '#F8FAFC' }}
//               >
//                 Remove Question
//               </Button>
//             </div>
//           ))}
//         </form>
//         {/* Display Quiz Data for verification */}
//         {quizData && (
//           <div className="mt-4">
//             <h2>Quiz Data</h2>
//             <p>Title: {quizData.title}</p>
//             <p>Description: {quizData.description}</p>
//             <p>Points: {quizData.score}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuizPage;
// "use client";

// import * as z from "zod";
// import axios from "axios";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";

// import{
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import { Router } from "lucide-react";
// import toast from "react-hot-toast";

// const formSchema = z.object({
//   title: z.string().min(1, {
//     message: "title is required"
//   }),
//   choices01: z.string().min(1, {
//     message: "choices is required"
//   }),
//   choices02: z.string().min(1, {
//     message: "choices is required"
//   }),
//   choices03: z.string().min(1, {
//     message: "choices is required"
//   }),
//   choices04: z.string().min(1, {
//     message: "choices is required"
//   })
// });

// const CreateQuizPage = () => {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues:{
//       title: "",
//       choices01: "",
//       choices02: "",
//       choices03: "",
//       choices04: "",
//     },
//   });

//   const {isSubmitting, isValid} = form.formState;

//   // const onSubmit = (values: z.infer<typeof formSchema>) => {
//   //   console.log(values);
//   // }
//   const router = useRouter();

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try{
//       //const response = await axios.post(`/api/${courseId}/quiz/${quizId}`,values)
//       //router.push(`/teacher/courses/teacherquiz/${response.data.id}`); // it shoul put an error since there is no route for this
//       toast.success("Quiz Created")
//     }catch{
//       toast.error("Something went wrong");
//     }
//   }

//   return (
//     <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
//       <div>
//         <h1 className="text-2xl">
//           Name your course
//         </h1>
//         <p className="text-sm text-slate-600">
//           chuchutvasdasdasdasdasdasdada
//         </p>
//         <Form {...form}>
//           <form
//            onSubmit={form.handleSubmit(onSubmit)}
//            className="space-y-8 mt-8"
//           >
//             <FormField
//               control={form.control}
//               name="title"
//               render={({field}) => (
//                 <FormItem>
//                   <FormLabel>
//                     Enter Question Here!
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                     disabled={isSubmitting}
//                     placeholder="e.g. 'advance web dev"
//                     {...field}
//                     />
//                   </FormControl>
//                   <FormMessage/>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="choices01"
//               render={({field}) => (
//                 <FormItem>
//                   <FormLabel>
//                     Enter Choices Here
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                     disabled={isSubmitting}
//                     placeholder="e.g. 'advance web dev"
//                     {...field}
//                     />
//                   </FormControl>
//                   <FormMessage/>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="choices02"
//               render={({field}) => (
//                 <FormItem>
//                   <FormLabel>
//                     Enter Choices Here
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                     disabled={isSubmitting}
//                     placeholder="e.g. 'advance web dev"
//                     {...field}
//                     />
//                   </FormControl>
//                   <FormMessage/>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="choices03"
//               render={({field}) => (
//                 <FormItem>
//                   <FormLabel>
//                     Enter Choices Here
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                     disabled={isSubmitting}
//                     placeholder="e.g. 'advance web dev"
//                     {...field}
//                     />
//                   </FormControl>
//                   <FormMessage/>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="choices04"
//               render={({field}) => (
//                 <FormItem>
//                   <FormLabel>
//                     Enter Choices Here
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                     disabled={isSubmitting}
//                     placeholder="e.g. 'advance web dev"
//                     {...field}
//                     />
//                   </FormControl>
//                   <FormMessage/>
//                 </FormItem>
//               )}
//             />
//             <div className="flex items-center gap-x-2">
//                 <Link href="/">
//                   <Button
//                   type="button"
//                   variant="ghost"
//                   >
//                     Cancel
//                   </Button>
//                 </Link >
//                 <Button
//                 type="submit"
//                 disabled={!isValid || isSubmitting}
//                 >
//                   Continue
//                 </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   )
// }

// export default CreateQuizPage;

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";
import { QuestionCardForm } from "./_components/QuestionCard";


//import { ChapterAccessForm } from "./_components/chapter-access-form";

const QuizIdPage = async ({
  params
}: {
  params: { courseId: string; quizId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const quiz = await db.quiz.findUnique({
    where: {
      id: params.quizId,
      courseId: params.courseId
    },
  });

  if (!quiz) {
    return redirect("/")
  }

  const requiredFields = [
    quiz.title,
    quiz.question01,
    quiz.question02,
    quiz.question03,
    quiz.question04,
    quiz.question05
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!quiz.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                  Chapter Creation
                </h1>
                <span className="text-sm text-slate-700">
                  Complete all Questions {completionText}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">               
              </div>
              <QuestionCardForm
                initialData={quiz}
                courseId={params.courseId}
                quizId={params.quizId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default QuizIdPage;
