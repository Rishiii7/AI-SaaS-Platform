"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useProModel } from "@/hooks/use-pro-model";
import { Badge } from "./ui/badge";
import { Check, Code, Image, MessageCircle, Music, Video, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";


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
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music"
  },{
    label: "Code Generation",
    icon: Code,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    href: "/code"
  },
]

export const ProModel = () => {

  const proModel = useProModel();

  return (
    <>
        <Dialog 
          open={proModel.isOpen}
          onOpenChange={proModel.onClose}  
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="items-center flex flex-col justify-center gap-y-4 pb-2">
                <div className="flex items-center gap-x-2 font-bold py-1">
                  Switch to Pro Model
                  <Badge className=" uppercase text-sm py-1"
                    variant={"premium"}
                  >
                    pro
                  </Badge>
                </div>
              </DialogTitle>
              <DialogDescription className="space-y-2">
                {
                  tools.map( (tool, ind) => {
                    return (
                      <>
                        <Card className="p-3 border-black/5 flex items-center justify-between">
                          <div className="flex items-center gap-x-4">
                            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                <tool.icon className={cn("h-6 w-6", tool.color)}/>
                            </div>
                            <div className="font-semibold text-sm">
                              { tool.label}
                            </div>
                          </div>
                          <Check className="text-primary w-5 h-5"/>
                        </Card>
                        
                      </>
                    )
                  })
                }
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                size={"lg"}
                variant={"premium"}
                className="w-full gap-x-2"
              >
                Upgrade
                <Zap className="h-4 w-4 fill-white"/>
              </Button>
            </DialogFooter>
          </DialogContent>

        </Dialog>
    </>
  )
}
