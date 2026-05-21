import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

// ==========================================
// PAYMENT CONFIGURATION
// ==========================================
// IMPORTANT: Replace these with your actual UPI details
const PAYEE_VPA = 'renuka.madala@ibl'; // e.g. 9876543210@ybl
const PAYEE_NAME = 'Renuka Madala';

export default function PaymentGateway({ details, onCancel, onSuccess }) {
    const [utr, setUtr] = useState('');
    const [error, setError] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    // Generate UPI URI: upi://pay?pa=VPA&pn=NAME&am=AMOUNT&cu=INR&tn=NOTE
    const upiUri = `upi://pay?pa=${PAYEE_VPA}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${details.totalAmount.toFixed(2)}&cu=INR&tn=${encodeURIComponent('Booking for ' + details.eventName)}`;

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate exactly 12 digits for UPI UTR
        if (!/^\d{12}$/.test(utr)) {
            setError('UPI Transaction ID must be exactly 12 digits.');
            return;
        }

        setError('');
        setIsVerifying(true);

        // Simulate a secure network verification
        setTimeout(() => {
            setIsVerifying(false);
            // Send the UTR up to App.jsx to save it
            onSuccess(utr);
        }, 2000);
    };

    return (
        <div className="card fade-in" style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Complete Your Payment</h2>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                You are paying <strong style={{ color: '#fff' }}>₹{details.totalAmount}</strong> for {details.eventName}.
            </p>

            <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', display: 'inline-block', marginBottom: '1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                <QRCodeCanvas
                    value={upiUri}
                    size={200}
                    level="H"
                    includeMargin={false}
                />
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                1. Open PhonePe, GPay, or Paytm.<br />
                2. Scan the QR code above (Amount <strong>₹{details.totalAmount}</strong> is pre-filled).<br />
                3. Enter the 12-digit UPI Transaction ID (UTR) below.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ textAlign: 'left' }}>
                    <label className="form-label">UPI Transaction ID / UTR Number</label>
                    <input
                        type="text"
                        className={`form-input ${error ? 'error' : ''}`}
                        placeholder="e.g. 312345678901"
                        maxLength="12"
                        value={utr}
                        onChange={(e) => {
                            setUtr(e.target.value.replace(/\D/g, '')); // Only allow numbers
                            if (error) setError('');
                        }}
                        disabled={isVerifying}
                    />
                    {error && <div className="error-text" style={{ marginTop: '0.5rem' }}>{error}</div>}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ flex: 1 }}
                        onClick={onCancel}
                        disabled={isVerifying}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ flex: 2 }}
                        disabled={isVerifying || utr.length !== 12}
                    >
                        {isVerifying ? 'Verifying...' : 'Verify Payment'}
                    </button>
                </div>
            </form>
        </div>
    );
}
