import { useState } from 'react'
import { getQuestionsForDeck, isAnswerSubstantive, REWARD_MESSAGE } from '../data/cards.js'
import { hapticSuccess } from '../telegram.js'

// Напутствие после ответа на вопросы — настоящих индивидуальных напутствий
// на каждую из 618 карточек у Рамиля нет, поэтому используем тёплое
// обобщённое напутствие по типу колоды (негативная / позитивная).
const GUIDANCE = {
  negative:
    'Ты прожил(а) это осознание — а значит, оно больше не управляет тобой из тени. То, что названо и увидено, теряет над нами власть. Забери с собой этот маленький шаг вперёд.',
  positive:
    'Позволь этой карте усилить тебя. То, что откликнулось в твоих ответах — уже начало работать. Забери это с собой в следующий шаг игры и в жизнь за её пределами.',
}

// Карту (текст плохого качества на фото) не показываем — только
// расшифрованный текст. Дальше — вопросы (свои для 7 негативных колод,
// универсальные для позитивных, ни одного для "Награда") с проверкой,
// что ответ содержательный, а не случайные буквы/цифры.
export default function CardScreen({ card, onNextTurn }) {
  const questions = getQuestionsForDeck(card.deckName)
  const isReward = card.mode === 'reward'

  const [answers, setAnswers] = useState(() => questions.map(() => ''))
  const [attempted, setAttempted] = useState(false)
  const [guidanceShown, setGuidanceShown] = useState(isReward)

  function updateAnswer(i, value) {
    setAnswers((prev) => {
      const next = [...prev]
      next[i] = value
      return next
    })
  }

  function handleReveal() {
    setAttempted(true)
    if (answers.every(isAnswerSubstantive)) {
      hapticSuccess()
      setGuidanceShown(true)
    }
  }

  return (
    <div className="screen card-screen">
      <div className="card-deck-label" style={{ background: card.color }}>
        {card.deckName}
      </div>

      <div className="card-box" style={{ borderColor: card.color }}>
        <h2>{card.title}</h2>
      </div>

      {isReward && (
        <div className="card-insight">
          <div className="card-insight-block">
            <p>{REWARD_MESSAGE}</p>
          </div>
        </div>
      )}

      {!isReward && !guidanceShown && (
        <div className="card-questions">
          {questions.map((q, i) => {
            const invalid = attempted && !isAnswerSubstantive(answers[i])
            return (
              <div className="card-question" key={i}>
                <label>{q}</label>
                <textarea
                  rows={3}
                  value={answers[i]}
                  onChange={(e) => updateAnswer(i, e.target.value)}
                  placeholder="Напиши свой ответ..."
                />
                {invalid && (
                  <p className="answer-warning">
                    Напиши, пожалуйста, развёрнутый ответ по существу — не просто пару
                    случайных символов.
                  </p>
                )}
              </div>
            )
          })}
          <button className="btn btn-primary" onClick={handleReveal}>
            Далее
          </button>
        </div>
      )}

      {!isReward && guidanceShown && (
        <div className="card-insight">
          <div className="card-insight-block">
            <p>{GUIDANCE[card.mode]}</p>
          </div>
        </div>
      )}

      {guidanceShown && (
        <button className="btn btn-secondary" onClick={onNextTurn}>
          Следующий ход
        </button>
      )}
    </div>
  )
}
