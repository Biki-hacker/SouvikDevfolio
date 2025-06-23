const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const SibApiV3Sdk = require('sib-api-v3-sdk');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- CORS Setup ---
const allowedOrigins = process.env.FRONTEND_URL;

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`🚨 CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// --- Basic Security Headers ---
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// --- Middleware ---
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- Rate Limiting ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: 'Too many contact form submissions. Please try again after 15 minutes.',
  },
});
app.use('/api/contact', limiter);

// --- Brevo Email Setup ---
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

if (!process.env.BREVO_API_KEY) console.error("🚨 BREVO_API_KEY is not set.");
if (!process.env.YOUR_RECEIVING_EMAIL) console.error("🚨 YOUR_RECEIVING_EMAIL is not set.");
if (!process.env.BREVO_SENDER_EMAIL) console.warn("⚠️ BREVO_SENDER_EMAIL is not set. Using fallback.");

// --- Contact Form Route ---
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }

  if (!process.env.BREVO_API_KEY || !process.env.YOUR_RECEIVING_EMAIL) {
    return res.status(500).json({ success: false, message: 'Server email configuration error.' });
  }

  const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

  const sender = {
    email: process.env.BREVO_SENDER_EMAIL || `contact@${req.hostname}`,
    name: 'Portfolio Contact Form',
  };

  const receivers = [{ email: process.env.YOUR_RECEIVING_EMAIL }];

  try {
    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: `New Portfolio Contact from ${name}`,
      htmlContent: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333;">
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <small>This email was sent via the portfolio contact form.</small>
          </body>
        </html>
      `,
      replyTo: { email, name },
    });

    console.log(`📧 Email sent from ${email} to ${process.env.YOUR_RECEIVING_EMAIL}`);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Error sending email:', error.response?.body || error.message);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
});

// --- Health Check Route ---
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
