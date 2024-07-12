
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Replicate from 'replicate';



const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});


export async function POST(
    req: NextRequest
) {

    if (!process.env.REPLICATE_API_TOKEN) {
        throw new Error(
          'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
        );
      }

    try {

        const { userId } = auth();
        const body = await req.json();
        const { prompt } = body;

        if( !userId ) {
            return NextResponse.json({ 
                message: 'Unauthorized' 
            }, { status: 401 });
        }

        if( !prompt ) {
            return NextResponse.json({
                message: 'Prompt is required'
            }, { status: 400});
        }

        const freeTrail = await checkApiLimit();
        if( !freeTrail ) {
            return NextResponse.json({
                messages: "Free trail expired"
            }, { status: 403});
        }

        console.log("[PROMPT] : "+ prompt)

        const response = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", {
            input : {
                prompt: prompt,
            }
        });

        await increaseApiLimit();

        return NextResponse.json({
            message: response
        });

    } catch( error ) {
        console.log(error);

        return NextResponse.json({
            message: "Something went wrong !"
        }, { status: 400});
    }

    
}