import React from 'react';
import { Smartphone, Server, Router, Check, X, ShieldCheck } from 'lucide-react';
import { PredicateRule } from '../types';

export const ClientIcon = ({ active }: { active: boolean }) => (
  <div className={`p-3 rounded-xl border-2 transition-colors duration-300 ${active ? 'bg-blue-100 border-blue-500 text-blue-600' : 'bg-white border-slate-300 text-slate-500'}`}>
    <Smartphone size={32} strokeWidth={1.5} />
  </div>
);

export const ServiceIcon = ({ label, active }: { label: string; active: boolean }) => (
  <div className={`flex flex-col items-center gap-2 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-60'}`}>
    <div className={`relative w-16 h-20 bg-gradient-to-br from-blue-100 to-blue-200 border-2 ${active ? 'border-blue-500 shadow-lg shadow-blue-100' : 'border-slate-300'} rounded-lg flex items-center justify-center`}>
      <Server className={active ? "text-blue-600" : "text-slate-400"} size={32} />
      {/* 3D effect layers */}
      <div className="absolute -right-2 -bottom-2 w-full h-full border-r-2 border-b-2 border-slate-200 rounded-lg -z-10 bg-slate-50"></div>
    </div>
    <span className={`text-sm font-semibold ${active ? 'text-blue-700' : 'text-slate-500'}`}>{label}</span>
  </div>
);

export const RouterIcon = ({ active }: { active: boolean }) => (
  <div className={`flex flex-col items-center gap-1 ${active ? 'text-slate-800' : 'text-slate-400'}`}>
    <div className="relative">
      <div className={`absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1 ${active ? 'opacity-100' : 'opacity-30'}`}>
         <div className="w-1 h-3 bg-current rounded-full animate-pulse"></div>
         <div className="w-1 h-4 bg-current rounded-full animate-pulse delay-75"></div>
         <div className="w-1 h-3 bg-current rounded-full animate-pulse delay-150"></div>
      </div>
      <div className={`p-2 rounded-md bg-slate-700 text-white shadow-md transition-transform ${active ? 'scale-110' : 'scale-100'}`}>
        <Router size={24} />
      </div>
    </div>
  </div>
);

export const PredicateBox = ({ rules, active }: { rules: PredicateRule[]; active: boolean }) => {
  return (
    <div className={`w-32 bg-white rounded border flex flex-col items-center py-2 gap-1 shadow-sm transition-all duration-300 ${active ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-300'}`}>
      {rules.map((rule, idx) => (
        <div key={idx} className="flex items-center gap-2 px-2 w-full justify-between">
          <div className="flex gap-1">
             <div className="w-2 h-0.5 bg-slate-300 rounded"></div>
             <div className="w-2 h-0.5 bg-slate-300 rounded"></div>
             <div className="w-2 h-0.5 bg-slate-300 rounded"></div>
          </div>
          {rule.matched ? (
            <Check size={14} className="text-green-500" strokeWidth={3} />
          ) : (
            <X size={14} className="text-red-400" strokeWidth={3} />
          )}
        </div>
      ))}
    </div>
  );
};