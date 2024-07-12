"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import { z } from 'zod';

import { Video } from 'lucide-react';
import { useForm } from 'react-hook-form'
import { Heading } from '@/components/heading';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/empty';

import { formSchema } from './constants';
import { Loader } from '@/components/loader';
import { useProModel } from '@/hooks/use-pro-model';

const VideoPage = () => {

    const [video, setVideo] = useState<string>();
    const proModel = useProModel();

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async ( values : z.infer<typeof formSchema>) => {
        try {

            // console.log( values );
            

            const response = await axios.post("http://localhost:3000/api/video", {
                prompt: values.prompt
            });

            console.log("[VIDEO_RESPOSNE] : " + JSON.stringify(response.data));

            setVideo( response.data.message )

            form.reset();

        } catch( error: any ) {
            console.log("[VIDEO_ERROR_IN_CLIENT] : " + error);

            if( error?.response?.status === 403) {
                proModel.onOpen()
            }
        } finally {
            router.refresh();
        }
    }

  return (
    <>
        <div>
            <Heading 
                title='Video Generation'
                description='Our Most Advanced comversation Model'
                icon={Video}
                iconColor='text-orange-500'
                bgColor='bg-orange-500/10'
            />
            <div className='px-4 lg:px-8'>
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
                        >
                            <FormField 
                                name='prompt'
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-10'>
                                        <FormControl className='m-0 p-0'>
                                            <Input 
                                                placeholder='Generate a video of man swiming' 
                                                {...field}
                                                className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            
                            <Button 
                                className='col-span-12 lg:col-span-2 w-full'
                                disabled={isLoading}
                            >
                                Generate
                            </Button>
                            

                        </form>
                    </Form>
                </div>
                <div className='space-y-4 mt-4'>
                    {
                        isLoading && (
                            <div>
                                <Loader />
                            </div>
                        )
                    }
                    {
                        !video && !isLoading && (
                            <Empty label='No Video Generated'/>
                        )
                    }
                    <div className=''>
                        {
                            video && (
                                <video controls className='w-full aspect-video rounded-lg border bg-black mt-8'>
                                    <source src={ video }/>
                                </video>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default VideoPage;