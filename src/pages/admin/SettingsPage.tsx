
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  siteName: z.string().min(2, {
    message: 'Le nom du site doit comporter au moins 2 caractères',
  }),
  siteDescription: z.string(),
  contactEmail: z.string().email({
    message: 'Doit être une adresse e-mail valide',
  }),
  autoApproveComments: z.boolean(),
  notificationEmail: z.string().email({
    message: 'Doit être une adresse e-mail valide',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const SettingsPage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: 'EventHub',
      siteDescription: 'Votre plateforme de gestion d\'événements',
      contactEmail: 'contact@eventhub.com',
      autoApproveComments: false,
      notificationEmail: 'admin@eventhub.com',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Paramètres mis à jour:', data);
    toast.success('Paramètres enregistrés avec succès.');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Paramètres</h1>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Configuration générale</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="siteName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du site</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Le nom de votre site qui sera affiché dans l'en-tête et le pied de page.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="siteDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description du site</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="resize-none min-h-[80px]"
                      />
                    </FormControl>
                    <FormDescription>
                      Une brève description de votre site pour les moteurs de recherche.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />
              
              <h3 className="text-lg font-semibold">Configuration des emails</h3>

              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email de contact</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Cet email sera affiché comme adresse de contact sur le site.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notificationEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email de notification</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Les notifications système seront envoyées à cette adresse.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />
              
              <h3 className="text-lg font-semibold">Commentaires</h3>

              <FormField
                control={form.control}
                name="autoApproveComments"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Approbation automatique</FormLabel>
                      <FormDescription>
                        Approuver automatiquement tous les commentaires sans modération.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" className="bg-event hover:bg-event-dark">
                  Enregistrer les paramètres
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
