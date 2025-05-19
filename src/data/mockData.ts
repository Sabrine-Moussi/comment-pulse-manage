
import { Event, Comment } from '../types/event';

export const events: Event[] = [
  {
    id: '1',
    title: 'Conférence Tech 2025',
    description: 'Une conférence sur les dernières tendances technologiques et leur impact sur notre futur.',
    date: '2025-06-15T14:00:00',
    location: 'Paris, France',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1170&auto=format&fit=crop',
    organizer: 'Tech Innovation Labs',
    createdAt: '2025-01-10T09:00:00',
    updatedAt: '2025-01-10T09:00:00',
  },
  {
    id: '2',
    title: 'Festival de Musique Électronique',
    description: 'Un weekend complet de musique électronique avec des artistes internationaux.',
    date: '2025-07-20T18:00:00',
    location: 'Lyon, France',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1170&auto=format&fit=crop',
    organizer: 'ElectroSounds',
    createdAt: '2025-02-15T10:30:00',
    updatedAt: '2025-02-15T10:30:00',
  },
  {
    id: '3',
    title: 'Marathon de Paris',
    description: 'Course annuelle à travers les rues de Paris. Ouvert aux coureurs de tous niveaux.',
    date: '2025-04-05T08:00:00',
    location: 'Paris, France',
    imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1170&auto=format&fit=crop',
    organizer: 'Association Sportive de Paris',
    createdAt: '2025-01-05T11:00:00',
    updatedAt: '2025-01-05T11:00:00',
  },
];

export const comments: Comment[] = [
  {
    id: '101',
    eventId: '1',
    author: 'Marie Dupont',
    content: 'Je suis très enthousiaste pour cette conférence! Les sujets abordés semblent passionnants.',
    createdAt: '2025-02-10T14:30:00',
    approved: true,
  },
  {
    id: '102',
    eventId: '1',
    author: 'Thomas Martin',
    content: 'Est-ce que les présentations seront disponibles après la conférence?',
    createdAt: '2025-02-11T09:15:00',
    approved: true,
  },
  {
    id: '103',
    eventId: '2',
    author: 'Julie Leroy',
    content: 'J\'ai déjà mes billets! J\'ai hâte de voir DJ Electra en live!',
    createdAt: '2025-03-01T18:45:00',
    approved: true,
  },
  {
    id: '104',
    eventId: '3',
    author: 'Alexandre Petit',
    content: 'Est-ce qu\'il y aura des points de ravitaillement tout au long du parcours?',
    createdAt: '2025-02-20T10:00:00',
    approved: false,
  },
];
