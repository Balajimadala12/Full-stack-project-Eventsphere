export default function EventCard({ event, onSelect }) {
    const badgeClass = `badge badge-${event.category.toLowerCase()}`;
    return (
        <div className="card">
            <div className="card-title">
                <h3>{event.name}</h3>
                <span className="badge">{event.category}</span>
            </div>
            
            <div className="card-meta">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ opacity: 0.7 }}>📅</span> {event.date} • {event.time}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ opacity: 0.7 }}>📍</span> {event.venue}
                </div>
            </div>

            <div className="card-price">
                <span style={{ fontSize: '1rem', verticalAlign: 'middle', opacity: 0.6, marginRight: '4px' }}>₹</span>
                {event.price}
            </div>

            <div className="ticket-info" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Remaining</span>
                <span style={{ 
                  fontWeight: 700, 
                  color: event.availableTickets < 10 ? '#ef4444' : 'var(--primary)' 
                }}>
                    {event.availableTickets} Tickets
                </span>
            </div>

            <button
                className="btn btn-primary"
                style={{ marginTop: '1.5rem' }}
                onClick={() => onSelect(event)}
                disabled={event.availableTickets === 0}
            >
                {event.availableTickets === 0 ? 'Sold Out' : 'Get Tickets'}
            </button>
        </div>
    );
}
