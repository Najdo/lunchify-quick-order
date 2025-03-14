
import React from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { getMenuItemById } from '@/lib/data';

interface OrderSummaryProps {
  showControls?: boolean;
  className?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  showControls = true,
  className 
}) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className={`p-8 text-center ${className}`}>
        <h3 className="text-xl font-medium text-gray-600">Je bestelling is leeg</h3>
        <p className="text-gray-500 mt-2">Voeg items toe van het menu om te bestellen</p>
      </div>
    );
  }
  
  return (
    <div className={className}>
      <h2 className="text-xl font-semibold mb-4">Jouw bestelling</h2>
      
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => {
          const menuItem = getMenuItemById(item.menuItemId);
          
          return (
            <div 
              key={item.id} 
              className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-start">
                {menuItem?.image && (
                  <div className="w-16 h-16 rounded overflow-hidden mr-3 hidden sm:block">
                    <img 
                      src={menuItem.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <div className="text-sm text-gray-500 mt-1">
                    {item.selectedOptions?.map((option, index) => {
                      const menuItemOption = menuItem?.options?.find(o => o.id === option.optionId);
                      
                      if (!menuItemOption) return null;
                      
                      const selectedChoices = option.choiceIds
                        .map(choiceId => 
                          menuItemOption.choices.find(c => c.id === choiceId)?.name
                        )
                        .filter(Boolean);
                      
                      if (selectedChoices.length === 0) return null;
                      
                      return (
                        <div key={option.optionId} className="text-xs">
                          <span className="font-medium">{menuItemOption.name}:</span>{" "}
                          {selectedChoices.join(", ")}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <div className="font-medium">€{(item.price * item.quantity).toFixed(2)}</div>
                
                {showControls && (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline" 
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline" 
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost" 
                      size="sm"
                      className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Totaal</span>
          <span className="font-semibold text-lg">€{getCartTotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
