import React, { useState } from 'react';
import { Question } from "@prisma/client"; // Update the path to your Question model

// Define a mapped type for the dynamic options
type Options = Record<string, string>;

interface QuestionCardProps {
  question: Question;
  onEdit: (questionId: number, updatedQuestion: Partial<Question>) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onEdit }) => {
  const [editedQuestion, setEditedQuestion] = useState<Partial<Question & { options: Options }>>({
    ...question,
    options: {},
  });

  const handleEdit = (key: string, value: string) => {
    if (key.startsWith('options.')) {
      const optionKey = key.replace('options.', '');
      setEditedQuestion((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          [optionKey]: value,
        },
      }));
    } else {
      setEditedQuestion((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleOptionChange = (index: number) => {
    const selectedOption = `option${index + 1}`;
    handleEdit('choices', selectedOption);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md mb-4">
      <h3 className="text-lg font-semibold mb-2">Question {question.questionId}</h3>

      {/* Question Description */}
      <div className="mb-4">
        <label htmlFor={`questionDescription-${question.id}`} className="block text-sm font-medium text-gray-700 py-1">
          Question Description
        </label>
        <input
          type="text"
          id={`questionDescription-${question.id}`}
          value={editedQuestion.questionDescription || ''}
          onChange={(e) => handleEdit('questionDescription', e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      {/* Multiple-choice Options */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Multiple-choice Options
        </label>
        {[1, 2, 3, 4].map((index) => (
          <div className="flex items-center mb-2" key={index}>
            <input
              type="radio"
              id={`option${index}`}
              name={`question${question.questionId}`}
              onClick={() => handleOptionChange(index)}
            />
            <label htmlFor={`option${index}`} className="ml-2">
              <input
                type="text"
                value={editedQuestion.options?.[`option${index}`] || ''}
                onChange={(e) => handleEdit(`options.option${index}`, e.target.value)}
                className="border p-2"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
