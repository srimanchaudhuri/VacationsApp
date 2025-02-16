import { NextResponse } from 'next/server';
import prisma from '@repo/db/client';
import bcrypt from 'bcryptjs';

export async function GET() {
  return NextResponse.json({ message: "Hello" });
}

export async function POST(req: Request) {
  console.log("Signup API Route Loaded");

  const body = await req.json();
  const { firstName, lastName, email, password } = body;

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const newUser = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword
    }
  });

  return NextResponse.json({ message: 'User created successfully', user: newUser }, { status: 201 });
}
