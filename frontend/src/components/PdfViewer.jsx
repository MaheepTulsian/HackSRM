import React from 'react';

function PdfViewer({ pdfUrl }) {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <iframe
        src={pdfUrl}
        title="PDF Viewer"
        className="w-full h-full border-none"
      />
    </div>
  );
}

export default PdfViewer;
