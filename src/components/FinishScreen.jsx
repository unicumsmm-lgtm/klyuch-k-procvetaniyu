import { openLink } from '../telegram.js'

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
        самореализацию и свободу, и собрал(а) свои осознания на этом пути.
        Ключ — символ того, что всё нужное для этой цели уже есть внутри тебя.
      </p>
      <p className="finish-cta">
        Это короткая демо-версия по мотивам настоящей настольной игры. Полная
        версия — намного глубже и играется вживую, с настоящими картами и
        партнёрами по игре.
      </p>

      <div className="finish-promo">
        <img
          className="finish-promo-avatar"
          src="/instagram-avatar.jpg"
          alt="Гульназа Салахова"
          onError={(e) => (e.target.style.display = 'none')}
        />
        <p className="finish-promo-text">
          На этом моя игра заканчивается. Но вопросы могут остаться.
        </p>
        <p className="finish-promo-text">
          Если за эти 5 ходов ты успела посмотреть на что-то по-новому,
          значит, инструмент уже сработал.
        </p>
        <p className="finish-promo-text">
          На своём аккаунте я регулярно разбираю то, что мешает нам
          двигаться, выбирать и менять свою жизнь.
        </p>
        <button
          type="button"
          className="btn btn-primary finish-promo-btn"
          onClick={() => openLink('https://www.instagram.com/salakhovagulnaza/')}
        >
          Подписаться
        </button>
      </div>

      <button className="btn btn-secondary" onClick={onRestart}>
        Начать заново
      </button>
    </div>
  )
}
