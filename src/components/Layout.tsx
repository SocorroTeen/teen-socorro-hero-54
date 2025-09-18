
import React from 'react';
import Navigation from './Navigation';
import { useScrollToTop } from '../hooks/useScrollToTop';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Scroll para o topo quando o layout carrega
  useScrollToTop();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-20 lg:pt-24">
        {children}
      </main>
    </div>
  );
};

export default Layout;
