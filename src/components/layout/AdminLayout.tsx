
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Calendar, MessageSquare, User, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-event" />
              <span className="text-xl font-bold">
                EventHub <span className="text-event">Admin</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NavLink to="/" className="text-sm text-gray-600 hover:text-event">
              Voir le site
            </NavLink>
            <Button
              variant="ghost"
              size="icon"
            >
              <User className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar for desktop */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:sticky top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 z-30 overflow-y-auto transition-transform duration-200 ease-in-out`}
        >
          <div className="py-6 px-4 space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 px-2">Événements</p>
              <div className="space-y-1">
                <NavLink
                  to="/admin"
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-2 py-2 text-sm rounded-md ${isActive ? 'bg-event-light text-event' : 'hover:bg-gray-100 text-gray-700'}`
                  }
                >
                  <Calendar className="h-4 w-4" />
                  <span>Tableau de bord</span>
                </NavLink>
                <NavLink
                  to="/admin/events"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-2 py-2 text-sm rounded-md ${isActive ? 'bg-event-light text-event' : 'hover:bg-gray-100 text-gray-700'}`
                  }
                >
                  <Calendar className="h-4 w-4" />
                  <span>Gestion des événements</span>
                </NavLink>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 px-2">Commentaires</p>
              <div className="space-y-1">
                <NavLink
                  to="/admin/comments"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-2 py-2 text-sm rounded-md ${isActive ? 'bg-event-light text-event' : 'hover:bg-gray-100 text-gray-700'}`
                  }
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Modération</span>
                </NavLink>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500 px-2">Paramètres</p>
              <div className="space-y-1">
                <NavLink
                  to="/admin/settings"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-2 py-2 text-sm rounded-md ${isActive ? 'bg-event-light text-event' : 'hover:bg-gray-100 text-gray-700'}`
                  }
                >
                  <Settings className="h-4 w-4" />
                  <span>Configuration</span>
                </NavLink>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
