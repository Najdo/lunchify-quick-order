
import React, { useState } from 'react';
import { PlusCircle, MinusCircle, ShoppingCart } from 'lucide-react';
import { MenuItem as MenuItemType } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface MenuItemProps {
  item: MenuItemType;
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, className }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    // Calculate price including options
    let totalPrice = item.price;
    
    const selectedOptionsList = item.options?.filter(option => 
      selectedOptions[option.id] && selectedOptions[option.id].length > 0
    ).map(option => {
      // Find selected choices and calculate additional price
      const choiceIds = selectedOptions[option.id] || [];
      
      // Add to total price
      choiceIds.forEach(choiceId => {
        const choice = option.choices.find(c => c.id === choiceId);
        if (choice) {
          totalPrice += choice.price;
        }
      });
      
      return {
        optionId: option.id,
        choiceIds: choiceIds
      };
    }) || [];
    
    addToCart({
      id: '', // Will be set in the context
      menuItemId: item.id,
      name: item.name,
      price: totalPrice,
      quantity,
      selectedOptions: selectedOptionsList
    });
    
    // Reset state
    setQuantity(1);
    setSelectedOptions({});
    setIsDialogOpen(false);
  };
  
  const handleOptionChange = (optionId: string, choiceId: string, maxSelections?: number) => {
    setSelectedOptions(prev => {
      const current = prev[optionId] || [];
      
      // Toggle selection
      if (current.includes(choiceId)) {
        return {
          ...prev,
          [optionId]: current.filter(id => id !== choiceId)
        };
      } else {
        // If max selections is defined and reached, remove the first item
        if (maxSelections && current.length >= maxSelections) {
          const newSelection = [...current.slice(1), choiceId];
          return { ...prev, [optionId]: newSelection };
        }
        return { ...prev, [optionId]: [...current, choiceId] };
      }
    });
  };
  
  const isOptionRequired = (optionId: string): boolean => {
    const option = item.options?.find(o => o.id === optionId);
    return !!option?.required;
  };
  
  const isAddToCartDisabled = (): boolean => {
    if (!item.options) return false;
    
    return item.options.some(option => {
      if (option.required) {
        return !selectedOptions[option.id] || selectedOptions[option.id].length === 0;
      }
      return false;
    });
  };
  
  return (
    <div className={cn("menu-card group", className)}>
      {item.image && (
        <div className="relative overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="menu-card-image transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {item.tags && item.tags.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {item.tags.map(tag => (
                <span 
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-lg">{item.name}</h3>
          <p className="font-semibold text-euricom">€{item.price.toFixed(2)}</p>
        </div>
        
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{item.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Bestellen
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-xl">{item.name}</DialogTitle>
              </DialogHeader>
              
              <div className="mt-4">
                <div className="aspect-[4/3] overflow-hidden rounded-md">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <p className="text-gray-600 mt-4">{item.description}</p>
                
                <Separator className="my-4" />
                
                {item.options && item.options.length > 0 && (
                  <div className="space-y-6">
                    {item.options.map(option => (
                      <div key={option.id} className="space-y-2">
                        <div className="flex justify-between">
                          <h4 className="font-medium">
                            {option.name}
                            {option.required && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </h4>
                          {option.maxSelections && (
                            <span className="text-xs text-gray-500">
                              Max {option.maxSelections}
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          {option.choices.map(choice => (
                            <div 
                              key={choice.id}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center">
                                <input 
                                  type="checkbox" 
                                  id={`${option.id}-${choice.id}`}
                                  className="rounded text-euricom focus:ring-euricom mr-2"
                                  checked={(selectedOptions[option.id] || []).includes(choice.id)}
                                  onChange={() => handleOptionChange(
                                    option.id, 
                                    choice.id,
                                    option.maxSelections
                                  )}
                                />
                                <label htmlFor={`${option.id}-${choice.id}`} className="text-sm">
                                  {choice.name}
                                </label>
                              </div>
                              
                              {choice.price > 0 && (
                                <span className="text-sm text-gray-500">
                                  + €{choice.price.toFixed(2)}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                <Separator className="my-4" />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                    <span className="text-center w-8">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setQuantity(q => q + 1)}
                    >
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={handleAddToCart}
                    disabled={isAddToCartDisabled()}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Toevoegen
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
