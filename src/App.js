import React, { useState, useEffect } from 'react';
import './App.css';
import houseLayout from './assets/house-layout.png';

function App() {
  const [showFirstFloor, setShowFirstFloor] = useState(true);
  const [showSecondFloor, setShowSecondFloor] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [alarmOn, setAlarmOn] = useState(false);
  const [roomStates, setRoomStates] = useState({
    livingRoom: { temperature: 23, lightOn: false },
    kitchen: { humidity: 55, lightOn: false },
    bedroom: { temperature: 22, lightOn: false },
    bathroom: { humidity: 60, lightOn: false }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRoomStates((prevState) => ({
        livingRoom: { ...prevState.livingRoom, temperature: Math.floor(20 + Math.random() * 5) },
        kitchen: { ...prevState.kitchen, humidity: Math.floor(50 + Math.random() * 10) },
        bedroom: { ...prevState.bedroom, temperature: Math.floor(20 + Math.random() * 5) },
        bathroom: { ...prevState.bathroom, humidity: Math.floor(55 + Math.random() * 10) }
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header className="App-header">
        <h1>House Model Dashboard</h1>
        <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      </header>

      <button onClick={() => setShowFirstFloor(!showFirstFloor)}>
        {showFirstFloor ? 'Hide' : 'Show'} First Floor
      </button>
      <button onClick={() => setShowSecondFloor(!showSecondFloor)}>
        {showSecondFloor ? 'Hide' : 'Show'} Second Floor
      </button>

      {showFirstFloor && (
        <section className="floor first-floor">
          <h2>First Floor</h2>
          <div className="sensor-section">
            <div className="room living-room">
              <h3>Living Room</h3>
              <p>Temperature: {roomStates.livingRoom.temperature}°C</p>
              <button onClick={() => setRoomStates({ ...roomStates, livingRoom: { ...roomStates.livingRoom, lightOn: !roomStates.livingRoom.lightOn } })}>
                {roomStates.livingRoom.lightOn ? 'Turn Light Off' : 'Turn Light On'}
              </button>
            </div>
            <div className="room kitchen">
              <h3>Kitchen</h3>
              <p>Humidity: {roomStates.kitchen.humidity}%</p>
              <button onClick={() => setRoomStates({ ...roomStates, kitchen: { ...roomStates.kitchen, lightOn: !roomStates.kitchen.lightOn } })}>
                {roomStates.kitchen.lightOn ? 'Turn Light Off' : 'Turn Light On'}
              </button>
            </div>
          </div>
          <div className="house-layout">
            <img src={houseLayout} alt="First Floor Layout" />
          </div>
        </section>
      )}

      {showSecondFloor && (
        <section className="floor second-floor">
          <h2>Second Floor</h2>
          <div className="sensor-section">
            <div className="room bedroom">
              <h3>Bedroom</h3>
              <p>Temperature: {roomStates.bedroom.temperature}°C</p>
              <button onClick={() => setRoomStates({ ...roomStates, bedroom: { ...roomStates.bedroom, lightOn: !roomStates.bedroom.lightOn } })}>
                {roomStates.bedroom.lightOn ? 'Turn Light Off' : 'Turn Light On'}
              </button>
            </div>
            <div className="room bathroom">
              <h3>Bathroom</h3>
              <p>Humidity: {roomStates.bathroom.humidity}%</p>
              <button onClick={() => setRoomStates({ ...roomStates, bathroom: { ...roomStates.bathroom, lightOn: !roomStates.bathroom.lightOn } })}>
                {roomStates.bathroom.lightOn ? 'Turn Light Off' : 'Turn Light On'}
              </button>
            </div>
          </div>
          <div className="house-layout">
            <img src={houseLayout} alt="Second Floor Layout" />
          </div>
        </section>
      )}

      <div className="alarm-section">
        <button onClick={() => setAlarmOn(!alarmOn)}>
          {alarmOn ? 'Deactivate Alarm' : 'Activate Alarm'}
        </button>
        {alarmOn && <p className="alarm-warning">🚨 Alarm is ON! 🚨</p>}
      </div>
    </div>
  );
}

export default App;
