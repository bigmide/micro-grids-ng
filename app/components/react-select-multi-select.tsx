import type React from 'react'
import { useState } from 'react'
import Select, { type MultiValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import { twMerge } from 'tailwind-merge'

export function ReactSelectMultiSelect({
  ref,
  name,
  options,
  disabled,
  invalid,
  placeholder,
  className,
  onChange,
}: {
  ref?: React.RefObject<HTMLInputElement>
  name: string
  disabled?: boolean
  invalid?: boolean
  placeholder?: string
  className?: string
  options: { label: string; value: string }[]
  onChange: (values: MultiValue<unknown>) => void
}) {
  const [multiSelectValue, setMultiSelectValue] = useState<MultiValue<unknown>>()
  const animatedComponents = makeAnimated()

  return (
    <div data-slot="control">
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        placeholder={placeholder}
        options={options}
        isDisabled={disabled}
        unstyled
        classNamePrefix="react-select"
        classNames={{
          container: ({ isFocused, isDisabled }) =>
            twMerge([
              className,
              // Basic layout
              'group relative block w-full',
              // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
              'before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm',
              // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
              'dark:before:hidden',
              // Hide default focus styles
              'focus:outline-hidden',
              // Focus ring
              `after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset ${isFocused ? 'after:ring-2 after:ring-teal-500' : ''}`,
              // Disabled state
              isDisabled && 'opacity-50 before:bg-zinc-950/5 before:shadow-none',
            ]),
          control: ({ isDisabled }) =>
            twMerge([
              // Basic layout
              'relative block w-full appearance-none rounded-lg py-[calc(--spacing(2.5)-1px)] sm:py-[calc(--spacing(1.5)-1px)]',
              // Set minimum height for when no value is selected
              'min-h-11 sm:min-h-9',
              // Horizontal padding
              'pr-[calc(--spacing(3.5)-1px)] pl-[calc(--spacing(3.5)-1px)] sm:pl-[calc(--spacing(3)-1px)]',
              // Typography
              'text-left text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]',
              // Border
              'border border-zinc-950/10 group-active:border-zinc-950/20 group:hover:border-zinc-950/20 dark:border-white/10 dark:group:active:border-white/20 dark:group:hover:border-white/20',
              // Background color
              'bg-transparent dark:bg-white/5',
              // Invalid state
              invalid && 'border-red-500 hover:border-red-500 dark:border-red-600 dark:hover:border-red-600',
              // Disabled state
              isDisabled &&
                'border-zinc-950/20 opacity-100 dark:border-white/15 dark:bg-white/[2.5%] dark:hover:border-white/15',
            ]),
          option: ({ isFocused }) =>
            twMerge(
              // Basic layout
              'group/option grid cursor-default grid-cols-[--spacing(5)_1fr] items-baseline gap-x-2 rounded-lg py-2.5 pr-3.5 pl-2 sm:grid-cols-[--spacing(4)_1fr] sm:py-1.5 sm:pr-3 sm:pl-1.5',
              // Typography
              'text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]',
              // Focus
              `outline-hidden ${isFocused ? 'bg-teal-500 text-white' : ''}`,
              // Forced colors mode
              'forced-color-adjust-none forced-colors:data-focus:bg-[Highlight] forced-colors:data-focus:text-[HighlightText]',
              // Disabled
              'data-disabled:opacity-50',
            ),
          menu: () =>
            twMerge(
              // Anchor positioning
              '[--anchor-offset:-1.625rem] [--anchor-padding:--spacing(4)] sm:[--anchor-offset:-1.375rem] my-2',
              // Base styles
              'isolate  scroll-py-1 rounded-xl p-1 select-none',
              // Invisible border that is only visible in `forced-colors` mode for accessibility purposes
              'outline outline-transparent focus:outline-hidden',
              // Handle scrolling when menu won't fit in viewport
              'overflow-y-scroll overscroll-contain',
              // Popover background
              'bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75',
              // Shadows
              'shadow-lg ring-1 ring-zinc-950/10 dark:ring-white/10 dark:ring-inset',
              // Transitions
              'transition-opacity duration-100 ease-in closed:leave:opacity-0 transition:pointer-events-none',
            ),
          multiValue: () => 'flex min-w-0 bg-zinc-200 dark:bg-zinc-700 rounded-xs m-0.5',
          multiValueLabel: () =>
            'overflow-hidden text-ellipsis whitespace-nowrap rounded-sm text-zinc-800 dark:text-zinc-200 text-[85%] p-[3px] pl-1.5',
          multiValueRemove: () =>
            'hover:bg-red-200 dark:hover:bg-red-700 hover:text-red-600 dark:hover:text-red-300 flex rounded-xs pl-1 pr-1',
          clearIndicator: () => 'hover:text-zinc-700 dark:hover:text-zinc-300 flex p-2 transition-colors duration-150',
          indicatorSeparator: () => 'self-stretch w-px bg-zinc-300 dark:bg-zinc-600 mb-2 mt-2',
          dropdownIndicator: () => 'flex transition-colors duration-[150ms] text-zinc-500 dark:text-zinc-400 p-2',
        }}
        onChange={(newValue, actionMeta) => {
          console.log(actionMeta)
          setMultiSelectValue(newValue)
          onChange(newValue)
        }}
      />

      {/* hidden input so the form can submit it normally */}
      <input
        ref={ref}
        type="hidden"
        name={name}
        value={multiSelectValue?.map((entry) => (entry as { value: string }).value).join(',') || ''}
      />
    </div>
  )
}
