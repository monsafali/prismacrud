import prisma from "@/lib/prisma";


import { NextResponse } from "next/server";

// ✅ GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { id: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

// ✅ CREATE user
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create user" },
      { status: 500 },
    );
  }
}


