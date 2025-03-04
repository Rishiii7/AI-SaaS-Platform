import { z } from "zod";

export const formSchema = z.object({
    prompt : z.string().min(1, {
        message: "Image Prompt is required"
    }),
    amount: z.string().min(1),
    resolution: z.string().min(1)
});

export const amountOptions = [
    {
        value: "1",
        label: "1 photo"
    },
    {
        value: "2",
        label: "2 photo"
    },
    {
        value: "3",
        label: "3 photo"
    },
    {
        value: "4",
        label: "4 photo"
    },
    {
        value: "5",
        label: "5 photo"
    },
    
];

export const resolutionOptions = [
    {
        value: "1024x1024",
        label: "1024x1024"
    },
    {
        value: "1792x1024",
        label: "1792x1024"
    },
    {
        value: "1024x1792",
        label: "1024x1792"
    },
];