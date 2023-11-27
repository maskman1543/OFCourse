import { Button } from "@/components/ui/button";

const CerificatePage = () => {
    return (
        <div className="p-6 space-y-4">
          <h1 className="p-5 pt-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
            CONGRATULATIONS!
          </h1>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
          Congratulation on completing this course! Your commitment, 
          dedication, and hard work have led you to this incredible 
          achievement. Remember, this accomplishment is just the beginning 
          of a journey filled with endless possibilities. Embrace your 
          success and keep reaching for new heights!"
          </h4>
          <div className="s flex justify-center pt-20">
            <Button >
                DOWNLOAD YOUR CERTIFICATE HERE!
            </Button>
          </div>
          <div className="mt-6 pt-40"> {/* Added a wrapper div */}
            <blockquote className="border-l-2 pl-6 italic ">
              Completion isn't just about reaching 
              the end; it's about embracing the journey, 
              celebrating the progress, and discovering the resilience 
              within. As you finish this course, remember: every challenge conquered 
              is a step toward your brightest potential
            </blockquote>
          </div>
        </div>
      );
}

export default CerificatePage;