"use client";

import { Button } from '@/components/ui/button';

const CertificateDownloadButton = () => {
  const handleDownload = () => {
    try {
      const fileName = 'OFCCert.pdf';
      const fileUrl = '/' + fileName;
  
      const link = document.createElement('a');
      link.href = fileUrl;
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
