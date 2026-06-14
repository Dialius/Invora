import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { ChevronDown } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

// ─── CustomSelect ─────────────────────────────────────────────────────────────
export const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  disabled = false,
  className = '',
  id,
}: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const [focusedIdx, setFocusedIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocusedIdx(-1);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Scroll focused item into view
  useEffect(() => {
    if (open && focusedIdx >= 0 && listRef.current) {
      const el = listRef.current.children[focusedIdx] as HTMLElement;
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIdx, open]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const enabledOptions = options.filter((o) => !o.disabled);

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setFocusedIdx(options.findIndex((o) => o.value === value));
        } else if (focusedIdx >= 0) {
          const opt = options[focusedIdx];
          if (opt && !opt.disabled) {
            onChange(opt.value);
            setOpen(false);
            setFocusedIdx(-1);
          }
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!open) {
          setOpen(true);
          setFocusedIdx(0);
        } else {
          setFocusedIdx((prev) => {
            let next = prev + 1;
            while (next < options.length && options[next].disabled) next++;
            return next < options.length ? next : prev;
          });
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIdx((prev) => {
          let next = prev - 1;
          while (next >= 0 && options[next].disabled) next--;
          return next >= 0 ? next : prev;
        });
        break;
      case 'Escape':
        setOpen(false);
        setFocusedIdx(-1);
        break;
      case 'Tab':
        setOpen(false);
        setFocusedIdx(-1);
        break;
      default:
        // Type-ahead: jump to first matching option
        if (e.key.length === 1) {
          const idx = enabledOptions.findIndex((o) =>
            o.label.toLowerCase().startsWith(e.key.toLowerCase())
          );
          if (idx >= 0) {
            const realIdx = options.indexOf(enabledOptions[idx]);
            setFocusedIdx(realIdx);
            if (!open) setOpen(true);
          }
        }
    }
  };

  const handleSelect = (opt: SelectOption) => {
    if (opt.disabled) return;
    onChange(opt.value);
    setOpen(false);
    setFocusedIdx(-1);
  };

  return (
    <div
      ref={containerRef}
      id={id}
      tabIndex={disabled ? -1 : 0}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      onKeyDown={handleKeyDown}
      onClick={() => !disabled && setOpen((prev) => !prev)}
      className={`
        relative select-none
        flex items-center justify-between gap-2
        bg-white border rounded-xl py-2.5 px-3.5
        text-sm text-stone-800 cursor-pointer
        transition-all duration-150
        ${disabled
          ? 'opacity-50 cursor-not-allowed bg-stone-50'
          : open
            ? 'border-teal-600 ring-4 ring-teal-500/10'
            : 'border-[#E2DED7] hover:border-[#C9C3BA]'
        }
        ${className}
      `}
    >
      <span className={`truncate min-w-0 flex-1 ${selectedOption ? 'text-stone-800' : 'text-stone-400'}`}>
        {selectedOption ? selectedOption.label : placeholder}
      </span>
      <ChevronDown
        size={15}
        className={`text-stone-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      />

      {/* Dropdown */}
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          className="
            absolute top-full left-0 right-0 z-50
            mt-1.5 bg-white border border-[#E2DED7]
            rounded-xl shadow-lg shadow-stone-200/60
            py-1.5 max-h-52 overflow-y-auto overflow-x-hidden custom-scrollbar
            animate-slideDown
          "
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((opt, idx) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => handleSelect(opt)}
              className={`
                flex items-center px-3.5 py-2.5 text-sm cursor-pointer transition-colors
                ${opt.disabled
                  ? 'text-stone-300 cursor-not-allowed'
                  : opt.value === value
                    ? 'bg-teal-50 text-teal-800 font-medium'
                    : idx === focusedIdx
                      ? 'bg-stone-50 text-stone-900'
                      : 'text-stone-700 hover:bg-stone-50'
                }
              `}
            >
              {opt.value === value && (
                <span className="mr-2 text-teal-600 text-xs">✓</span>
              )}
              {opt.value !== value && <span className="mr-2 w-3.5" />}
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
