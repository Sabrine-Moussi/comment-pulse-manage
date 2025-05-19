
import React, { useState, useEffect } from 'react';
import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import { EventCard } from '@/components/events/EventCard';
import { Event } from '@/types/event';
import { eventService } from '@/services/eventService';
import { Button } from '@/components/ui/button';
import { Search, Calendar, MessageSquare, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await eventService.getAllEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Erreur lors du chargement des événements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-event-dark to-event py-20 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Découvrez et gérez vos événements
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Créez, partagez et découvrez des événements exceptionnels. Une plateforme simple et puissante pour tous vos besoins événementiels.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-event hover:bg-gray-100 hover:text-event-dark text-lg px-8 py-6">
                  Créer un événement
                </Button>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-event text-lg px-8 py-6">
                  En savoir plus
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Events Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Événements à venir</h2>
                <p className="text-gray-600">Découvrez les meilleurs événements à ne pas manquer</p>
              </div>
              
              <div className="w-full md:w-1/3 mt-4 md:mt-0 relative">
                <Input
                  type="text"
                  placeholder="Rechercher un événement..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="animate-pulse">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                      <div className="h-48 bg-gray-200"></div>
                      <div className="p-6">
                        <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-4 w-1/3"></div>
                        <div className="h-16 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">
                  {searchTerm
                    ? `Aucun événement ne correspond à "${searchTerm}"`
                    : 'Aucun événement disponible pour le moment.'}
                </p>
              </div>
            )}
          </div>
        </section>
        
        {/* Feature Callout */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Une plateforme complète pour vos événements</h2>
                <p className="text-xl text-gray-600">
                  Tout ce dont vous avez besoin pour créer, gérer et faire connaître vos événements
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-event-light rounded-full p-4 inline-flex mb-4">
                    <Calendar className="h-8 w-8 text-event" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Gestion simple</h3>
                  <p className="text-gray-600">
                    Créez et modifiez facilement vos événements avec une interface intuitive
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-event-light rounded-full p-4 inline-flex mb-4">
                    <MessageSquare className="h-8 w-8 text-event" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Commentaires et retours</h3>
                  <p className="text-gray-600">
                    Interagissez avec les participants et recueillez leurs avis
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-event-light rounded-full p-4 inline-flex mb-4">
                    <Users className="h-8 w-8 text-event" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Administration facile</h3>
                  <p className="text-gray-600">
                    Un tableau de bord complet pour gérer tous vos événements et commentaires
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

