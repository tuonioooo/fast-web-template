import React, { useState } from 'react';
import { ClientIcon, ServiceIcon, RouterIcon, PredicateBox } from './Icons';
import { ClientData, ConnectionStatus, RouteData } from '../types';

const clients: ClientData[] = [
  { 
    id: 'c1', 
    label: '客户端 (Client)', 
    connectedRoutes: [{ routeId: 'r1', status: ConnectionStatus.SUCCESS }] 
  },
  { 
    id: 'c2', 
    label: '客户端 (Client)', 
    connectedRoutes: [{ routeId: 'r2', status: ConnectionStatus.SUCCESS }] 
  },
  { 
    id: 'c3', 
    label: '客户端 (Client)', 
    connectedRoutes: [
      { routeId: 'r3', status: ConnectionStatus.SUCCESS },
      { routeId: 'r4', status: ConnectionStatus.FAILURE }
    ] 
  },
];

const routes: RouteData[] = [
  {
    id: 'r1',
    description: '一个路由可以包含一组断言',
    predicates: [
      { id: 'p1_1', matched: false },
      { id: 'p1_2', matched: true }
    ],
    targetService: '订单服务',
  },
  {
    id: 'r2',
    description: '一组断言需要同时满足才能匹配',
    predicates: [
      { id: 'p2_1', matched: false },
      { id: 'p2_2', matched: true },
      { id: 'p2_3', matched: false },
      { id: 'p2_4', matched: true }
    ],
    targetService: '库存服务',
  },
  {
    id: 'r3',
    title: '两个断言都满足，只匹配第一个路由',
    description: '',
    predicates: [
      { id: 'p3_1', matched: false },
      { id: 'p3_2', matched: true }
    ],
    targetService: '优惠券服务',
  },
  {
    id: 'r4',
    description: '',
    predicates: [
      { id: 'p4_1', matched: false },
      { id: 'p4_2', matched: true }
    ],
    targetService: '商品服务',
  }
];

const ROW_HEIGHT = 160; // Fixed height for each logical row to ensure perfect alignment

