
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LunchLocation, Order } from '@/lib/types';

// Mock data for demonstration purposes
// In a real application, this would come from a database
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

const LunchLocations = () => {
  const navigate = useNavigate();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LunchLocation | null>(null);
  const [newLocation, setNewLocation] = useState({
    name: '',
    menuUrl: '',
    myOrder: ''
  });
  const [newOrder, setNewOrder] = useState('');
  
  // Today's locations (in a real app, this would be filtered by date)
  const todaysLocations = mockLocations;
  
  const handleAddLocation = () => {
    // Validation
    if (!newLocation.name.trim()) {
      toast.error('Geef een naam op voor de locatie');
      return;
    }
    
    if (!newLocation.myOrder.trim()) {
      toast.error('Geef aan wat je gaat bestellen');
      return;
    }
    
    // In a real app, this would be an API call
    const createdLocation: LunchLocation = {
      id: Date.now().toString(),
      name: newLocation.name,
      menuUrl: newLocation.menuUrl,
      createdBy: 'Huidige Gebruiker', // Would be dynamic in real app
      createdAt: new Date(),
      myOrder: newLocation.myOrder
    };
    
    // Add to mock data
    mockLocations.push(createdLocation);
    
    toast.success('Lunchlocatie toegevoegd!');
    setIsAddDialogOpen(false);
    setNewLocation({ name: '', menuUrl: '', myOrder: '' });
  };
  
  const handlePlaceOrder = () => {
    if (!newOrder.trim() || !selectedLocation) {
      toast.error('Geef je bestelling op');
      return;
    }
    
    // In a real app, this would be an API call
    const order: Order = {
      id: Date.now().toString(),
      locationId: selectedLocation.id,
      userName: 'Huidige Gebruiker', // Would be dynamic in real app
      orderText: newOrder,
      createdAt: new Date()
    };
    
    // Add to mock data
    mockOrders.push(order);
    
    toast.success('Bestelling geplaatst!');
    setIsOrderDialogOpen(false);
    setNewOrder('');
  };
  
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold">
                Lunch Locaties voor Vandaag
              </h1>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-euricom hover:bg-euricom-dark"
              >
                <Plus className="mr-2 h-4 w-4" />
                Ik haal lunch op vandaag
              </Button>
            </div>
            
            <p className="text-gray-600 text-lg">
              Bekijk waar je collega's vandaag lunch halen of voeg zelf een nieuwe locatie toe
            </p>
          </motion.div>
          
          {todaysLocations.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium text-gray-600 mb-4">
                Er zijn nog geen lunchlocaties voor vandaag
              </h3>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-euricom hover:bg-euricom-dark"
              >
                <Plus className="mr-2 h-4 w-4" />
                Ik haal lunch op vandaag
              </Button>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-8"
            >
              {todaysLocations.map((location) => (
                <motion.div
                  key={location.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-semibold mb-1">{location.name}</h2>
                        <p className="text-sm text-gray-500">
                          Toegevoegd door {location.createdBy}
                        </p>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedLocation(location);
                          setIsOrderDialogOpen(true);
                        }}
                        className="text-euricom hover:text-euricom-dark hover:bg-euricom-light/30"
                      >
                        Bestelling doorgeven
                      </Button>
                    </div>
                    
                    {location.menuUrl && (
                      <a 
                        href={location.menuUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-euricom hover:text-euricom-dark mb-4 text-sm"
                      >
                        Menu bekijken <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    )}
                    
                    <div className="mt-6">
                      <h3 className="text-md font-medium mb-3">Bestellingen</h3>
                      
                      <div className="space-y-3 mb-4">
                        <div className="bg-euricom-light/20 p-3 rounded-md">
                          <p className="font-medium text-sm">{location.createdBy} (ophaler):</p>
                          <p className="text-gray-700">{location.myOrder}</p>
                        </div>
                        
                        {getOrdersForLocation(location.id).map(order => (
                          <div key={order.id} className="bg-gray-50 p-3 rounded-md">
                            <p className="font-medium text-sm">{order.userName}:</p>
                            <p className="text-gray-700">{order.orderText}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
      
      {/* Add Location Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ik haal lunch op vandaag</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="location-name" className="text-sm font-medium">
                Waar ga je lunch halen?
              </label>
              <Input
                id="location-name"
                value={newLocation.name}
                onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                placeholder="Bijv. Broodjeszaak Den Deli"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="menu-url" className="text-sm font-medium">
                Link naar menu (optioneel)
              </label>
              <Input
                id="menu-url"
                value={newLocation.menuUrl}
                onChange={(e) => setNewLocation({...newLocation, menuUrl: e.target.value})}
                placeholder="https://example.com/menu"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="my-order" className="text-sm font-medium">
                Wat ga jij bestellen?
              </label>
              <Textarea
                id="my-order"
                value={newLocation.myOrder}
                onChange={(e) => setNewLocation({...newLocation, myOrder: e.target.value})}
                placeholder="Beschrijf je bestelling"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddDialogOpen(false)}
            >
              Annuleren
            </Button>
            <Button 
              className="bg-euricom hover:bg-euricom-dark"
              onClick={handleAddLocation}
            >
              Toevoegen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Place Order Dialog */}
      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Bestelling doorgeven bij {selectedLocation?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {selectedLocation?.menuUrl && (
              <div>
                <a 
                  href={selectedLocation.menuUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-euricom hover:text-euricom-dark text-sm"
                >
                  Menu bekijken <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="order-text" className="text-sm font-medium">
                Jouw bestelling
              </label>
              <Textarea
                id="order-text"
                value={newOrder}
                onChange={(e) => setNewOrder(e.target.value)}
                placeholder="Beschrijf je bestelling gedetailleerd"
              />
            </div>
            
            {selectedLocation && getOrdersForLocation(selectedLocation.id).length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Andere bestellingen:
                </label>
                <div className="bg-gray-50 p-3 rounded-md max-h-32 overflow-y-auto space-y-2">
                  {selectedLocation && getOrdersForLocation(selectedLocation.id).map(order => (
                    <div key={order.id} className="text-sm">
                      <span className="font-medium">{order.userName}:</span> {order.orderText}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsOrderDialogOpen(false)}
            >
              Annuleren
            </Button>
            <Button 
              className="bg-euricom hover:bg-euricom-dark"
              onClick={handlePlaceOrder}
            >
              Bestelling plaatsen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default LunchLocations;
