import { useEffect, useState } from 'react';
import type { Cat } from '../data/cats';
import { CatList } from '../components/cats/CatList';
import { CatModal } from '../components/cats/CatModal';
import { useCart } from '../cart/CartContext';
import './HomePage.css';

export function HomePage() {
  const { addItem } = useCart();
  const [cats, setCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadCats = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/cats');

        if (!response.ok) {
          throw new Error('Не удалось загрузить список котиков');
        }

        const data: Cat[] = await response.json();
        setCats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке котиков');
      } finally {
        setIsLoading(false);
      }
    };

    void loadCats();
  }, []);

  const handleOpenModal = (cat: Cat) => {
    setSelectedCat(cat);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="home-page">
      <div className="home-page__header">
        <h1 data-testid="homePageHeader">Заказ котиков</h1>
        <p>Выберите идеального котика для доставки на дом.</p>
      </div>

      {isLoading && <p>Загрузка котиков...</p>}
      {error && !isLoading && <p style={{ color: 'red' }}>{error}</p>}
      {!isLoading && !error && <CatList cats={cats} onAddToCart={handleOpenModal} />}

      <CatModal
        cat={selectedCat}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={({ furType, activityLevel, extras, totalPrice }) => {
          if (!selectedCat) return;
          addItem({
            id: selectedCat.id,
            name: selectedCat.name,
            basePrice: selectedCat.price,
            price: totalPrice,
            options: {
              furType,
              activityLevel,
              extras,
            },
          });
        }}
      />
    </section>
  );
}
