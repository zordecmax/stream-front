import Button from './Button';

interface CategoryCardProps {
  title: string;
  viewers?: number;
  category: string;
  image: string;
}

export default function CategoryCard({ title, viewers, category, image }: CategoryCardProps) {
  return (
    <div className="flex flex-col gap-2 relative">
      <img src={image} alt={title} />
      <Button size="sm" className="absolute top-2 right-2">
        {category}
      </Button>
      <div>
        <h3 className="font-semibold">{title}</h3>
        {viewers != null && (
          <span className="text-sm text-secondary">
            Zuschauer - {viewers.toLocaleString('de-DE')}
          </span>
        )}
      </div>
    </div>
  );
}
