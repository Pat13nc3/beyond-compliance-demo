import React, { useState } from 'react';
import { X, Download, Share2, FileText, Image as ImageIcon, FileSpreadsheet } from 'lucide-react';

const ExportDashboardModal = ({ onClose }) => {
    const [exportFormat, setExportFormat] = useState('PDF');

    // This function will handle the download logic
    const handleDownload = () => {
        // In a real app, we would pass the ID of the dashboard to capture.
        // For this demo, we'll assume we're capturing an element with id="dashboard-content"
        const elementToCapture = document.getElementById('dashboard-content');
        
        if (!elementToCapture) {
            alert("Error: Could not find dashboard content to export.");
            return;
        }

        if (exportFormat === 'PDF' || exportFormat === 'JPEG') {
            // Using html2canvas to take a "screenshot" of the div
            html2canvas(elementToCapture, { backgroundColor: '#1e252d' }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                
                if (exportFormat === 'PDF') {
                    const { jsPDF } = window.jspdf;
                    // Create a PDF with the image inside
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    pdf.save('dashboard_export.pdf');
                } else { // JPEG
                    const link = document.createElement('a');
                    link.href = imgData;
                    link.download = 'dashboard_export.jpeg';
                    link.click();
                }
            });
        } else if (exportFormat === 'EXCEL') {
            // Simulate Excel export by creating a CSV file
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "Category,Metric,Value\r\n"; // CSV Header
            // Add some mock data
            csvContent += "Health,Overall Score,88\r\n";
            csvContent += "Health,Controls Adherence,75\r\n";
            csvContent += "Health,On-Time Reporting,98\r\n";
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', 'dashboard_data.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-[#1e252d] rounded-2xl shadow-2xl p-6 w-full max-w-lg text-white">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
                    <h3 className="text-2xl font-bold text-[#c0933e] flex items-center">
                        <Download size={24} className="mr-3"/> Export & Share
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Select Format</label>
                        {/* UPDATED: Added EXCEL button */}
                        <div className="grid grid-cols-3 gap-2">
                            <button onClick={() => setExportFormat('PDF')} className={`flex items-center justify-center p-3 rounded-lg ${exportFormat === 'PDF' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
                                <FileText size={20} className="mr-2"/> PDF
                            </button>
                             <button onClick={() => setExportFormat('JPEG')} className={`flex items-center justify-center p-3 rounded-lg ${exportFormat === 'JPEG' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
                                <ImageIcon size={20} className="mr-2"/> JPEG
                            </button>
                             <button onClick={() => setExportFormat('EXCEL')} className={`flex items-center justify-center p-3 rounded-lg ${exportFormat === 'EXCEL' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
                                <FileSpreadsheet size={20} className="mr-2"/> EXCEL
                            </button>
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Share with Team (Optional)</label>
                        <input type="text" placeholder="Enter user emails..." className="w-full p-2 bg-gray-800 rounded-md" />
                    </div>
                </div>
                <div className="flex justify-end pt-6 mt-6 border-t border-gray-700">
                    <button type="button" onClick={onClose} className="bg-gray-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 mr-2">
                        Cancel
                    </button>
                    {/* UPDATED: This button is now connected to the download handler */}
                    <button type="button" onClick={handleDownload} className="bg-green-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-green-500 flex items-center">
                        <Download size={16} className="mr-2"/> Generate & Download
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportDashboardModal;