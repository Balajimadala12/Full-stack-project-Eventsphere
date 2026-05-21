import { useState } from 'react';

export default function AdminPortal({ events, users, bookings, onAddEvent, onDeleteEvent }) {
    const [activeTab, setActiveTab] = useState('events'); // 'events' | 'users'

    const [formData, setFormData] = useState({
        name: '',
        organizer: '',
        date: '',
        time: '',
        venue: '',
        price: '',
        availableTickets: '',
        category: 'Technical',
        description: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const validate = () => {
        let errors = {};
        if (!formData.name.trim()) errors.name = "Event name is required.";
        if (!formData.organizer.trim()) errors.organizer = "Organizer is required.";
        if (!formData.date.trim()) errors.date = "Date is required.";
        if (!formData.time.trim()) errors.time = "Time is required.";
        if (!formData.venue.trim()) errors.venue = "Venue is required.";

        if (formData.price === '' || Number(formData.price) < 0) {
            errors.price = "Valid price is required.";
        }

        if (formData.availableTickets === '' || Number(formData.availableTickets) < 1) {
            errors.availableTickets = "At least 1 ticket is required.";
        }

        if (!formData.description.trim()) errors.description = "Description is required.";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onAddEvent({
                ...formData,
                price: Number(formData.price),
                availableTickets: Number(formData.availableTickets)
            });
            // Reset form
            setFormData({
                name: '', organizer: '', date: '', time: '', venue: '',
                price: '', availableTickets: '', category: 'Technical', description: ''
            });
            setFormErrors({});
            alert('Event added successfully!');
        }
    };

    return (
        <div className="fade-in">
            <div style={{ marginBottom: '3rem', display: 'flex', gap: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.5rem', flexWrap: 'wrap' }}>
                <button
                    className={`btn ${activeTab === 'events' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ width: 'auto' }}
                    onClick={() => setActiveTab('events')}
                >
                    Manage Events
                </button>
                <button
                    className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ width: 'auto' }}
                    onClick={() => setActiveTab('users')}
                >
                    Registered Users
                </button>
                <button
                    className={`btn ${activeTab === 'bookings' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ width: 'auto' }}
                    onClick={() => setActiveTab('bookings')}
                >
                    All Bookings
                </button>
            </div>

            {activeTab === 'events' && (
                <div className="admin-grid" style={{ display: 'grid', gap: '3rem', gridTemplateColumns: '1fr', '@media (minWidth: 1024px)': { gridTemplateColumns: '1fr 1fr' } }}>

                    {/* Form to Add Event */}
                    <div className="card" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
                        <h2 style={{ marginBottom: '2rem', fontWeight: 800, fontSize: '1.75rem', color: 'var(--primary)' }}>Create Event</h2>
                        <form onSubmit={handleSubmit} noValidate>
                            {/* ... (form fields unchanged, they use global form-input styles) */}
                            <div className="form-group">
                                <label className="form-label">Event Name</label>
                                <input type="text" name="name" className={`form-input ${formErrors.name ? 'error' : ''}`} value={formData.name} onChange={handleChange} placeholder="e.g. Grand Music Fest" />
                                {formErrors.name && <span className="error-text">{formErrors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Organizer</label>
                                <input type="text" name="organizer" className={`form-input ${formErrors.organizer ? 'error' : ''}`} value={formData.organizer} onChange={handleChange} placeholder="Department/Club Name" />
                                {formErrors.organizer && <span className="error-text">{formErrors.organizer}</span>}
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label className="form-label">Date</label>
                                    <input type="date" name="date" className="form-input" value={formData.date} onChange={handleChange} />
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label className="form-label">Time</label>
                                    <input type="time" name="time" className="form-input" value={formData.time} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Venue</label>
                                <input type="text" name="venue" className="form-input" value={formData.venue} onChange={handleChange} placeholder="Location" />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label className="form-label">Price (₹)</label>
                                    <input type="number" name="price" className="form-input" value={formData.price} onChange={handleChange} />
                                </div>
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label className="form-label">Tickets</label>
                                    <input type="number" name="availableTickets" className="form-input" value={formData.availableTickets} onChange={handleChange} />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Publish Event</button>
                        </form>
                    </div>

                    {/* List of Existing Events */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <h2 style={{ fontWeight: 800, fontSize: '1.75rem', marginBottom: '0.5rem' }}>Active Events</h2>
                        {events.length === 0 ? (
                            <p style={{ color: 'var(--text-dim)' }}>No active events found.</p>
                        ) : (
                            events.map(event => (
                                <div key={event.id} className="card" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem' }}>
                                    <div>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>{event.name}</h4>
                                        <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                                            {event.date} • <span style={{ color: 'var(--primary)' }}>{event.availableTickets} left</span>
                                        </p>
                                    </div>
                                    <button
                                        className="btn"
                                        style={{ width: 'auto', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                                        onClick={() => {
                                            if (window.confirm(`Delete "${event.name}"?`)) onDeleteEvent(event.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'users' && (
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h2 style={{ marginBottom: '2rem', fontWeight: 800, textAlign: 'center', fontSize: '2rem' }}>Registered Users</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {users.map(user => (
                            <div key={user.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
                                <div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{user.name}</div>
                                    <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{user.email}</div>
                                </div>
                                <span style={{ 
                                    background: user.isAdmin ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255,255,255,0.05)', 
                                    color: user.isAdmin ? 'var(--secondary)' : 'var(--text-dim)', 
                                    padding: '0.25rem 0.75rem', 
                                    borderRadius: '4px', 
                                    fontSize: '0.7rem', 
                                    fontWeight: 700, 
                                    textTransform: 'uppercase',
                                    border: '1px solid currentColor'
                                }}>
                                    {user.isAdmin ? 'Admin' : 'User'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'bookings' && (
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{ marginBottom: '2rem', fontWeight: 800, textAlign: 'center', fontSize: '2rem' }}>All Bookings</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {bookings.map(booking => (
                            <div key={booking.bookingId} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>{booking.eventName}</div>
                                    <div style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>
                                        {booking.fullName} <span style={{ color: 'var(--text-muted)' }}>({booking.email})</span>
                                    </div>
                                    <div style={{ marginTop: '0.25rem', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                                        Tickets: {booking.tickets} • Paid: ₹{booking.totalAmount}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>ID: {booking.bookingId}</div>
                                    {booking.mobile && (
                                        <button 
                                            className="btn btn-secondary"
                                            style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem', color: '#22c55e', borderColor: 'rgba(34, 197, 94, 0.2)' }}
                                            onClick={() => {
                                                const text = `Hi ${booking.fullName}, your booking for ${booking.eventName} is confirmed!`;
                                                let phone = booking.mobile.replace(/\D/g, '');
                                                if (phone.length === 10) phone = '91' + phone;
                                                window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
                                            }}
                                        >
                                            WhatsApp
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
