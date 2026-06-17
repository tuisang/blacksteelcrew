import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookingConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { Body } = body;
    const resultCode = Body?.stkCallback?.ResultCode;
    const checkoutRequestId = Body?.stkCallback?.CheckoutRequestID;
    const metadata = Body?.stkCallback?.CallbackMetadata?.Item ?? [];

    if (!checkoutRequestId) {
      return NextResponse.json({ error: "Invalid callback" }, { status: 400 });
    }

    if (resultCode === 0) {
      const mpesaReceiptNumber = metadata.find(
        (i: { Name: string }) => i.Name === "MpesaReceiptNumber"
      )?.Value;
      const amount = metadata.find(
        (i: { Name: string }) => i.Name === "Amount"
      )?.Value;

      await prisma.booking.updateMany({
        where: { mpesaCheckoutId: checkoutRequestId },
        data: {
          status: "confirmed",
          mpesaReceiptNumber: mpesaReceiptNumber ?? null,
          paidAmount: amount ? String(amount) : null,
        },
      });

      console.log(`✅ Booking payment confirmed: ${mpesaReceiptNumber}`);

      const booking = await prisma.booking.findFirst({
        where: { mpesaCheckoutId: checkoutRequestId },
      });

      if (booking) {
        console.log(`📧 Sending email to ${booking.email}`);
        try {
          await sendBookingConfirmationEmail({
            clientName: booking.name,
            clientEmail: booking.email,
            service: booking.service,
            date: booking.date,
            paymentMethod: "M-Pesa",
            bookingId: booking.id,
          });
          console.log(`✅ Email sent to ${booking.email}`);
        } catch (emailError) {
          console.error("❌ Email failed:", emailError);
        }
      } else {
        console.log(`⚠️ No booking found for checkoutId: ${checkoutRequestId}`);
      }
    } else {
      await prisma.booking.updateMany({
        where: { mpesaCheckoutId: checkoutRequestId },
        data: { status: "pending" },
      });
      console.log(`❌ Booking payment failed: ${checkoutRequestId}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.json({ error: "Callback processing failed." }, { status: 500 });
  }
}