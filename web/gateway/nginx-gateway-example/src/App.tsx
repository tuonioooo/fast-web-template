import { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Server,
  Globe,
  Shield,
  Zap,
} from 'lucide-react';

interface Request {
  id: number;
  path: string;
  method: string;
  backend: string;
  status: string;
  timestamp: number;
  progress: number;
}

interface Backend {
  id: string;
  name: string;
  load: number;
  status: string;
  color: string;
}

interface Route {
  path: string;
  backend: string;
  method: string;
  cache: boolean;
}

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [requests, setRequests] = useState<Request[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    success: 0,
    cached: 0,
    rateLimit: 0,
  });
  const [selectedBackend, setSelectedBackend] = useState<string | null>(null);

  const backends: Backend[] = [
    {
      id: 'api1',
      name: 'API Server 1',
      load: 0,
      status: 'healthy',
      color: 'bg-green-500',
    },
    {
      id: 'api2',
      name: 'API Server 2',
      load: 0,
      status: 'healthy',
      color: 'bg-green-500',
    },
    {
      id: 'api3',
      name: 'API Server 3',
      load: 0,
      status: 'healthy',
      color: 'bg-green-500',
    },
  ];

  const [backendStates, setBackendStates] = useState<Backend[]>(backends);

  const routes: Route[] = [
    { path: '/api/users', backend: 'api1', method: 'GET', cache: true },
    { path: '/api/orders', backend: 'api2', method: 'POST', cache: false },
    { path: '/api/products', backend: 'api3', method: 'GET', cache: true },
  ];

  const generateRequest = () => {
    const route = routes[Math.floor(Math.random() * routes.length)];
    const isCached = route.cache && Math.random() > 0.7;
    const isRateLimited = Math.random() > 0.9;

    const request: Request = {
      id: Date.now() + Math.random(),
      path: route.path,
      method: route.method,
      backend: route.backend,
      status: isRateLimited
        ? 'rate-limited'
        : isCached
        ? 'cached'
        : 'processing',
      timestamp: Date.now(),
      progress: 0,
    };

    setRequests((prev) => [...prev, request].slice(-8));

    setStats((prev) => ({
      total: prev.total + 1,
      success: isRateLimited ? prev.success : prev.success + 1,
      cached: isCached ? prev.cached + 1 : prev.cached,
      rateLimit: isRateLimited ? prev.rateLimit + 1 : prev.rateLimit,
    }));

    if (!isRateLimited && !isCached) {
      setBackendStates((prev) =>
        prev.map((b) =>
          b.id === route.backend
            ? { ...b, load: Math.min(b.load + 20, 100) }
            : b
        )
      );

      setTimeout(() => {
        setRequests((prev) =>
          prev.map((r) =>
            r.id === request.id
              ? { ...r, status: 'completed', progress: 100 }
              : r
          )
        );

        setTimeout(() => {
          setRequests((prev) => prev.filter((r) => r.id !== request.id));
        }, 1000);

        setBackendStates((prev) =>
          prev.map((b) =>
            b.id === route.backend
              ? { ...b, load: Math.max(b.load - 20, 0) }
              : b
          )
        );
      }, 2000);
    } else {
      setTimeout(() => {
        setRequests((prev) => prev.filter((r) => r.id !== request.id));
      }, 1500);
    }
  };

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = window.setInterval(generateRequest, 1500);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    requests.forEach((req) => {
      if (req.status === 'processing') {
        const progressInterval = setInterval(() => {
          setRequests((prev) =>
            prev.map((r) =>
              r.id === req.id && r.progress < 90
                ? { ...r, progress: r.progress + 10 }
                : r
            )
          );
        }, 200);

        setTimeout(() => clearInterval(progressInterval), 2000);
      }
    });
  }, [requests.length]);

  const reset = () => {
    setIsRunning(false);
    setRequests([]);
    setStats({ total: 0, success: 0, cached: 0, rateLimit: 0 });
    setBackendStates(backends);
    setSelectedBackend(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'cached':
        return 'bg-purple-500';
      case 'rate-limited':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return '处理中';
      case 'completed':
        return '完成';
      case 'cached':
        return '缓存命中';
      case 'rate-limited':
        return '限流';
      default:
        return status;
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Server className="text-blue-400" size={36} />
            Nginx API 网关可视化
          </h1>
          <p className="text-slate-400">
            实时展示请求路由、负载均衡、缓存和限流
          </p>
        </div>

        {/* Controls */}
        <div className="bg-slate-800 rounded-lg p-4 mb-6 flex gap-3 items-center">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
              isRunning
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
            {isRunning ? '暂停' : '开始'}
          </button>
          <button
            onClick={reset}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <RotateCcw size={18} />
            重置
          </button>

          {/* Stats */}
          <div className="flex gap-6 ml-auto text-sm">
            <div className="text-center">
              <div className="text-slate-400">总请求</div>
              <div className="text-2xl font-bold text-blue-400">
                {stats.total}
              </div>
            </div>
            <div className="text-center">
              <div className="text-slate-400">成功</div>
              <div className="text-2xl font-bold text-green-400">
                {stats.success}
              </div>
            </div>
            <div className="text-center">
              <div className="text-slate-400">缓存</div>
              <div className="text-2xl font-bold text-purple-400">
                {stats.cached}
              </div>
            </div>
            <div className="text-center">
              <div className="text-slate-400">限流</div>
              <div className="text-2xl font-bold text-red-400">
                {stats.rateLimit}
              </div>
            </div>
          </div>
        </div>

        {/* Main Visualization */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left: Client & Nginx Gateway */}
          <div className="col-span-4 space-y-6">
            {/* Client */}
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="text-cyan-400" size={28} />
                <div>
                  <h3 className="font-bold text-lg">客户端请求</h3>
                  <p className="text-sm text-slate-400">发起 HTTP 请求</p>
                </div>
              </div>

              {/* Request animation */}
              <div className="space-y-2">
                {requests.slice(0, 3).map((req) => (
                  <div
                    key={req.id}
                    className="bg-slate-700 rounded p-2 text-xs animate-pulse"
                  >
                    <div className="font-mono text-cyan-300">
                      {req.method} {req.path}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nginx Gateway */}
            <div className="bg-gradient-to-br from-green-900/30 to-slate-800 border-2 border-green-500 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Server className="text-green-400" size={32} />
                <div>
                  <h3 className="font-bold text-xl">Nginx 网关</h3>
                  <p className="text-sm text-slate-400">反向代理 & 负载均衡</p>
                </div>
              </div>

              {/* Gateway Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="text-yellow-400" size={16} />
                  <span>负载均衡算法: Round-Robin</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="text-blue-400" size={16} />
                  <span>限流规则: 10 req/s</span>
                </div>
                <div className="bg-slate-700 rounded p-2 text-xs">
                  <div className="text-slate-400 mb-1">当前路由规则:</div>
                  {routes.map((route) => (
                    <div
                      key={route.path}
                      className="font-mono text-green-300 mb-1"
                    >
                      {route.path} → {route.backend}
                      {route.cache && (
                        <span className="text-purple-400 ml-2">[缓存]</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Request Flow */}
          <div className="col-span-4">
            <div className="bg-slate-800 rounded-lg p-6 h-full">
              <h3 className="font-bold text-lg mb-4 text-center">请求流转</h3>
              <div className="space-y-3">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-slate-700 rounded-lg p-3 border-l-4 border-blue-400"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-mono text-sm font-bold">
                          {req.method} {req.path}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          → {req.backend}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs ${getStatusColor(
                          req.status
                        )} text-white`}
                      >
                        {getStatusText(req.status)}
                      </span>
                    </div>

                    {req.status === 'processing' && (
                      <div className="bg-slate-600 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-400 h-full transition-all duration-200"
                          style={{ width: `${req.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}

                {requests.length === 0 && (
                  <div className="text-center text-slate-500 py-12">
                    点击"开始"按钮查看请求流转
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Backend Servers */}
          <div className="col-span-4">
            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4 text-center">
                后端服务集群
              </h3>
              <div className="space-y-4">
                {backendStates.map((backend) => (
                  <div
                    key={backend.id}
                    className={`bg-slate-700 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedBackend === backend.id
                        ? 'ring-2 ring-blue-400'
                        : ''
                    }`}
                    onClick={() => setSelectedBackend(backend.id)}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${backend.color} animate-pulse`}
                        />
                        <span className="font-bold">{backend.name}</span>
                      </div>
                      <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">
                        {backend.status}
                      </span>
                    </div>

                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>负载</span>
                        <span>{backend.load}%</span>
                      </div>
                      <div className="bg-slate-600 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            backend.load > 70
                              ? 'bg-red-500'
                              : backend.load > 40
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${backend.load}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 space-y-1">
                      <div>
                        地址: 192.168.1.{10 + parseInt(backend.id.slice(-1))}
                      </div>
                      <div>端口: 808{backend.id.slice(-1)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Nginx Config Preview */}
        <div className="mt-6 bg-slate-800 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <span className="text-orange-400">📄</span>
            Nginx 配置示例
          </h3>
          <pre className="bg-slate-900 rounded p-4 text-sm overflow-x-auto">
            <code className="text-green-400">{`upstream backend_servers {
    server 192.168.1.10:8080 weight=1;
    server 192.168.1.11:8081 weight=1;
    server 192.168.1.12:8082 weight=1;
}

server {
    listen 80;
    
    # 限流配置
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    
    # API 路由
    location /api/ {
        proxy_pass http://backend_servers;
        proxy_cache my_cache;
        proxy_cache_valid 200 5m;
        
        limit_req zone=api_limit burst=20 nodelay;
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default App;
