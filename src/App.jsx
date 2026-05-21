import { useState, useEffect } from 'react';
import Header from './components/Header';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import AdminPortal from './components/AdminPortal';
import Auth from './components/Auth';
import './App.css'; // Will be empty to avoid conflicts
import { auth, db } from './firebase';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { sendBookingEmail } from './utils/emailService';
import PaymentGateway from './components/PaymentGateway';
import ChatBot from './components/ChatBot';


// Hardcoded Mock Data
const initialEvents = [
  {
    id: 1,
    name: "TechFest 2026",
    organizer: "CSE Department",
    date: "2026-05-10",
    time: "10:00 AM",
    venue: "Main Auditorium, Block A",
    price: 199,
    availableTickets: 150,
    category: "Technical",
    description: "Annual technical festival with coding contests, hackathons, and robotics."
  },
  {
    id: 2,
    name: "AR Rahman Live Concert",
    organizer: "Music Club",
    date: "2026-05-18",
    time: "7:00 PM",
    venue: "Open Air Stadium",
    price: 999,
    availableTickets: 500,
    category: "Entertainment",
    description: "An unforgettable night of soulful music with AR Rahman."
  },
  {
    id: 3,
    name: "Bharatanatyam Showcase",
    organizer: "Cultural Committee",
    date: "2026-05-22",
    time: "5:30 PM",
    venue: "Seminar Hall, Block B",
    price: 299,
    availableTickets: 80,
    category: "Cultural",
    description: "A mesmerizing classical dance performance by award-winning artists."
  },
  {
    id: 4,
    name: "Spiritual Retreat & Meditation Tour",
    organizer: "Wellness Club",
    date: "2026-06-01",
    time: "6:00 AM",
    venue: "Rishikesh, Uttarakhand",
    price: 2499,
    availableTickets: 30,
    category: "Spiritual",
    description: "A 2-day spiritual journey with guided meditation, yoga, and nature walks."
  },
  {
    id: 5,
    name: "AI & ML Seminar 2026",
    organizer: "IT Department",
    date: "2026-05-28",
    time: "11:00 AM",
    venue: "Conference Room, Block C",
    price: 99,
    availableTickets: 60,
    category: "Technical",
    description: "Expert talks on the latest trends in Artificial Intelligence and Machine Learning."
  },
  {
    id: 6,
    name: "Cultural Night Extravaganza",
    organizer: "Student Council",
    date: "2026-06-10",
    time: "6:00 PM",
    venue: "College Grounds",
    price: 149,
    availableTickets: 200,
    category: "Cultural",
    description: "A grand evening of music, dance, skits, and fashion show by students."
  }
];

const initialUsers = [
  { id: 1, name: 'Main Admin', email: 'admin@aahvana.com', password: 'password123', isAdmin: true },
  { id: 2, name: 'Test User', email: 'user@aahvana.com', password: 'password123', isAdmin: false }
];

import ProgressStepper from './components/ProgressStepper';

