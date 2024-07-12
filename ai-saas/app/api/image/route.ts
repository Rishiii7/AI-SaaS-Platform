import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
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
        const { prompt, amount=1, resolution="1024x1024" } = body;

        console.log( "[BODY CAUGHT] : " + JSON.stringify(body));
        console.log( "[userId] : " + userId);

        if( !userId ) {
            return NextResponse.json({
                messages: "Unauthorized"
            }, { status : 401});
        }

        if( !prompt ) {
            return NextResponse.json({
                messages: "promt is required"
            }, { status: 400 });
        }

        const freeTrail = await checkApiLimit();
        if( !freeTrail ) {
            return NextResponse.json({
                messages: "Free trail expired"
            }, { status: 403});
        }

        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: prompt,
            n: parseInt(amount),
            size: resolution
        });

        await increaseApiLimit();

        console.log("[OPENAI_RESPONSE_FOR_IMAGE] : " + JSON.stringify(response.data));

        return NextResponse.json({
            messages: response.data
        }, { status: 200 });



    }  catch (error ) {
        console.log("IMAGE_ERROR_IN_SERVER]" + error);
        return NextResponse.json({
            message : "Internal Error"
        }, { status: 500});
    }  
}