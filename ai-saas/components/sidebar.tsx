"use client";

import Image from "next/image";
import Link from "next/link";
import { Montserrat } from  'next/font/google';
import { usePathname } from 'next/navigation';

import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessageCircle, Music, Settings, Video } from "lucide-react";

const monstserrat = Montserrat({
    weight: '400',
    subsets: ['latin']
});

const routes = [{
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500" 
    }, {
        label: "Conversation",
        icon: MessageCircle,
        href: "/conversation",
        color: "text-violet-500" 
    }, {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-pink-500" 
    }, {
        label: "Video Generation",
        icon: Video,
        href: "/video",
        color: "text-orange-500" 
    }, {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-emerald-500" 
    }, {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-cyan-500" 
    }, {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        color: "text-gray-500" 
    },
];

const Sidebar = () => {

    const pathname = usePathname();

  return (
    <>
        <div className=" space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className=" px-3 py-2 flex-1">
                <Link  href={"/dashboard"}
                   className="flex items-center pl-3 mb-14" 
                >
                    <div className="relative w-8 h-8 mr-4">
                        <Image
                            src={"/logo.png"}
                            fill
                            alt="logo"
                            className=" rounded-full"

                        />
                        
                    </div>
                    <div
                        className={cn("bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-clip-text text-transparent text-2xl font-bold", monstserrat.className)}>
                        Inspire AI
                    </div>
                </Link>

                <div className="space-y-2">
                    {
                        routes.map((route) => {
                            return (
                                <Link 
                                    href={route.href}
                                    key={route.href}
                                    className={cn("text-sm group p-3  flex w-full justify-center font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", 
                                    pathname===route.href ? "text-white bg-white/10" : "text-zinc-400")}
                                >
                                    <div className="flex items-center flex-1">
                                        <route.icon 
                                            className={cn("h-5 w-5 mr-3", route.color)}
                                        />
                                        <div>
                                            { route.label }
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    </>
  )
}

export default Sidebar;
