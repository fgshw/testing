import React from 'react';
import '../styles/Notificate.css'; // Import CSS file
import EventIcon from '@mui/icons-material/Event'; // Icon สำหรับ Calendar event
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'; // Icon สำหรับหมายเลขแจ้งเตือน
import Navbar from '../components/Navbar';

function Notificate() {
  const events = [
    {
      title: 'Festival',
      description: "Let's go to festival in Japan.",
      icon: <EventIcon />,
      notificationCount: 1
    },
    {
      title: '花見 (ha na mí)',
      description: "See sakura in Japan.",
      icon: <EventIcon />,
      notificationCount: 2
    }
  ];

  return (
    <div>
      <Navbar />
      <div className="calendar-container">
        <h1 className="calendar-title">Notificate</h1>
        <ul className="calendar-list">
          {events.map((event, index) => (
            <li key={index} className="calendar-item">
              <div className="calendar-icon">{event.icon}</div>
              <div className="calendar-content">
                <h2 className="calendar-event-title">{event.title}</h2>
                <p className="calendar-event-description">{event.description}</p>
              </div>
              <div className="calendar-notification">
                <FiberManualRecordIcon />
                <span>{event.notificationCount}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notificate;
