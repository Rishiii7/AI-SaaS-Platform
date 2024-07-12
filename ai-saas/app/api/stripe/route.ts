import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {

    try {

        const { userId } = auth();
        const user = await currentUser();

        if( !user || !userId ) {
            return NextResponse.json({
                message: "Unauthorized"
            }, { status: 401 });
        }

        const existingUserSubscription = await prisma.userSubscription.findUnique({
            where: {
                userId: userId
            }
        });

        if( existingUserSubscription && existingUserSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: existingUserSubscription.stripeCustomerId,
                return_url: settingsUrl,
            });

            return NextResponse.json({
                url: stripeSession.url
            });
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Inspire AI",
                            description: "Unlimited AI Generations"
                        },
                        unit_amount: 2000,
                        recurring: {
                            interval: "month"
                        }
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId 
            }
        });

        return NextResponse.json({
            url: stripeSession.url
        });

    } catch( error ) {
        console.log("[STRIPE_ERROR] : " + error);
        return NextResponse.json({
            message: "Internal Error"
        }, { status: 500})
    }
    
}