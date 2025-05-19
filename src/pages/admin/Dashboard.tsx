
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { eventService, commentService } from '@/services/eventService';
import { Event, Comment } from '@/types/event';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, CheckCircle, XCircle, Plus } from 'lucide-react';

const Dashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await eventService.getAllEvents();
        const commentsData = await commentService.getAllComments();
        setEvents(eventsData);
        setComments(commentsData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Données pour le graphique des commentaires
  const approvedComments = comments.filter(comment => comment.approved).length;
  const pendingComments = comments.filter(comment => !comment.approved).length;
  const commentChartData = [
    { name: 'Approuvés', value: approvedComments },
    { name: 'En attente', value: pendingComments },
  ];
  const COLORS = ['#8B5CF6', '#D6BCFA'];

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <Link to="/admin/events/create">
          <Button className="bg-event hover:bg-event-dark flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Créer un événement</span>
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="bg-white rounded-lg h-40 p-6"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total des événements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{events.length}</div>
                  <Calendar className="h-8 w-8 text-event" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Commentaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{comments.length}</div>
                  <MessageSquare className="h-8 w-8 text-event" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Commentaires en attente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold">{pendingComments}</div>
                  <XCircle className={`h-8 w-8 ${pendingComments > 0 ? 'text-amber-500' : 'text-green-500'}`} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Derniers événements</CardTitle>
              </CardHeader>
              <CardContent>
                {events.length > 0 ? (
                  <ul className="space-y-4">
                    {events.slice(0, 5).map((event) => (
                      <li key={event.id} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <Link to={`/admin/events/${event.id}`}>
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center py-4 text-gray-500">Aucun événement disponible</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>État des commentaires</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {comments.length > 0 ? (
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={commentChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {commentChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center space-x-6 mt-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-event mr-2"></div>
                        <span className="text-sm">Approuvés ({approvedComments})</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-event-light mr-2"></div>
                        <span className="text-sm">En attente ({pendingComments})</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-center py-4 text-gray-500">Aucun commentaire disponible</p>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
