
import React from 'react';
import { Comment } from '@/types/event';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-500 text-center py-4">
          Aucun commentaire pour cet événement. Soyez le premier à commenter !
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Card key={comment.id} className="bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-event-light">
                  <AvatarFallback className="text-event">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{comment.author}</CardTitle>
                  <p className="text-xs text-gray-500">
                    {format(new Date(comment.createdAt), 'dd MMM yyyy à HH:mm', { locale: fr })}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-line">{comment.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
