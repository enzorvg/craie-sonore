import BaseChip from './BaseChip.jsx'

// Rangée de pastilles à choix unique, avec un libellé visible.
// Elle défile horizontalement au pouce quand la place manque.
// options : [{ value, label, dot? }]
export default function BaseChipGroup({ id, label, options, value, onChange, className = '' }) {
  return (
    <div role="group" aria-labelledby={`${id}-label`} className={`scrollbar-none flex items-center gap-2 overflow-x-auto ${className}`}>
      <span id={`${id}-label`} className="w-16 shrink-0 text-xs font-bold tracking-wide text-muted uppercase">
        {label}
      </span>
      {options.map((option) => (
        <BaseChip key={option.value} isActive={option.value === value} onClick={() => onChange(option.value)}>
          {option.dot && <span className={`size-2.5 rounded-full ${option.dot}`} aria-hidden="true"></span>}
          {option.label}
        </BaseChip>
      ))}
    </div>
  )
}
