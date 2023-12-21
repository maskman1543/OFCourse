
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getQuiz } from "@/actions/get-quiz";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
//import { Separator } from "@radix-ui/react-separator";

const QuizIdPage = async ({
    params
}: {
    params: {
        chapterId: string; courseId: string; quizId: string
}
}) => {
    const {userId} = auth();

    if (!userId) {
        return redirect("/");
      } 
    
      const {
        quiz
      } = await getQuiz({
        userId,
        quizId: params.quizId,
        courseId: params.courseId,
        chapterId: params.chapterId
      });


      return (
        <div className="p-10 pb-5">
          <div className="text-4xl mt-10 scroll-m-20 border-b pb-2 font-extrabold text-left  mb-4">{quiz?.title}</div>
        
          <div className="bg-blue-100 mb-5 p-6 rounded-lg shadow-md">
            <div className="font-semibold text-lg mb-4">{quiz?.question01}</div>
            <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center">
                <input type="radio" name="answer01" value="A" className="form-radio" />
                <span className="ml-2">{quiz?.choices01A}</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="answer01" value="B" className="form-radio" />
                <span className="ml-2">{quiz?.choices01B}</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="answer01" value="C" className="form-radio" />
                <span className="ml-2">{quiz?.choices01C}</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="answer01" value="D" className="form-radio" />
                <span className="ml-2">{quiz?.choices01D}</span>
              </label>
            </div>
          </div>
          <div className="bg-blue-100 p-6 mb-5 rounded-lg shadow-md">
              <div className="font-semibold text-lg mb-4">{quiz?.question02}</div>
              <div className="flex flex-col space-y-2">
                <label className="inline-flex items-center">
                  <input type="radio" value="A"className="form-radio" />
                  <span className="ml-2">{quiz?.choices02A}</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" value="B"  className="form-radio" />
                  <span className="ml-2">{quiz?.choices02B}</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" value="C" className="form-radio" />
                  <span className="ml-2">{quiz?.choices02C}</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" value="D"  className="form-radio" />
                  <span className="ml-2">{quiz?.choices02D}</span>
                </label>
              </div>
           </div>
           <div className="bg-blue-100 p-6 mb-5 rounded-lg shadow-md">
              <div className="font-semibold text-lg mb-4">{quiz?.question03}</div>
              <div className="flex flex-col space-y-2">
                <label className="inline-flex items-center">
                  <input type="radio" value="A"className="form-radio" />
                  <span className="ml-2">{quiz?.choices03A}</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" value="B"  className="form-radio" />
                  <span className="ml-2">{quiz?.choices03B}</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" value="C" className="form-radio" />
                  <span className="ml-2">{quiz?.choices03C}</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" value="D"  className="form-radio" />
                  <span className="ml-2">{quiz?.choices03D}</span>
                </label>
              </div>
           </div>
           <div className="bg-blue-100 p-6 mb-5 rounded-lg">
              <div className="font-semibold text-lg mb-4">{quiz?.question04}</div>
              <div className="flex flex-col space-y-2">
                <label className="inline-flex items-center">
                  <input type="radio" value="A"className="form-radio" />
                  <span className="ml-2">{quiz?.choices04A}</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" value="B"  className="form-radio" />
                  <span className="ml-2">{quiz?.choices04B}</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" value="C" className="form-radio" />
                  <span className="ml-2">{quiz?.choices04C}</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" value="D"  className="form-radio" />
                  <span className="ml-2">{quiz?.choices04D}</span>
                </label>
              </div>
           </div>
           <div className="bg-blue-100 p-6 mb-5 rounded-lg shadow-md">
              <div className="font-semibold text-lg mb-4">{quiz?.question05}</div>
              <div className="flex flex-col space-y-2">
                <label className="inline-flex items-center">
                  <input type="radio" value="A"className="form-radio" />
                  <span className="ml-2">{quiz?.choices05A}</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" value="B"  className="form-radio" />
                  <span className="ml-2">{quiz?.choices05B}</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" value="C" className="form-radio" />
                  <span className="ml-2">{quiz?.choices05C}</span>
                </label>
                <label className="inline-flex items-center">
                  <input type="radio" value="D"  className="form-radio" />
                  <span className="ml-2">{quiz?.choices05D}</span>
                </label>
              </div>
           </div>
  
            <div className="p-4 items-center">
              <Button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Submit Quiz
            </Button>
            </div>
            
        </div>
          
      );
}
export default QuizIdPage;

 

