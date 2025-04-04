
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, User, Receipt, FileText, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LunchLocation, Order, MenuLocationItem } from '@/lib/types';
import ReceiptUploader from '@/components/lunch/ReceiptUploader';
import MenuUploader from '@/components/lunch/MenuUploader';
import { Button } from '@/components/ui/button';

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
  const [locations, setLocations] = useState(mockLocations);
  const [orders, setOrders] = useState(mockOrders);
  
  const getOrdersForLocation = (locationId: string) => {
    return orders.filter(order => order.locationId === locationId);
  };
  
  const handleReceiptProcessed = (locationId: string, processedOrders: Order[]) => {
    // Update orders with processed information (prices)
    setOrders(currentOrders => 
      currentOrders.map(order => {
        const processedOrder = processedOrders.find(po => po.id === order.id);
        return processedOrder ? { ...order, ...processedOrder } : order;
      })
    );
    
    // Update location with receipt information
    setLocations(currentLocations => 
      currentLocations.map(location => 
        location.id === locationId 
          ? {
              ...location,
              receipt: {
                imageUrl: 'receipt-placeholder.jpg',
                processed: true,
                totalAmount: processedOrders.reduce((sum, order) => sum + (order.amount || 0), 0),
                uploadedAt: new Date()
              }
            }
          : location
      )
    );
  };
  
  const handleMenuProcessed = (locationId: string, menuItems: MenuLocationItem[]) => {
    // Update location with menu items
    setLocations(currentLocations => 
      currentLocations.map(location => 
        location.id === locationId 
          ? { ...location, menuItems }
          : location
      )
    );
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
          
          {locations.length === 0 ? (
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
              {locations.map((location) => {
                const locationOrders = getOrdersForLocation(location.id);
                
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
                      
                      {/* Action buttons for uploaders */}
                      <div className="flex flex-wrap gap-3 mb-8">
                        <ReceiptUploader 
                          location={location}
                          orders={locationOrders}
                          onReceiptProcessed={(processedOrders) => 
                            handleReceiptProcessed(location.id, processedOrders)
                          }
                        />
                        
                        <MenuUploader 
                          location={location}
                          onMenuProcessed={(menuItems) => 
                            handleMenuProcessed(location.id, menuItems)
                          }
                        />
                      </div>
                      
                      {/* Menu items section (if available) */}
                      {location.menuItems && location.menuItems.length > 0 && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                          <h3 className="text-lg font-medium mb-3 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-euricom" />
                            Gescande menu items ({location.menuItems.length})
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {location.menuItems.map((item) => (
                              <div 
                                key={item.id}
                                className="bg-white border border-gray-200 rounded-full px-3 py-1 text-sm"
                              >
                                {item.name} {item.price ? `- €${item.price.toFixed(2)}` : ''}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Receipt information (if available) */}
                      {location.receipt && location.receipt.processed && (
                        <div className="mb-6 p-4 bg-euricom-light/10 rounded-lg">
                          <h3 className="text-lg font-medium mb-2 flex items-center">
                            <Receipt className="h-5 w-5 mr-2 text-euricom" />
                            Kasticket verwerkt
                          </h3>
                          <p className="text-sm text-gray-700">
                            Totaalbedrag: <span className="font-medium">€{location.receipt.totalAmount.toFixed(2)}</span>
                          </p>
                          <p className="text-sm text-gray-500">
                            Geüpload op {location.receipt.uploadedAt.toLocaleString()}
                          </p>
                        </div>
                      )}
                      
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
                            Andere bestellingen ({locationOrders.length})
                          </h3>
                          
                          {locationOrders.length === 0 ? (
                            <p className="text-gray-500 italic">Nog geen andere bestellingen</p>
                          ) : (
                            <div className="space-y-3">
                              {locationOrders.map(order => (
                                <div key={order.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                  <div>
                                    <p className="font-medium">{order.userName}</p>
                                    <p className="text-gray-700">{order.orderText}</p>
                                  </div>
                                  {order.amount && (
                                    <div className="text-right">
                                      <p className="font-medium">€{order.amount.toFixed(2)}</p>
                                      <p className="text-xs text-gray-500">
                                        {order.isPaid ? 'Betaald' : 'Nog te betalen'}
                                      </p>
                                    </div>
                                  )}
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
