export default function EventDetails({ event, onBack, onBook }) {
    const badgeClass = `badge badge-${event.category.toLowerCase()}`;

    return (
        <div className="event-details fade-in" style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: '3rem' }}>
            <button className="btn btn-secondary" onClick={onBack} style={{ marginBottom: '2rem' }}>
                &larr; Back to Events
            </button>

            <div className="event-details-header" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{event.name}</h2>
                <span className="badge" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--secondary)', borderColor: 'rgba(139, 92, 246, 0.3)' }}>{event.category}</span>
            </div>

            <div className="details-grid">
                <div className="details-main">
                    <p className="description" style={{ fontSize: '1.1rem', color: 'var(--text-dim)', lineHeight: '1.8' }}>{event.description}</p>

                    <div className="info-box" style={{ background: 'rgba(15, 23, 42, 0.4)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--glass-border)', marginTop: '2rem' }}>
                        <div className="info-item" style={{ marginBottom: '1.5rem' }}>
                            <span className="info-label" style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600 }}>Date &amp; Time</span>
                            <span className="info-value" style={{ fontSize: '1.25rem' }}>{event.date} • {event.time}</span>
                        </div>
                        <div className="info-item" style={{ marginBottom: '1.5rem' }}>
                            <span className="info-label" style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600 }}>Venue</span>
                            <span className="info-value" style={{ fontSize: '1.25rem' }}>{event.venue}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label" style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600 }}>Organized By</span>
                            <span className="info-value" style={{ fontSize: '1.25rem' }}>{event.organizer}</span>
                        </div>
                    </div>
                </div>

                <div className="details-sidebar">
                    <div className="card" style={{ padding: '2.5rem', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid var(--primary)' }}>
                        <div className="card-meta" style={{ marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Investment</span>
                        </div>
                        <div className="card-price" style={{ fontSize: '3.5rem', color: 'white' }}>₹{event.price}</div>

                        <div className="ticket-info" style={{ marginTop: '2rem', marginBottom: '2.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Status</span>
                            <span style={{ 
                              fontSize: '1.2rem',
                              fontWeight: 700, 
                              color: event.availableTickets < 10 ? '#ef4444' : '#22c55e' 
                            }}>
                                {event.availableTickets === 0 ? 'Sold Out' : `${event.availableTickets} Tickets Left`}
                            </span>
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1.25rem' }}
                            onClick={onBook}
                            disabled={event.availableTickets === 0}
                        >
                            {event.availableTickets === 0 ? 'Waitlist Only' : 'Reserve My Spot'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
