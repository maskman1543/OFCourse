"use client";

import { Button } from '@/components/ui/button';
import { PDFDocument, PDFForm } from 'pdf-lib';

interface CertificateDownloadButtonProps {
  name: string; 
  courseTitle: string;
}

const CertificateDownloadButton: React.FC<CertificateDownloadButtonProps> = ({ name, courseTitle }) => {
  const handleDownload = async () => {
    try {
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
