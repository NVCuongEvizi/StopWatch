import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0)
  const [isClockRun, setIsClockRun] = useState(false)
  const [isResumePause, setIsResumePause] = useState(false)
  const [isStartDisable, setIsStartDisable] = useState(false)
  const [recordList, setRecordList] = useState([])
  const timeRef = useRef('')

  useEffect(() => {
    return () => {
      clearInterval(timeRef.current)
    }
  }, [])

  const handleStart = () => {
    setIsStartDisable(true)
    setIsClockRun(true)
    setIsResumePause(true)
    timeRef.current = setInterval(() => {
      console.log('interval running...')
      setTime(prevTime => prevTime + 1)
    }, 1000)
  }

  const handleReset = () => {
    setTime(0)
    setIsResumePause(false)
    setIsStartDisable(false)
    setIsClockRun(false)
    clearInterval(timeRef.current)
  }

  const handlePause = () => {
    setIsClockRun(false)
    setIsResumePause(true)
    clearInterval(timeRef.current)
  }

  const handleStop = () => {
    setRecordList(prevState => [...prevState, { watchTime: formatDate(), time: time + 's' }])
    setIsStartDisable(true)
    setIsClockRun(false)
    setIsResumePause(false)
    clearInterval(timeRef.current)
  }

  const formatDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    let month = today.getMonth()
    let day = today.getDate()
    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }
    return day + '/' + month + '/' + year
  }

  return (
    <div className="App">
      <h2>Time: {time}</h2>

      <button
        disabled={isStartDisable}
        style={{ pointerEvents: isStartDisable ? 'none' : 'auto' }}
        onClick={handleStart}
      >Start</button>

      <button
        onClick={handleReset}
      >Reset</button>

      <button
        disabled={!isResumePause}
        style={{ pointerEvents: isResumePause ? 'auto' : 'none' }}
        onClick={isClockRun ? handlePause : handleStart}
      >{isClockRun ? 'Pause' : 'Resume'}</button>

      <button
        disabled={!isClockRun}
        style={{ pointerEvents: isClockRun ? 'auto' : 'none' }}
        onClick={handleStop}
      >Stop</button>

      <ul>
        <h2>Your time record:</h2>
        {recordList?.map((item, index) =>
          <li key={index}>#{index + 1} - watchTime: {item.watchTime} - Time: {item.time}</li>
        )}
      </ul>
    </div>
  );
}

export default App;
