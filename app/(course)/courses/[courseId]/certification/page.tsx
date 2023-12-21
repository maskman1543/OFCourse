"use client";

import { Button } from "@/components/ui/button";
import CertificateDownloadButton from "@/components/ui/certification-download-button";
import { useState, useEffect } from 'react';

const CertificatePage: React.FC<{ courseId: string }> = () => {
  const [name, setName] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCourseTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourseTitle(event.target.value);
  };

  useEffect(() => {
    // Create an audio element
    const audio = new Audio('/CongratsMusic.mp3');
    
    // Play the audio once the component has mounted
    audio.play();

    // Cleanup when the component is unmounted
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  return (
    <div className="p-6 space-y-4 bg-blue-200" style={{
      boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)',
      borderRadius: '12px',
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
      </h4><br></br>
      {/* New message with an image */}
<div className="flex items-center justify-center mt-1">
  <img
    src="/congrats.png"
    alt="Congratulations Image"
    style={{ width: '75%', maxWidth: '500px', height: 'auto' }}
  />
</div>
{/* Input field for the name */}
<br></br>
<div className="flex items-center justify-center mt-1">
  <input
    type="text"
    placeholder="Enter your name"
    value={name}
    onChange={handleNameChange}
    className="border border-gray-300 p-2 rounded"
    style={{ width: '500px' }}
  />
</div>
      {/* Input field for the course title */}
      <div className="flex items-center justify-center mt-1">
        <input
          type="text"
          placeholder="Enter the course title"
          value={courseTitle}
          onChange={handleCourseTitleChange}
          className="border border-gray-300 p-2 rounded"
          style={{ width: '500px' }}
        />
      </div>
{/* Download certificate button */}

<div className="flex items-center justify-center mt-1" style={{ marginTop: '-50px' }}>
  <CertificateDownloadButton name={name} courseTitle={courseTitle} />
</div>

<div className="mt-6 pt-40 bg-blue-100" style={{
  float: 'left',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  borderRadius: '8px',
  padding: '20px',
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

export default CertificatePage;