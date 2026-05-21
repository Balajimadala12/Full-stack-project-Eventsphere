import { useState } from 'react';

export default function BookingForm({ currentUser, event, onBack, onSuccess }) {
    const [formData, setFormData] = useState({
        fullName: currentUser?.name || '',
        email: currentUser?.email || '',
        mobile: '',
        department: '',
        tickets: 1
    });
    const [formErrors, setFormErrors] = useState({});

    const validate = () => {
        let errors = {};
        if (!formData.fullName.trim()) errors.fullName = "Full Name is required.";

        if (!formData.email.trim()) {
            errors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Please enter a valid email address.";
        }

        if (!formData.mobile.trim()) {
            errors.mobile = "Mobile Number is required.";
        } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
            errors.mobile = "Please enter a valid 10-digit number.";
        }

        if (!formData.department.trim()) errors.department = "Department is required.";

        if (formData.tickets < 1) {
            errors.tickets = "Please enter at least 1 ticket.";
        } else if (formData.tickets > event.availableTickets) {
            errors.tickets = `Only ${event.availableTickets} tickets are available.`;
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'tickets' ? value : value
        }));

        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const ticketsValue = Number(formData.tickets);
            const totalAmount = ticketsValue * event.price;
            const bookingId = `BKG-${Date.now().toString().slice(-6)}`;
            onSuccess({
                ...formData,
                tickets: ticketsValue,
                eventId: event.id,
                eventName: event.name,
                price: event.price,
                totalAmount,
                bookingId,
                date: event.date,
                time: event.time,
                venue: event.venue
            });
        }
    };

    const handleReset = () => {
        setFormData({ fullName: '', email: '', mobile: '', department: '', tickets: 1 });
        setFormErrors({});
    };

    return (
        <div className="form-card fade-in" style={{ padding: '3.5rem' }}>
            <button className="btn btn-secondary" onClick={onBack} style={{ marginBottom: '2rem' }}>
                &larr; Back to Details
            </button>

            <div className="form-header" style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Book Tickets</h2>
                <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>for {event.name}</p>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Availability:</span>
                    <span style={{ 
                        background: event.availableTickets < 10 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                        color: event.availableTickets < 10 ? '#ef4444' : '#22c55e',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        border: '1px solid currentColor'
                    }}>
                        {event.availableTickets} left
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        className={`form-input ${formErrors.fullName ? 'error' : ''}`}
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                    />
                    {formErrors.fullName && <span className="error-text">{formErrors.fullName}</span>}
                </div>

                <div className="form-group">
                    <label className="form-label">Email ID</label>
                    <input
                        type="email"
                        name="email"
                        className={`form-input ${formErrors.email ? 'error' : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                    />
                    {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <div className="form-group" style={{ flex: 2 }}>
                        <label className="form-label">Mobile Number</label>
                        <input
                            type="tel"
                            name="mobile"
                            className={`form-input ${formErrors.mobile ? 'error' : ''}`}
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="9876543210"
                            maxLength="10"
                        />
                        {formErrors.mobile && <span className="error-text">{formErrors.mobile}</span>}
                    </div>

                    <div className="form-group" style={{ flex: 1 }}>
                        <label className="form-label">Tickets</label>
                        <input
                            type="number"
                            name="tickets"
                            min="1"
                            max={event.availableTickets}
                            className={`form-input ${formErrors.tickets ? 'error' : ''}`}
                            value={formData.tickets}
                            onChange={handleChange}
                        />
                        {formErrors.tickets && <span className="error-text">{formErrors.tickets}</span>}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Department / College</label>
                    <input
                        type="text"
                        name="department"
                        className={`form-input ${formErrors.department ? 'error' : ''}`}
                        value={formData.department}
                        onChange={handleChange}
                        placeholder="Computer Science"
                    />
                    {formErrors.department && <span className="error-text">{formErrors.department}</span>}
                </div>

                <div style={{ 
                    background: 'rgba(15, 23, 42, 0.4)', 
                    padding: '1.5rem', 
                    borderRadius: 'var(--radius-md)', 
                    border: '1px solid var(--glass-border)',
                    marginTop: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span style={{ color: 'var(--text-dim)' }}>Total Amount</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                        ₹{Number(formData.tickets) > 0 ? (Number(formData.tickets) * event.price) : 0}
                    </span>
                </div>

                <div className="form-actions" style={{ marginTop: '3rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 2, padding: '1rem' }}>
                        Confirm & Pay
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                        Clear
                    </button>
                </div>
            </form>
        </div>
    );
}
