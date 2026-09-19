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

export const printDocument = async (elementId: string = 'resume-preview') => {
  const element = document.getElementById(elementId);
  if (!element) {
    window.print();
    return;
  }

  try {
    // 1. Render high-resolution capture of the exact CV layout (matches exportToPDF)
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2.5,
      backgroundColor: '#ffffff',
    });

    // 2. Create or reuse hidden print iframe
    let iframe = document.getElementById('sl-print-frame') as HTMLIFrameElement | null;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'sl-print-frame';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.style.visibility = 'hidden';
      document.body.appendChild(iframe);
    }

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>SpaceLive CV</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 0mm;
            }
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            html, body {
              width: 100%;
              height: 100%;
              background: #ffffff;
              overflow: hidden;
            }
            .print-wrapper {
              width: 100vw;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              page-break-after: avoid;
              page-break-inside: avoid;
            }
            img {
              max-width: 100%;
              max-height: 100%;
              width: auto;
              height: auto;
              object-fit: contain;
              display: block;
              page-break-after: avoid;
              page-break-inside: avoid;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          </style>
        </head>
        <body>
          <div class="print-wrapper">
            <img id="print-cv-image" src="${dataUrl}" alt="SpaceLive CV" />
          </div>
        </body>
      </html>
    `);
    doc.close();

    // 3. Trigger print once image is ready
    const printImg = doc.getElementById('print-cv-image') as HTMLImageElement | null;
    const triggerPrint = () => {
      try {
        iframe?.contentWindow?.focus();
        iframe?.contentWindow?.print();
      } catch {
        window.print();
      }
    };

    if (printImg) {
      if (printImg.complete) {
        setTimeout(triggerPrint, 50);
      } else {
        printImg.onload = () => setTimeout(triggerPrint, 50);
      }
    } else {
      setTimeout(triggerPrint, 80);
    }
  } catch (err) {
    console.warn('High-res canvas print failed, falling back to native window.print():', err);
    window.print();
  }
};

