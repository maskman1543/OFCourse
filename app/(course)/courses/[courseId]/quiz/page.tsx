
// import { auth } from "@clerk/nextjs"
// import { redirect } from "next/navigation";

// import { getDashboardCourses } from "@/actions/get-dashboard-courses";
// import { QuizList } from "./_components/quiz-list";
// import { IconBadge } from "@/components/icon-badge";
// import { BookOpenCheck } from "lucide-react";
// import { Button } from "@/components/ui/button";
// //import { Separator } from "@radix-ui/react-separator";


// export default async function QuizPage() {
//     const { userId } = auth();
//     if (!userId) {
//         return redirect("/");
//     }    
        
//     const {
//         completedCourses,
//         coursesInProgress
//       } = await getDashboardCourses(userId);


//     return ( 

//         <div className="pt-10 pb-10 pr-40 pl-40 items-center space-y-4">
//             <div className="flex items-center gap-x-2">
//                 <IconBadge icon={BookOpenCheck} />
//                 <h2 className="text-xl  font-bold ">
//                   Quiz
//                 </h2>
//               </div>
              
//             <QuizList
//                 items={[...coursesInProgress, ...completedCourses]}
//             />

//             <Button>
//               Submit
//             </Button>
            
//         </div>
//     )
// }

 

