export default function BookingConfirmation({ bookingDetails, onBookAnother }) {
    return (
        <div className="confirmation-card fade-in" style={{ padding: '4rem 2rem' }}>
            <div className="success-icon-container" style={{ width: '80px', height: '80px', margin: '0 auto 2.5rem', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', border: '2px solid rgba(34, 197, 94, 0.2)' }}>
                <div className="success-icon" style={{ fontSize: '2.5rem' }}>✓</div>
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Booking Confirmed!</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                Excellent choice, {bookingDetails.fullName}! Your tickets for <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{bookingDetails.eventName}</span> are secured.
            </p>

            <div className="booking-id-tag" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--secondary)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '0.75rem 1.5rem', borderRadius: '30px', fontWeight: 700, letterSpacing: '1px' }}>
                #{bookingDetails.bookingId}
            </div>

            <div className="receipt-details" style={{ background: 'rgba(15, 23, 42, 0.4)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', padding: '2rem', marginTop: '3rem' }}>
                <div className="receipt-row" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <span className="receipt-label" style={{ color: 'var(--text-muted)' }}>Location</span>
                    <span className="receipt-value" style={{ fontWeight: 600 }}>{bookingDetails.venue}</span>
                </div>
                <div className="receipt-row" style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                    <span className="receipt-label" style={{ color: 'var(--text-muted)' }}>Date</span>
                    <span className="receipt-value" style={{ fontWeight: 600 }}>{bookingDetails.date}</span>
                </div>
                <div className="receipt-row" style={{ marginBottom: '1.5rem' }}>
                    <span className="receipt-label" style={{ color: 'var(--text-muted)' }}>Quantity</span>
                    <span className="receipt-value" style={{ fontWeight: 600 }}>{bookingDetails.tickets} Tickets</span>
                </div>
                <div className="receipt-row" style={{ borderTop: '2px dashed var(--glass-border)', paddingTop: '1.5rem' }}>
                    <span className="receipt-label" style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>Total Paid</span>
                    <span className="receipt-value" style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.5rem' }}>₹{bookingDetails.totalAmount}</span>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '3.5rem' }}>
                <button
                    className="btn"
                    style={{ background: '#25D366', color: '#fff', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontWeight: 600 }}
                    onClick={() => {
                        const adminNumber = "8500131773";
                        const text = `Hi! I just booked a ticket for ${bookingDetails.eventName}. My Booking ID is ${bookingDetails.bookingId}.`;
                        window.open(`https://wa.me/${adminNumber}?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat with Admin
                </button>

                <button className="btn btn-primary" onClick={onBookAnother} style={{ padding: '1rem' }}>
                    Explore More Events
                </button>
            </div>
        </div>
    );
}
