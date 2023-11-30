// QuizPage.tsx
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import QuestionCard from './QuestionCard';
import { v4 as uuidv4 } from 'uuid';
import { Textarea } from '@/components/ui/textarea';
import { getQuizzes } from "@/actions/get-quizzes";

interface QuizFormProps {
  title: string;
  description?: string;
  points: number;
}

interface Question {
  id: string;
  quizId: string;
  questionId: number;
  questionDescription: string;
  questionType: string;
  choices: string;
  correct: string;
  createdAt: Date;
  updatedAt: Date;
}

const quizSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  points: z.number().int(),
});

const QuizPage = () => {
  const [quizData, setQuizData] = useState<QuizFormProps | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  const form = useForm<QuizFormProps>({
    resolver: zodResolver(quizSchema),
  });

  const { handleSubmit, register, formState } = form;

  const { isValid, isSubmitting } = formState;

  const handleEditQuestion = (questionId: number, updatedQuestion: Partial<Question>) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.map((prevQuestion) => {
        if (prevQuestion.questionId === questionId) {
          return { ...prevQuestion, ...updatedQuestion };
        }
        return prevQuestion;
      });
    });
  };

  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: uuidv4(),
        quizId: 'your-quiz-id', // Replace with the actual quiz id
        questionId: prevQuestions.length + 1,
        questionDescription: '',
        questionType: '',
        choices: '',
        correct: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.splice(index, 1);
      return updatedQuestions;
    });
  };

  const onSubmit = async (data: QuizFormProps) => {
    try {
      // Send quiz data to the server
      const response = await axios.post('/api/quiz', { ...data, questions });

      // Update the state or perform other actions as needed
      setQuizData(response.data);

      // Fetch quizzes after successful submission
      const staticUserId = 'yourStaticUserId'; // Replace 'yourStaticUserId' with your static user ID
      const quizzes = await getQuizzes({ userId: staticUserId });
      console.log('Quizzes:', quizzes);

      // Reset the form if needed
      form.reset();
      setQuestions([]); // Clear the questions array after submission
    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Handle error
    }
  };

  return (
    <div className='px-3'>
      <h1 className="font-medium text-2xl flex items-center justify-between">Create/Edit Quiz</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 py-3">
            Quiz Title
          </label>
          <Input
            type="text"
            id="title"
            {...register('title')}
            placeholder="Enter quiz title"
            required
            className="w-1/3"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 py-3">
            Quiz Description
          </label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Enter quiz description"
            className="w-1/2 h-16 resize none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="points" className="block text-sm font-medium text-gray-700 py-3">
            Quiz Points
          </label>
          <Input
            type="number"
            id="points"
            {...register('points')}
            placeholder="0 points"
            required
            readOnly
            className="w-3/8"
          />
        </div>
        <Button type="button" onClick={addQuestion} className="mt-4">
          Add Question
        </Button>
        {/* Display QuestionCards for added questions */}
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} onEdit={(questionId, updatedQuestion) => handleEditQuestion(questionId, updatedQuestion)} />
        ))}
        <Button type="submit" className="mt-4" style={{ paddingLeft: '-5px', paddingRight: '-5px' }}>
          Save Quiz
        </Button>
      </form>

      {/* Display Quiz Data for verification */}
      {quizData && (
        <div className="mt-4">
          <h2>Quiz Data</h2>
          <p>Title: {quizData.title}</p>
          <p>Description: {quizData.description}</p>
          <p>Points: {quizData.points}</p>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
