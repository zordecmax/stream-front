'use client';

import Button from './Button';

interface CategoryCardProps {
  title: string;
  viewers: number;
  category: string;
  thumbnail: string;
}

export default function CategoryCard({ title, viewers, category, thumbnail }: CategoryCardProps) {
  return (
    <div className="flex flex-col gap-2 relative">
      <img src={thumbnail} alt={title} />
      <Button size="sm" className="absolute top-2 right-2">
        {category}
      </Button>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm text-secondary">
          Zuschauer - {viewers.toLocaleString('de-DE')}
        </span>
      </div>
    </div>
  );
}
