
import { events, comments } from '../data/mockData';
import { Event, Comment } from '../types/event';

// Service pour gérer les événements
export const eventService = {
  // Récupérer tous les événements
  getAllEvents: (): Promise<Event[]> => {
    return Promise.resolve(events);
  },

  // Récupérer un événement par son ID
  getEventById: (id: string): Promise<Event | undefined> => {
    const event = events.find(event => event.id === id);
    return Promise.resolve(event);
  },

  // Créer un nouvel événement
  createEvent: (eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> => {
    const newEvent: Event = {
      ...eventData,
      id: `${events.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    events.push(newEvent);
    return Promise.resolve(newEvent);
  },

  // Mettre à jour un événement
  updateEvent: (id: string, eventData: Partial<Event>): Promise<Event | undefined> => {
    const index = events.findIndex(event => event.id === id);
    if (index === -1) {
      return Promise.resolve(undefined);
    }
    
    const updatedEvent = {
      ...events[index],
      ...eventData,
      updatedAt: new Date().toISOString(),
    };
    events[index] = updatedEvent;
    return Promise.resolve(updatedEvent);
  },

  // Supprimer un événement
  deleteEvent: (id: string): Promise<boolean> => {
    const index = events.findIndex(event => event.id === id);
    if (index === -1) {
      return Promise.resolve(false);
    }
    events.splice(index, 1);
    return Promise.resolve(true);
  },
};

// Service pour gérer les commentaires
export const commentService = {
  // Récupérer tous les commentaires d'un événement
  getCommentsByEventId: (eventId: string): Promise<Comment[]> => {
    const eventComments = comments.filter(comment => comment.eventId === eventId);
    return Promise.resolve(eventComments);
  },

  // Récupérer tous les commentaires (pour l'admin)
  getAllComments: (): Promise<Comment[]> => {
    return Promise.resolve(comments);
  },

  // Ajouter un commentaire
  addComment: (commentData: Omit<Comment, 'id' | 'createdAt' | 'approved'>): Promise<Comment> => {
    const newComment: Comment = {
      ...commentData,
      id: `${comments.length + 101}`,
      createdAt: new Date().toISOString(),
      approved: false, // Par défaut, les commentaires nécessitent une approbation
    };
    comments.push(newComment);
    return Promise.resolve(newComment);
  },

  // Approuver ou rejeter un commentaire
  moderateComment: (id: string, approved: boolean): Promise<Comment | undefined> => {
    const index = comments.findIndex(comment => comment.id === id);
    if (index === -1) {
      return Promise.resolve(undefined);
    }
    
    comments[index].approved = approved;
    return Promise.resolve(comments[index]);
  },

  // Supprimer un commentaire
  deleteComment: (id: string): Promise<boolean> => {
    const index = comments.findIndex(comment => comment.id === id);
    if (index === -1) {
      return Promise.resolve(false);
    }
    comments.splice(index, 1);
    return Promise.resolve(true);
  },
};
