import { useState } from 'react'

// Экран выбора карты рубашкой вверх. Рубашки показывают обложку самой
// колоды (не смайлик) — так нагляднее видно, из какой колоды выбираешь.
// Количество карт на экране — реальное количество в колоде, но не больше
// 24 (комфортный лимит на экране): если в колоде больше, случайный
// подвыбор уже сделан в drawFullDeck.
export default function ChooseCardScreen({ deckName, cover, color, choices, onPick }) {
  const [pickedIndex, setPickedIndex] = useState(null)

  function handlePick(i) {
    if (pickedIndex !== null) return
    setPickedIndex(i)
    setTimeout(() => onPick(choices[i]), 550)
  }

  return (
    <div className="screen choose-screen">
      <div className="card-deck-label" style={{ background: color }}>
        {deckName}
      </div>
      <p className="subtitle">
        Выбери одну карту из {choices.length}
      </p>
      <div className="choice-grid">
        {choices.map((card, i) => (
          <button
            key={card.id}
            className={
              'choice-card' +
              (pickedIndex === i ? ' choice-card--picked' : '') +
              (pickedIndex !== null && pickedIndex !== i ? ' choice-card--dimmed' : '')
            }
            style={{ borderColor: color }}
            onClick={() => handlePick(i)}
            disabled={pickedIndex !== null}
          >
            <img className="choice-card-cover" src={cover} alt="" />
          </button>
        ))}
      </div>
    </div>
  )
}
