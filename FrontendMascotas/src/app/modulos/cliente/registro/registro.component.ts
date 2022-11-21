import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  test: Date = new Date();
  focus;
  focus1;
  focus2;
  constructor() {}

  ngOnInit(): void {}
}
