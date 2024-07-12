import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';

import { MAX_FREE_COUNTS } from '@/constants';

export const increaseApiLimit = async () => {
    const { userId } = auth();

    if( !userId ) return;

    try {
        const exsistingUserApiLimit = await prisma.userApiLimit.findUnique({
            where: {
                userId: userId
            }
        });

        if ( exsistingUserApiLimit ) {
            await prisma.userApiLimit.update({
                where: {
                    id: exsistingUserApiLimit.id
                },
                data: {
                    limit: {
                        increment: 1
                    }
                }
            });

            return;
        }

        await prisma.userApiLimit.create({
            data: {
                userId: userId,
                limit: 1
            }
        });

        return ;

    } catch( error ) {
        console.log( error );

        return;
    }
};


export const checkApiLimit = async () => {
    const { userId } = auth();

    if( !userId ) {
        return false;
    }

    try{
        const existingUserApiLimit = await prisma.userApiLimit.findUnique({
            where: {
                userId: userId
            }
        });

        if( !existingUserApiLimit || existingUserApiLimit.limit <= MAX_FREE_COUNTS) {
            return true;
        }

        return false;


    } catch( error ) {
        console.log( error );
        return false;
    }
};

export const getApiLimitCount = async () => {
    const { userId } = auth();

    if( !userId ) return 0;

    try {

        const existingUserApiLimit = await prisma.userApiLimit.findUnique({
            where: {
                userId: userId
            }
        });

        if( !existingUserApiLimit ) return 0;

        console.log("[API_LIMIT_COUNT] : "  + existingUserApiLimit.limit);

        return existingUserApiLimit.limit;

    } catch ( error ) {
        console.log( error );
        return 0;
    }
}