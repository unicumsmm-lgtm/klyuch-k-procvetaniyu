// Экран после броска кубика: сначала показываем ОБЛОЖКУ выпавшей колоды
// (настоящую картинку из папки колоды) и её название — и только потом,
// по нажатию кнопки, открываем саму колоду для выбора карты.
export default function DeckCoverScreen({ deckName, cover, color, onOpen }) {
  return (
    <div className="screen cover-screen">
      <p className="subtitle">Кубик привёл тебя к колоде</p>
      <h1>{deckName}</h1>
      <div className="cover-frame" style={{ borderColor: color }}>
        <img
          className="cover-image"
          src={cover}
          alt={deckName}
          onError={(e) => (e.target.style.display = 'none')}
        />
      </div>
      <button className="btn btn-primary" onClick={onOpen}>
        Открыть колоду
      </button>
    </div>
  )
}
