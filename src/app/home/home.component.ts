import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSliderChange} from "@angular/material/slider";
import {$e} from "codelyzer/angular/styles/chars";
import {AcoService} from "../services/aco.service";
import City from "../models/city";
import AntResult from "../models/ant-result";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  BreakException = {};

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  coords: City[] = [];
  id=0;
  calculateArray: AntResult;
  calculateArrayPoints: City[] = [];

  constructor(private acoService: AcoService) {
  }

  private ctx: CanvasRenderingContext2D;
  alpha: number = 2;
  beta: number = 3;
  rho: number = 0.5 ;
  q: number = 4;

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
      this.drawShape(x,y,'green',1);
      this.ctx.drawImage(image,x,y,40,40);
    }

    image.src = 'assets/village.png';

    if(this.coords.length > 1){
      this.lineOperations();
    }
  }
  lineOperations(){
    for (let i= 0 ; i<this.coords.length;i++){
      for(let t=0; t<this.coords.length;t++){
        this.drawLine(this.coords[i].x,
          this.coords[i].y,
          this.coords[t].x,
          this.coords[t].y,
          'black',
          0.1);
      }
    }
  }

  formatLabel(value: number) {
    return value;
  }

  rhoFormatLabel(value: number) {
    return value/10;
  }

  drawLine(x1 , y1 , x2 , y2, color,lineWidth){
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.moveTo(x1 + 20 ,y1 +20);
    this.ctx.lineTo(x2 + 20 ,y2 + 20);
    this.ctx.lineWidth = lineWidth;
    this.ctx.stroke();
  }


  drawShape(x:number,y:number,color:string,lineWidth: number){
    this.ctx.beginPath();
    this.ctx.lineWidth = lineWidth;
    this.ctx.fillStyle = 'red';
    this.ctx.strokeStyle = color;
    this.ctx.arc(x+20, y+20, 30, 0, 2*Math.PI);
    this.ctx.stroke();
  }

  clearCanvas() {
    this.id = 0;
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.coords = [];
  }

  changeValue($event: MatSliderChange) {
    this.rho = $event.value / 10;
  }

  calculate() {
    this.acoService.calculate(this.coords).subscribe((res: AntResult)=>{
      this.calculateArray = res;
      this.calculateArrayPointSettings();
    })
  }

  private calculateArrayPointSettings() {
    this.calculateArrayPoints = [];
    debugger;
    this.calculateArray.optimalRoutes.forEach(item=>{
      this.coords.forEach(city => {
        if(city.id.toString() == item){
          this.calculateArrayPoints.push(city);
        }
      })
    });
    this.calculateArrayDraw();
  }

  private calculateArrayDraw(){
    debugger;
    this.drawShape(this.calculateArrayPoints[0].x,this.calculateArrayPoints[0].y,'red',3)
    for (let i=0;i<this.calculateArrayPoints.length-1;i++){
      this.drawLine(this.calculateArrayPoints[i].x,
        this.calculateArrayPoints[i].y,
        this.calculateArrayPoints[i+1].x,
        this.calculateArrayPoints[i+1].y,
        this.getRandomColor(),
        3);
    }
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

