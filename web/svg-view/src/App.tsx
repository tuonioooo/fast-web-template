import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, Maximize2, RotateCw, Move } from 'lucide-react';

// ========== 缩放配置常量 ==========
const ZOOM_CONFIG = {
  MIN_SCALE: 0.2,        // 最小缩放比例 (20%)
  MAX_SCALE: 20,         // 最大缩放比例 (2000%)
  DEFAULT_SCALE: 1,      // 默认缩放比例 (100%)
  ZOOM_STEP: 0.2,        // 按钮点击缩放步长
  WHEEL_ZOOM_STEP: 0.1   // 滚轮缩放步长
};

// ========== 旋转配置常量 ==========
const ROTATION_CONFIG = {
  DEFAULT_ROTATION: 0,   // 默认旋转角度
  ROTATION_STEP: 90      // 每次旋转的角度增量
};

// ========== 位置配置常量 ==========
const POSITION_CONFIG = {
  DEFAULT_X: 0,          // 默认 X 轴位置
  DEFAULT_Y: 0           // 默认 Y 轴位置
};

// ========== 视觉配置常量 ==========
const VISUAL_CONFIG = {
  GRID_SIZE: '20px',           // 背景网格大小
  MAX_IMAGE_HEIGHT: '80vh',    // 图片最大高度
  MAX_IMAGE_WIDTH: '80vw',     // 图片最大宽度
  SHADOW: '0 10px 30px rgba(0,0,0,0.5)'  // 图片阴影效果
};

// ========== 默认 SVG 列表 ==========
const SVG_PRESETS = [
  {
    name: 'read-book SVG Logo',
    url: 'read.svg'
  },
  {
    name: 'SVG Logo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg'
  },
  {
    name: 'React Logo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'
  },
  {
    name: 'Vue Logo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg'
  },
  {
    name: 'TypeScript Logo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg'
  },
  {
    name: 'JavaScript Logo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg'
  },
  {
    name: 'Node.js Logo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg'
  },
  {
    name: 'Python Logo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg'
  },
  {
    name: 'GitHub Logo',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg'
  }
];

// ========== 默认 SVG URL ==========
const DEFAULT_SVG_URL = SVG_PRESETS[0].url;

const App = () => {
  const [scale, setScale] = useState(ZOOM_CONFIG.DEFAULT_SCALE);
  const [position, setPosition] = useState({ 
    x: POSITION_CONFIG.DEFAULT_X, 
    y: POSITION_CONFIG.DEFAULT_Y 
  });
  const [rotation, setRotation] = useState(ROTATION_CONFIG.DEFAULT_ROTATION);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [svgUrl, setSvgUrl] = useState(DEFAULT_SVG_URL);
  const [isCustomUrl, setIsCustomUrl] = useState(false);
  const containerRef = useRef(null);

  // 使用原生事件监听器来处理滚轮事件
  useEffect(() => {
    const container: any = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -ZOOM_CONFIG.WHEEL_ZOOM_STEP : ZOOM_CONFIG.WHEEL_ZOOM_STEP;
      setScale(prev => Math.max(ZOOM_CONFIG.MIN_SCALE, Math.min(ZOOM_CONFIG.MAX_SCALE, prev + delta)));
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // 放大功能
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + ZOOM_CONFIG.ZOOM_STEP, ZOOM_CONFIG.MAX_SCALE));
  };

  // 缩小功能
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - ZOOM_CONFIG.ZOOM_STEP, ZOOM_CONFIG.MIN_SCALE));
  };

  // 重置所有状态
  const handleReset = () => {
    setScale(ZOOM_CONFIG.DEFAULT_SCALE);
    setPosition({ x: POSITION_CONFIG.DEFAULT_X, y: POSITION_CONFIG.DEFAULT_Y });
    setRotation(ROTATION_CONFIG.DEFAULT_ROTATION);
  };

  // 旋转功能
  const handleRotate = () => {
    setRotation(prev => (prev + ROTATION_CONFIG.ROTATION_STEP) % 360);
  };

  // 处理 SVG 选择变化
  const handleSvgChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'custom') {
      setIsCustomUrl(true);
      setSvgUrl('');
    } else {
      setIsCustomUrl(false);
      setSvgUrl(value);
    }
  };

  // 鼠标按下事件处理
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  // 鼠标移动事件处理
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  // 鼠标松开事件处理
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* 顶部工具栏 */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* SVG 选择下拉框 */}
            {!isCustomUrl ? (
              <select
                value={svgUrl}
                onChange={handleSvgChange}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 w-96 cursor-pointer"
              >
                {SVG_PRESETS.map((preset, index) => (
                  <option key={index} value={preset.url}>
                    {preset.name}
                  </option>
                ))}
                <option value="custom">自定义 URL...</option>
              </select>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={svgUrl}
                  onChange={(e) => setSvgUrl(e.target.value)}
                  placeholder="输入 SVG 图片 URL"
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 w-80"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsCustomUrl(false);
                    setSvgUrl(DEFAULT_SVG_URL);
                  }}
                  className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                >
                  返回
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              title="缩小"
            >
              <ZoomOut size={20} />
            </button>
            
            <span className="px-4 py-2 bg-gray-700 text-white rounded-lg min-w-[80px] text-center">
              {Math.round(scale * 100)}%
            </span>
            
            <button
              onClick={handleZoomIn}
              className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              title="放大"
            >
              <ZoomIn size={20} />
            </button>
            
            <div className="w-px h-6 bg-gray-600 mx-2"></div>
            
            <button
              onClick={handleRotate}
              className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              title="旋转 90°"
            >
              <RotateCw size={20} />
            </button>
            
            <button
              onClick={handleReset}
              className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              title="重置"
            >
              <Maximize2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* SVG 显示区域 */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-hidden relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: `${VISUAL_CONFIG.GRID_SIZE} ${VISUAL_CONFIG.GRID_SIZE}`
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`
          }}
        >
          <div
            style={{
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out'
            }}
          >
            <img
              src={svgUrl}
              alt="SVG Preview"
              className="max-w-none select-none"
              draggable={false}
              style={{
                filter: `drop-shadow(${VISUAL_CONFIG.SHADOW})`,
                maxHeight: VISUAL_CONFIG.MAX_IMAGE_HEIGHT,
                maxWidth: VISUAL_CONFIG.MAX_IMAGE_WIDTH
              }}
              onError={(e: any) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML += '<div class="text-red-400 text-xl">加载失败，请检查 URL</div>';
              }}
            />
          </div>
        </div>

        {/* 提示信息 */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-lg text-gray-300 text-sm flex items-center gap-2">
          <Move size={16} />
          拖拽移动 · 滚轮缩放 · 支持旋转
        </div>
      </div>

      {/* 快捷键提示 */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-gray-400 text-xs">
          <div>
            快捷操作: 鼠标拖拽移动 · 滚轮缩放 · 点击旋转按钮旋转
          </div>
          <div>
            缩放范围: {ZOOM_CONFIG.MIN_SCALE * 100}% - {ZOOM_CONFIG.MAX_SCALE * 100}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;