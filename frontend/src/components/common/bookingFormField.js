"use client";

/**
 * BookingFormField
 * Standardized reusable input field matching the reference /fleets/[slug] UI design.
 *
 * @param {Object} props
 * @param {string} props.id - HTML element id
 * @param {any} [props.icon] - Lucide icon component
 * @param {string} props.label - Uppercase tracking label
 * @param {string|number} [props.value=""] - Controlled input value
 * @param {string} [props.placeholder=""] - Input placeholder
 * @param {string} [props.type="text"] - Input type
 * @param {Function} [props.onChange] - Callback receiving the new string value
 * @param {Function} [props.onBlur] - Focus blur callback
 * @param {string} [props.error=""] - Error validation message
 * @param {boolean} [props.required=false] - Whether the field is mandatory
 * @param {number|string} [props.min] - Minimum value (for numbers or dates)
 * @param {number|string} [props.max] - Maximum value
 * @param {string} [props.className=""] - Wrapper className
 */
export default function BookingFormField({
  id,
  icon: Icon,
  label,
  value = "",
  placeholder = "",
  type = "text",
  onChange,
  onBlur,
  error = "",
  required = false,
  min,
  max,
  className = "",
  disabled = false,
  readOnly = false,
  ...rest
}) {
  const hasError = Boolean(error);

  return (
    <div className={`space-y-1 ${className}`}>
      <div
        className={`rounded-xl border bg-surface-secondary px-4 py-3 transition-colors ${
          hasError
            ? "border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/25"
            : "border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-focus-ring/30"
        }`}
      >
        <label
          htmlFor={id}
          className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-text-muted select-none"
        >
          {Icon && <Icon className="h-3.5 w-3.5 text-primary shrink-0" />}
          <span>{label}</span>
          {required && <span className="text-primary">*</span>}
        </label>

        <input
          id={id}
          type={type}
          value={value ?? ""}
          onChange={(event) => onChange?.(event.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className="w-full bg-transparent text-xs font-semibold text-text-primary placeholder:text-text-muted outline-none sm:text-sm"
          {...rest}
        />
      </div>

      {hasError && (
        <p
          id={`${id}-error`}
          className="px-1 text-[11px] font-semibold text-red-500"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