export const ArchitectureDiagram: React.FC = () => {
  const [activeClient, setActiveClient] = useState<string | null>(null);

  const isRouteActive = (routeId: string) => {
    if (!activeClient) return false;
    const client = clients.find(c => c.id === activeClient);
    return client?.connectedRoutes.some(r => r.routeId === routeId);
  };

  const isServiceActive = (serviceName: string) => {
    if (!activeClient) return false;
    const client = clients.find(c => c.id === activeClient);
    const routeIds = client?.connectedRoutes.map(r => r.routeId) || [];
    
    return routes.some(r => 
      routeIds.includes(r.id) && 
      r.targetService === serviceName &&
      client?.connectedRoutes.find(cr => cr.routeId === r.id)?.status === ConnectionStatus.SUCCESS
    );
  };

  // SVG Configuration
  const svgWidth = 80; // Width of the gap between columns
  const forkWidth = 30; // X position of the vertical flow line

  return (
    <div className="relative w-full max-w-6xl mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden select-none">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-blue-600 mb-1">网关 Gateway</h2>
        <p className="text-slate-400 text-sm">Request Routing Architecture</p>
      </div>

      {/* Main Grid Layout */}
      <div className="flex justify-between items-start relative">
        
        {/* Left Column: Clients */}
        <div className="relative w-40 flex-shrink-0" style={{ height: ROW_HEIGHT * 4 }}>
          {/* Client 1 */}
          <div 
            className="absolute w-full flex flex-col items-center justify-center group cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{ top: 0, height: ROW_HEIGHT }}
            onMouseEnter={() => setActiveClient('c1')}
            onMouseLeave={() => setActiveClient(null)}
          >
            <ClientIcon active={activeClient === 'c1'} />
            <span className={`mt-2 text-sm font-medium ${activeClient === 'c1' ? 'text-blue-600' : 'text-slate-500'}`}>
              客户端 (Client)
            </span>
          </div>

          {/* Client 2 */}
          <div 
            className="absolute w-full flex flex-col items-center justify-center group cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{ top: ROW_HEIGHT, height: ROW_HEIGHT }}
            onMouseEnter={() => setActiveClient('c2')}
            onMouseLeave={() => setActiveClient(null)}
          >
            <ClientIcon active={activeClient === 'c2'} />
            <span className={`mt-2 text-sm font-medium ${activeClient === 'c2' ? 'text-blue-600' : 'text-slate-500'}`}>
              客户端 (Client)
            </span>
          </div>

          {/* Client 3 (Aligned with Route 3) */}
          <div 
            className="absolute w-full flex flex-col items-center justify-center group cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{ top: ROW_HEIGHT * 2, height: ROW_HEIGHT }}
            onMouseEnter={() => setActiveClient('c3')}
            onMouseLeave={() => setActiveClient(null)}
          >
            <ClientIcon active={activeClient === 'c3'} />
            <span className={`mt-2 text-sm font-medium ${activeClient === 'c3' ? 'text-blue-600' : 'text-slate-500'}`}>
              客户端 (Client)
            </span>
            {activeClient === 'c3' && (
               <div className="absolute top-1/2 -right-4 -translate-y-1/2 translate-x-full pointer-events-none z-50">
                  <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                     Matches first route
                  </div>
               </div>
            )}
          </div>
        </div>

        {/* Connection Layer (SVG) - Spans the gap between Clients and Gateway */}
        <div className="absolute left-40 top-0 bottom-0 w-20 pointer-events-none z-10 hidden md:block">
           <svg className="w-full h-full overflow-visible">
              <defs>
                 <marker id="arrow-blue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6" fill="#3b82f6" />
                 </marker>
                 <marker id="arrow-gray" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6" fill="#e2e8f0" />
                 </marker>
                  <marker id="arrow-down-blue" markerWidth="8" markerHeight="8" refX="4" refY="8" orient="auto-start-reverse">
                    <path d="M0,0 L4,8 L8,0" fill="#3b82f6" />
                 </marker>
                 <marker id="arrow-down-gray" markerWidth="8" markerHeight="8" refX="4" refY="8" orient="auto-start-reverse">
                    <path d="M0,0 L4,8 L8,0" fill="#e2e8f0" />
                 </marker>
              </defs>

              {/* Route 1 Connection */}
              <line 
                x1="0" y1={ROW_HEIGHT * 0.5} 
                x2="100%" y2={ROW_HEIGHT * 0.5} 
                stroke={activeClient === 'c1' ? '#3b82f6' : '#e2e8f0'} 
                strokeWidth="2" 
                markerEnd={activeClient === 'c1' ? 'url(#arrow-blue)' : 'url(#arrow-gray)'}
              />
               {/* Checkmark for R1 */}
               <g transform={`translate(${svgWidth/2}, ${ROW_HEIGHT * 0.5 - 12})`}>
                 <circle cx="10" cy="0" r="10" fill="white" stroke={activeClient === 'c1' ? '#22c55e' : '#e2e8f0'} strokeWidth="1.5" />
                 <path d="M5,-2 L9,3 L15,-5" stroke={activeClient === 'c1' ? '#22c55e' : '#cbd5e1'} strokeWidth="2" fill="none" />
               </g>

              {/* Route 2 Connection */}
              <line 
                x1="0" y1={ROW_HEIGHT * 1.5} 
                x2="100%" y2={ROW_HEIGHT * 1.5} 
                stroke={activeClient === 'c2' ? '#3b82f6' : '#e2e8f0'} 
                strokeWidth="2" 
                markerEnd={activeClient === 'c2' ? 'url(#arrow-blue)' : 'url(#arrow-gray)'}
              />
               {/* Checkmark for R2 */}
               <g transform={`translate(${svgWidth/2}, ${ROW_HEIGHT * 1.5 - 12})`}>
                 <circle cx="10" cy="0" r="10" fill="white" stroke={activeClient === 'c2' ? '#e2e8f0' : '#e2e8f0'} strokeWidth="1.5" />
                 <path d="M5,-2 L9,3 L15,-5" stroke={activeClient === 'c2' ? '#cbd5e1' : '#cbd5e1'} strokeWidth="2" fill="none" />
               </g>

              {/* Route 3 & 4 - Vertical Flow Style (Matching Image 2) */}
              
              {/* 1. Connection from Client to the start of the flow */}
              <line 
                x1="0" y1={ROW_HEIGHT * 2.5} 
                x2={forkWidth} y2={ROW_HEIGHT * 2.5}
                stroke={activeClient === 'c3' ? '#3b82f6' : '#e2e8f0'} 
                strokeWidth="2"
              />

              {/* 2. Top Branch to Route 3 (Success Path) */}
              <line 
                x1={forkWidth} y1={ROW_HEIGHT * 2.5} 
                x2="100%" y2={ROW_HEIGHT * 2.5}
                stroke={activeClient === 'c3' ? '#3b82f6' : '#e2e8f0'} 
                strokeWidth="2"
                markerEnd={activeClient === 'c3' ? 'url(#arrow-blue)' : 'url(#arrow-gray)'}
              />

              {/* 3. Vertical Drop Line (The "Flow" line) */}
              <line 
                x1={forkWidth} y1={ROW_HEIGHT * 2.5} 
                x2={forkWidth} y2={ROW_HEIGHT * 3.5 - 10}
                stroke={activeClient === 'c3' ? '#3b82f6' : '#e2e8f0'} 
                strokeWidth="2"
              />
              {/* Arrow Head for Vertical Drop */}
              <path 
                d={`M ${forkWidth-4},${ROW_HEIGHT * 3.5 - 10} L ${forkWidth},${ROW_HEIGHT * 3.5} L ${forkWidth+4},${ROW_HEIGHT * 3.5 - 10} Z`}
                fill={activeClient === 'c3' ? '#3b82f6' : '#e2e8f0'}
              />

              {/* 4. Connection to Route 4 (Failed/Blocked Path) */}
              <line 
                x1={forkWidth} y1={ROW_HEIGHT * 3.5} 
                x2="100%" y2={ROW_HEIGHT * 3.5}
                stroke={activeClient === 'c3' ? '#e2e8f0' : '#e2e8f0'} 
                strokeWidth="2"
                strokeDasharray="4 4" // Dashed to show it's not the active path
                markerEnd="url(#arrow-gray)"
              />

              {/* ICON: Checkmark on Top Branch (Floating above like Image 2) */}
              <g transform={`translate(${forkWidth + 24}, ${ROW_HEIGHT * 2.5 - 16})`}>
                 <circle cx="0" cy="0" r="10" fill="white" stroke={activeClient === 'c3' ? '#22c55e' : '#e2e8f0'} strokeWidth="1.5" />
                 <path d="M-5,-2 L-1,3 L5,-5" stroke={activeClient === 'c3' ? '#22c55e' : '#cbd5e1'} strokeWidth="2" fill="none" />
              </g>

              {/* ICON: X Mark at Bottom of Vertical Line (Like Image 2) */}
              <g transform={`translate(${forkWidth}, ${ROW_HEIGHT * 3.5})`}>
                 <circle cx="0" cy="0" r="10" fill="white" stroke={activeClient === 'c3' ? '#ef4444' : '#e2e8f0'} strokeWidth="1.5" />
                 <path d="M-3,-3 L3,3 M-3,3 L3,-3" stroke={activeClient === 'c3' ? '#ef4444' : '#cbd5e1'} strokeWidth="2" fill="none" />
              </g>

           </svg>
        </div>


        {/* Middle Column: Gateway Container */}
        <div className="flex-1 bg-blue-50/80 rounded-3xl border-2 border-blue-200 p-8 ml-20 relative z-0">
            {/* Gateway Label */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-1.5 rounded-full border border-blue-100 shadow-sm text-blue-600 font-bold text-sm tracking-widest uppercase z-10">
                Gateway Core
            </div>

            <div className="relative w-full" style={{ height: ROW_HEIGHT * 4 }}>
                {routes.map((route, idx) => {
                    const isActive = isRouteActive(route.id);
                    // Calculate precise top position based on fixed row height
                    const topPos = idx * ROW_HEIGHT;
                    
                    return (
                        <div 
                           key={route.id} 
                           className="absolute w-full flex items-center justify-between gap-6 px-4"
                           style={{ top: topPos, height: ROW_HEIGHT }}
                        >
                            {/* Descriptions positioned absolutely within the row */}
                            {route.description && (
                                <div className="absolute top-8 left-0 w-full text-center pointer-events-none">
                                    <span className="text-xs text-blue-600/70 font-medium bg-white/50 px-2 py-0.5 rounded backdrop-blur-sm">
                                        {route.description}
                                    </span>
                                </div>
                            )}
                            {route.title && (
                                <div className="absolute top-2 left-0 w-full text-center pointer-events-none">
                                    <span className="text-sm font-bold text-blue-800">
                                        {route.title}
                                    </span>
                                </div>
                            )}

                            {/* Predicate - Left aligned in the box */}
                            <div className="flex flex-col items-center gap-1 z-10 w-32">
                                <PredicateBox rules={route.predicates} active={isActive} />
                                <span className="text-xs text-slate-400 font-mono mt-1">Predicate</span>
                            </div>

                            {/* Internal Arrow */}
                            <div className={`h-0.5 flex-1 mx-2 relative transition-colors duration-500 ${isActive ? 'bg-blue-400' : 'bg-slate-200'}`}>
                                <div className={`absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 transform rotate-45 ${isActive ? 'border-blue-400' : 'border-slate-200'}`}></div>
                            </div>

                            {/* Route Node - Right aligned in the box */}
                            <div className="flex flex-col items-center gap-1 z-10 w-20">
                                <RouterIcon active={isActive} />
                                <span className="text-xs text-slate-400 font-mono mt-1">Route {idx + 1}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Right Column: Services */}
        <div className="relative w-32 flex-shrink-0 ml-8" style={{ height: ROW_HEIGHT * 4 }}>
            {/* SVG Lines from Gateway to Services */}
            <svg className="absolute -left-8 top-0 w-8 h-full overflow-visible pointer-events-none hidden md:block">
               {routes.map((route, idx) => {
                  const isActive = isRouteActive(route.id);
                  const y = (idx * ROW_HEIGHT) + (ROW_HEIGHT / 2);
                  return (
                     <line 
                        key={idx}
                        x1="-10" y1={y} 
                        x2="100%" y2={y} 
                        stroke={isActive ? '#3b82f6' : '#e2e8f0'} 
                        strokeWidth="2" 
                        markerEnd={isActive ? 'url(#arrow-blue)' : 'url(#arrow-gray)'}
                     />
                  );
               })}
            </svg>

            {['订单服务', '库存服务', '优惠券服务', '商品服务'].map((serviceName, idx) => (
                <div 
                   key={serviceName}
                   className="absolute w-full flex flex-col items-center justify-center"
                   style={{ top: idx * ROW_HEIGHT, height: ROW_HEIGHT }}
                >
                    <ServiceIcon label={serviceName} active={isServiceActive(serviceName)} />
                </div>
            ))}
        </div>

      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center gap-8 text-sm text-slate-500">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Match Success</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span>Match Fail</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Active Request Path</span>
         </div>
      </div>
    </div>
  );
};