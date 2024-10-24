import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import ReportIcon from '@mui/icons-material/Report';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import '../styles/Setting.css'; // Import CSS file
import Navbar from '../components/Navbar';

function Settings() {
  return (
    <div>
        <Navbar/>
    <div className="settings-container">
      <h1 className="settings-title">Setting</h1>

      {/* Account Section */}
      <div className="settings-section">
        <h2 className="settings-subtitle">Account</h2>
        <div className="settings-item">
          <AccountCircleIcon className="settings-icon" />
          <span>Account</span>
        </div>
        <div className="settings-item">
          <SecurityIcon className="settings-icon" />
          <span>Security</span>
        </div>
      </div>

      {/* Actions Section */}
      <div className="settings-section">
        <h2 className="settings-subtitle">Actions</h2>
        <div className="settings-item">
          <ReportIcon className="settings-icon" />
          <span>Report a problem</span>
        </div>
        <div className="settings-item">
          <AddCircleIcon className="settings-icon" />
          <span>Add account</span>
        </div>
        <div className="settings-item">
          <ExitToAppIcon className="settings-icon" />
          <span>Log out</span>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Settings;
