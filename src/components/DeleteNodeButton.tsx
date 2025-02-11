import React from "react";
import Node from "@/lib/classes/Node";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface DeleteNodeButtonProps {
   selectedNode: Node | null;
   onDelete: () => void;
}

const DeleteNodeButton: React.FC<DeleteNodeButtonProps> = ({ selectedNode, onDelete }) => {
   return (
      <Button
         onClick={onDelete}
         disabled={selectedNode === null} // Disabilitato se nessun nodo è selezionato
         variant="outline"
         className="m-5 w-fit"
      >
         Elimina Nodo <X />
      </Button>
   );
};

export default DeleteNodeButton;