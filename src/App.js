import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
  const [pdfUrl, setPdfUrl] = useState("");

  const uploadPdf = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64File = reader.result.split(",")[1];
      setPdfUrl(`data:application/pdf;base64,${base64File}`);
    };
  
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-4 bg-gradient-to-r from-green-400 to-yellow-400">
      <div className="text-3xl font-bold mt-4">PDF Viewer</div>
      <button
        className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-400 duration-150"
        onClick={() => document.getElementById("pdf").click()}
      >
        Upload
      </button>
      <input
        type="file"
        accept=".pdf"
        id="pdf"
        className="hidden"
        onChange={uploadPdf}
      />
      <Document file={pdfUrl} onLoadSuccess={() => console.log("SUCCESS")}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
}

export default App;
