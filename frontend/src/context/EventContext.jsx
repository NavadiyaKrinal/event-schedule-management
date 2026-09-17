import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { useAuth } from "./AuthContext";

const EventContext = createContext();

const API_URL = "http://localhost:5000/api/events";

export function EventProvider({ children }) {
  const {
    token,
    loading: authLoading,
  } = useAuth();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const getAuthConfig = useCallback(() => {
    const savedToken =
      token || localStorage.getItem("token");

    return savedToken
      ? {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        }
      : {};
  }, [token]);


  const fetchEvents = useCallback(async () => {
    // Wait until authentication check is completed
    if (authLoading) {
      return;
    }

    // No logged-in user
    if (!token) {
      setEvents([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        API_URL,
        getAuthConfig()
      );

      setEvents(response.data.data || []);
    } catch (error) {
      console.error(
        "Failed to fetch events:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to fetch events"
      );
    } finally {
      setLoading(false);
    }
  }, [token, authLoading, getAuthConfig]);

  // Fetch events after authentication
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const addEvent = useCallback(
    async (eventData) => {
      try {
        setError(null);

        const response = await axios.post(
          API_URL,
          eventData,
          getAuthConfig()
        );

        const newEvent = response.data.data;

        setEvents((currentEvents) => [
          ...currentEvents,
          newEvent,
        ]);

        return newEvent;
      } catch (error) {
        console.error(
          "Failed to create event:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to create event"
        );

        throw error;
      }
    },
    [getAuthConfig]
  );


  const getEventById = useCallback(
    async (id) => {
      try {
        setError(null);

        const response = await axios.get(
          `${API_URL}/${id}`,
          getAuthConfig()
        );

        return response.data.data;
      } catch (error) {
        console.error(
          "Failed to fetch event:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to fetch event"
        );

        throw error;
      }
    },
    [getAuthConfig]
  );


  const updateEvent = useCallback(
    async (id, updatedData) => {
      try {
        setError(null);

        const response = await axios.put(
          `${API_URL}/${id}`,
          updatedData,
          getAuthConfig()
        );

        const updatedEvent =
          response.data.data;

        // Update event inside local state
        setEvents((currentEvents) =>
          currentEvents.map((event) =>
            String(event._id) === String(id)
              ? updatedEvent
              : event
          )
        );

        return updatedEvent;
      } catch (error) {
        console.error(
          "Failed to update event:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to update event"
        );

        throw error;
      }
    },
    [getAuthConfig]
  );


  const deleteEvent = useCallback(
    async (id) => {
      try {
        setError(null);

        await axios.delete(
          `${API_URL}/${id}`,
          getAuthConfig()
        );

        setEvents((currentEvents) =>
          currentEvents.filter(
            (event) =>
              String(event._id) !== String(id)
          )
        );
      } catch (error) {
        console.error(
          "Failed to delete event:",
          error
        );

        setError(
          error.response?.data?.message ||
            "Failed to delete event"
        );

        throw error;
      }
    },
    [getAuthConfig]
  );


  const refreshEvents = useCallback(async () => {
    await fetchEvents();
  }, [fetchEvents]);


  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        error,
        addEvent,
        getEventById,
        updateEvent,
        deleteEvent,
        refreshEvents,
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