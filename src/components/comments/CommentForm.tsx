
import React, { useState } from 'react';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Comment } from '@/types/event';
import { toast } from 'sonner';

const formSchema = z.object({
  author: z.string().min(2, {
    message: 'Le nom doit comporter au moins 2 caractères',
  }),
  content: z.string().min(5, {
    message: 'Le commentaire doit comporter au moins 5 caractères',
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface CommentFormProps {
  eventId: string;
  onSubmit: (data: Omit<Comment, 'id' | 'createdAt' | 'approved'>) => Promise<boolean>;
}

export const CommentForm: React.FC<CommentFormProps> = ({ eventId, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: '',
      content: '',
    },
  });

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const success = await onSubmit({
        eventId,
        author: data.author,
        content: data.content,
      });
      
      if (success) {
        setSubmitted(true);
        form.reset();
        toast.success('Commentaire envoyé avec succès et en attente de modération.');
      } else {
        toast.error('Une erreur s\'est produite. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du commentaire:', error);
      toast.error('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Alert className="bg-green-50 text-green-800 border-green-200">
        <AlertDescription className="py-2">
          Votre commentaire a bien été reçu et sera affiché après validation par un modérateur. Merci !
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Votre nom</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Votre commentaire</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Partagez votre opinion sur cet événement..."
                  className="resize-none min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="bg-event hover:bg-event-dark">
          {isSubmitting ? 'Envoi...' : 'Publier le commentaire'}
        </Button>
      </form>
    </Form>
  );
};
