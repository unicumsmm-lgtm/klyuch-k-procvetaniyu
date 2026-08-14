// Раскладка точек классического кубика (3×3 сетка позиций) для граней 1–6.
const PIP_LAYOUTS = {
  1: ['c'],
  2: ['tl', 'br'],
  3: ['tl', 'c', 'br'],
  4: ['tl', 'tr', 'bl', 'br'],
  5: ['tl', 'tr', 'c', 'bl', 'br'],
  6: ['tl', 'tr', 'ml', 'mr', 'bl', 'br'],
}

function DiceFace({ value }) {
  const pips = PIP_LAYOUTS[value] || []
  return (
    <div className="dice-cube">
      {pips.map((pos) => (
        <span key={pos} className={`dice-pip dice-pip--${pos}`} />
      ))}
    </div>
  )
}

// Игровое поле — чисто декоративный фон (попадание на карточку случайно и
// не привязано к конкретной клетке картинки), показывается ЦЕЛИКОМ, без
// обрезки. Поверх картинки, строго по центру, во время броска кубика
// появляется анимированный чёрный кубик с белыми точками — крутится, а
// затем "оседает" на выпавшей грани. Точки рисуются CSS-сеткой (не
// эмодзи-символом), чтобы кубик был идеально отцентрован и одинаково
// выглядел на любом устройстве.
export default function Board({ dice }) {
  const showOverlay = dice && (dice.rolling || dice.face)
  const value = dice?.face || 1

  return (
    <div className="board-decor">
      <img className="board-decor-image" src="/board/field.jpg" alt="Игровое поле" />
      {showOverlay && (
        <div
          className={
            'dice-overlay' + (dice.rolling ? ' dice-overlay--rolling' : ' dice-overlay--settled')
          }
        >
          <DiceFace value={value} />
        </div>
      )}
    </div>
  )
}
