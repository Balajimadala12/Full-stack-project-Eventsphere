export default function ProgressStepper({ stage }) {
  const stages = ['list', 'details', 'form', 'payment', 'confirmation'];
  const labels = ['Explore', 'Details', 'Booking', 'Payment', 'Success'];
  
  const currentIdx = stages.indexOf(stage);
  
  return (
    <div className="stepper-container fade-in">
      {labels.map((label, idx) => {
        const isActive = idx <= currentIdx;
        const isCurrent = idx === currentIdx;
        
        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`step ${isActive ? 'active' : ''}`}>
              <div className="step-num">{idx + 1}</div>
              <span className="step-label" style={{ display: idx === currentIdx ? 'inline' : 'none' }}>
                {label}
              </span>
            </div>
            {idx < labels.length - 1 && (
              <div className={`step-line ${idx < currentIdx ? 'active' : ''}`} 
                style={{ background: idx < currentIdx ? 'var(--primary)' : 'var(--glass-border)' }} 
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
