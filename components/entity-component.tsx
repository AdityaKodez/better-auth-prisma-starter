"use client"
import { cn } from "@/lib/utils";
import { DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MoreVerticalIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Spinner } from "./ui/spinner";
interface EntityHeaderProps {
    title : string,
    description: string,
    onClick?: () => void,
    isButton?: boolean,
    isPending?: boolean,
}
export const EntityHeader = ({
    title , 
    description,
    onClick,
    isButton,
    isPending,
} : EntityHeaderProps) =>{
    return(
        <div className="p-6 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-lg font-semibold">{title}</div>
            <div className="text-muted-foreground text-xs">
              {description}
            </div>
          </div>
      
          {isButton && (
            <Button onClick={onClick} className={cn("flex items-center gap-1.5 cursor-pointer" , isPending && "pointer-events-none opacity-60")} size={"lg"} disabled={isPending}>
                
            {isPending ? <Spinner className="size-4"/>:<PlusIcon className="size-4" />}
             
              <span className="text-sm font-medium">Create Form</span>
            </Button>
          )}
        </div>
      </div>
      
    )
}


interface EntityCardProps{
     name : string,
     href : string,
     isDropdown?: boolean,
     description?: string,
     onDelete?: () => void,
     isPending?: boolean,
     onEdit?: () => void,
     isEditing?: boolean,
     className?: string,

}
export const EntityCard = ({
    name,
    href,
    description,
    isDropdown,
    onDelete,
    isPending,
    onEdit,
    isEditing,
    className,

} : EntityCardProps) => {
  return(
    <Link href={href} prefetch >
        <Card 
        className={cn(
            "p-4 shadow-none hover:shadow cursor-pointer" ,
            isEditing && "opacity-50 cursor-not-allowed" ,
            className,
        )}
        >
        <CardContent className={"flex flex-row items-center justify-between p-0"}>
         
          <div>
            <CardTitle className={"text-base font-medium"}>
                {name}
            </CardTitle>
             {
                !!description && (
                    <CardDescription className={"text-xs"} >
                        {description}
                    </CardDescription>
                )
             }
          </div>
          {
            onDelete && (
                <div className="flex gap-x-4 items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                    size={"icon"}
                                    variant={"ghost"}
                                    onClick={(e) => e.stopPropagation()}
                                    >
                                   <MoreVerticalIcon className="size-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                align="end"
                                onClick={(e) => e.stopPropagation()}
                                >
                                    <DropdownMenuItem
                                    onClick={onDelete}
                                    >
                                        
                                  <TrashIcon className="size-4"/>
                                   <span className="text-xs">Delete</span>
                                    </DropdownMenuItem>
                              
                                <DropdownMenuItem
                                    onClick={onDelete}
                                    >
                                        
                                  <PencilIcon className="size-4"/>
                                   <span className="text-xs">Edit</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        
                    
                </div>
            )
          }
        </CardContent>

        </Card>
        </Link>
  )
}
interface EntityContainerProps {
  header: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;

}
export const EntityContainer = ({
    className = "",
    header,
    content,
    footer,
  }: EntityContainerProps) => {
    return (
      <div className={`max-w-6xl mx-auto w-full px-2 h-full ${className}`}>
        <div className="flex flex-col gap-4">
          {header && (
            <header className="">
              {header}
            </header>
          )}
  
          <main className="w-full grid grid-cols-3 max-sm:grid-cols-1 gap-4 overflow-y-auto">
            {content}
          </main>
  
          {footer && (
            <footer className="border-t border-border/60 pt-4 text-sm text-muted-foreground">
              {footer}
            </footer>
          )}
        </div>
      </div>
    );
  };