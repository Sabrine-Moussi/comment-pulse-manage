
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '@/services/eventService';
import { Event } from '@/types/event';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Edit, Trash, Plus, Search, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const EventsPage = () => {
  const navigate = useNavigate();
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
        toast.error('Une erreur est survenue lors du chargement des événements.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      try {
        await eventService.deleteEvent(id);
        setEvents(events.filter(event => event.id !== id));
        toast.success('Événement supprimé avec succès.');
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'événement:', error);
        toast.error('Une erreur est survenue lors de la suppression de l\'événement.');
      }
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestion des événements</h1>
        <Button 
          className="bg-event hover:bg-event-dark flex items-center gap-2"
          onClick={() => navigate('/admin/events/create')}
        >
          <Plus className="h-4 w-4" />
          <span>Créer un événement</span>
        </Button>
      </div>
      
      <div className="mb-6 relative">
        <Input
          type="text"
          placeholder="Rechercher un événement..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md pl-10"
        />
        <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {loading ? (
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-4"></div>
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="h-16 bg-gray-100 rounded mb-2"></div>
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="rounded-md border bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Lieu</TableHead>
                <TableHead>Organisateur</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>
                    {format(new Date(event.date), 'dd/MM/yyyy - HH:mm', { locale: fr })}
                  </TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>{event.organizer}</TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/admin/events/${event.id}`)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:inline-block">Modifier</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(event.id)} 
                      className="flex items-center gap-1 text-red-600 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only md:not-sr-only md:inline-block">Supprimer</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-white rounded-md border p-12">
          <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucun événement trouvé</h3>
          <p className="text-gray-500 text-center mb-6">
            {searchTerm
              ? `Aucun événement ne correspond à "${searchTerm}"`
              : 'Vous n\'avez pas encore créé d\'événements.'}
          </p>
          <Button 
            className="bg-event hover:bg-event-dark"
            onClick={() => navigate('/admin/events/create')}
          >
            Créer un événement
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
