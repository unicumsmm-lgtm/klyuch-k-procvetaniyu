import { useState, useRef, useEffect } from 'react'
import { DECKS, pickGameDecks, drawFullDeck } from './data/cards.js'
import { hapticTap, hapticSuccess } from './telegram.js'

import IntentScreen from './components/IntentScreen.jsx'
import Board from './components/Board.jsx'
import DiceButton from './components/DiceButton.jsx'
import DeckCoverScreen from './components/DeckCoverScreen.jsx'
import ChooseCardScreen from './components/ChooseCardScreen.jsx'
import CardScreen from './components/CardScreen.jsx'
import FinishScreen from './components/FinishScreen.jsx'

const TOTAL_TURNS = 5

// Экраны игры: intent -> board(бросок) -> cover(обложка колоды) ->
// choose(выбор карты вслепую) -> card(текст + вопросы) -> board -> ... -> finish
//
// Игровое поле — только фон. Бросок кубика — ритуальный (косметический,
// анимация крутится прямо на картинке поля), на исход не влияет. Колода
// на каждый ход выбирается случайно (5 разных колод на партию, без
// повторов). Счётчик ходов на экране НЕ показываем — так решил Рамиль, но
// внутри ходов ровно 5.
export default function App() {
  const [screen, setScreen] = useState('intent') // 'intent' | 'board' | 'cover' | 'choose' | 'card' | 'finish'
  const [intent, setIntent] = useState('')
  const [gameDecks, setGameDecks] = useState(() => pickGameDecks(TOTAL_TURNS))
  const [turnIndex, setTurnIndex] = useState(0)
  const [currentDeckName, setCurrentDeckName] = useState(null)
  const [choices, setChoices] = useState([])
  const [currentCard, setCurrentCard] = useState(null)
  const [lastRoll, setLastRoll] = useState(null)
  const [dice, setDice] = useState({ rolling: false, face: null })
  const diceIntervalRef = useRef(null)

  useEffect(() => () => clearInterval(diceIntervalRef.current), [])

  function handleIntentSubmit(text) {
    setIntent(text)
    setGameDecks(pickGameDecks(TOTAL_TURNS))
    setTurnIndex(0)
    setScreen('board')
  }

  function handleRollStart() {
    if (dice.rolling) return
    hapticTap()
    setDice({ rolling: true, face: null })

    let ticks = 0
    diceIntervalRef.current = setInterval(() => {
      ticks++
      setDice({ rolling: true, face: 1 + Math.floor(Math.random() * 6) })
      if (ticks > 9) {
        clearInterval(diceIntervalRef.current)
        const result = 1 + Math.floor(Math.random() * 6)
        setDice({ rolling: false, face: result })
        setLastRoll(result)
        setTimeout(() => {
          hapticSuccess()
          setCurrentDeckName(gameDecks[turnIndex])
          setScreen('cover')
          setDice({ rolling: false, face: null })
        }, 650)
      }
    }, 80)
  }

  function handleOpenDeck() {
    setChoices(drawFullDeck(currentDeckName))
    setScreen('choose')
  }

  function handlePickCard(card) {
    setCurrentCard(card)
    setScreen('card')
  }

  function handleNextTurn() {
    setCurrentCard(null)
    const next = turnIndex + 1
    if (next >= TOTAL_TURNS) {
      hapticSuccess()
      setScreen('finish')
      return
    }
    setTurnIndex(next)
    setScreen('board')
  }

  function handleRestart() {
    setIntent('')
    setGameDecks(pickGameDecks(TOTAL_TURNS))
    setTurnIndex(0)
    setCurrentDeckName(null)
    setCurrentCard(null)
    setLastRoll(null)
    setDice({ rolling: false, face: null })
    setScreen('intent')
  }

  const deckMeta = currentDeckName ? DECKS[currentDeckName] : null

  // Единый фон теперь на ВСЕХ экранах, от начала (ввод желания) и до конца
  // (финал) — не зависящий от темы Telegram (светлая/тёмная). Раньше фон
  // брался из --tg-bg-color, а текст всегда оставался светлым — на светлой
  // теме Telegram текст становился не виден.
  return (
    <>
      <div className="unified-bg" />
      <div className="app">
      {screen === 'intent' && <IntentScreen onSubmit={handleIntentSubmit} />}

      {screen === 'board' && (
        <div className="screen">
          <p className="intent-reminder">{intent}</p>
          <Board dice={dice} />
          <div className="board-footer">
            <DiceButton onClick={handleRollStart} rolling={dice.rolling} />
          </div>
        </div>
      )}

      {screen === 'cover' && deckMeta && (
        <DeckCoverScreen
          deckName={currentDeckName}
          cover={deckMeta.cover}
          color={deckMeta.color}
          onOpen={handleOpenDeck}
        />
      )}

      {screen === 'choose' && deckMeta && (
        <ChooseCardScreen
          deckName={currentDeckName}
          cover={deckMeta.cover}
          color={deckMeta.color}
          choices={choices}
          onPick={handlePickCard}
        />
      )}

      {screen === 'card' && currentCard && (
        <CardScreen card={currentCard} onNextTurn={handleNextTurn} />
      )}

      {screen === 'finish' && <FinishScreen intent={intent} onRestart={handleRestart} />}
      </div>
    </>
  )
}
