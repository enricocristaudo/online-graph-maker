import React, { useState,useEffect, useRef } from "react";
import Node from "../lib/classes/Node";

interface CanvasProps {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  matrix: number[][];
  setMatrix: React.Dispatch<React.SetStateAction<number[][]>>;
  sourceNode: Node | null;
  setSourceNode: React.Dispatch<React.SetStateAction<Node | null>>;
  nodesClicked: number;
  setNodesClicked: React.Dispatch<React.SetStateAction<number>>;
}

const Canvas: React.FC<CanvasProps> = ({
  nodes,
  setNodes,
  matrix,
  setMatrix,
  sourceNode,
  setSourceNode,
  nodesClicked,
  setNodesClicked,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let activeNode: Node | null = null;
  let isDragging = false;
  const [width, setWidth] = useState(window.innerHeight);
  const [isResizing, setIsResizing] = useState(false);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = window.innerHeight;
    }
  }, [width]);

  const disableSelection = () => {
    document.body.style.userSelect = "none";
    document.body.style.pointerEvents = "none";
  };

  const enableSelection = () => {
    document.body.style.userSelect = "auto";
    document.body.style.pointerEvents = "auto";
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = event.clientX;

    if (mouseX >= rect.right - 10 && mouseX <= rect.right) {
      setIsResizing(true);
      disableSelection();
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isResizing) {
      if(event.clientX >= window.innerHeight && event.clientX <= window.innerWidth - 300) {
        setWidth(event.clientX);
      }
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    enableSelection();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.style.backgroundColor = "#fafafa";
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach((node) => {
      node.draw();
    });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext("2d");

    ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

    nodes.forEach((node) => {
      node.draw();
    });
  }, [nodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const redrawCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((node) => {
        node.draw();
      });
    };

    const getMousePosition = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handleMouseDown = (event: MouseEvent) => {
      const mouse = getMousePosition(event);
      isDragging = false;

      for (let n of nodes) {
        if (n.containsPoint(mouse.x, mouse.y)) {
          activeNode = n;
          activeNode.offsetX = mouse.x - activeNode.x;
          activeNode.offsetY = mouse.y - activeNode.y;
          return;
        }
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (activeNode) {
        const mouse = getMousePosition(event);
        activeNode.x = mouse.x - activeNode.offsetX;
        activeNode.y = mouse.y - activeNode.offsetY;
        isDragging = true;
        redrawCanvas();
      }
    };

    const handleMouseUp = () => {
      activeNode = null;
    };

    const handleClick = (event: MouseEvent) => {
      if (isDragging) return;
      const mouse = getMousePosition(event);

      for (let n of nodes) {
        if (n.containsPoint(mouse.x, mouse.y)) {
          n.changeColor(n.isClicked ? "white" : "#86efac");
          setNodesClicked((prev) => prev + 1);

          if (nodesClicked === 0) {
            setSourceNode(n);
          } else if (nodesClicked === 1 && sourceNode) {
            connectNodes(sourceNode, n);
            setSourceNode(null);
            setNodesClicked(0);
          }
          return;
        }
      }
      addNode(mouse.x, mouse.y);
    };

    const addNode = (x: number, y: number) => {
      const newNode = new Node(x, y, nodes.length, ctx);

      setNodes((prevNodes) => [...prevNodes, newNode]);

      const newMatrix = [...matrix, Array(nodes.length).fill(0)];
      newMatrix.forEach((row) => row.push(0));
      newMatrix[newMatrix.length - 1][newMatrix.length - 1] = 0;
      setMatrix(newMatrix);
    };

    const connectNodes = (source: Node, target: Node) => {
      source.changeColor("white");
      target.changeColor("white");
      const newMatrix = [...matrix];
      newMatrix[source.value][target.value] = 1;

      source.addEdge(target, matrix[source.value][target.value]);
      setMatrix(newMatrix);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("click", handleClick);
    };
  }, [nodes, matrix, sourceNode, nodesClicked]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
      />
      <div
        className="absolute top-0 right-0 h-full w-2 cursor-ew-resize"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default Canvas;
