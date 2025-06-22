## 🚀 Contact Form Setup with Brevo Email Integration

The contact form is now fully functional with Brevo email integration and rate limiting!

### Quick Start

1. **Install dependencies:**
   ```bash
   # Frontend dependencies
   npm install
   
   # Backend dependencies
   cd server && npm install
   ```

2. **Set up Brevo:**
   - Sign up at [https://www.brevo.com/](https://www.brevo.com/)
   - Get your API key from Settings → API Keys
   - Verify your sender email in Settings → Senders & IP

3. **Configure environment variables:**
   
   **Frontend** (create `.env` file):
   ```env
   VITE_API_URL=http://localhost:5000
   ```
   
   **Backend** (create `server/.env` file):
   ```env
   BREVO_API_KEY=your_brevo_api_key_here
   FROM_EMAIL=your-verified-sender@yourdomain.com
   TO_EMAIL=your-email@yourdomain.com
   PORT=5000
   NODE_ENV=development
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
   ```

4. **Run the application:**
   ```bash
   # Terminal 1 - Frontend (Vite)
   npm run dev
   
   # Terminal 2 - Backend (Express)
   cd server && npm run dev
   ```

### Deployment

#### Frontend (Vercel)
1. Deploy your frontend to Vercel
2. Set environment variable: `VITE_API_URL=https://your-backend-app.onrender.com`

#### Backend (Render)
1. Deploy the `server` directory to Render
2. Set environment variables in Render dashboard:
   ```env
   BREVO_API_KEY=your_brevo_api_key_here
   FROM_EMAIL=your-verified-sender@yourdomain.com
   TO_EMAIL=your-email@yourdomain.com
   NODE_ENV=production
   ALLOWED_ORIGINS=https://your-app.vercel.app,https://your-domain.com
   ```

For detailed deployment instructions, see [server/README.md](server/README.md).

### Features

- ✅ **Brevo Email Integration** - Reliable email delivery
- ✅ **Rate Limiting** - 3 requests per 15 minutes per IP
- ✅ **Form Validation** - Client and server-side validation
- ✅ **Loading States** - Visual feedback during submission
- ✅ **Error Handling** - Comprehensive error messages
- ✅ **Responsive Design** - Works on all devices
- ✅ **Production Ready** - Separate frontend/backend deployment
- ✅ **Flexible CORS** - Environment-based origin configuration

### API Endpoints

- `POST /api/contact` - Send contact form message
- `GET /api/health` - Server health check
- `GET /` - API information

For detailed setup instructions, see [server/README.md](server/README.md).