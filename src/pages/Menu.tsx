
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { 
  categories, 
  getMenuItemsByCategory,
  getCategoryById
} from '@/lib/data';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItem from '@/components/menu/MenuItem';
import MenuCategory from '@/components/menu/MenuCategory';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Menu = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [activeCategory, setActiveCategory] = useState(categoryId || '');
  
  useEffect(() => {
    if (categoryId) {
      setActiveCategory(categoryId);
    } else if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categoryId, activeCategory]);
  
  const selectedCategory = getCategoryById(activeCategory);
  const menuItems = getMenuItemsByCategory(activeCategory);
  
  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container-custom py-8">
          {categoryId ? (
            // Single category view
            <>
              <div className="mb-8">
                <Link to="/menu" className="inline-flex items-center text-gray-600 hover:text-euricom transition-colors">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Terug naar alle categorieën
                </Link>
                
                {selectedCategory && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">
                      {selectedCategory.name}
                    </h1>
                    {selectedCategory.description && (
                      <p className="text-gray-600 text-lg">
                        {selectedCategory.description}
                      </p>
                    )}
                  </motion.div>
                )}
              </div>
              
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {menuItems.map((item) => (
                  <motion.div key={item.id} variants={itemVariants}>
                    <MenuItem item={item} />
                  </motion.div>
                ))}
              </motion.div>
              
              {menuItems.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 mb-4">
                    Geen items gevonden in deze categorie
                  </p>
                  <Button asChild>
                    <Link to="/menu">Bekijk alle categorieën</Link>
                  </Button>
                </div>
              )}
            </>
          ) : (
            // Categories view
            <>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 text-center"
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Ons Menu
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Ontdek ons uitgebreide aanbod verse broodjes, salades, soepen en meer
                </p>
              </motion.div>
              
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {categories.map((category) => (
                  <motion.div key={category.id} variants={itemVariants}>
                    <MenuCategory category={category} />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;
