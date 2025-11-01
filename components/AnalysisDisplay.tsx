
import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

// A robust markdown-to-HTML parser for the download functionality.
// It mirrors the logic of the React parser to ensure consistency.
const parseMarkdownToHtmlForDownload = (markdown: string): string => {
    const lines = markdown.split('\n');
    const htmlElements: string[] = [];
    let listItems: string[] = [];

    const flushList = () => {
        if (listItems.length > 0) {
            htmlElements.push(`<ul>${listItems.join('')}</ul>`);
            listItems = [];
        }
    };
    
    const processLine = (line: string) => {
      return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };

    lines.forEach(line => {
        if (line.startsWith('# ')) {
            flushList();
            htmlElements.push(`<h1>${processLine(line.substring(2))}</h1>`);
        } else if (line.match(/^(\s*)\* (.*)/)) {
            listItems.push(`<li>${processLine(line.replace(/^\s*\*\s*/, ''))}</li>`);
        } else if (line.trim() === '') {
            flushList();
        } else {
            flushList();
            if (line.trim().length > 0) {
                htmlElements.push(`<p>${processLine(line)}</p>`);
            }
        }
    });

    flushList(); // Flush any remaining list items at the end of the content.

    return htmlElements.join('\n');
};

const parseMarkdownToReact = (markdown: string) => {
    const lines = markdown.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
  
    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-2 my-4 pl-4">
            {listItems.map((item, i) => (
              <li key={`li-${i}`} className="text-gray-700" dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>') }} />
            ))}
          </ul>
        );
        listItems = [];
      }
    };
  
    lines.forEach((line, index) => {
      if (line.startsWith('# ')) {
        flushList();
        elements.push(<h1 key={index} className="text-2xl sm:text-3xl font-bold text-indigo-700 my-6 border-b-2 border-indigo-200 pb-2">{line.substring(2)}</h1>);
      } else if (line.match(/^(\s*)\* (.*)/)) {
        listItems.push(line.replace(/^\s*\*\s*/, ''));
      } else if (line.trim() === '') {
        flushList();
      } else {
        flushList();
        if (line.trim().length > 0) {
          elements.push(<p key={index} className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>') }} />);
        }
      }
    });
  
    flushList();
  
    return elements;
};


interface AnalysisDisplayProps {
  content: string;
  userName: string;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ content, userName }) => {
  const handleDownload = () => {
    const title = `<h1>Analisis Karir & Kepribadian untuk ${userName}</h1>`;
    const intro = `<p>Hai ${userName}, setelah berbincang dengan bintang-bintang, inilah cerita tentang dirimu. Semoga bisa memberimu inspirasi ya!</p><hr>`;
    const analysisHtml = parseMarkdownToHtmlForDownload(content);

    const fullHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Analisis Kepribadian - ${userName}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 20px auto; padding: 20px; }
            h1 { color: #4338CA; border-bottom: 2px solid #C7D2FE; padding-bottom: 8px; }
            h2 { color: #1E40AF; }
            p { margin-bottom: 1em; }
            ul { padding-left: 20px; list-style-type: disc; }
            li { margin-bottom: 0.5em; }
            strong { font-weight: 600; }
          </style>
        </head>
        <body>
          ${title}
          ${intro}
          ${analysisHtml}
        </body>
      </html>
    `;

    const blob = new Blob([fullHtml], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const safeFileName = userName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    link.download = `analisis-kepribadian-${safeFileName}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 mt-8 animate-fade-in">
        <div className="prose max-w-none">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 !m-0">
              Ini Dia Cerita Tentang Kamu, {userName}!
            </h2>
            <p className="mt-2 text-gray-600">
              Setelah berbincang dengan bintang-bintang dan semesta, inilah rangkuman cerita unik tentang dirimu. Semoga bisa memberimu inspirasi ya!
            </p>
            <hr className="my-6" />
            {parseMarkdownToReact(content)}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 bg-gray-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 active:scale-95 transition-all duration-200"
            >
              <DownloadIcon />
              Download Hasil Analisis
            </button>
        </div>

        <style>{`.animate-fade-in { animation: fadeIn 0.5s ease-in-out; } @keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};
