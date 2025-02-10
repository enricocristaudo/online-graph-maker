import Edge from "./Edge";

class Node {
   x: number;
   y: number;
   offsetX: number;
   offsetY: number;
   value: number;
   color: string;
   radius: number;
   isClicked: boolean;
   edges: Set<Edge>;
   ctx: CanvasRenderingContext2D;

   constructor(x: number, y: number, value: number, ctx: CanvasRenderingContext2D) {
      this.x = x;
      this.y = y;
      this.offsetX = x;
      this.offsetY = y;
      this.value = value;
      this.color = "white";
      this.radius = 30;
      this.isClicked = false;
      this.edges = new Set();
      this.ctx = ctx;
      this.draw();
   }

   draw(): void {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.lineWidth = 2;

      this.ctx.fillStyle = "black";
      this.ctx.textBaseline = "middle";
      this.ctx.textAlign = "center";
      this.ctx.font = "20px Monospace";
      this.ctx.fillText(this.value.toString(), this.x, this.y);
      this.edges.forEach((edge) => edge.draw());
   }

   addEdge(target: Node, weight: number) {
      this.edges.add(new Edge(this, target, weight));
   }

   removeEdge(target: Node) {
      this.edges.forEach((edge) => {
         if (edge.target === target) {
            this.edges.delete(edge);
         }
      });
   }

   containsPoint(px: number, py: number): boolean {
      const distance = Math.sqrt((px - this.x) ** 2 + (py - this.y) ** 2);
      return distance <= this.radius;
   }

   changeColor(newColor: string): void {
      this.isClicked = !this.isClicked;
      this.color = newColor;
      this.draw();
   }
}

export default Node;