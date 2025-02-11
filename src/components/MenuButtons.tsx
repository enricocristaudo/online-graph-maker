import React from "react";
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { RotateCcw } from "lucide-react"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
 } from "@/components/ui/dropdown-menu"


interface MenuButtonsProps {
   onReset: () => void;
   onDownload: (format: string) => void;
}

const MenuButtons: React.FC<MenuButtonsProps> = ({ onReset, onDownload}) => {
   return (
     <div className="flex">
       <Button
         variant="outline"
         onClick={onReset}
         className="cursor-pointer my-5 mx-5"
       >
         Reset <RotateCcw />
       </Button>
       <DropdownMenu>
         <DropdownMenuTrigger asChild>
           <Button className="cursor-pointer my-5">
             Download <Download />
           </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent>
           <DropdownMenuLabel>Choose format</DropdownMenuLabel>
           <DropdownMenuItem onClick={() => onDownload("svg")}>.svg</DropdownMenuItem>
           <DropdownMenuItem onClick={() => onDownload("png")}>.png</DropdownMenuItem>
           <DropdownMenuItem onClick={() => onDownload("jpeg")}>.jpeg</DropdownMenuItem>
         </DropdownMenuContent>
       </DropdownMenu>
     </div>
   );
};

export default MenuButtons;