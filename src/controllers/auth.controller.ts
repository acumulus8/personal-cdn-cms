import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma} from "@/prisma";
import { UserRole } from "@/prisma/generated/prisma";

interface RegisterRequestArgs {
  email: string;
  password: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

export const register = async (req: Request, res: Response): Promise<void> => {
  console.log("--POST /auth/register running ", req.body);

  if (!req.body) {
    res.status(400).json({ error: 'Request body is missing' });
    return;
  }

  try {
    const { email, password, role, firstName, lastName } = req.body as RegisterRequestArgs;

    if (!email || !password || !role) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    if (!Object.values(UserRole).includes(role)) {
      res.status(400).json({ error: 'Invalid role' });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        role
      },
    });

    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal server error: ${error}` });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).json({ error: 'Request body is missing' });
    return;
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const secret = process.env.JWT_SECRET as string;
    if (!secret) {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        secret,
        { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal server error: ${error}` });
  }
};