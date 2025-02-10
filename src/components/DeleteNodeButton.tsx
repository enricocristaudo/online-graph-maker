import React from "react";
import Node from "@/lib/classes/Node";
import { Button } from "./ui/button";

interface DeleteNodeButtonProps {
   selectedNode: Node | null;
   onDelete: () => void;
}

const DeleteNodeButton: React.FC<DeleteNodeButtonProps> = ({ selectedNode, onDelete }) => {
   return (
      <Button
         onClick={onDelete}
         disabled={selectedNode === null} // Disabilitato se nessun nodo è selezionato
         variant="destructive"
         className="m-5 w-fit"
      >
         Elimina Nodo
      </Button>
   );
};

export default DeleteNodeButton;