import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';

export const exportToImage = async (elementId: string, format: 'png' | 'jpeg', filename?: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found.`);
  }

  // Temporarily reset any scale transform if applicable or clone
  const options = {
    quality: 0.98,
    pixelRatio: 2,
    backgroundColor: '#ffffff',
  };

  const dataUrl = format === 'png'
    ? await toPng(element, options)
    : await toJpeg(element, options);

  const link = document.createElement('a');
  link.download = filename || `resume-${Date.now()}.${format}`;
  link.href = dataUrl;
  link.click();
};

export const exportToPDF = async (elementId: string, filename?: string) => {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found.`);
  }

  // High resolution render
  const dataUrl = await toPng(element, {
    quality: 1.0,
    pixelRatio: 2.5,
    backgroundColor: '#ffffff',
  });

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
  pdf.save(filename || `SpaceLive-Resume-${Date.now()}.pdf`);
};

export const printDocument = () => {
  // Allow any active UI menus or dropdowns to finish closing before opening native print dialog
  setTimeout(() => {
    window.print();
  }, 100);
};