function App() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [selectedEventId, setSelectedEventId] = useState(null);

  // 'list', 'details', 'form', 'payment', 'confirmation'
  const [bookingStage, setBookingStage] = useState('list');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isAdminView, setIsAdminView] = useState(false);

  // Fetch and seed events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsSnapshot = await getDocs(collection(db, "ticvedika_events"));
        if (eventsSnapshot.empty) {
          // Seed the database with initialEvents
          const newEvents = [];
          for (const ev of initialEvents) {
            await setDoc(doc(db, "ticvedika_events", String(ev.id)), ev);
            newEvents.push(ev);
          }
          setEvents(newEvents.sort((a, b) => a.id - b.id));
        } else {
          const fetchedEvents = eventsSnapshot.docs.map(doc => ({ ...doc.data(), id: Number(doc.id) }));
          setEvents(fetchedEvents.sort((a, b) => a.id - b.id));
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user data from Firestore
          const userDocRef = doc(db, 'ticvedika_users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setCurrentUser({ uid: user.uid, email: user.email, ...userData });
            if (userData.isAdmin) setIsAdminView(true);
          } else {
            setCurrentUser({ uid: user.uid, email: user.email, isAdmin: false });
          }
        } catch (error) {
          console.error("Firestore connection error when fetching user:", error);
          setCurrentUser({ uid: user.uid, email: user.email, isAdmin: false, error: "Database offline" });
        }
      } else {
        setCurrentUser(null);
        setIsAdminView(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch all users and bookings for Admin
  useEffect(() => {
    const fetchDataForAdmin = async () => {
      if (currentUser?.isAdmin) {
        try {
          const querySnapshot = await getDocs(collection(db, "ticvedika_users"));
          const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUsers(usersList);

          const bookingsSnapshot = await getDocs(collection(db, "ticvedika_bookings"));
          const bookingsList = bookingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setBookings(bookingsList);
        } catch (error) {
          console.error("Firestore connection error when fetching admin data:", error);
          setUsers([]);
          setBookings([]);
        }
      }
    };
    fetchDataForAdmin();
  }, [currentUser]);

  const selectedEvent = events.find(e => e.id === selectedEventId);

  const handleLogin = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const handleRegister = async (newUser) => {
    const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
    const user = userCredential.user;

    // Store extra user metadata in Firestore
    await setDoc(doc(db, "ticvedika_users", user.uid), {
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.email.toLowerCase() === 'admin@aahvana.com'
    });
  };

  const handleLogout = async () => {
    await signOut(auth);
    setSelectedEventId(null);
    setBookingStage('list');
  };

  const handleToggleAdmin = () => {
    setIsAdminView(!isAdminView);
  };

  const handleAddEvent = async (newEvent) => {
    const maxId = events.length > 0 ? Math.max(...events.map(e => e.id)) : 0;
    const newId = maxId + 1;
    const eventToSave = { ...newEvent, id: newId };
    
    try {
      await setDoc(doc(db, "ticvedika_events", String(newId)), eventToSave);
      setEvents([...events, eventToSave]);
    } catch(e) {
      console.error("Failed to add event to Firestore", e);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteDoc(doc(db, "ticvedika_events", String(id)));
      setEvents(events.filter(e => e.id !== id));
      if (selectedEventId === id) {
        setSelectedEventId(null);
        setBookingStage('list');
      }
    } catch(e) {
      console.error("Failed to delete event from Firestore", e);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEventId(event.id);
    setBookingStage('details');
  };

  const handleBackToList = () => {
    setSelectedEventId(null);
    setBookingStage('list');
  };

  const handleProceedToBook = () => {
    setBookingStage('form');
  };

  const handleBackToDetails = () => {
    setBookingStage('details');
  };

  const handleBookingFormSubmit = (details) => {
    setBookingDetails(details);
    setBookingStage('payment');
  };

  const finalizeBooking = async (utr) => {
    const details = { ...bookingDetails, paymentId: utr };
    const targetEvent = events.find(e => e.id === details.eventId);
    if (!targetEvent) return;

    try {
      const newAvailable = Math.max(0, targetEvent.availableTickets - details.tickets);

      // Update available tickets in Firestore
      await updateDoc(doc(db, "ticvedika_events", String(details.eventId)), {
        availableTickets: newAvailable
      });

      // Decrease available tickets in local state
      setEvents(prevEvents =>
        prevEvents.map(evt => {
          if (evt.id === details.eventId) {
            return {
              ...evt,
              availableTickets: newAvailable
            };
          }
          return evt;
        })
      );

      // Save Booking to Firestore permanently
      await addDoc(collection(db, "ticvedika_bookings"), {
        ...details,
        userId: currentUser?.uid || "guest",
        userEmail: currentUser?.email || "guest",
        timestamp: new Date().toISOString()
      });
    } catch (e) {
      console.error("Failed to save booking permanently", e);
    }

    // Set confirmation details
    setBookingDetails(details);
    setBookingStage('confirmation');

    // Send confirmation email
    if (selectedEvent && currentUser) {
      sendBookingEmail(details, selectedEvent, currentUser.email, currentUser.name);
    }
  };

  const handleBookAnother = () => {
    setSelectedEventId(null);
    setBookingDetails(null);
    setBookingStage('list');
  };

  return (
    <>
      <div className="bg-decor">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <Header
        currentUser={currentUser}
        isAdminView={isAdminView}
        onToggleAdmin={handleToggleAdmin}
        setBookingStage={setBookingStage}
        onLogout={handleLogout}
      />
      
      <main className="container">
        {!currentUser ? (
          <Auth onLogin={handleLogin} onRegister={handleRegister} />
        ) : isAdminView ? (
          <AdminPortal
            events={events}
            users={users}
            bookings={bookings}
            onAddEvent={handleAddEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        ) : (
          <>
            {/* Progress Stepper for non-list views */}
            {bookingStage !== 'list' && (
              <ProgressStepper stage={bookingStage} />
            )}

            {bookingStage === 'list' && (
              <div className="fade-in">
                <div style={{ marginBottom: '3rem' }}>
                  <h2 className="title-gradient" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
                    Discover Events
                  </h2>
                  <p style={{ color: 'var(--text-dim)', marginTop: '0.5rem', fontSize: '1.1rem' }}>
                    Experience the best cultural and technical festivals.
                  </p>
                </div>
                <EventList events={events} onSelectEvent={handleSelectEvent} />
              </div>
            )}

            {bookingStage === 'details' && selectedEvent && (
              <EventDetails
                event={selectedEvent}
                onBack={handleBackToList}
                onBook={handleProceedToBook}
              />
            )}

            {bookingStage === 'form' && selectedEvent && (
              <BookingForm
                currentUser={currentUser}
                event={selectedEvent}
                onBack={handleBackToDetails}
                onSuccess={handleBookingFormSubmit}
              />
            )}

            {bookingStage === 'payment' && (
              <PaymentGateway 
                details={bookingDetails} 
                onCancel={() => setBookingStage('form')} 
                onSuccess={finalizeBooking} 
              />
            )}

            {bookingStage === 'confirmation' && bookingDetails && (
              <BookingConfirmation
                bookingDetails={bookingDetails}
                onBookAnother={handleBookAnother}
              />
            )}
          </>
        )}
      </main>
      <ChatBot events={events} />
    </>
  );
}


export default App;
