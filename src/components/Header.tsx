import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import DarkMode from './DarkMode'
import { useLocation, useNavigate } from 'react-router-dom'
export default ({hideLinks,id}) => {

    const navigate = useNavigate()

    const location = useLocation()

    return (
        <div className="hidden flex-col md:flex">
            <div className="border-b">
                <div className="flex h-16 items-center px-4">
                    
                    {
                        !hideLinks && (
                            <nav
                        className={cn("flex items-center space-x-4 lg:space-x-6", "mx-6")}    >
                        <a
                            onClick={()=>navigate(`/dashboard/${id}`)}
                            className={cn("text-sm font-medium  transition-colors hover:text-primary",location.pathname==="/dashboard"?"text-primary":"text-muted-foreground")}
                        >
                            Overview
                        </a>
                        <a
                            onClick={()=>navigate(`/collection/${id}`)}
                            className={cn("text-sm font-medium  transition-colors hover:text-primary",location.pathname==="/collection"?"text-primary":"text-muted-foreground")}
                        >
                            Collections
                        </a>
                        <a
                            onClick={()=>navigate(`/setting/${id}`)}
                            className={cn("text-sm font-medium  transition-colors hover:text-primary",location.pathname==="/setting"?"text-primary":"text-muted-foreground")}
                        >
                            Settings
                        </a>
                    </nav>
                        )
                    }
                    <div className="ml-auto flex items-center space-x-4">
                        <DarkMode />
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                                        <AvatarFallback>SC</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">shadcn</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            m@example.com
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Profile
                                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Billing
                                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        Settings
                                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>New Team</DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    Log out
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    )
}