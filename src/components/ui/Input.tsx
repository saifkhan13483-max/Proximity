import React from 'react'
import type { UseFormRegister, FieldValues, Path } from 'react-hook-form'
import { cn } from '@lib/utils'

interface InputProps<T extends FieldValues> {
  label: string
  name: Path<T>
  type?: string
  placeholder?: string
  error?: string
  register: ReturnType<UseFormRegister<T>>
  required?: boolean
  className?: string
}

function InputInner<T extends FieldValues>(
  { label, name, type = 'text', placeholder, error, register, required, className }: InputProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div className={className}>
      <label htmlFor={name} className="font-body text-caption text-body-text font-semibold mb-1 block">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register}
        ref={ref}
        className={cn(
          'w-full border rounded-lg px-4 py-3 text-body-base font-body transition-colors duration-200 bg-white',
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

const Input = React.forwardRef(InputInner) as <T extends FieldValues>(
  props: InputProps<T> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => React.ReactElement

export default Input
