// Финальный экран: игрок дошёл до клетки "Ключ".
export default function FinishScreen({ intent, onRestart }) {
  return (
    <div className="screen finish-screen">
      <div className="finish-key">
        <img src="/board/key.jpg" alt="Ключ" onError={(e) => (e.target.style.display = 'none')} />
      </div>
      <h1>Ты дошёл(шла) до Ключа</h1>
      <p className="finish-intent">«{intent}»</p>
      <p className="finish-text">
        Ты прошёл(шла) путь через низкие вибрации, шаг навстречу процветанию,
        самореализацию и свободу — и собрал(а) свои осознания на этом пути.
        Ключ — символ того, что всё нужное для этой цели уже есть внутри тебя.
      </p>
      <p className="finish-cta">
        Это короткая демо-версия по мотивам настоящей настольной игры. Полная
        версия — намного глубже и играется вживую, с настоящими картами и
        партнёрами по игре.
      </p>
      <button className="btn btn-primary" onClick={onRestart}>
        Начать заново
      </button>
    </div>
  )
}
