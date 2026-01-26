import { Request } from 'express';

interface User {
  id: string;
  email: string;
  // ... other user properties
}

// Extend the Request interface
declare global {
  namespace Express {
    interface Request {
      user?: User; // Make it optional since it might not exist before authentication
    }
  }
}
