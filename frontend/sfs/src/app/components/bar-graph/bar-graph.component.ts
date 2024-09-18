import { Component, OnInit, ElementRef, Input, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})

export class BarGraphComponent implements OnInit {

  @Input('teachersList') teachersList: any;


  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    this.createSvg();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.drawBars(this.teachersList);
  }

  private createSvg(): void {
    this.svg = d3.select(this.elRef.nativeElement)
      .select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    if (data && data.length) {
      const x = d3.scaleBand()
        .range([0, this.width])
        .domain(data.map(d => d.name))
        .padding(0.2);

      this.svg.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Create the Y-axis scale
      const y = d3.scaleLinear()
        .domain([0, 5])
        .range([this.height, 0]);

      this.svg.append("g")
        .call(d3.axisLeft(y));

      // Create the bars
      this.svg.selectAll("bars")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d: { name: any; }) => x(d.name))
        .attr("y", (d: { rating: any; }) => y(d.rating))
        .attr("width", x.bandwidth())
        .attr("height", (d: { value: any; }) => this.height - y(d.value))
        .attr("fill", "#d04a35");
    }
  }
}
