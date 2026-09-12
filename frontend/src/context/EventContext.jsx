import { createContext, useContext, useState } from "react";

const EventContext = createContext();

const initialEvents = [
  {
    id: 1,
    title: "Annual College Function",
    type: "College Event",
    description:
      "Annual college function for students and faculty members.",
    startDate: "2026-09-20",
    startTime: "10:00",
    endDate: "2026-09-20",
    endTime: "14:00",
    venue: "Main Auditorium",
    room: "",
    address: "",
    organizer: "Student Committee",
    contactNumber: "",
    email: "",
    capacity: 500,
    registrationRequired: true,
    registrationDeadline: "",
    status: "Scheduled",
    notes: "",
  },

  {
    id: 2,
    title: "JavaScript Workshop",
    type: "Workshop",
    description: "Practical JavaScript workshop for students.",
    startDate: "2026-09-22",
    startTime: "10:00",
    endDate: "2026-09-22",
    endTime: "13:00",
    venue: "Lab 1",
    room: "",
    address: "",
    organizer: "IT Department",
    contactNumber: "",
    email: "",
    capacity: 100,
    registrationRequired: true,
    registrationDeadline: "",
    status: "Pending",
    notes: "",
  },
];

export function EventProvider({ children }) {
  const [events, setEvents] = useState(initialEvents);

  // Add Event
  const addEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now(),
    };

    setEvents((currentEvents) => [
      ...currentEvents,
      newEvent,
    ]);

    return newEvent;
  };

  // Update Event
  const updateEvent = (id, updatedData) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === id
          ? { ...event, ...updatedData }
          : event
      )
    );
  };

  // Delete Event
  const deleteEvent = (id) => {
    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== id)
    );
  };

  return (
    <EventContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error(
      "useEvents must be used inside EventProvider"
    );
  }

  return context;
}