import BaseChip from './BaseChip.jsx'

// Rangée de pastilles à choix unique, avec un libellé visible.
// Elle défile horizontalement au pouce quand la place manque.
// options : [{ value, label, swatch? }]
export default function BaseChipGroup({ id, label, options, value, onChange, className = '' }) {
  return (
    <div role="group" aria-labelledby={`${id}-label`} className={`scrollbar-none flex items-center gap-2 overflow-x-auto py-1 ${className}`}>
      <span id={`${id}-label`} className="w-16 shrink-0 text-xs font-black tracking-widest uppercase">
        {label}
      </span>
      {options.map((option) => (
        <BaseChip key={option.value} isActive={option.value === value} onClick={() => onChange(option.value)}>
          {option.swatch && <span className={`size-3 border-2 border-ink ${option.swatch}`} aria-hidden="true"></span>}
          {option.label}
        </BaseChip>
      ))}
    </div>
  )
}
