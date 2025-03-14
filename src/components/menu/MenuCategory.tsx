
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

interface MenuCategoryProps {
  category: Category;
  className?: string;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ category, className }) => {
  return (
    <Link 
      to={`/menu/${category.id}`} 
      className={cn(
        "group relative block overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-lg",
        className
      )}
    >
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 z-10" />
      
      {category.image && (
        <div className="w-full h-52 overflow-hidden">
          <img 
            src={category.image} 
            alt={category.name} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <h3 className="text-white text-xl font-semibold mb-1 group-hover:translate-x-1 transition-transform duration-300">
          {category.name}
        </h3>
        
        {category.description && (
          <p className="text-white/80 text-sm">
            {category.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export default MenuCategory;
