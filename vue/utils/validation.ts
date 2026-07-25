export const EMAIL_PATTERN = /.+@.+\..+/

export const isValidEmail = (value: string): boolean => EMAIL_PATTERN.test(value)
