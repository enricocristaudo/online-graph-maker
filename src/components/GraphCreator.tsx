import React, { useEffect, useState } from "react";
import Canvas from "./Canvas";
import Matrix from "./Matrix";
import Node from "../lib/classes/Node";
import "../styles.css";
import MenuButtons from "./MenuButtons";
import DeleteNodeButton from "./DeleteNodeButton";

const GraphCreator: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [sourceNode, setSourceNode] = useState<Node | null>(null);
  const [nodesClicked, setNodesClicked] = useState<number>(0);

  useEffect(() => {
    setNodes((prevNodes) => {
      const newNodes = [...prevNodes];
      for (let i = 0; i < newNodes.length; i++) {
        for (let j = 0; j < newNodes.length; j++) {
          newNodes[i].removeEdge(newNodes[j]);
          const weight = matrix[i][j];
          if (weight !== -1 && weight !== 0) {
            newNodes[i].addEdge(newNodes[j], weight);
          } else {
            newNodes[i].removeEdge(newNodes[j]);
          }
        }
      }
      return newNodes;
    });
  }, [matrix]);

  const handleDeleteNode = () => {
    if (sourceNode === null) return;

    setNodes((prevNodes) => {
      return prevNodes
        .filter((node) => node.value !== sourceNode.value)
        .map((node) => {
          node.edges = new Set(
            [...node.edges].filter(
              (edge) => edge.target.value !== sourceNode.value
            )
          );
          return node;
        });
    });
    setMatrix((prevMatrix) => {
      return prevMatrix
        .filter((_, i) => i !== sourceNode.value)
        .map((row) => row.filter((_, j) => j !== sourceNode.value));
    });

    setSourceNode(null);
  };

  const handleMatrixChange = (i: number, j: number, value: string) => {
    if (value === "" || value === "-") {
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
        <Canvas
          {...{
            nodes,
            setNodes,
            matrix,
            setMatrix,
            sourceNode,
            setSourceNode,
            nodesClicked,
            setNodesClicked,
          }}
        />
        <div className="flex flex-col justify-between">
          <div>
            <MenuButtons
              onDownload={() => {}}
              onReset={() => {
                setNodes([]);
                setMatrix([]);
                setSourceNode(null);
                setNodesClicked(0);
              }}
            />
            <Matrix matrix={matrix} onMatrixChange={handleMatrixChange} />
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
