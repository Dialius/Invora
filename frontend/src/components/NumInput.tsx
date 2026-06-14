import { useRef, ChangeEvent } from 'react';
import { Minus, Plus } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface NumInputProps {
  value: number | string;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  /** show stepper +/- buttons */
  showSteppers?: boolean;
  /** right-align the number */
  align?: 'left' | 'right';
  /** compact size for table cells */
  compact?: boolean;
}

// ─── NumInput ─────────────────────────────────────────────────────────────────
export const NumInput = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  placeholder = '0',
  disabled = false,
  className = '',
  id,
  showSteppers = false,
  align = 'left',
  compact = false,
}: NumInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const clamp = (n: number) => {
    if (min !== undefined && n < min) return min;
    if (max !== undefined && n > max) return max;
    return n;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === '' || raw === '-') {
      onChange(0);
      return;
    }
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      onChange(clamp(num));
    }
  };

  const handleBlur = () => {
    const num = parseFloat(String(value));
    if (!isNaN(num)) onChange(clamp(num));
  };

  const increment = () => {
    const num = parseFloat(String(value)) || 0;
    onChange(clamp(num + step));
  };

  const decrement = () => {
    const num = parseFloat(String(value)) || 0;
    onChange(clamp(num - step));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') { e.preventDefault(); increment(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); decrement(); }
  };

  const pad = compact ? 'py-1.5 px-2.5' : 'py-2.5 px-3.5';
  const textSize = compact ? 'text-xs' : 'text-sm';

  if (showSteppers) {
    return (
      <div
        className={`
          flex items-center border rounded-xl overflow-hidden
          bg-white transition-all duration-150
          focus-within:border-teal-600 focus-within:ring-4 focus-within:ring-teal-500/10
          ${disabled ? 'opacity-50 bg-stone-50 border-stone-200' : 'border-[#E2DED7] hover:border-[#C9C3BA]'}
          ${className}
        `}
      >
        <button
          type="button"
          onClick={decrement}
          disabled={disabled || (min !== undefined && Number(value) <= min)}
          className="px-3 py-2.5 text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-r border-[#E2DED7]"
          tabIndex={-1}
        >
          <Minus size={13} />
        </button>
        <input
          ref={inputRef}
          id={id}
          type="text"
          inputMode="decimal"
          value={value === 0 ? '' : value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            flex-1 min-w-0 bg-transparent border-none outline-none
            ${textSize} text-stone-800 text-center
            ${compact ? 'py-1.5 px-2' : 'py-2.5 px-3'}
            disabled:cursor-not-allowed
          `}
        />
        <button
          type="button"
          onClick={increment}
          disabled={disabled || (max !== undefined && Number(value) >= max)}
          className="px-3 py-2.5 text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-l border-[#E2DED7]"
          tabIndex={-1}
        >
          <Plus size={13} />
        </button>
      </div>
    );
  }

  // Plain number input (no steppers)
  return (
    <input
      ref={inputRef}
      id={id}
      type="text"
      inputMode="decimal"
      value={value === 0 ? '' : value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        bg-white border rounded-xl transition-all duration-150
        ${pad} ${textSize}
        ${align === 'right' ? 'text-right' : 'text-left'}
        text-stone-800 placeholder-stone-400
        outline-none
        ${disabled
          ? 'opacity-50 bg-stone-50 border-stone-200 cursor-not-allowed'
          : 'border-[#E2DED7] hover:border-[#C9C3BA] focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10'
        }
        ${className}
      `}
    />
  );
};
