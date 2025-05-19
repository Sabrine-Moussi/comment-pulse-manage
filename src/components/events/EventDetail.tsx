
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MapPin, Calendar, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Event, Comment } from '@/types/event';
import { eventService, commentService } from '@/services/eventService';
import { CommentForm } from '@/components/comments/CommentForm';
import { CommentList } from '@/components/comments/CommentList';

export const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        if (!id) return;
        
        const eventData = await eventService.getEventById(id);
        if (eventData) {
          setEvent(eventData);
          const commentsData = await commentService.getCommentsByEventId(id);
          setComments(commentsData.filter(comment => comment.approved));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  const handleCommentSubmit = async (newComment: Omit<Comment, 'id' | 'createdAt' | 'approved'>) => {
    try {
      await commentService.addComment(newComment);
      // Ne pas ajouter le commentaire à la liste car il nécessite une approbation
      // Nous afficherons un message à la place
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
      return false;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/5 mb-6"></div>
          <div className="h-24 bg-gray-200 rounded mb-6"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Événement non trouvé</h2>
        <p className="mb-6">L'événement que vous cherchez n'existe pas ou a été supprimé.</p>
        <Button onClick={() => navigate('/')}>Retour à la page d'accueil</Button>
      </div>
    );
  }

  const formattedDate = format(new Date(event.date), 'EEEE dd MMMM yyyy - HH:mm', { locale: fr });

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-event hover:text-event-dark mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        <span>Retour aux événements</span>
      </button>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <img
            src={event.imageUrl || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1170&auto=format&fit=crop'}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
          
          <div className="flex flex-col md:flex-row md:items-center text-gray-600 mb-6 space-y-2 md:space-y-0 md:space-x-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-event" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-event" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-event" />
              <span>Organisé par {event.organizer}</span>
            </div>
          </div>
          
          <div className="prose max-w-none mb-8">
            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Commentaires</h2>
        
        <CommentList comments={comments} />
        
        <Separator className="my-8" />
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold mb-4">Laisser un commentaire</h3>
          <CommentForm eventId={event.id} onSubmit={handleCommentSubmit} />
        </div>
      </div>
    </div>
  );
};
