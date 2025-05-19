
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Event } from '@/types/event';

const formSchema = z.object({
  title: z.string().min(3, {
    message: 'Le titre doit comporter au moins 3 caractères',
  }),
  description: z.string().min(10, {
    message: 'La description doit comporter au moins 10 caractères',
  }),
  date: z.string().min(1, {
    message: 'La date est requise',
  }),
  location: z.string().min(2, {
    message: 'Le lieu doit comporter au moins 2 caractères',
  }),
  organizer: z.string().min(2, {
    message: 'Le nom de l\'organisateur est requis',
  }),
  imageUrl: z.string().url({ message: 'Doit être une URL valide' }).optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

interface EventFormProps {
  initialData?: Partial<Event>;
  onSubmit: (data: FormValues) => void;
  isSubmitting: boolean;
}

export const EventForm: React.FC<EventFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      date: initialData?.date ? new Date(initialData.date).toISOString().slice(0, 16) : '',
      location: initialData?.location || '',
      organizer: initialData?.organizer || '',
      imageUrl: initialData?.imageUrl || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre de l'événement</FormLabel>
              <FormControl>
                <Input placeholder="Conférence tech, Festival de musique, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Décrivez votre événement en détail..."
                  className="resize-none min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date et heure</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lieu</FormLabel>
                <FormControl>
                  <Input placeholder="Paris, France" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="organizer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organisateur</FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'organisateur" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (optionnel)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="bg-event hover:bg-event-dark">
            {isSubmitting ? 'Enregistrement...' : initialData?.id ? 'Mettre à jour' : 'Créer l\'événement'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
