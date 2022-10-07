import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0)
  const [isClockRun, setIsClockRun] = useState(false)
  const [isPause, setIsPause] = useState(false)
  const [isStartDisable, setIsStartDisable] = useState(false)
  const [recordList, setRecordList] = useState([])

  const timeRef = useRef('')
  let timeStart = useRef(null)
  let timeStop = useRef(null)
  let timePause = useRef(null)
  let timePauseDuration = useRef(0)
  let diff = useRef(null)

  useEffect(() => {
    return () => {
      clearInterval(timeRef.current)
    }
  }, [])

  const handleStart = () => {
    if (timeStart.current === null) {
      timeStart.current = new Date().getTime()
    } else {
      timePauseDuration.current += (new Date().getTime() - timePause.current)
    }

    setIsStartDisable(true)
    setIsClockRun(true)
    setIsPause(false)

    timeRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 1)
    }, 1000)
  }

  const handleReset = () => {
    timePause.current = null
    timeStart.current = null
    timeStop.current = null
    timePauseDuration.current = 0

    setTime(0)
    setIsPause(false)
    setIsStartDisable(false)
    setIsClockRun(false)

    clearInterval(timeRef.current)
  }

  const handlePause = () => {
    timePause.current = new Date().getTime()
    setIsClockRun(false)
    setIsPause(true)

    clearInterval(timeRef.current)
  }

  const handleRecord = () => {
    timeStop.current = new Date().getTime()
    if (isPause) {
      diff.current = timePause.current - timeStart.current
    } else {
      diff.current = timeStop.current - timeStart.current - timePauseDuration.current
    }

    setRecordList(prevState => [...prevState, { watchTime: formatDate(), time: diff.current / 1000 + 's' }])
  }

  const formatDate = () => {
    const today = new Date()
    let hour = today.getHours()
    let minute = today.getMinutes()
    let second = today.getSeconds()
    if (hour < 10) {
      hour = '0' + hour
    }
    if (minute < 10) {
      minute = '0' + minute
    }
    if (second < 10) {
      second = '0' + second
    }
    return hour + ':' + minute + ':' + second
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
        onClick={isClockRun ? handlePause : handleStart}
      >{isClockRun ? 'Pause' : 'Resume'}</button>

      <button
        onClick={handleRecord}
      >Record</button>

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