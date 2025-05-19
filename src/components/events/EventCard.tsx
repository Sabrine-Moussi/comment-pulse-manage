
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MapPin, Calendar } from 'lucide-react';
import { Event } from '@/types/event';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formattedDate = format(new Date(event.date), 'dd MMMM yyyy - HH:mm', { locale: fr });

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={event.imageUrl || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1170&auto=format&fit=crop'}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{event.title}</h3>
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center text-gray-500 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{event.location}</span>
        </div>
        <p className="mt-4 text-gray-600 line-clamp-2">{event.description}</p>
      </CardContent>
      <CardFooter className="border-t bg-gray-50 flex justify-between items-center py-3">
        <p className="text-sm text-gray-500">Par {event.organizer}</p>
        <Link to={`/events/${event.id}`}>
          <Button variant="default" className="bg-event hover:bg-event-dark">
            Voir détails
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
