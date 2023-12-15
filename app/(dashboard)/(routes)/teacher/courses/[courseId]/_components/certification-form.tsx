"use client";

import { ImageIcon, X } from "lucide-react";
import { useState } from "react";
import { Attachment, Course } from "@prisma/client";
import Modal from 'react-modal';

import { Button } from "@/components/ui/button";

interface CertificationFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

export const CertificationForm: React.FC<CertificationFormProps> = ({
  initialData,
  courseId
}) => {
  const [viewingTemplate, setViewingTemplate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewTemplate = () => {
    console.log("View template button clicked");
    setViewingTemplate(true);
    setIsModalOpen(true);
  };

  const handleGoBack = () => {
    console.log("Go back button clicked");
    setViewingTemplate(false);
    setIsModalOpen(false);
  };


  // Render the component
  return (
    <>
      <div className="mt-6 border bg-slate-100 rounded-md p-4">
        <div className="font-medium flex items-center justify-between">
          Course Certification
          <Button onClick={handleViewTemplate} variant="ghost">
            <ImageIcon className="h-4 w-4 mr-2" />
            View Certificate Template
          </Button>
        </div>
      </div>

      {/* Modal section */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleGoBack}
        contentLabel="Certificate Template"
        className="modal-content"
        overlayClassName="modal-overlay"
        style={{
          overlay: {
            zIndex: 1000,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          content: {
            position: "absolute",
            top: "60%",
            left: "58%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "55%",
            maxHeight: "80%",
            overflow: "auto",
            border: "2px solid black",
            background: "lightblue",  // Add border style
            borderRadius: "8px", // Add border radius for rounded corners
            outline: "none", // Remove default outline
            padding: "20px", // Add padding for content
          },
        }}
      >
        <div className="flex justify-end">
    <button className="text-2xl" onClick={handleGoBack}>
      &times;
    </button>
  </div>
  <h2 className="text-4xl font-bold mb-4 ml-4 pb-2">Certificate Template</h2>

  <div className="border-2 border-lightblues-500 rounded p-4">
    <img
      src="/CertLogo.png"
      alt="Certificate Template"
      className="max-w-full max-h-full mx-auto"
    />
  </div>
      </Modal>
    </>
  );
};