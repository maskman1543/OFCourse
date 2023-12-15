"use client";

import { Button } from '@/components/ui/button';

const CertificateDownloadButton = () => {
  const handleDownload = () => {
    const fileName = 'OFCCert.pdf'; // Update the file name
    const filePath = process.env.PUBLIC_URL + '/' + fileName;

    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
