
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-10 mt-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Euricom Lunch</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              De gemakkelijkste manier om je lunch te bestellen bij Euricom. 
              Verse broodjes, salades, soepen en meer, direct bezorgd op kantoor.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Snelle Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-euricom text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-600 hover:text-euricom text-sm transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-euricom text-sm transition-colors">
                  Bestelling
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Bestelinfo</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Bestellingen voor 10:00 uur worden dezelfde dag bezorgd. 
              Voor vragen over je bestelling neem contact op met de receptie.
            </p>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Euricom. Alle rechten voorbehouden.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-euricom text-sm transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-euricom text-sm transition-colors">
              Voorwaarden
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
