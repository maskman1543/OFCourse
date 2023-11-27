import Link from "next/link";

interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    progress: number | null;
    category: string;
  };
export const QuizCard = ({ id, title }: CourseCardProps) => {
  const question = "What is the capital of France?";
  const choices = ["London", "Paris", "Berlin", "Rome"];
    
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden bg-blue-200 border rounded-lg p-3 h-full">
        <div className="flex flex-col pt-2">
          <div className="my-3 text-sm md:text-xs">
            <div className="mb-2">
              <p className="font-semibold">{question}</p>
            </div>
            {choices.map((choice, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={choice}
                  name={`choice_${id}`}
                  className="form-radio rounded text-sky-700"
                />
                <span>{choice}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
