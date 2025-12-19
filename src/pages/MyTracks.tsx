import { useState } from 'react';
import Header from '@/components/Header';
import TrackCard from '@/components/TrackCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const MyTracks = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const tracks = [
    {
      id: 1,
      title: 'Midnight Dreams',
      price: 15000,
      duration: '4:23',
      genre: 'Electronic',
      status: 'active' as const,
    },
    {
      id: 2,
      title: 'Summer Vibes',
      price: 12000,
      duration: '3:45',
      genre: 'Pop',
      status: 'active' as const,
    },
    {
      id: 3,
      title: 'Urban Rhythm',
      price: 18000,
      duration: '5:12',
      genre: 'Hip-Hop',
      status: 'sold' as const,
    },
    {
      id: 4,
      title: 'Acoustic Soul',
      price: 10000,
      duration: '3:30',
      genre: 'Acoustic',
      status: 'pending' as const,
    },
  ];

  const filteredTracks = tracks.filter((track) =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeTracks = filteredTracks.filter((t) => t.status === 'active');
  const soldTracks = filteredTracks.filter((t) => t.status === 'sold');
  const pendingTracks = filteredTracks.filter((t) => t.status === 'pending');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-12">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div>
              <h1 className="text-4xl font-bold">Мои треки</h1>
              <p className="text-muted-foreground mt-2">
                Управляйте своими треками и отслеживайте продажи
              </p>
            </div>
          </div>

          <div className="relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Поиск по названию трека..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">
                Все треки ({filteredTracks.length})
              </TabsTrigger>
              <TabsTrigger value="active">
                Активные ({activeTracks.length})
              </TabsTrigger>
              <TabsTrigger value="sold">
                Проданные ({soldTracks.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                На модерации ({pendingTracks.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {filteredTracks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredTracks.map((track) => (
                    <TrackCard key={track.id} {...track} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Music" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Треков не найдено</h3>
                  <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="active" className="space-y-6">
              {activeTracks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {activeTracks.map((track) => (
                    <TrackCard key={track.id} {...track} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Music" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Нет активных треков</h3>
                  <p className="text-muted-foreground">Загрузите новый трек для продажи</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="sold" className="space-y-6">
              {soldTracks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {soldTracks.map((track) => (
                    <TrackCard key={track.id} {...track} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="CircleCheckBig" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Пока нет продаж</h3>
                  <p className="text-muted-foreground">Ваши треки скоро будут проданы</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pending" className="space-y-6">
              {pendingTracks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {pendingTracks.map((track) => (
                    <TrackCard key={track.id} {...track} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Clock" size={64} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Нет треков на модерации</h3>
                  <p className="text-muted-foreground">Все треки прошли проверку</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MyTracks;
