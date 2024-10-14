import https from 'https';

// Replace with your backend URL
const SERVER_URL = 'https://blogapp-mongodb.onrender.com';

// Define the restricted hours (e.g., between 12 AM and 6 AM)
const RESTRICTED_START_HOUR = 0; // Midnight (0:00)
const RESTRICTED_END_HOUR = 8; // 6:00 AM

// Function to check if the current time is within the restricted period
const isRestrictedTime = () => {
  const currentHour = new Date().getHours(); // Get the current hour (0-23)
  return currentHour >= RESTRICTED_START_HOUR && currentHour < RESTRICTED_END_HOUR;
};

// Function to ping the server periodically if it's not within restricted hours
const wakeUpServer = () => {
  setInterval(() => {
    if (!isRestrictedTime()) {
      https.get(SERVER_URL, (res) => {
        console.log(`Pinging server - Status: ${res.statusCode}`);
      }).on('error', (err) => {
        console.error('Error pinging server:', err.message);
      });
    } else {
      console.log('Skipping ping: Server is in restricted hours.');
    }
  }, 14 * 60 * 1000); // Ping every 5 minutes
};

export default wakeUpServer;
