import { memo } from 'react';
import DressCard from './DressCard';

function DressRecommendations({ dresses, title = 'You may also like' }) {
  if (!dresses?.length) return null;

  return (
    <section className="mt-20 border-t border-royal-border pt-16">
      <p className="text-label mb-2">Curated for you</p>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-royal-cream">{title}</h2>
      <div className="marketplace-grid mt-10">
        {dresses.map((dress) => (
          <DressCard key={dress.id} dress={dress} />
        ))}
      </div>
    </section>
  );
}

export default memo(DressRecommendations);
