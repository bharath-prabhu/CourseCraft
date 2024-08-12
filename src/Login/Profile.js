import React, { useState } from 'react';
import './Profile.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ setLocation }) => {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setLocation(`Lat: ${lat}, Lng: ${lng}`);
    },
  });

  return (
    <Marker
      position={map.getCenter()}
      draggable={true}
      eventHandlers={{
        dragend(e) {
          const { lat, lng } = e.target.getLatLng();
          setLocation(`Lat: ${lat}, Lng: ${lng}`);
        },
      }}
    >
      <Popup>
        <span>Drag me to select a location!</span>
      </Popup>
    </Marker>
  );
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('aboutMe');
  const [location, setLocation] = useState('');
  const [mapVisible, setMapVisible] = useState(false);

  const handleMapClick = () => {
    setMapVisible(true);
  };

  const handleMapClose = () => {
    setMapVisible(false);
  };

  const handleDeleteAccount = () => {
    // Logic to handle account deletion
    alert('Account deletion is currently disabled.');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'aboutMe':
        return (
          <div className="tab-content">
            <h2>Personal Details</h2>
            <form>
              <div className="form-group inline">
                <div className="form-control">
                  <label>First Name *</label>
                  <input type="text" defaultValue="Bharath" />
                </div>
                <div className="form-control">
                  <label>Last Name *</label>
                  <input type="text" defaultValue="P" />
                </div>
              </div>
              <div className="form-group inline">
                <div className="form-control">
                  <label>Location</label>
                  <input
                    type="text"
                    value={location}
                    placeholder="Click to select a location"
                    onClick={handleMapClick}
                    readOnly
                  />
                </div>
                <div className="form-control">
                  <label>Gender</label>
                  <select>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Personal email address</label>
                <input type="email" defaultValue="bharathprabhu1611@gmail.com" disabled />
                <div>
                  <input type="radio" checked readOnly />
                  Primary email for communications
                </div>
              </div>
              <div className="form-group">
                <label>Educational institution-issued email address</label>
                <input type="email" placeholder="Enter an email..." />
                <div>
                  <input type="radio" />
                  Primary email for communications
                </div>
              </div>
              <div className="form-group">
                <label>LinkedIn URL</label>
                <input type="url" placeholder="https://linkedin.com/in/your-profile" />
              </div>
            </form>
            {mapVisible && (
              <div className="map-container">
                <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Map setLocation={setLocation} />
                </MapContainer>
                <button onClick={handleMapClose}>Close Map</button>
              </div>
            )}
            <br /><br /><br /><br /><br />
            <button style={{ width: "200px", height: "80px", fontSize: "20px", color: "white" }}>Save</button>
          </div>
        );
      case 'educationCareer':
        return <div className="tab-content">Education & Career Content</div>;
      case 'accountSettings':
        return (
          <div className="tab-content">
            <div className="password-security">
              <h2>Password Security</h2>
              <p>You are signed in with an external service as bharathprabhu1611@gmail.com</p>
            </div>
            <div className="danger-zone">
              <h2>Danger Zone</h2>
              <div className="delete-account">
                <h3>Delete My Account</h3>
                <p>
                  If you want to permanently delete your account, please use the button below. Once the deletion process has begun, you cannot reactivate or retrieve any content or information that you have provided.
                </p>
                <button className="delete-account-btn" onClick={handleDeleteAccount}>
                  Delete My Account
                </button>
              </div>
            </div>
          </div>
        );
      case 'referrals':
        return (
          <div className="tab-content referrals">
            <h2>Refer a Friend</h2>
            <p>Help us reach great students like yourself by sharing Forage with your friend</p>

            <div className="form-group">
              <label>Your referral link</label>
              <div className="referral-input">
                <input type="text" value="https://www.theforage.com/?ref=jfzWztz2wbGuFJpvQ" readOnly />
                <button className="copy-btn">Copy</button>
              </div>
            </div>

            <div className="form-group">
              <label>Send an invite to your friend</label>
              <input type="email" placeholder="example@example.com" />
              <button className="send-invite-btn" disabled>Send Invite</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-page">
      <h1>Edit Profile</h1>
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'aboutMe' ? 'active' : ''}`}
          onClick={() => setActiveTab('aboutMe')}
        >
          About Me
        </div>
        <div
          className={`tab ${activeTab === 'educationCareer' ? 'active' : ''}`}
          onClick={() => setActiveTab('educationCareer')}
        >
          Education & Career
        </div>
        <div
          className={`tab ${activeTab === 'accountSettings' ? 'active' : ''}`}
          onClick={() => setActiveTab('accountSettings')}
        >
          Account Settings
        </div>
        <div
          className={`tab ${activeTab === 'referrals' ? 'active' : ''}`}
          onClick={() => setActiveTab('referrals')}
        >
          Referrals
        </div>
      </div>
      <div className="content-area">{renderTabContent()}</div>
    </div>
  );
};

export default Profile;
