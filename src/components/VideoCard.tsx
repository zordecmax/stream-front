import Badge from "@/components/Badge";
import Button from './Button';

interface VideoCardProps {
  title: string;
  name: string;
  viewers?: number;
  category: string;
  image: string;
  game: string;
}

export default function VideoCard({ title, name, viewers, category, image, game }: VideoCardProps) {
  return (
    <div className="flex flex-col gap-2 w-80">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-auto object-cover aspect-video" />
        <Button size="sm" className="absolute top-2 right-2">
          {category}
        </Button>
        <Badge variant="semitransparent" className="absolute bottom-2 right-2">Zuschauer - {viewers?.toLocaleString('de-DE')}</Badge>
      </div>

      <div className='flex gap-3 items-center'>
        <img src={image} alt={name} className='w-10 h-10 object-cover aspect-square rounded-full' />
        <div className='flex flex-col grow'>
          <h4 className='font-semibold'>{title}</h4>
          <span className='font-medium text-secondary'>{name}</span>
        </div>
        <span className='font-medium text-muted'>{game}</span>
      </div>

    </div>
  );
}
