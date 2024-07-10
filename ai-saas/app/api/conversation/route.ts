import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI();

export async function POST(
    req: NextRequest
) {
    try {
        console.log( " entered in the api route ");
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        console.log( "[MESSAGE_IN ]" + JSON.stringify(messages));
        console.log( "[userId ]" + userId);

        if( !userId ) {
            return NextResponse.json({
                messages: "Unauthorized"
            }, { status : 401});
        }

        if( !messages ) {
            return NextResponse.json({
                messages: "No messages"
            }, { status: 400 });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages
        });

        console.log("[OPENAI_RESPONSE] : " + JSON.stringify(response.choices[0].message));

        return NextResponse.json({
            messages: response.choices[0].message
        }, { status: 200 });



    }  catch (error ) {
        console.log("[COVERSATION_ERROR_IN_SERVER]" + error);
        return NextResponse.json({
            message : "Internal Error"
        }, { status: 500});
    }  
}