# Portfolio Contact Form Backend

This is the backend server for the portfolio contact form that integrates with Brevo (formerly Sendinblue) for email delivery.

## Features

- ✅ Brevo email integration
- ✅ Rate limiting (3 requests per 15 minutes per IP)
- ✅ Input validation
- ✅ CORS enabled for frontend integration
- ✅ Error handling and logging
- ✅ Production-ready for Render deployment

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Brevo API Configuration
BREVO_API_KEY=your_brevo_api_key_here

# Email Configuration
FROM_EMAIL=your-verified-sender@yourdomain.com
TO_EMAIL=your-email@yourdomain.com

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 3. Brevo Setup

1. **Create a Brevo Account**: Sign up at [https://www.brevo.com/](https://www.brevo.com/)

2. **Get API Key**: 
   - Go to Settings → API Keys
   - Create a new API key with "Transactional Email" permissions
   - Copy the API key to your `.env` file

3. **Verify Sender Email**:
   - Go to Settings → Senders & IP
   - Add and verify your sender email address
   - Use this verified email as `FROM_EMAIL` in your `.env` file

### 4. Start the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## Deployment to Render

### 1. Prepare for Deployment

1. **Create a Render Account**: Sign up at [https://render.com/](https://render.com/)

2. **Connect Your Repository**: 
   - Connect your GitHub repository to Render
   - Select the `server` directory as the root directory

3. **Configure Build Settings**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

### 2. Environment Variables in Render

Add these environment variables in your Render dashboard:

```env
BREVO_API_KEY=your_brevo_api_key_here
FROM_EMAIL=your-verified-sender@yourdomain.com
TO_EMAIL=your-email@yourdomain.com
NODE_ENV=production
ALLOWED_ORIGINS=https://your-app.vercel.app,https://your-domain.com
```

### 3. CORS Configuration

The CORS configuration is now handled through environment variables. Simply set the `ALLOWED_ORIGINS` variable with your frontend URLs:

```env
# For development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# For production (replace with your actual Vercel URLs)
ALLOWED_ORIGINS=https://your-app.vercel.app,https://your-domain.com
```

### 4. Deploy

- Render will automatically deploy your server
- You'll get a URL like: `https://your-app-name.onrender.com`
- Use this URL as your `VITE_API_URL` in your Vercel frontend deployment

## API Endpoints

### POST /api/contact

Sends a contact form message via email.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully!",
  "data": { ... }
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production"
}
```

### GET /

API information endpoint.

**Response:**
```json
{
  "message": "Portfolio Contact Form API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/api/health",
    "contact": "/api/contact"
  }
}
```

## Rate Limiting

The contact endpoint is rate-limited to:
- **3 requests per 15 minutes per IP address**
- This helps prevent spam and abuse

## Error Handling

The server includes comprehensive error handling for:
- Missing or invalid form fields
- Invalid email addresses
- Brevo API errors
- Network issues
- CORS violations

## Security Features

- Input validation and sanitization
- Rate limiting to prevent abuse
- CORS configuration for frontend integration
- Environment variable protection
- Production-ready error handling

## Frontend Integration

After deploying to Render, update your frontend environment variables:

```env
# In your Vercel deployment
VITE_API_URL=https://your-app-name.onrender.com
```

## Troubleshooting

### Common Issues

1. **"Invalid API Key" Error**
   - Verify your Brevo API key is correct
   - Ensure the API key has "Transactional Email" permissions

2. **"Sender not verified" Error**
   - Verify your sender email in Brevo dashboard
   - Use only verified email addresses as `FROM_EMAIL`

3. **CORS Errors**
   - Update CORS configuration with your Vercel domain
   - Check that the frontend URL is properly configured

4. **Rate Limit Errors**
   - Wait 15 minutes before trying again
   - Check if you're behind a shared IP/proxy

5. **Render Deployment Issues**
   - Ensure the root directory is set to `server`
   - Check that all environment variables are set
   - Verify the build and start commands

### Logs

Check the Render logs for detailed error messages and debugging information.

### Health Check

Test your deployed server:
```bash
curl https://your-app-name.onrender.com/api/health
``` 