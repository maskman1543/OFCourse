"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Choice {
  choice: string;
}

interface QuizFormProps {
  question_01: string;
  choices: Choice[];
  correctChoice: string;
}

const quizSchema = z.object({
  question_01: z.string().min(1),
  choices: z.array(z.object({ choice: z.string() })),
  correctChoice: z.string(),
});

const QuizPage = () => {
  const [quizData, setQuizData] = useState<QuizFormProps | null>(null);
  const { control, handleSubmit, formState, register } = useForm<QuizFormProps>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      question_01: '',
      choices: [{ choice: '' }, { choice: '' }, { choice: '' }, { choice: '' }],
      correctChoice: '',
    },
  });
  const { isValid, isSubmitting } = formState;
  const { fields } = useFieldArray<QuizFormProps, "choices">({
    control,
    name: 'choices',
  });


  const onSubmit = async (data: QuizFormProps) => {
    try {
      // Send quiz data to the server
      const response = await axios.post('/api/quiz', {
        question_01: data.question_01,
        choices: data.choices,
        correctChoice: data.correctChoice,
      });

      // Update the state or perform other actions as needed
      setQuizData(response.data);

    } catch (error) {
      console.error('Error submitting quiz:', error);
      // Handle error
    }
  };


  return (
    <div className='px-3 flex flex-col items-center justify-center min-h-screen bg-blue-100'>
      <div className="bg-white p-8 rounded-md shadow-inner" style={{ boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)', width: '80%' }}>
        <h1 className="font-medium text-2xl flex items-center justify-between">Create/Edit Quiz</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="question_01" className="block text-sm font-medium text-gray-700 py-3">
              Main Question
            </label>
            <Input
              type="text"
              id="question_01"
              {...register("question_01", { required: true })}
              placeholder="Enter main question"
              required
              className="w-full"
            />
          </div>
          {/* Add input fields for choices_a through choice_d */}
          {fields.map((choice, choiceIndex) => (
            <div key={choiceIndex} className="mb-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 py-3">
                  Choice {String.fromCharCode(97 + choiceIndex)}
                </label>
              </div>
              <div className="flex items-center">
                <div className="w-full mr-2">
                  <Input
                    type="text"
                    {...register(`choices.${choiceIndex}.choice`, { required: true })}
                    placeholder={`Enter choice ${String.fromCharCode(97 + choiceIndex)}`}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="mb-4">
            <label htmlFor="correctChoice" className="block text-sm font-medium text-gray-700 py-3">
              Correct Choice
            </label>
            <select
              {...register("correctChoice", { required: true })}
              className="w-full p-2 border rounded-md"
            >
              {fields.map((choice, choiceIndex) => (
                <option key={choiceIndex} value={`choices.${choiceIndex}.choice`}>
                  Choice {String.fromCharCode(97 + choiceIndex)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center gap-4 mb-6">
            <Button
              type="submit"
              className={`transition-transform transform-gpu ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{ paddingLeft: '-5px', paddingRight: '-5px' }}
            >
              Save Quiz
            </Button>
          </div>
        </form>
        {/* Display Quiz Data for verification */}
        {quizData && (
          <div className="mt-4">
            <h2>Quiz Data</h2>
            <p>Main Question: {quizData.question_01}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;