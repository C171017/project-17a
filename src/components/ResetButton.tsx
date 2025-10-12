import { useAppDispatch } from '../store/hooks';
import { resetAllValues } from '../store/counterSlice';

const ResetButton = () => {
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(resetAllValues());
  };

  return (
    <button 
      className="reset-button" 
      onClick={handleReset}
      style={{
        backgroundColor: '#ff4444',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#cc3333';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#ff4444';
      }}
    >
      Reset All
    </button>
  );
};

export default ResetButton;
