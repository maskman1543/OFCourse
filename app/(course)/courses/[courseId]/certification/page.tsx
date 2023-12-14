import { Button } from "@/components/ui/button";
import CertificateDownloadButton from "@/components/ui/certification-download-button";

const CerificatePage = () => {


    return (
        <div className="p-6 space-y-4 bg-blue-200" style={{
          boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)', // Increased shadow depth
          borderRadius: '12px', // Slightly increased border radius for a more rounded look
          padding: '20px',
         
        }}>
          <h1 className="p-5 pt-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
            CONGRATULATIONS!
          </h1>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center ">
          Congratulations on completing this course! Your commitment, 
          dedication, and hard work have led you to this incredible 
          achievement. Remember, this accomplishment is just the beginning 
          of a journey filled with endless possibilities. Embrace your 
          success and keep reaching for new heights!"
          </h4>
          <div className="s flex justify-center pt-20">
            <CertificateDownloadButton/>
          </div>
          <div className="mt-6 pt-40 bg-blue-100" style={{
            float: 'left',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', // Adding a shadow effect
            borderRadius: '8px', // Adding border radius for a rounded corner
            padding: '20px', // Adding padding for content inside the card
            
          }}>
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