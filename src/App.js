import { useRef, useState } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0)
  const [isClockRun, setIsClockRun] = useState(false)
  const timeRef = useRef('')

  const handleStart = () => {
    setIsClockRun(!isClockRun)
    timeRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1)
    }, 1000)
  }

  const handleStop = () => {
    setIsClockRun(!isClockRun)
    clearInterval(timeRef.current)
  }

  return (
    <div className="App">
      <h2>Time: {time}</h2>

      <button
        disabled={isClockRun}
        style={{ marginRight: "10px", pointerEvents: isClockRun ? 'none' : 'auto' }}
        onClick={handleStart}
      >Start</button>

      <button
        disabled={!isClockRun}
        style={{ pointerEvents: isClockRun ? 'auto' : 'none' }}
        onClick={handleStop}
      >Stop</button>
    </div>
  );
}

export default App;
