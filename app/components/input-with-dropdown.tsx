import * as Headless from '@headlessui/react'
import { clsx } from 'clsx'
import type React from 'react'
import { useRef } from 'react'

export function InputWithDropdown({
  invalid,
  disabled,
  inputName,
  selectName,
  children,
  onChange,
}: {
  inputName: string
  selectName: string
  invalid?: boolean
  disabled?: boolean
  children: React.ReactNode
  onChange?: (cleanValue: string) => void // receives sanitized value
}) {
  const ref = useRef<HTMLInputElement | null>(null)

  // Allowed characters: digits, comma, dot. Only one dot allowed.
  const sanitize = (raw: string) => {
    // Remove anything that's not digit, dot or comma
    let cleaned = raw.replace(/[^0-9.,]/g, '')

    // Keep only the first dot (.) if there are multiple
    const parts = cleaned.split('.')
    if (parts.length > 1) {
      cleaned = parts.shift()! + '.' + parts.join('') // first dot kept, subsequent dots removed
    }

    return cleaned
  }

  const handleBeforeInput = (
    e: React.FormEvent<HTMLInputElement> & { nativeEvent: InputEvent },
  ) => {
    // best-effort: prevent invalid single-char inserts when browser supports beforeinput
    const inputEvent = e.nativeEvent
    const data = (inputEvent as InputEvent).data
    if (!data) return // might be a deletion or non-character input
    if (!/^[0-9.,]$/.test(data)) {
      inputEvent.preventDefault()
    }
    // if it's a dot, prevent if there's already a dot in the value
    if (data === '.' && ref.current && ref.current.value.includes('.')) {
      inputEvent.preventDefault()
    }
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const allowedControlKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
      'Tab',
    ]

    if (allowedControlKeys.includes(e.key)) return

    // Allow Ctrl/Cmd + A/C/V/X/Z etc.
    if (e.metaKey || e.ctrlKey) return

    // If key is a single character, test it
    if (e.key.length === 1) {
      if (!/^[0-9.,]$/.test(e.key)) {
        e.preventDefault()
        return
      }
      if (e.key === '.' && ref.current && ref.current.value.includes('.')) {
        e.preventDefault()
        return
      }
    }
  }

  const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    const pasted = e.clipboardData.getData('text')
    const cleaned = sanitize(pasted)
    e.preventDefault()

    const input = ref.current!
    const start = input.selectionStart ?? input.value.length
    const end = input.selectionEnd ?? start
    const newValue =
      input.value.slice(0, start) + cleaned + input.value.slice(end)

    input.value = sanitize(newValue)
    // move caret to after inserted text
    const caretPos = start + cleaned.length
    input.setSelectionRange(caretPos, caretPos)

    onChange?.(input.value)
  }

  const handleInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    const input = e.currentTarget
    const old = input.value
    const cleaned = sanitize(old)

    if (cleaned !== old) {
      // try preserve caret position roughly
      const pos = input.selectionStart ?? cleaned.length
      input.value = cleaned
      const newPos = Math.max(
        0,
        Math.min(cleaned.length, pos - (old.length - cleaned.length)),
      )
      input.setSelectionRange(newPos, newPos)
    }

    onChange?.(cleaned)
  }
  return (
    <>
      <div data-slot="control">
        <span
          className={clsx([
            // Basic layout
            'relative block w-full',
            // Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
            'before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm',
            // Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
            'dark:before:hidden',
            // Focus ring
            'after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-teal-500',
            // Disabled state
            'has-data-disabled:opacity-50 has-data-disabled:before:bg-zinc-950/5 has-data-disabled:before:shadow-none',
            // Invalid state
            'has-data-invalid:before:shadow-red-500/10',
          ])}
        >
          <span
            className={clsx(
              'flex items-center rounded-lg',
              // Border
              'border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20',
              // Background color
              'bg-transparent dark:bg-white/5',
              // Hide default focus styles
              'focus:outline-hidden',
              // Invalid state
              'has-data-invalid:border-red-500 has-data-invalid:hover:border-red-500 dark:has-data-invalid:border-red-500 dark:has-data-invalid:hover:border-red-500',
              // Disabled state
              'has-data-disabled:border-zinc-950/20 dark:has-data-disabled:border-white/15 dark:has-data-disabled:bg-white/[2.5%] dark:hover:has-data-disabled:border-white/15',
              // System icons
              'dark:[color-scheme:dark]',
            )}
          >
            <Headless.Input
              name={inputName}
              type="text"
              placeholder="0.00"
              invalid={invalid}
              disabled={disabled}
              ref={ref}
              onKeyDown={handleKeyDown}
              onInput={handleInput}
              onPaste={handlePaste}
              // beforeInput gives more granular prevention in browsers that support it
              onBeforeInput={handleBeforeInput}
              inputMode="decimal"
              aria-label="numeric input"
              className={clsx(
                // Basic layout
                'relative block min-w-0 grow appearance-none px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]',
                // Typography
                'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white',
                // Hide default focus styles
                'focus:outline-none',
                // System icons
                'dark:[color-scheme:dark]',
              )}
            />

            <div className="grid shrink-0 grid-cols-1 focus-within:relative">
              <Headless.Select
                name={selectName}
                invalid={invalid}
                disabled={disabled}
                className={clsx([
                  // Basic layout
                  'relative col-start-1 row-start-1 block w-full appearance-none rounded-r-lg py-[calc(--spacing(2.5)-1px)] pr-7 pl-3 sm:py-[calc(--spacing(1.5)-1px)]',
                  // Hide default focus styles
                  'focus:outline-none',
                  // Typography
                  'text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white dark:*:text-white',
                  // Background color
                  'bg-zinc-100 dark:bg-white/5 dark:*:bg-zinc-800',
                ])}
              >
                {children}
              </Headless.Select>

              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <svg
                  className="size-5 stroke-zinc-500 group-has-data-disabled:stroke-zinc-600 sm:size-4 dark:stroke-zinc-400 forced-colors:stroke-[CanvasText]"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  fill="none"
                >
                  <path
                    d="M5.75 10.75L8 13L10.25 10.75"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.25 5.25L8 3L5.75 5.25"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </span>
        </span>
      </div>
    </>
  )
}
