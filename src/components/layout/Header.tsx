
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 
          'bg-white/90 backdrop-blur-lg shadow-sm py-2' : 
          'bg-transparent py-4'
      )}
    >
      <div className="container-custom mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-all duration-300"
        >
          <span className={cn(
            "font-semibold text-xl transition-all duration-300",
            isScrolled ? "text-euricom" : "text-euricom"
          )}>
            Euricom Lunch
          </span>
        </Link>
        
        {/* Desktop Navigation - Empty since all navigation links were removed */}
        <nav className="hidden md:flex items-center">
          {/* Cart button removed */}
        </nav>
        
        {/* Mobile Menu Button - Only showing hamburger for mobile menu */}
        <div className="flex items-center md:hidden">
          {/* Cart link removed */}
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-600 hover:text-euricom transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu - Empty since all navigation links were removed */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t animate-fade-in">
          <nav className="container-custom py-4 flex flex-col space-y-4">
            {/* No navigation links */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
