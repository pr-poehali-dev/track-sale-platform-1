import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface TrackCardProps {
  title: string;
  price: number;
  duration?: string;
  status?: 'active' | 'sold' | 'pending';
  genre?: string;
  coverUrl?: string;
  onPlay?: () => void;
  onEdit?: () => void;
}

const TrackCard = ({
  title,
  price,
  duration = '3:45',
  status = 'active',
  genre = 'Electronic',
  coverUrl,
  onPlay,
  onEdit,
}: TrackCardProps) => {
  const statusConfig = {
    active: { label: 'Активен', className: 'bg-green-500/20 text-green-500' },
    sold: { label: 'Продан', className: 'bg-primary/20 text-primary' },
    pending: { label: 'На модерации', className: 'bg-yellow-500/20 text-yellow-500' },
  };

  return (
    <Card className="group overflow-hidden hover-gold">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {coverUrl ? (
          <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icon name="Music" size={64} className="text-muted-foreground opacity-50" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            size="icon"
            className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90"
            onClick={onPlay}
          >
            <Icon name="Play" size={32} />
          </Button>
        </div>
        <Badge className={`absolute top-2 right-2 ${statusConfig[status].className}`}>
          {statusConfig[status].label}
        </Badge>
      </div>

      <CardHeader className="space-y-1 pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          {onEdit && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onEdit}>
              <Icon name="MoreVertical" size={18} />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Icon name="Music" size={14} />
            {genre}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Clock" size={14} />
            {duration}
          </span>
        </div>
      </CardHeader>

      <CardFooter className="pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="text-2xl font-bold text-primary">{price.toLocaleString('ru-RU')} ₽</div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TrackCard;
