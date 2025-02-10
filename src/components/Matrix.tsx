import React from "react";
import { Input } from "@/components/ui/input";

interface MatrixProps {
   matrix: number[][];
   onMatrixChange: (i: number, j: number, value: string) => void;
}

const Matrix: React.FC<MatrixProps> = ({ matrix, onMatrixChange }) => {
   const cols = matrix[0]?.length || 0;

   return (
      <div className="p-5">
         <div className="flex items-center gap-0.5">
            {cols > 0 ? <div className="w-6 h-6 flex items-center justify-center font-mono text-gray-300 text-sm">#</div> : null}
            {Array.from({ length: cols }, (_, j) => (
               <div key={j} className="w-12 h-6 flex items-center justify-center font-mono text-gray-300 text-sm">
                  {j}
               </div>
            ))}
         </div>
         <div className="flex flex-col gap-0.5">
            {matrix.map((row, i) => (
               <div key={i} className="flex items-center gap-0.5">

                  <div className="w-6 h-12 flex items-center justify-center font-mono text-gray-300 text-sm">
                     {i}
                  </div>

                  {row.map((cell, j) => (
                     <Input
                        key={j}
                        value={cell.toString()}
                        onChange={(e) => onMatrixChange(i, j, e.target.value)}
                        className="w-12 h-12 p-0 text-center font-mono"
                     />
                  ))}
               </div>
            ))}
         </div>
      </div>
   );
};

export default Matrix;