// Небольшая обёртка над Telegram WebApp SDK.
// Если приложение открыто не внутри Telegram (например, ты тестируешь
// в обычном браузере на компьютере), window.Telegram будет undefined —
// поэтому везде используем "?." и запасные значения, чтобы ничего не падало.

const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : undefined

export function initTelegram() {
  if (!tg) return

  tg.ready()
  tg.expand() // растянуть на весь экран телефона

  document.documentElement.style.setProperty(
    '--tg-bg-color',
    tg.themeParams?.bg_color || '#0f0f1a'
  )
}

export function hapticTap() {
  tg?.HapticFeedback?.impactOccurred?.('light')
}

export function hapticSuccess() {
  tg?.HapticFeedback?.notificationOccurred?.('success')
}

// ЗАГЛУШКА НА БУДУЩЕЕ: тут же удобно будет добавить авторизацию через
// tg.initData (initDataUnsafe.user), когда дойдёт очередь до сохранения
// прогресса на сервере.
export function getTelegramUser() {
  return tg?.initDataUnsafe?.user || null
}

export default tg
