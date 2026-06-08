// app/contents/page.tsx
import { FileText, Map, Download } from "lucide-react"; // Optional: if you use lucide-react for icons

export default function ContentsPage() {
  const documents = [
    {
      title: "RAJUK Approved Layout Plan",
      description: "Full Master Plan of Jolshiri Abashon",
      path: "/assets/maps/Jolshiri_Layout_Plan_by_RAJUK.pdf",
      icon: "🗺️",
    },
    {
      title: "APDL RJSC Registration Certificate",
      description: "Official company registration and legal documentation",
      path: "/attachments/APDL_RJSC.pdf",
      icon: "📜",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mt-8 mb-4 text-stone-800">
          Jolshiri Abashon - Project Contents
        </h1>
        <p className="text-center text-stone-600 mb-12">
          Official Documents & Information
        </p>

        <div className="bg-white rounded-3xl p-10 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-stone-800 flex items-center gap-2">
              <span>📄</span> Important Documents
            </h2>
            
            <div className="grid gap-4 sm:grid-cols-1">
              {documents.map((doc, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-5 border border-stone-200 rounded-2xl hover:bg-stone-50 transition-all group"
                >
                  <a
                    href={doc.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 flex-1"
                  >
                    <span className="text-3xl bg-stone-100 p-3 rounded-xl group-hover:bg-white transition-colors">
                      {doc.icon}
                    </span>
                    <div>
                      <p className="font-semibold text-stone-800 group-hover:text-blue-600 transition-colors">
                        {doc.title}
                      </p>
                      <p className="text-sm text-stone-500">
                        {doc.description}
                      </p>
                    </div>
                  </a>

                  {/* Optional: Explicit Download Button */}
                  <a
                    href={doc.path}
                    download
                    className="p-2.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors"
                    title="Download PDF"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  </a>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}