import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI();

const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content: "You are a code generator model. YOu have to generate code snippets in a marksdown fashion and use comments for code explanation"
}

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
        const freeTrail = await checkApiLimit();
        if( !freeTrail ) {
            return NextResponse.json({
                messages: "Free trail expired"
            }, { status: 403});
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages]
        });

        await increaseApiLimit();

        console.log("[OPENAI_RESPONSE] : " + JSON.stringify(response.choices[0].message));

        return NextResponse.json({
            messages: response.choices[0].message
        }, { status: 200 });



    }  catch (error ) {
        console.log("[CODE_ERROR_IN_SERVER]" + error);
        return NextResponse.json({
            message : "Internal Error"
        }, { status: 500});
    }  
}