
function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0B132B]">
      <div className="text-center">
        <svg className="mx-auto mb-4" width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="15" width="60" height="70" rx="10" stroke="#00A8CC" stroke-width="8" />
          <path d="M35 35H65" stroke="#00A8CC" stroke-width="8" stroke-linecap="round" />
          <path d="M35 50H65" stroke="#1E3A5F" stroke-width="8" stroke-linecap="round" />
          <path d="M35 65H55" stroke="#1E3A5F" stroke-width="8" stroke-linecap="round" />
        </svg>
        <h1 className="text-4xl font-bold text-slate-100 tracking-tight mb-2">Invora Invoicing Platform</h1>
        <p className="text-cyan-400 font-medium">Vite + React + Tailwind + TypeScript workspace initialized</p>
      </div>
    </div>
  );
}

export default App;
