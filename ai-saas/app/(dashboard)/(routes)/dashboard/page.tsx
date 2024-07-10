"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';

import { 
  ArrowRight, 
  Code, 
  Image, 
  MessageCircle, 
  Music, 
  Video 
} from "lucide-react";

const tools = [
  {
    label: "Conversation",
    icon: MessageCircle,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation"
  }, {
    label: "Image Generation",
    icon: Image,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    href: "/image"
  }, {
    label: "Video Generation",
    icon: Video,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/video"
  }, {
    label: "Code Generation",
    icon: Code,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    href: "/code"
  },
]

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
        <div className="mb-8 space-y-4"> 
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            Explore the Power of AI
          </h2>
          <p className=" text-muted-foreground text-center font-light text-sm md:text-lg">
            Chat with smartest AI - Experience the power of AI
          </p>
        </div>
        <div className="px-4 md:px-20 lg:px-32 space-y-4">
          {
            tools.map( (tool) => {
              return (
                <>
                  <Card
                    onClick={() =>  router.push(tool.href)}
                    key={tool.href}
                    className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                  >
                      <div className="flex items-center gap-x-4">
                        <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                          <tool.icon className={cn("w-6 h-6", tool.color)} />
                        </div>
                        <div className="font-semibold">
                            { tool.label }
                        </div>
                      </div>
                      <ArrowRight />
                  </Card>
                </>
              )
            })
          }
        </div>
    </div>
  )
}

export default DashboardPage;