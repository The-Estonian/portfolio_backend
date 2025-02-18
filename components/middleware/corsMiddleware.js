import cors from 'cors';

const corsOptions = {
  origin: ['https://the-estonian.com', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Client-Secret'],
};

export default cors(corsOptions);
