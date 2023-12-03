"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const CertificateDownloadButton = () => {
  const [certificateContent] = useState('This is your certificate content.'); // Assuming this is dynamically set

  const handleDownload = () => {
    const fileName = 'certificate.txt';
    const blob = new Blob([certificateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
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
