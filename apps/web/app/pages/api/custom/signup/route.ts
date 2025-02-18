import { NextResponse } from 'next/server';
import prisma from '@repo/db/client';
import bcrypt from 'bcryptjs';
import { SignUpValidation } from '@repo/zod/schema';

export async function POST(req: Request) {
  console.log("Signup API Route Loaded");

  const body = await req.json();

  const res = SignUpValidation.safeParse(body)
  if(!res.success) {
    return NextResponse.json({ error: 'Invalid Inputs' }, { status: 400 });
  }


  const { firstName, lastName, email, password } = body;

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
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
