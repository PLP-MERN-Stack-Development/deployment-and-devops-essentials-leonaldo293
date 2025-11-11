# TODO - Deployment e DevOps para Real-Time Chat App

## 1. Environment Variables
- [x] Backend uses PORT, MONGO_URI, JWT_SECRET, CLIENT_URL
- [x] Frontend uses VITE_API_URL
- [x] GitHub Secrets setup documented

## 2. CI/CD Pipeline
- [x] GitHub Actions workflow created (.github/workflows/deploy.yml)
- [x] Runs backend tests (npm test) and linting
- [x] Builds frontend (npm run build)
- [x] Deploys backend to Render
- [x] Deploys frontend to Vercel
- [x] Handles staging and production environments
- [x] Health checks after deployment

## 3. Deployment Instructions
- [x] Commands to start backend (node server.js)
- [x] Configure HTTPS/SSL for production
- [x] Frontend connects to backend using VITE_API_URL
- [x] MongoDB Atlas configuration documented

## 4. Monitoring and Logging
- [x] Sentry setup for frontend error tracking
- [x] Backend health check endpoint
- [x] Morgan for HTTP request logging
- [x] MongoDB Atlas monitoring instructions

## 5. README Updates
- [x] Deployed URLs placeholders added
- [x] CI/CD pipeline documentation
- [x] Monitoring setup instructions
- [x] Deployment steps documented

## 6. Final Tasks
- [ ] Deploy to production and update URLs in README
- [ ] Test production deployment
- [ ] Add screenshots of CI/CD pipeline
