import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-pie-pagina",
  templateUrl: "./pie-pagina.component.html",
  styleUrls: ["./pie-pagina.component.css"],
})
export class PiePaginaComponent implements OnInit {
  test: Date = new Date();

  constructor(private router: Router) {}

  ngOnInit() {}
  getPath() {
    return this.router.url;
  }
}
