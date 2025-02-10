import React from "react";
import { Button } from "@/components/ui/button"

interface MenuButtonsProps {
   onReset: () => void;
   onDownload: () => void;
}

const MenuButtons: React.FC<MenuButtonsProps> = ({ onReset, onDownload}) => {
   return (
      <div className="flex">
         <Button variant="outline" onClick={onReset} className="cursor-pointer my-5 mx-5">Reset</Button>
         <Button onClick={onDownload} className="cursor-pointer my-5">Download</Button>
      </div>
   );
};

export default MenuButtons;