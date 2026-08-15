import { useState } from 'react'

// Экран №1: игрок формулирует своё желание как уже свершившийся факт.
export default function IntentScreen({ onSubmit }) {
  const [text, setText] = useState('')

  const examples = [
    'Я добилась успеха',
    'Я купила дом своей мечты',
    'Я обрела счастливые отношения',
    'Я люблю и принимаю себя',
    'У меня есть финансовая свобода',
  ]

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    onSubmit(text.trim())
  }

  return (
    <div className="screen intent-screen">
      <h1>Ключ к процветанию</h1>
      <p className="subtitle">
        Сформулируй своё желание так, будто оно уже исполнилось. Пиши в
        настоящем времени, от первого лица.
      </p>

      <form onSubmit={handleSubmit} className="intent-form">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Например: «У меня есть финансовая свобода»"
          rows={3}
          autoFocus
        />
        <button type="submit" className="btn btn-primary" disabled={!text.trim()}>
          Начать игру
        </button>
      </form>

      <div className="examples">
        <p className="examples-title">Примеры формулировок:</p>
        <ul>
          {examples.map((ex) => (
            <li key={ex} onClick={() => setText(ex)}>
              {ex}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
