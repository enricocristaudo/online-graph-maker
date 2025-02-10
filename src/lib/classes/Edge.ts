import Node from "./Node";

class Edge {
   source: Node;
   target: Node;
   weight: number;

   constructor(source: Node, target: Node, weight: number) {
      this.source = source;
      this.target = target;
      this.weight = weight;
      this.draw()
   }

   draw(): void {
      if (this.weight === -1) return;
      const arrowSize = 10;

      if (this.source === this.target) {
         const loopRadius = this.source.radius * 0.6;
         const centerX = this.source.x;
         const centerY = this.source.y - this.source.radius - loopRadius;

         this.source.ctx.beginPath();
         this.source.ctx.arc(centerX, centerY, loopRadius, 0.5 * Math.PI, 2.3 * Math.PI);
         this.source.ctx.stroke();

         const endAngle = 2.3 * Math.PI;
         const endX = centerX + loopRadius * Math.cos(endAngle);
         const endY = centerY + loopRadius * Math.sin(endAngle);

         const arrowAngle = endAngle + Math.PI / 2.5;
         const arrowX1 = endX - arrowSize * Math.cos(arrowAngle - Math.PI / 6);
         const arrowY1 = endY - arrowSize * Math.sin(arrowAngle - Math.PI / 6);
         const arrowX2 = endX - arrowSize * Math.cos(arrowAngle + Math.PI / 6);
         const arrowY2 = endY - arrowSize * Math.sin(arrowAngle + Math.PI / 6);

         this.source.ctx.beginPath();
         this.source.ctx.moveTo(endX, endY);
         this.source.ctx.lineTo(arrowX1, arrowY1);
         this.source.ctx.lineTo(arrowX2, arrowY2);
         this.source.ctx.closePath();
         this.source.ctx.fill();

         this.source.ctx.fillStyle = "black";
         this.source.ctx.font = "16px Monospace";
         this.source.ctx.textAlign = "center";
         this.source.ctx.textBaseline = "middle";
         this.source.ctx.fillText(this.weight.toString(), centerX, centerY - loopRadius - 10);
      } else {
         const dx = this.target.x - this.source.x;
         const dy = this.target.y - this.source.y;
         const angle = Math.atan2(dy, dx);

         const startX = this.source.x + Math.cos(angle) * this.source.radius;
         const startY = this.source.y + Math.sin(angle) * this.source.radius;
         const targetX = this.target.x - Math.cos(angle) * this.target.radius;
         const targetY = this.target.y - Math.sin(angle) * this.target.radius;

         this.source.ctx.beginPath();
         this.source.ctx.moveTo(startX, startY);
         this.source.ctx.lineTo(targetX, targetY);
         this.source.ctx.stroke();

         this.source.ctx.beginPath();
         this.source.ctx.moveTo(targetX, targetY);
         this.source.ctx.lineTo(
            targetX - arrowSize * Math.cos(angle - Math.PI / 6),
            targetY - arrowSize * Math.sin(angle - Math.PI / 6)
         );
         this.source.ctx.lineTo(
            targetX - arrowSize * Math.cos(angle + Math.PI / 6),
            targetY - arrowSize * Math.sin(angle + Math.PI / 6)
         );
         this.source.ctx.closePath();
         this.source.ctx.fill();

         const midX = (startX + targetX) / 2;
         const midY = (startY + targetY) / 2;

         const textOffset = 20;
         const textX = midX - textOffset * Math.sin(angle);
         const textY = midY + textOffset * Math.cos(angle);

         this.source.ctx.fillStyle = "black";
         this.source.ctx.font = "16px Monospace";
         this.source.ctx.textAlign = "center";
         this.source.ctx.textBaseline = "middle";
         this.source.ctx.fillText(this.weight.toString(), textX, textY);
      }
   }
}

export default Edge;
