
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  organizer: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  eventId: string;
  author: string;
  content: string;
  createdAt: string;
  approved: boolean;
}
