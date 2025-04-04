
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LunchLocation, Order } from '@/lib/types';

// Mock data - in a real app this would come from an API
const mockLocations: LunchLocation[] = [
  {
    id: '1',
    name: 'Broodjeszaak Deli',
    menuUrl: 'https://example.com/deli-menu',
    createdBy: 'Jan Janssens',
    createdAt: new Date(),
    myOrder: 'Gezond broodje met extra kaas'
  }
];

const mockOrders: Order[] = [
  {
    id: '1',
    locationId: '1',
    userName: 'Piet Pieters',
    orderText: 'Club Sandwich zonder tomaat',
    createdAt: new Date()
  },
  {
    id: '2',
    locationId: '1',
    userName: 'Sophie Maes',
    orderText: 'Veggie wrap + soep van de dag',
    createdAt: new Date()
  }
];

const OrderOverview = () => {
  // In a real app, we'd filter today's locations and their corresponding orders
  const todaysLocations = mockLocations;
  
  const getOrdersForLocation = (locationId: string) => {
    return mockOrders.filter(order => order.locationId === locationId);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-8">
            <Link to="/locations" className="inline-flex items-center text-gray-600 hover:text-euricom transition-colors">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Terug naar locaties
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Bestellingsoverzicht
            </h1>
            <p className="text-gray-600 text-lg">
              Overzicht van alle bestellingen voor vandaag per locatie
            </p>
          </motion.div>
          
          {todaysLocations.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-600">
                Er zijn nog geen lunchlocaties voor vandaag
              </h3>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-8"
            >
              {todaysLocations.map((location) => {
                const orders = getOrdersForLocation(location.id);
                
                return (
                  <motion.div
                    key={location.id}
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                  >
                    <div className="p-6">
                      <h2 className="text-2xl font-semibold mb-2">{location.name}</h2>
                      <p className="text-sm text-gray-500 mb-6">
                        Toegevoegd door {location.createdBy} • {location.createdAt.toLocaleDateString()}
                      </p>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-medium mb-4 flex items-center">
                            <User className="mr-2 h-5 w-5 text-euricom" />
                            Ophaler bestelling
                          </h3>
                          <div className="bg-euricom-light/20 p-4 rounded-lg">
                            <p className="font-medium">{location.createdBy}</p>
                            <p className="text-gray-700">{location.myOrder}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-medium mb-4 flex items-center">
                            <ShoppingBag className="mr-2 h-5 w-5 text-euricom" />
                            Andere bestellingen ({orders.length})
                          </h3>
                          
                          {orders.length === 0 ? (
                            <p className="text-gray-500 italic">Nog geen andere bestellingen</p>
                          ) : (
                            <div className="space-y-3">
                              {orders.map(order => (
                                <div key={order.id} className="bg-gray-50 p-4 rounded-lg">
                                  <p className="font-medium">{order.userName}</p>
                                  <p className="text-gray-700">{order.orderText}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderOverview;
