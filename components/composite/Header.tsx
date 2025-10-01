
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import { LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, mocaId, logout } = useAuthStore();

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'text-white bg-white/5' : 'text-gray-400 hover:text-white'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-lg border-b border-white/10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6"/>
              </svg>
              <span className="font-bold text-xl font-display text-white">VeriChat</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <NavLink to="/protocol" className={navLinkClasses}>Protocol</NavLink>
                <NavLink to="/playground" className={navLinkClasses}>Playground</NavLink>
                <NavLink to="/admin" className={navLinkClasses}>Admin</NavLink>
                <NavLink to="/docs" className={navLinkClasses}>Docs</NavLink>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated && mocaId ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Avatar src={mocaId.avatarUrl} alt={mocaId.id} size="sm" />
                  <span className="text-sm font-medium text-white">{mocaId.displayName}</span>
                </div>
                <Button variant="subtle" size="sm" onClick={logout}><LogOut size={16}/></Button>
              </div>
            ) : (
              <Link to="/playground">
                <Button variant="primary" size="sm">Open Playground</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;