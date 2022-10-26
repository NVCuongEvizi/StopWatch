import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);
  const [isClockRun, setIsClockRun] = useState(false);
  const [recordList, setRecordList] = useState([]);
  const intervalID = useRef(null);
  const timeStart = useRef(null);
  const timeRecord = useRef(0);

  useEffect(() => {
    return () => {
      clearInterval(intervalID.current);
    };
  }, []);

  const handleWatchRun = () => {
    if (!intervalID.current) {
      // start // resume
      intervalID.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      // console.log('start // resume')
    } else {
      // pause
      handleStop();
      // console.log('pause')
    }

    if (isClockRun) {
      // pause
      timeRecord.current += new Date().getTime() - timeStart.current;
      // console.log('pause')
    } else {
      // resume
      timeStart.current = new Date().getTime();
      // console.log('resume')
    }

    setIsClockRun(!isClockRun);
  };

  const handleReset = () => {
    timeStart.current = null;
    timeRecord.current = 0;

    setTime(0);
    setIsClockRun(false);
    setRecordList([]);
    handleStop();
  };

  const handleStop = () => {
    clearInterval(intervalID.current);
    intervalID.current = null;
  };

  const handleRecord = () => {
    const result =
      new Date().getTime() - timeStart.current + timeRecord.current;
    setRecordList((prevState) => [
      ...prevState,
      { watchTime: formatDate(), time: result / 1000 + "s" },
    ]);
  };

  const formatDate = () => {
    const today = new Date();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let second = today.getSeconds();
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    return hour + ":" + minute + ":" + second;
  };

  return (
    <div className="App">
      <div className="time-button">
        <h2>{time}</h2>

        {timeRecord.current === 0 && !intervalID.current && (
          <button className="startBtn" onClick={handleWatchRun}>
            Start
          </button>
        )}

        <button className="resetBtn" onClick={handleReset}>
          Reset
        </button>

        <button className="pauseResumeBtn" onClick={handleWatchRun}>
          {isClockRun ? "Pause" : "Resume"}
        </button>

        {/* {isClockRun && (
          <button className="recordBtn" onClick={handleRecord}>
            Record
          </button>
        )} */}
        <button
          disabled={!isClockRun}
          className="recordBtn"
          onClick={handleRecord}
        >
          Record
        </button>
      </div>

      <ul className="time-display">
        <h2>Your time record:</h2>
        {recordList?.map((item, index) => (
          <li key={index}>
            #{index + 1} - watchTime: {item.watchTime} - Time: {item.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
