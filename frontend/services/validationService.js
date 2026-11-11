/**
 * Validates an email address.
 *
 * @param {string} email
 * @param {Object} [options]
 * @param {boolean} [options.required=true]
 * @returns {string} Error message, or empty string if valid
 */
export function validateEmail(email, { required = true } = {}) {
  const trimmed = typeof email === "string" ? email.trim() : "";

  if (!trimmed) {
    return required ? "Email address is required." : "";
  }

  // Standard email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return "Please enter a valid email address (e.g. name@example.com).";
  }

  return "";
}

/**
 * Validates a mobile / phone number.
 *
 * @param {string} phone
 * @param {Object} [options]
 * @param {boolean} [options.required=true]
 * @returns {string} Error message, or empty string if valid
 */
export function validatePhone(phone, { required = true } = {}) {
  const trimmed = typeof phone === "string" ? phone.trim() : "";

  if (!trimmed) {
    return required ? "Contact mobile number is required." : "";
  }

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length < 10) {
    return "Please enter a valid 10-digit mobile number.";
  }

  return "";
}
