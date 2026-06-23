import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const ADMIN_USER_ID = "user_3FOCtiBnlnMNPZ1naaYqyDcUFpP";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId } = await auth();

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    const isOwner = !order.clerkUserId || (userId && order.clerkUserId === userId);
    const isAdmin = userId === ADMIN_USER_ID;

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Fetch order error:", error);
    return NextResponse.json({ error: "Failed to fetch order." }, { status: 500 });
  }
}