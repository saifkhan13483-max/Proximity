import React from 'react'
import type { UseFormRegister, FieldValues, Path } from 'react-hook-form'
import { cn } from '@lib/utils'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps<T extends FieldValues> {
  label: string
  name: Path<T>
  options: SelectOption[]
  error?: string
  register: ReturnType<UseFormRegister<T>>
  required?: boolean
  placeholder?: string
  className?: string
}

function SelectInner<T extends FieldValues>(
  {
    label,
    name,
    options,
    error,
    register,
    required,
    placeholder = 'Select an option',
    className,
  }: SelectProps<T>,
  ref: React.ForwardedRef<HTMLSelectElement>
) {
  return (
    <div className={className}>
      <label htmlFor={name} className="font-body text-caption text-body-text font-semibold mb-1 block">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <select
        id={name}
        {...register}
        ref={ref}
        className={cn(
          'w-full border rounded-lg px-4 py-3 text-body-base font-body transition-colors duration-200 bg-white appearance-none',
          error
            ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 focus:outline-none'
            : 'border-gray-200 focus:border-gold-primary focus:ring-2 focus:ring-gold-primary/20 focus:outline-none'
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p role="alert" className="text-label text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}

const Select = React.forwardRef(SelectInner) as <T extends FieldValues>(
  props: SelectProps<T> & { ref?: React.ForwardedRef<HTMLSelectElement> }
) => React.ReactElement

export default Select
