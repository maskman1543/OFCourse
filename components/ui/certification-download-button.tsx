"use client";

import { PrismaClient } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { PDFDocument } from 'pdf-lib';

const prisma = new PrismaClient();

interface CertificateDownloadButtonProps {
  name: string; 
}

const CertificateDownloadButton: React.FC<CertificateDownloadButtonProps> = ({ name }) => {
  const getCourseTitle = async () => {
    try {
      const courseId = 'YOUR_COURSE_ID'; // Replace 'YOUR_COURSE_ID' with the actual course ID
      const course = await prisma.course.findUnique({
        where: {
          id: courseId,
        },
        select: {
          title: true,
        },
      });
      return course?.title ?? 'Default Course Title'; // Return the course title or a default value
    } catch (error) {
      console.error("Error fetching course title:", error);
      return 'Default Course Title'; // Return a default value in case of an error
    }
  };

  const displayCourseTitle = async () => {
    const courseTitle = await getCourseTitle();
    console.log('Course Title:', courseTitle); // Log the course title to the console
    return courseTitle;
  };

  const handleDownload = async () => {
    try {
      const courseTitle = await displayCourseTitle();
      
      const fileName = 'OFCCert.pdf';
      const fileUrl = '/' + fileName;

      const existingPdfBytes = await fetch(fileUrl).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const form = pdfDoc.getForm();

      const firstPage = pdfDoc.getPage(0);

      const nameTextField = form.getTextField('dhFormfield-4672811783');
      const courseTextField = form.getTextField('dhFormfield-4672811785');
      const dateTextField = form.getTextField('dhFormfield-4672811784');

      nameTextField.setText(name);
      courseTextField.setText(courseTitle);
      
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('en-US');

      dateTextField.setText(formattedDate);

      const modifiedPdfBytes = await pdfDoc.save();

      const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(modifiedPdfBlob);
      link.download = fileName;
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };  

  return (
    <div className="flex justify-center pt-20">
      <Button onClick={handleDownload}>
        DOWNLOAD YOUR CERTIFICATE HERE!
      </Button>
    </div>
  );
};

export default CertificateDownloadButton;
