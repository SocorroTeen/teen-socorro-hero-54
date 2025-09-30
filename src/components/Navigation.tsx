
import React, { useState } from 'react';
import { Home, Heart, Users, HelpCircle, BookOpen, Menu, X, Bot } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { to: '/', icon: Home, label: 'Início', emoji: '🏠' },
    { to: '/primeiros-socorros', icon: Heart, label: 'Primeiros Socorros', emoji: '🚑' },
    { to: '/socorro-ia', icon: Bot, label: 'Socorro IA', emoji: '🤖' },
    { to: '/simulador', icon: Users, label: 'Simulador', emoji: '🎮' },
    { to: '/quiz', icon: HelpCircle, label: 'Quiz', emoji: '❓' },
    { to: '/sobre', icon: BookOpen, label: 'Sobre', emoji: '📚' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b-2 border-trust-100">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/2f50555b-5295-4bcb-a1cd-5cf10c3acff2.png" 
              alt="Socorro Teen Logo" 
              className="w-10 h-10"
            />
            <span className="text-xl font-bold text-trust">Socorro Teen</span>
          </Link>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-trust hover:bg-trust-50 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-b">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 hover:bg-trust-50 transition-colors ${
                  isActive(item.to) ? 'bg-trust-100 border-r-4 border-trust' : ''
                }`}
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="font-medium text-gray-700">{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b-2 border-trust-100">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/2f50555b-5295-4bcb-a1cd-5cf10c3acff2.png" 
              alt="Socorro Teen Logo" 
              className="w-12 h-12 animate-pulse-glow"
            />
            <span className="text-2xl font-bold text-trust">Socorro Teen</span>
          </Link>

          <div className="flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 hover:bg-trust-50 ${
                  isActive(item.to) ? 'bg-trust text-white' : 'text-gray-700 hover:text-trust'
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
