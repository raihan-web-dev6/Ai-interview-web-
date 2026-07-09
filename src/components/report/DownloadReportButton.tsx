"use client";


import { Download } from "lucide-react";


function DownloadReportButton() {

  const handleDownload = () => {
    window.print();
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-white font-semibold shadow hover:bg-blue-700 transition"
    >
      <Download size={20} />

      Download Report
    </button>
  );
}

export default DownloadReportButton;