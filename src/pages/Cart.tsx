
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderSummary from '@/components/order/OrderSummary';
import OrderButton from '@/components/ui/OrderButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cartItems, getCartTotal, placeOrder } = useCart();
  const [comments, setComments] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('asap');
  const [deliveryTime, setDeliveryTime] = useState('12:00');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();
  
  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      toast.error('Je bestelling is leeg. Voeg items toe om te bestellen.');
      return;
    }
    
    setIsPlacingOrder(true);
    
    try {
      const order = await placeOrder();
      
      // In a real app, you'd send the order details to a backend
      
      // Navigate to confirmation page
      navigate('/confirmation', { 
        state: { 
          orderSummary: order,
          deliveryOption,
          deliveryTime,
          comments
        } 
      });
      
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Er is een fout opgetreden bij het plaatsen van je bestelling. Probeer het later opnieuw.');
    } finally {
      setIsPlacingOrder(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container-custom py-8">
          <div className="mb-6">
            <Link to="/menu" className="inline-flex items-center text-gray-600 hover:text-euricom transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Terug naar menu
            </Link>
          </div>
          
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Jouw Bestelling
          </motion.h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-medium text-gray-700 mb-4">Je bestelling is leeg</h2>
              <p className="text-gray-500 mb-8">
                Voeg items toe aan je bestelling om door te gaan
              </p>
              <Button asChild>
                <Link to="/menu">Bekijk Menu</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <motion.div 
                className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <OrderSummary />
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Bezorgopties</h3>
                  
                  <RadioGroup 
                    value={deliveryOption}
                    onValueChange={setDeliveryOption}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="asap" id="asap" />
                      <Label htmlFor="asap" className="flex items-center cursor-pointer">
                        <Clock className="h-4 w-4 mr-2 text-euricom" />
                        Zo snel mogelijk
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="scheduled" id="scheduled" />
                      <Label htmlFor="scheduled" className="flex items-center cursor-pointer">
                        <Calendar className="h-4 w-4 mr-2 text-euricom" />
                        Op specifiek tijdstip
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {deliveryOption === 'scheduled' && (
                    <div className="mt-4">
                      <Label htmlFor="delivery-time">Gewenste bezorgtijd</Label>
                      <Input 
                        id="delivery-time"
                        type="time"
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        className="max-w-xs mt-1"
                      />
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <Label htmlFor="comments">Opmerkingen (optioneel)</Label>
                    <Textarea 
                      id="comments"
                      placeholder="Speciale verzoeken of dieetwensen..."
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit sticky top-24"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-lg font-medium mb-4">Bestelgegevens</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Subtotaal</span>
                    <span className="font-medium">€{getCartTotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Bezorgkosten</span>
                    <span className="font-medium">€0.00</span>
                  </div>
                  
                  <div className="flex justify-between py-2 text-lg">
                    <span className="font-medium">Totaal</span>
                    <span className="font-semibold">€{getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <OrderButton 
                    onClick={handlePlaceOrder}
                    loading={isPlacingOrder}
                    className="w-full"
                  >
                    Bestelling plaatsen
                  </OrderButton>
                  
                  <p className="text-gray-500 text-sm mt-4 text-center">
                    Bestellingen voor 10:00 worden dezelfde dag geleverd
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
