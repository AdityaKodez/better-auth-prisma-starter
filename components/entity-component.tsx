"use client"

import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
interface EntityHeaderProps{
    title: string;
    description: string;
    isButton?: boolean;
    onClickButton?: () => void;
    buttonText?:string;
}
export const EntityHeader = ({
    title,
    description,
    isButton,
    onClickButton,
    buttonText,
 
} : EntityHeaderProps) => {
    return(
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        {isButton && (
            <Button onClick={onClickButton}>
                {buttonText}
            </Button>
        )}
      </div>
    )
}

interface EntityListProps{
    items: Array<{ id: string; name: string }>
}
  
 export const EntityList = ({ items }: EntityListProps) => {
    return (
      <div>
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    )
}
  

interface EntityLoaderProps {
    description: string;
    entity: string;
}
export const EntityLoader = ({ 
    description,
    entity
} : EntityLoaderProps) =>{
  return(
       <div className="flex flex-col items-center justify-center space-y-2">
        <Spinner />
        <div>
        <p className="text-sm">
           Loading {entity}... 
        </p>
        <p className="text-xs text-primary-foreground">{description}</p>
        </div> 
    </div>
  )
}

