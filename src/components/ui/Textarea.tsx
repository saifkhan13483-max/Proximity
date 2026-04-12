import React from 'react'
import type { UseFormRegister, FieldValues, Path } from 'react-hook-form'
import { cn } from '@lib/utils'

interface TextareaProps<T extends FieldValues> {
  label: string
  name: Path<T>
  placeholder?: string
  error?: string
  register: ReturnType<UseFormRegister<T>>
  required?: boolean
  rows?: number
  className?: string
}

function TextareaInner<T extends FieldValues>(
  { label, name, placeholder, error, register, required, rows = 5, className }: TextareaProps<T>,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <div className={className}>
      <label htmlFor={name} className="font-body text-caption text-body-text font-semibold mb-1 block">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        rows={rows}
        {...register}
        ref={ref}
        className={cn(
          'w-full border rounded-lg px-4 py-3 text-body-base font-body transition-colors duration-200 bg-white resize-none',
          error
            ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 focus:outline-none'
            : 'border-gray-200 focus:border-gold-primary focus:ring-2 focus:ring-gold-primary/20 focus:outline-none'
        )}
      />
      {error && (
        <p role="alert" className="text-label text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}

const Textarea = React.forwardRef(TextareaInner) as <T extends FieldValues>(
  props: TextareaProps<T> & { ref?: React.ForwardedRef<HTMLTextAreaElement> }
) => React.ReactElement

export default Textarea
