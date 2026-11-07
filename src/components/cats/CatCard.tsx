import type { Cat } from '../../data/cats';

interface CatCardProps {
  cat: Cat;
  index: number;
  onAddToCart: () => void;   
}

export function CatCard({ cat, index, onAddToCart }: CatCardProps) {
  return (
    <article className="cat-card" data-testid={`catCard${index + 1}`}>
      <img className="cat-card__image" src={cat.imageUrl} alt={cat.name} />
      <div className="cat-card__body">
        <h3 className="cat-card__title">{cat.name}</h3>
        <p className="cat-card__description">{cat.description}</p>
        <div className="cat-card__footer">
          <span className="cat-card__price">{cat.price.toFixed(2)} ₽</span>
          <button type="button" onClick={onAddToCart}>
            Добавить в корзину
          </button>
        </div>
      </div>
    </article>
  );
}
