# Real-Time Chat Application with Socket.io

This assignment focuses on building a real-time chat application using Socket.io, implementing bidirectional communication between clients and server.

## Assignment Overview

You will build a chat application with the following features:
1. Real-time messaging using Socket.io
2. User authentication and presence
3. Multiple chat rooms or private messaging
4. Real-time notifications
5. Advanced features like typing indicators and read receipts

## Project Structure

```
real-time-chat-app/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # UI components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── socket/         # Socket.io client setup
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Node.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Socket event handlers
│   ├── models/             # Data models
│   ├── socket/             # Socket.io server setup
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week5-Assignment.md` file
4. Complete the tasks outlined in the assignment

## Files Included

- `Week5-Assignment.md`: Detailed assignment instructions
- Starter code for both client and server:
  - Basic project structure
  - Socket.io configuration templates
  - Sample components for the chat interface

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Modern web browser
- Basic understanding of React and Express

## Deployment Instructions

### Prerequisites
- GitHub account
- Render account (for backend)
- Vercel account (for frontend)
- MongoDB Atlas account

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:
   - **Runtime**: Node.js
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Add environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string
   - `FRONTEND_URL`: Your Vercel frontend URL (after deployment)
5. Deploy the service
6. Note the backend URL (e.g., `https://your-app.onrender.com`)

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add environment variables:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://your-app.onrender.com`)
   - `VITE_SENTRY_DSN`: Your Sentry DSN (optional, for error tracking)
4. Deploy the frontend
5. Note the frontend URL (e.g., `https://your-app.vercel.app`)

### Update Backend CORS

After deploying the frontend, update the `FRONTEND_URL` environment variable in Render with your Vercel URL.

### CI/CD with GitHub Actions

The project includes a comprehensive GitHub Actions workflow (`.github/workflows/deploy.yml`) that handles testing, building, and deployment.

#### Pipeline Features:
- **Testing**: Runs backend tests and linting
- **Building**: Builds frontend production bundle
- **Staging**: Deploys to staging on pull requests
- **Production**: Deploys to production on pushes to main
- **Health Checks**: Post-deployment verification

#### GitHub Secrets Setup:
1. Go to your repository Settings > Secrets and variables > Actions
2. Add the following secrets:
   - `RENDER_DEPLOY_HOOK`: Your Render deploy webhook URL
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

### Environment Variables

#### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=https://your-frontend-domain.vercel.app
```

#### Frontend (.env)
```
VITE_API_URL=https://your-backend-domain.onrender.com
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
```

### Monitoring

- **Backend**: Health check endpoint at `/health`
- **Frontend**: Sentry integration for error tracking
- **Database**: MongoDB Atlas monitoring and backups

### URLs
- **Frontend**: [Add your deployed frontend URL here]
- **Backend**: [Add your deployed backend URL here]
- **Health Check**: [Add your backend URL here]/health

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster (free tier is available)
3. Set up database access with username/password
4. Configure network access (allow all IPs: 0.0.0.0/0 for development)
5. Get your connection string from "Connect" > "Connect your application"
6. Update your `MONGO_URI` environment variable with this connection string

### Production Commands

#### Backend Start Commands:
- **Development**: `npm run dev` or `node server.js`
- **Production**: `node server.js` (or use PM2: `pm2 start server.js --name chat-app`)
- **With PM2**: `pm2 start ecosystem.config.js` (create ecosystem.config.js for PM2)

#### Frontend Build Commands:
- **Development**: `npm run dev`
- **Production Build**: `npm run build`
- **Preview Build**: `npm run preview`

### HTTPS/SSL Configuration

Both Render and Vercel automatically provide HTTPS certificates for production deployments. No additional SSL configuration is required.

### Monitoring Setup

#### Sentry (Frontend Error Tracking):
1. Create a Sentry account at https://sentry.io
2. Create a new React project
3. Copy the DSN and add to `VITE_SENTRY_DSN` environment variable
4. Errors will be automatically tracked and reported

#### Backend Logging:
- Morgan middleware logs all HTTP requests
- Winston can be added for advanced logging (optional)
- Health check endpoint: `GET /health`

#### Database Monitoring:
- MongoDB Atlas provides built-in monitoring
- Enable database profiler for query analysis
- Set up alerts for performance issues

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement the core chat functionality
3. Add at least 3 advanced features
4. Document your setup process and features in the README.md
5. Include screenshots or GIFs of your working application
6. Deploy your application and add the URLs to your README.md

## Resources

- [Socket.io Documentation](https://socket.io/docs/v4/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Building a Chat Application with Socket.io](https://socket.io/get-started/chat)
- [Render Deployment Guide](https://docs.render.com/)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
