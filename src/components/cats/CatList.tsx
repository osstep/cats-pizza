import type { Cat } from '../../data/cats';
import { CatCard } from './CatCard';
import './Cats.css';

interface CatListProps {
  cats: Cat[];
  onAddToCart: (cat: Cat) => void;
}

export function CatList({ cats, onAddToCart }: CatListProps) {
  return (
    <div className="cat-list">
      {cats.map((cat, index) => (
        <CatCard key={cat.id} cat={cat} index={index} onAddToCart={() => onAddToCart(cat)} />
      ))}
    </div>
  );
}
