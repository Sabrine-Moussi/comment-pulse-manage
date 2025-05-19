
import React from 'react';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 text-center md:text-left mb-8 md:mb-0">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Calendar className="h-6 w-6 text-event" />
              <span className="text-xl font-bold text-gray-900">EventHub</span>
            </div>
            <p className="text-gray-600">
              Votre plateforme de gestion d'événements simple et puissante
            </p>
          </div>
          
          <div className="w-full md:w-1/4 text-center md:text-left mb-8 md:mb-0">
            <h5 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-event">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-600 hover:text-event">
                  Événements
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-event">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-event">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/4 text-center md:text-left mb-8 md:mb-0">
            <h5 className="text-lg font-semibold text-gray-900 mb-4">Administration</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/admin" className="text-gray-600 hover:text-event">
                  Tableau de bord
                </Link>
              </li>
              <li>
                <Link to="/admin/events" className="text-gray-600 hover:text-event">
                  Gérer les événements
                </Link>
              </li>
              <li>
                <Link to="/admin/comments" className="text-gray-600 hover:text-event">
                  Modérer les commentaires
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="text-lg font-semibold text-gray-900 mb-4">Contact</h5>
            <p className="text-gray-600 mb-2">info@eventhub.com</p>
            <p className="text-gray-600">+33 1 23 45 67 89</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-600">© 2025 EventHub. Tous droits réservés.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-event mr-4">
              Conditions d'utilisation
            </a>
            <a href="#" className="text-gray-600 hover:text-event">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
