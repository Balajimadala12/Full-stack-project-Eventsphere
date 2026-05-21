export default function Header({ currentUser, isAdminView, onToggleAdmin, setBookingStage, onLogout }) {
  return (
    <header className="header">
      <div 
        style={{ textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }} 
        onClick={() => setBookingStage && setBookingStage('list')}
      >
        <div style={{ 
          background: 'var(--premium-gradient)', 
          width: '40px', 
          height: '40px', 
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'white',
          boxShadow: '0 0 15px var(--primary-glow)'
        }}>
          ఆ
        </div>
        <div>
          <h1 className="title-gradient" style={{ 
            fontSize: '1.5rem', 
            margin: 0, 
            fontFamily: "'Suranna', serif",
            letterSpacing: '2px'
          }}>ఆహ్వాన</h1>
          <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '1px', textTransform: 'uppercase' }}>
            మీ రాక మా కొరకు
          </p>
        </div>
      </div>

      {currentUser && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right', display: 'none' /* Hidden on small mobile */, flexDirection: 'column' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.9rem' }}>{currentUser.name}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{currentUser.isAdmin ? 'Administrator' : 'Verified User'}</span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {currentUser.isAdmin && (
              <button
                className="btn btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}
                onClick={onToggleAdmin}
              >
                {isAdminView ? 'User Portal' : 'Admin Portal'}
              </button>
            )}
            <button
              className="btn"
              style={{ 
                padding: '0.5rem 1rem', 
                fontSize: '0.75rem', 
                background: 'rgba(239, 68, 68, 0.1)', 
                color: '#ef4444', 
                border: '1px solid rgba(239, 68, 68, 0.2)' 
              }}
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
