
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { QuizList } from "./_components/quiz-list";
import { IconBadge } from "@/components/icon-badge";
import { BookOpenCheck } from "lucide-react";
//import { Separator } from "@radix-ui/react-separator";


export default async function QuizPage() {
    const { userId } = auth();
    if (!userId) {
        return redirect("/");
    }    
        
    const {
        completedCourses,
        coursesInProgress
      } = await getDashboardCourses(userId);


    return ( 

        <div className="p-6 space-y-4">
            <div className="flex items-center gap-x-2">
                <IconBadge icon={BookOpenCheck} />
                <h2 className="text-xl font-bold ">
                  Quiz
                </h2>
              </div>
              
            <QuizList
                items={[...coursesInProgress, ...completedCourses]}
            />
            
        </div>
    )
}

 

