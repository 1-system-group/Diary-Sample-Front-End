/**
 * 各画面で共通に使うメッセージを集約。
 * 新規メッセージはここにキーを追加して再利用する。
 */
export const ERROR_MESSAGES = {
  serverError: 'サーバーエラーが発生しました。しばらく時間をおいて再度お試しください',
  generic: 'エラーが発生しました。再度お試しください',
} as const

export const VALIDATION_MESSAGES = {
  emailRequired: 'メールアドレスは必須です',
  emailInvalid: '有効なメールアドレスを入力してください',
  passwordRequired: 'パスワードは必須です',
  passwordMinLength: 'パスワードは6文字以上で入力してください',
  passwordConfirmRequired: 'パスワード（確認）は必須です',
  passwordMismatch: 'パスワードが一致しません',
  passwordInvalid: 'パスワードを正しく入力してください',
} as const
