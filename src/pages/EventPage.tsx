
import React from 'react';
import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import { EventDetail } from '@/components/events/EventDetail';

const EventPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow bg-gray-50">
        <EventDetail />
      </main>
      <Footer />
    </div>
  );
};

export default EventPage;
