import Badge from "@/components/ui/Badge";
import Button from './ui/Button';

interface VideoCardProps {
  title: string;
  channelName: string;
  viewers?: number;
  category: string;
  image: string;
  avatar: string;
  game: string;
  onClick?: () => void;
}

export default function VideoCard({ title, channelName, viewers, category, image, avatar, game, onClick }: VideoCardProps) {
  return (
    <div className={`flex flex-col gap-2 w-80 min-w-80 ${onClick ? "cursor-pointer" : ""}`} onClick={onClick}>
      <div className="relative overflow-hidden rounded-lg">
        <img src={image} alt={title} className="w-full h-auto object-cover aspect-video scale-[1.2]" />
        <Button size="sm" className="absolute top-2 right-2">
          {category}
        </Button>
        <Badge variant="semitransparent" className="absolute bottom-2 right-2">Zuschauer - {viewers?.toLocaleString('de-DE')}</Badge>
      </div>

      <div className='flex gap-3 items-center'>
        <img src={avatar} alt={channelName} className='w-10 h-10 object-cover aspect-square rounded-full' />
        <div className='flex flex-col grow'>
          <h4 className='font-semibold'>{title}</h4>
          <span className='font-medium text-secondary'>{channelName}</span>
        </div>
        <span className='font-medium text-muted'>{game}</span>
      </div>

    </div>
  );
}
