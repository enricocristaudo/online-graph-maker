import React, { useEffect, useState } from "react";
import Canvas from "./Canvas";
import Matrix from "./Matrix";
import Node from "../lib/classes/Node";
import "../styles.css";
import MenuButtons from "./MenuButtons";
import MatrixLatexCode from "./MatrixLatexCode";
import DeleteNodeButton from "./DeleteNodeButton";

const GraphCreator: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [sourceNode, setSourceNode] = useState<Node | null>(null);
  const [extracted, setExtracted] = useState<Set<number>>(new Set());

  useEffect(() => {
    setNodes((prevNodes) => {
      const newNodes = [...prevNodes];
      for (let i = 0; i < newNodes.length; i++) {
        for (let j = 0; j < newNodes.length; j++) {
          newNodes[i].removeEdge(newNodes[j]);
          const weight = matrix[i][j];
          if (weight != 0) {
            newNodes[i].addEdge(newNodes[j], weight);
          }
        }
      }
      return newNodes;
    });
  }, [matrix]);

  const handleDeleteNode = () => {
    if (sourceNode === null) return;

    setNodes((prevNodes) => {
      const newNodes = prevNodes
        .filter((node) => node.id !== sourceNode.id)
        .map((node) => {
          node.edges = new Set(
            [...node.edges].filter(
              (edge) => edge.target.id !== sourceNode.id
            )
          );
          return node;
        });
      return newNodes;
    });
    setMatrix((prevMatrix) => {
      return prevMatrix
        .filter((_, i) => i !== sourceNode.id)
        .map((row) => row.filter((_, j) => j !== sourceNode.id));
    });

    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id > sourceNode.id) {
          const newNode = Object.create(node); // Mantiene il prototipo
          newNode.id = node.id - 1; // Modifica solo l'ID
          return newNode;
        }
        return node;
      })
    );

    setSourceNode(null);
  };

  const handleMatrixChange = (i: number, j: number, value: string) => {
    if (value == "" || value === "-" || value == "0") {
      setMatrix((prevMatrix) => {
        const newMatrix = prevMatrix.map((row) => [...row]);
        newMatrix[i][j] = value as unknown as number;
        return newMatrix;
      });
      return;
    }

    const numValue = Number(value);

    if (isNaN(numValue)) return;

    setMatrix((prevMatrix) => {
      const newMatrix = prevMatrix.map((row) => [...row]);
      newMatrix[i][j] = numValue;
      return newMatrix;
    });
  };

  return (
    <>
      <div className="flex">
        <div className="relative">
          <Canvas
            {...{
              nodes,
              setNodes,
              matrix,
              setMatrix,
              sourceNode,
              setSourceNode,
              extracted,
              setExtracted,
            }}
          />
          <div className="absolute bottom-2 right-2">
            <DeleteNodeButton
              onDelete={handleDeleteNode}
              selectedNode={sourceNode}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <MenuButtons
              onDownload={() => {}}
              onReset={() => {
                setNodes([]);
                setMatrix([]);
                setSourceNode(null);
                setExtracted(new Set());
              }}
            />
            {matrix.length > 0
              ? <Matrix matrix={matrix} onMatrixChange={handleMatrixChange} />
              : <p className="text-sm text-gray-700 mx-5">Tap on the canvas to add a node</p>
            }
            <MatrixLatexCode matrix={matrix}/>
          </div>
          {/* <DeleteNodeButton
            onDelete={handleDeleteNode}
            selectedNode={sourceNode}
          /> */}
        </div>
      </div>
    </>
  );
};

export default GraphCreator;
