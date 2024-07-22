"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import { z } from 'zod';

import { useForm } from 'react-hook-form'
import { Heading } from '@/components/heading';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/empty';

import { amountOptions, formSchema, resolutionOptions } from './constants';
import { Loader } from '@/components/loader';
import { cn } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Card, CardFooter } from '@/components/ui/card';
import { Download, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useProModel } from '@/hooks/use-pro-model';

const ImagePage = () => {
    const [images, setImages] = useState<string []>([]);
    const proModel = useProModel();

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount:"1",
            resolution:"1024x1024",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async ( values : z.infer<typeof formSchema>) => {
        try {

            setImages([]);

            // console.log( values );

            const response = await axios.post("/api/image", values);

            console.log("[IMAGE_RESPOSNE] : " + JSON.stringify(response.data));

            const urls = response.data.messages.map( (image: {url:string}) => image.url);

            setImages(urls);

            form.reset();

        } catch( error: any ) {
            console.log("[IMAGE_ERROR_IN_CLIENT] : " + error);
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
                title='Image Generation'
                description='Generate your Image'
                icon={ImageIcon}
                iconColor='text-pink-500'
                bgColor='bg-pink-500/10'
            />
            <div className='px-4 lg:px-8'>
                <div className=''>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2'
                        >
                            <FormField 
                                name='prompt'
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-6'>
                                        <FormControl className='m-0 p-0'>
                                            <Input 
                                                placeholder='A picture of a demon' 
                                                {...field}
                                                className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-2'>
                                        <Select 
                                            onValueChange={field.onChange} defaultValue={field.value}
                                            value={field.value}
                                            disabled={isLoading}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    amountOptions.map( (option) => (
                                                        <SelectItem 
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="resolution"
                                render={({ field }) => (
                                    <FormItem className='col-span-12 lg:col-span-2'>
                                        <Select 
                                            onValueChange={field.onChange} defaultValue={field.value}
                                            disabled={isLoading}
                                        >
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                            {
                                                resolutionOptions.map( (option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))
                                            }
                                            </SelectContent>
                                        </Select>
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
                            <div className='pt-10'>
                                <Loader />
                            </div>
                        )
                    }
                    {
                        images.length === 0 && !isLoading && (
                            <Empty label='No Images generated'/>
                        )
                    }
                    <div 
                        className='grid grid-cols-1
                        md:grid md:grid-cols-2
                        lg:grid lg:grid-cols-3
                        xl:grid xl:grid-cols-4
                        gap-4 mt-8
                        '
                    >
                       {
                        images.map( (src, ind) => (
                            <Card
                                key={src+ind}
                                className='rounded-lg overflow-hidden'
                            >
                                <div className=' relative aspect-square'>
                                    <Image 
                                        alt='Image'
                                        src={src}
                                        fill
                                    />
                                </div>
                                <CardFooter className='p-2'>
                                    <Button 
                                        onClick={() => window.open(src)}
                                        variant={"secondary"}
                                        className='w-full'
                                    >
                                        <Download 
                                            className='w-4 h-4'
                                        />
                                    </Button>
                                </CardFooter>

                            </Card>
                        ))
                       }
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ImagePage;