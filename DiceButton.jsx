// Кнопка-триггер броска кубика. Сама анимация (крутящийся кубик) теперь
// рисуется поверх картинки игрового поля (см. Board.jsx) — здесь только
// кнопка и блокировка повторного клика, пока идёт бросок.
export default function DiceButton({ onClick, rolling, label = 'Бросить кубик' }) {
  return (
    <button className="btn btn-primary btn-dice" onClick={onClick} disabled={rolling}>
      {rolling ? 'Бросаю...' : label}
    </button>
  )
}
