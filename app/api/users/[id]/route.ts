import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// ✅ GET single user
export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}

// ✅ UPDATE user
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { email, name } = body;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { email, name },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

// ✅ DELETE user
export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}


