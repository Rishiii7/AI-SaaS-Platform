"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChatCompletionUserMessageParam } from 'openai/resources/index.mjs';
import axios from "axios";
import { z } from 'zod';

import { Code } from 'lucide-react';
import { useForm } from 'react-hook-form'
import { Heading } from '@/components/heading';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/empty';

import { formSchema } from './constants';
import { Loader } from '@/components/loader';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/user-avatar';
import { BotAvatar } from '@/components/bot-avatar';
import { Spinner } from '@/components/ui/spinner';
import ReactMarkdown from 'react-markdown';

const CodePage = () => {

    const [messages, setMessages] = useState<ChatCompletionUserMessageParam[]>([]);

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

            const userMessage : ChatCompletionUserMessageParam = { 
                role: "user",
                content: values.prompt
            };

            const newMessage = [ ...messages, userMessage]

            const response = await axios.post("/api/code", {
                messages: newMessage 
            });
            console.log( "Type of resposne : " + typeof response.data);
            console.log("[CODE_RESPOSNE] : " + JSON.stringify(response.data));


            setMessages( (prev) =>  [...prev, userMessage, response.data.messages]);

            console.log( JSON.stringify(messages));

            form.reset();

        } catch( error ) {
            console.log("[CONVERSATION_ERROR_IN_CLIENT] : " + error);
        } finally {
            router.refresh();
        }
    }

  return (
    <>
        <div>
            <Heading 
                title='Code Generation'
                description='Our Most Advanced Code Generation Model'
                icon={Code}
                iconColor='text-cyan-500'
                bgColor='bg-cyan-500/10'
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
                                                placeholder='Simple toggle button using react hooks' 
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
                        messages.length === 0 && !isLoading && (
                            <Empty label='No Conversation sarted'/>
                        )
                    }
                    <div className='flex flex-col-reverse gap-y-4'>
                        { messages.map( (message, ind) => {
                            return (
                                <>
                                  <div
                                    className={ cn("p-8 w-full flex gap-x-8 rounded-lg",
                                        message.role === "user" ? "bg-white border border-black/10 ": "bg-muted")
                                     } 
                                    key={ind}
                                    >
                                        {
                                            message.role === "user" ? 
                                                <UserAvatar /> : <BotAvatar />
                                        }
                                        <ReactMarkdown
                                            components={{
                                                pre: ({ node, ...props}) => (
                                                    <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'>
                                                        <pre {...props}/>
                                                    </div>
                                                ),
                                                code: ({ node, ...props}) => (
                                                    <code className='bg-black/10 rounded-lg p-1' {...props} />
                                                )
                                            }}
                                            className='text-sm overflow-hidden leading-7'
                                        >
                                            { message.content as string || ""}
                                        </ReactMarkdown>
                                  </div>
                                
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CodePage;