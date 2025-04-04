
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Utensils, Award, MapPin, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/data';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuCategory from '@/components/menu/MenuCategory';
import AddLunchLocationForm from '@/components/lunch/AddLunchLocationForm';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1554306297-85e0c7caffd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="Lunch" 
              className="w-full h-full object-cover object-center opacity-10"
            />
          </div>
          
          <div className="container-custom relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
                  Bestel je <span className="text-euricom">lunch</span> eenvoudig op kantoor
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
                  Verse broodjes, salades en meer geleverd op Euricom kantoor zonder het pand te verlaten.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button asChild size="lg" className="bg-euricom hover:bg-euricom-dark">
                  <Link to="/locations">
                    Lunch locaties vandaag
                    <MapPin className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <AddLunchLocationForm triggerButton={
                  <Button size="lg" variant="outline">
                    Ik haal lunch
                    <Utensils className="ml-2 h-5 w-5" />
                  </Button>
                } />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Waarom Euricom Lunch?</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                De snelste en eenvoudigste manier om je lunch te bestellen op kantoor
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-euricom-light rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-euricom" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Tijdbesparend</h3>
                <p className="text-gray-600">
                  Geen tijd verspillen met naar buiten gaan of meerdere opties overwegen.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-euricom-light rounded-full flex items-center justify-center mb-4">
                  <Utensils className="h-6 w-6 text-euricom" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Verse Maaltijden</h3>
                <p className="text-gray-600">
                  Dagelijks vers bereide broodjes, salades en andere lekkernijen.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-euricom-light rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-euricom" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Kwaliteitsgarantie</h3>
                <p className="text-gray-600">
                  Geselecteerde leveranciers die voldoen aan onze hoge kwaliteitseisen.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Quick Actions */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Lunch vandaag</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Bekijk de lunchlocaties voor vandaag, plaats een bestelling of voeg een nieuwe locatie toe
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-euricom-light rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-euricom" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lunchlocaties bekijken</h3>
                <p className="text-gray-600 mb-4">
                  Bekijk waar je collega's vandaag lunch halen en bestel mee.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/locations">
                    Locaties bekijken
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-euricom-light rounded-full flex items-center justify-center mb-4">
                  <Utensils className="h-6 w-6 text-euricom" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Ik haal lunch</h3>
                <p className="text-gray-600 mb-4">
                  Geef aan dat je vandaag lunch haalt en waar je naartoe gaat.
                </p>
                <AddLunchLocationForm triggerButton={
                  <Button className="w-full bg-euricom hover:bg-euricom-dark">
                    Lunch toevoegen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                } />
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 bg-euricom-light rounded-full flex items-center justify-center mb-4">
                  <List className="h-6 w-6 text-euricom" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Bestellingsoverzicht</h3>
                <p className="text-gray-600 mb-4">
                  Bekijk alle bestellingen voor vandaag (voor ophalers).
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/orders">
                    Overzicht bekijken
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Menu Categories */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ontdek ons menu</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Van verse broodjes tot gezonde salades, we hebben voor elk wat wils
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <MenuCategory key={category.id} category={category} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link to="/menu">
                  Volledig Menu Bekijken
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-euricom text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Klaar om te bestellen?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-xl mx-auto">
              Bestel vóór 10:00 uur voor levering dezelfde dag op kantoor
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-euricom hover:bg-gray-100">
              <Link to="/locations">
                Bekijk lunchlocaties
                <MapPin className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Floating Add Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <AddLunchLocationForm />
      </div>
    </div>
  );
};

export default Index;
