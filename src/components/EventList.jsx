import EventCard from './EventCard';

export default function EventList({ events, onSelectEvent }) {
    return (
        <div className="event-grid">
            {events.map((event, index) => (
                <div key={event.id} className={`fade-in stagger-${(index % 4) + 1}`}>
                    <EventCard event={event} onSelect={onSelectEvent} />
                </div>
            ))}
        </div>
    );
}
