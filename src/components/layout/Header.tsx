
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
  
  const cartCount = getCartCount();
  
  // Removed the navLinks array since we're removing the Menu link
  
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
        
        {/* Desktop Navigation - Removed the Menu links */}
        <nav className="hidden md:flex items-center">
          <Link to="/cart">
            <Button
              variant="outline"
              size="sm"
              className="relative border-gray-200 hover:bg-gray-100 hover:text-euricom"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span>Bestelling</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-euricom text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Link 
            to="/cart" 
            className="relative mr-4 text-gray-600 hover:text-euricom transition-colors"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-euricom text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-600 hover:text-euricom transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu - Removed the menu links here as well */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t animate-fade-in">
          <nav className="container-custom py-4 flex flex-col space-y-4">
            {/* No navigation links as they've been removed */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
