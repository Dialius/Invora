import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Crop, RotateCcw, Check } from 'lucide-react';

interface CropRect { x: number; y: number; w: number; h: number }
type Handle = 'nw'|'n'|'ne'|'e'|'se'|'s'|'sw'|'w'|'move';
type AspectRatio = 'free' | '1:1' | '4:3' | '16:9' | '3:1';

interface Props {
  src: string;                         // raw image src (base64 or URL)
  title?: string;                      // modal title
  aspectRatios?: AspectRatio[];        // which presets to show
  onApply: (croppedBase64: string) => void;
  onClose: () => void;
}

const PRESETS: Record<AspectRatio, number | null> = {
  'free': null,
  '1:1':  1,
  '4:3':  4 / 3,
  '16:9': 16 / 9,
  '3:1':  3 / 1,
};

const MIN_SIZE = 30;
const PREVIEW_MAX_W = 600;
const PREVIEW_MAX_H = 400;

export const ImageCropModal = ({
  src,
  title = 'Crop Image',
  aspectRatios = ['free', '1:1', '4:3', '16:9'],
  onApply,
  onClose,
}: Props) => {
  const imgRef      = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Natural image size
  const [natural, setNatural] = useState({ w: 1, h: 1 });
  // Displayed image size inside the preview box
  const [display, setDisplay] = useState({ w: 0, h: 0 });
  // Crop box in DISPLAY pixels
  const [crop, setCrop] = useState<CropRect>({ x: 0, y: 0, w: 0, h: 0 });
  const [aspect, setAspect] = useState<AspectRatio>('free');

  // Drag state stored in a ref to avoid stale closures
  const drag = useRef<{
    handle: Handle;
    startX: number; startY: number;
    origCrop: CropRect;
  } | null>(null);

  // ── Compute display size on image load ─────────────────────────────────
  const onImageLoad = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    const natW = img.naturalWidth;
    const natH = img.naturalHeight;
    setNatural({ w: natW, h: natH });

    const scaleX = PREVIEW_MAX_W / natW;
    const scaleY = PREVIEW_MAX_H / natH;
    const scale  = Math.min(scaleX, scaleY, 1); // never upscale
    const dispW  = Math.round(natW * scale);
    const dispH  = Math.round(natH * scale);
    setDisplay({ w: dispW, h: dispH });

    // Default crop = full image
    setCrop({ x: 0, y: 0, w: dispW, h: dispH });
  }, []);

  // ── Apply aspect ratio constraint ────────────────────────────────────────
  useEffect(() => {
    if (aspect === 'free' || display.w === 0) return;
    const ratio = PRESETS[aspect]!;
    setCrop(prev => {
      let w = prev.w;
      let h = Math.round(w / ratio);
      if (prev.y + h > display.h) {
        h = display.h - prev.y;
        w = Math.round(h * ratio);
      }
      return { ...prev, w, h };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aspect]);

  // ── Mouse/Touch event helpers ────────────────────────────────────────────
  const getPos = (e: MouseEvent | TouchEvent): { x: number; y: number } => {
    const cont = containerRef.current!.getBoundingClientRect();
    const src  = 'touches' in e ? e.touches[0] : e;
    return { x: src.clientX - cont.left, y: src.clientY - cont.top };
  };

  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

  const onPointerMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!drag.current) return;
    const { handle, startX, startY, origCrop } = drag.current;
    const pos = getPos(e);
    const dx  = pos.x - startX;
    const dy  = pos.y - startY;
    const ratio = aspect !== 'free' ? PRESETS[aspect] : null;
    const dw  = display.w;
    const dh  = display.h;

    const newCrop = (() => {
      let { x, y, w, h } = origCrop;

      if (handle === 'move') {
        x = clamp(x + dx, 0, dw - w);
        y = clamp(y + dy, 0, dh - h);
        return { x, y, w, h };
      }

      // resize
      let nx = x, ny = y, nw = w, nh = h;

      if (handle.includes('e')) nw = clamp(w + dx, MIN_SIZE, dw - x);
      if (handle.includes('s')) nh = clamp(h + dy, MIN_SIZE, dh - y);
      if (handle.includes('w')) {
        const dLeft = clamp(dx, x - dw + MIN_SIZE, x + w - MIN_SIZE);
        nx = x + dLeft;
        nw = w - dLeft;
      }
      if (handle.includes('n')) {
        const dTop = clamp(dy, y - dh + MIN_SIZE, y + h - MIN_SIZE);
        ny = y + dTop;
        nh = h - dTop;
      }

      if (ratio) {
        if (handle === 'n' || handle === 's') nw = Math.round(nh * ratio);
        else nh = Math.round(nw / ratio);
        nw = clamp(nw, MIN_SIZE, dw - nx);
        nh = clamp(nh, MIN_SIZE, dh - ny);
      }

      return { x: clamp(nx, 0, dw), y: clamp(ny, 0, dh), w: nw, h: nh };
    })();
    setCrop(newCrop);
  }, [aspect, display]);

  const onPointerUp = useCallback(() => {
    drag.current = null;
    window.removeEventListener('mousemove', onPointerMove);
    window.removeEventListener('mouseup',   onPointerUp);
    window.removeEventListener('touchmove', onPointerMove);
    window.removeEventListener('touchend',  onPointerUp);
  }, [onPointerMove]);

  const startDrag = useCallback((handle: Handle, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const pos = getPos(e.nativeEvent as MouseEvent | TouchEvent);
    drag.current = { handle, startX: pos.x, startY: pos.y, origCrop: { ...crop } };
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup',   onPointerUp);
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend',  onPointerUp);
  }, [crop, onPointerMove, onPointerUp]);

  // ── Reset crop to full image ─────────────────────────────────────────────
  const resetCrop = () => {
    setCrop({ x: 0, y: 0, w: display.w, h: display.h });
    setAspect('free');
  };

  // ── Apply: draw cropped region on canvas & export ────────────────────────
  const applyCrop = () => {
    const img = imgRef.current;
    if (!img) return;

    const scale = natural.w / display.w; // display → natural
    const sx = Math.round(crop.x * scale);
    const sy = Math.round(crop.y * scale);
    const sw = Math.round(crop.w * scale);
    const sh = Math.round(crop.h * scale);

    const canvas = document.createElement('canvas');
    canvas.width  = sw;
    canvas.height = sh;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    onApply(canvas.toDataURL('image/png'));
  };

  // ── Handle positions ─────────────────────────────────────────────────────
  const handles: { id: Handle; style: React.CSSProperties }[] = [
    { id: 'nw', style: { top: -5, left: -5,   cursor: 'nw-resize' } },
    { id: 'n',  style: { top: -5, left: '50%', transform: 'translateX(-50%)', cursor: 'n-resize' } },
    { id: 'ne', style: { top: -5, right: -5,  cursor: 'ne-resize' } },
    { id: 'e',  style: { top: '50%', right: -5, transform: 'translateY(-50%)', cursor: 'e-resize' } },
    { id: 'se', style: { bottom: -5, right: -5,  cursor: 'se-resize' } },
    { id: 's',  style: { bottom: -5, left: '50%', transform: 'translateX(-50%)', cursor: 's-resize' } },
    { id: 'sw', style: { bottom: -5, left: -5, cursor: 'sw-resize' } },
    { id: 'w',  style: { top: '50%', left: -5, transform: 'translateY(-50%)', cursor: 'w-resize' } },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#E2DED7] w-full max-w-2xl overflow-hidden animate-scale-up">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2DED7]">
          <div className="flex items-center gap-2">
            <Crop size={16} className="text-teal-600" />
            <h3 className="font-bold text-stone-900 text-sm font-serif">{title}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Aspect ratio presets */}
        <div className="flex items-center gap-2 px-5 pt-4 pb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Ratio:</span>
          {(aspectRatios).map(ar => (
            <button
              key={ar}
              onClick={() => setAspect(ar)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                aspect === ar
                  ? 'bg-teal-600 text-white border-teal-500'
                  : 'bg-stone-50 text-stone-500 border-[#E2DED7] hover:border-[#C9C3BA]'
              }`}
            >
              {ar === 'free' ? 'Free' : ar}
            </button>
          ))}
          <button
            onClick={resetCrop}
            className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border border-[#E2DED7] bg-stone-50 text-stone-500 hover:border-[#C9C3BA] transition-all"
          >
            <RotateCcw size={11} /> Reset
          </button>
        </div>

        {/* Preview area */}
        <div className="px-5 pb-2 flex justify-center">
          <div
            ref={containerRef}
            className="relative select-none overflow-hidden rounded-xl bg-[#F0EDE8]"
            style={{ width: display.w || PREVIEW_MAX_W, height: display.h || PREVIEW_MAX_H }}
          >
            {/* Image */}
            <img
              ref={imgRef}
              src={src}
              alt="crop preview"
              onLoad={onImageLoad}
              draggable={false}
              style={{ width: display.w, height: display.h, display: 'block' }}
            />

            {/* Dark overlay outside crop */}
            {display.w > 0 && (
              <svg
                className="absolute inset-0 pointer-events-none"
                width={display.w}
                height={display.h}
              >
                <defs>
                  <mask id="crop-mask">
                    <rect width={display.w} height={display.h} fill="white" />
                    <rect x={crop.x} y={crop.y} width={crop.w} height={crop.h} fill="black" />
                  </mask>
                </defs>
                <rect width={display.w} height={display.h} fill="rgba(0,0,0,0.45)" mask="url(#crop-mask)" />
              </svg>
            )}

            {/* Crop box */}
            {display.w > 0 && (
              <div
                className="absolute border-2 border-white shadow-lg"
                style={{
                  left: crop.x,
                  top:  crop.y,
                  width:  crop.w,
                  height: crop.h,
                  cursor: 'move',
                  boxSizing: 'border-box',
                }}
                onMouseDown={(e) => startDrag('move', e)}
                onTouchStart={(e) => startDrag('move', e)}
              >
                {/* Rule-of-thirds grid lines */}
                <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.4 }}>
                  <div className="absolute w-px bg-white" style={{ left: '33.33%', top: 0, bottom: 0 }} />
                  <div className="absolute w-px bg-white" style={{ left: '66.66%', top: 0, bottom: 0 }} />
                  <div className="absolute h-px bg-white" style={{ top: '33.33%', left: 0, right: 0 }} />
                  <div className="absolute h-px bg-white" style={{ top: '66.66%', left: 0, right: 0 }} />
                </div>

                {/* Resize handles */}
                {handles.map(h => (
                  <div
                    key={h.id}
                    className="absolute w-3 h-3 bg-white border-2 border-teal-600 rounded-sm shadow"
                    style={{ ...h.style, position: 'absolute' }}
                    onMouseDown={(e) => startDrag(h.id, e)}
                    onTouchStart={(e) => startDrag(h.id, e)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Crop dimensions hint */}
        <div className="px-5 pb-1 text-center">
          <span className="text-[10px] text-stone-400">
            {Math.round(crop.w / (display.w || 1) * natural.w)} × {Math.round(crop.h / (display.h || 1) * natural.h)} px
          </span>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-3 px-5 py-4 border-t border-[#E2DED7] bg-stone-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-600 border border-[#E2DED7] rounded-xl hover:bg-stone-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={applyCrop}
            className="flex items-center gap-1.5 px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
          >
            <Check size={14} /> Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
};
