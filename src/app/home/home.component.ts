import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSliderChange} from "@angular/material/slider";
import {$e} from "codelyzer/angular/styles/chars";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  coords: Line[] = [];
  id=0;

  constructor() {
  }

  private ctx: CanvasRenderingContext2D;
  alpha: number = 1;
  beta: number = 1;
  rho: number = 0.5;
  q: number = 20;

  ngOnInit(): void {
    debugger;
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }


  mouseEvent($event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();

    const x = $event.clientX - rect.left;
    const y = $event.clientY - rect.top;

    this.coords.push({id:this.id++ ,x: x,y:y});

    let image = new Image(50,50);

    image.onload = ()=> {
      this.drawShape(x,y);
      this.ctx.drawImage(image,x,y,40,40);
    }

    image.src = 'assets/village.png';

    if(this.coords.length > 1){
      this.lineOperations();
    }
  }
  lineOperations(){
    debugger;
    for (let i= 0 ; i<this.coords.length;i++){
      for(let t=0; t<this.coords.length;t++){

        console.log('i ' + i );
        console.log('t ' + t );

        this.drawLine(this.coords[i].x,
          this.coords[i].y,
          this.coords[t].x,
          this.coords[t].y);
      }
    }
  }

  formatLabel(value: number) {
    return value;
  }

  rhoFormatLabel(value: number) {
    return value/10;
  }

  drawLine(x1 , y1 , x2 , y2){
    debugger;
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.moveTo(x1 + 20 ,y1 +20);
    this.ctx.lineTo(x2 + 20 ,y2 + 20);
    this.ctx.lineWidth = 0.1;
    this.ctx.stroke();
  }


  drawShape(x:number,y:number){
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = 'red';
    this.ctx.strokeStyle = 'green';
    this.ctx.arc(x+20, y+20, 30, 0, 2*Math.PI);
    this.ctx.stroke();
  }

  getRhoValue() {
    this.rho = this.rho /10;
    return this.rho;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.coords = [];
  }

  changeValue($event: MatSliderChange) {
    this.rho = $event.value / 10;
  }
}

export class Line {
  x: number;
  y: number;
  id: number;
}
