import React from 'react';
import { ArchitectureDiagram } from './components/Diagram';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 md:p-8">
      <header className="mb-8 text-center max-w-2xl">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Gateway Routing & Predicate Logic
        </h1>
        <p className="text-slate-600">
          Visualizing how API Gateways route requests based on predicate conditions.
          Hover over the clients on the left to simulate a request.
        </p>
      </header>

      <main className="w-full max-w-7xl">
        <ArchitectureDiagram />
      </main>

      <footer className="mt-12 text-slate-400 text-sm">
        Built with React, Tailwind CSS & Lucide Icons
      </footer>
    </div>
  );
}