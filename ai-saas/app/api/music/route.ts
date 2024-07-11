
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

        console.log("[PROMPT] : "+ prompt)

        const response = await replicate.run("meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb", {
            input : {
                prompt: prompt,
            }
        });

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