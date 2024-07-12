import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";


export async function POST(req: Request) {

    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET || ""
        );
    } catch( error ) {
        console.log( error );
        return NextResponse.json({
            message: "Webhook Error"
        }, { status: 400})
    }

    const session = event.data.object as Stripe.Checkout.Session;
    
}