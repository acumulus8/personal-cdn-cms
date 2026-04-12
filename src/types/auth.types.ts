import type { Request } from 'express';

export interface AuthJwtPayload {
  userId: number;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthJwtPayload;
}