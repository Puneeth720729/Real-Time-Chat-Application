# Real-Time Chat Application

## Project Overview
This is a real-time chat application built using the MERN stack.
It enables users to communicate instantly using WebSockets.
This application is inspired by real-world platforms like Slack, WhatsApp, and Microsoft Teams.


## Tech Stack
- MongoDB
- Express.js
- React.js
- Node.js
- Socket.IO

## Key Features
- User authentication (Signup & Login)
- Real-time messaging
- Private and group chats
- Media sharing (images/files)
- Persistent chat history
- Responsive UI

## Project Structure
client/   – React frontend  
server/   – Node.js & Express backend

## Environment Variables
Create a `.env` file inside the server folder and add the following:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```


## Local Setup Instructions
### Prerequisites
- Node.js v18+
- MongoDB v6+
- npm v9+

### Backend
```bash
cd server
npm install
npm run dev
```


### Frontend

```bash
cd client
npm install
npm run dev
```


