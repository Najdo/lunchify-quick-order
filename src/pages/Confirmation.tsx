
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OrderSummary as OrderSummaryType } from '@/lib/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderSummary from '@/components/order/OrderSummary';
import { motion } from 'framer-motion';

interface LocationState {
  orderSummary?: OrderSummaryType;
  deliveryOption?: string;
  deliveryTime?: string;
  comments?: string;
}

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  
  // If no order summary is present, redirect to home
  useEffect(() => {
    if (!state || !state.orderSummary) {
      navigate('/');
    }
  }, [state, navigate]);
  
  if (!state || !state.orderSummary) {
    return null;
  }
  
  const { orderSummary, deliveryOption, deliveryTime, comments } = state;
  
  // Format order date
  const formattedDate = new Intl.DateTimeFormat('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(orderSummary.orderDate));
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container-custom py-8">
          <motion.div 
            className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-euricom text-white p-8 text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Bestelling geplaatst!</h1>
              <p className="text-xl opacity-90">
                Je lunch is onderweg
              </p>
            </div>
            
            <div className="p-8">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Besteldetails</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 text-sm">Besteldatum</p>
                    <p className="font-medium">{formattedDate}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 text-sm">Status</p>
                    <p className="font-medium">
                      <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Bevestigd
                      </span>
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600 text-sm">Bezorging</p>
                    <p className="font-medium flex items-center">
                      {deliveryOption === 'asap' ? (
                        <>
                          <Clock className="h-4 w-4 mr-1 text-euricom" />
                          Zo snel mogelijk
                        </>
                      ) : (
                        <>
                          <Calendar className="h-4 w-4 mr-1 text-euricom" />
                          Om {deliveryTime}
                        </>
                      )}
                    </p>
                  </div>
                  
                  {comments && (
                    <div className="md:col-span-2">
                      <p className="text-gray-600 text-sm">Opmerkingen</p>
                      <p className="font-medium">{comments}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-8 pb-8 border-b border-gray-100">
                <OrderSummary showControls={false} />
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  Bedankt voor je bestelling. Je kunt de status van je bestelling op deze pagina volgen.
                </p>
                
                <Button asChild>
                  <Link to="/menu">
                    Terug naar menu
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Confirmation;
