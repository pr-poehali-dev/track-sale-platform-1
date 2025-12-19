import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Главная', icon: 'Home' },
    { path: '/sell', label: 'Продажа', icon: 'Upload' },
    { path: '/my-tracks', label: 'Мои треки', icon: 'Music' },
    { path: '/balance', label: 'Баланс', icon: 'Wallet' },
    { path: '/history', label: 'История', icon: 'History' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <Icon name="Music" size={24} className="text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent gold-gradient">
            TrackMarket
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={location.pathname === item.path ? 'default' : 'ghost'}
                className="gap-2"
              >
                <Icon name={item.icon as any} size={18} />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <Link to="/profile">
          <Avatar className="hover:ring-2 ring-primary transition-all cursor-pointer">
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              АН
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
};

export default Header;
