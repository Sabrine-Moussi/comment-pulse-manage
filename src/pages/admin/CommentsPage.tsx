
import React, { useState, useEffect } from 'react';
import { commentService, eventService } from '@/services/eventService';
import { Comment, Event } from '@/types/event';
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
import { toast } from 'sonner';
import { CheckCircle, XCircle, Search, AlertTriangle, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CommentsPage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [events, setEvents] = useState<{ [key: string]: Event }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsData = await commentService.getAllComments();
        const eventsData = await eventService.getAllEvents();
        
        // Créer un mapping d'ID d'événement vers l'objet événement
        const eventsMap = eventsData.reduce((map, event) => {
          map[event.id] = event;
          return map;
        }, {} as { [key: string]: Event });
        
        setComments(commentsData);
        setEvents(eventsMap);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        toast.error('Une erreur est survenue lors du chargement des commentaires.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await commentService.moderateComment(id, true);
      setComments(comments.map(comment => 
        comment.id === id ? { ...comment, approved: true } : comment
      ));
      toast.success('Commentaire approuvé avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'approbation du commentaire:', error);
      toast.error('Une erreur est survenue lors de l\'approbation du commentaire.');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await commentService.moderateComment(id, false);
      setComments(comments.map(comment => 
        comment.id === id ? { ...comment, approved: false } : comment
      ));
      toast.success('Commentaire rejeté avec succès.');
    } catch (error) {
      console.error('Erreur lors du rejet du commentaire:', error);
      toast.error('Une erreur est survenue lors du rejet du commentaire.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      try {
        await commentService.deleteComment(id);
        setComments(comments.filter(comment => comment.id !== id));
        toast.success('Commentaire supprimé avec succès.');
      } catch (error) {
        console.error('Erreur lors de la suppression du commentaire:', error);
        toast.error('Une erreur est survenue lors de la suppression du commentaire.');
      }
    }
  };

  const filteredComments = comments.filter(comment =>
    (comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (events[comment.eventId]?.title || '').toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Modération des commentaires</h1>
      
      <div className="mb-6 relative">
        <Input
          type="text"
          placeholder="Rechercher un commentaire..."
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
      ) : filteredComments.length > 0 ? (
        <div className="rounded-md border bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Auteur</TableHead>
                <TableHead>Événement</TableHead>
                <TableHead>Commentaire</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComments.map((comment) => (
                <TableRow key={comment.id}>
                  <TableCell className="font-medium">{comment.author}</TableCell>
                  <TableCell>
                    {events[comment.eventId]?.title || <em className="text-gray-400">Événement supprimé</em>}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {comment.content}
                  </TableCell>
                  <TableCell>
                    {format(new Date(comment.createdAt), 'dd/MM/yyyy - HH:mm', { locale: fr })}
                  </TableCell>
                  <TableCell>
                    {comment.approved ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approuvé</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-50">En attente</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {!comment.approved && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleApprove(comment.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {comment.approved && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReject(comment.id)}
                          className="text-amber-600 hover:text-amber-700"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(comment.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-white rounded-md border p-12">
          <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucun commentaire trouvé</h3>
          <p className="text-gray-500 text-center">
            {searchTerm
              ? `Aucun commentaire ne correspond à "${searchTerm}"`
              : 'Il n\'y a pas de commentaires à modérer pour le moment.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentsPage;
