
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventService } from '@/services/eventService';
import { Event } from '@/types/event';
import { EventForm as EventFormComponent } from '@/components/events/EventForm';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const EventFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(!!id);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isEditMode = !!id;

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        try {
          const eventData = await eventService.getEventById(id);
          setEvent(eventData);
        } catch (error) {
          console.error('Erreur lors du chargement de l\'événement:', error);
          toast.error('Une erreur est survenue lors du chargement de l\'événement.');
        } finally {
          setLoading(false);
        }
      }
    };

    if (isEditMode) {
      fetchEvent();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      if (isEditMode && event) {
        await eventService.updateEvent(id, formData);
        toast.success('Événement mis à jour avec succès.');
      } else {
        await eventService.createEvent(formData);
        toast.success('Événement créé avec succès.');
      }
      navigate('/admin/events');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'événement:', error);
      toast.error('Une erreur est survenue lors de l\'enregistrement de l\'événement.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded-md w-1/3 mb-8"></div>
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded-md"></div>
          <div className="h-24 bg-gray-200 rounded-md"></div>
          <div className="h-12 bg-gray-200 rounded-md"></div>
          <div className="h-12 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2 pl-2 text-gray-600 hover:text-gray-900"
        onClick={() => navigate('/admin/events')}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Retour aux événements</span>
      </Button>
      
      <h1 className="text-3xl font-bold mb-8">
        {isEditMode ? 'Modifier l\'événement' : 'Créer un nouvel événement'}
      </h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <EventFormComponent
          initialData={event}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EventFormPage;
