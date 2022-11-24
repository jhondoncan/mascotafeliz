import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UsuarioService } from "src/app/servicios/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-eliminar-usuario",
  templateUrl: "./eliminar-usuario.component.html",
  styleUrls: ["./eliminar-usuario.component.css"],
})
export class EliminarUsuarioComponent implements OnInit {
  id: String = "";

  constructor(
    private usuarioServicio: UsuarioService,
    private router: Router,
    private routerActivo: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.routerActivo.snapshot.params["id"];
    this.usuarioServicio.eliminarUsuario(this.id).subscribe(
      (data) => {
        this.router.navigate(["/usuarios"]);
        Swal.fire({
          title: "",
          text: "El usuario ha sido eliminado.",
          icon: "success",
          confirmButtonColor: "#5E72E4",
        });
      },
      (error) => {
        this.router.navigate(["/usuarios"]);
        Swal.fire({
          title: "",
          text: "Se ha producido un error al eliminar el usuario.",
          icon: "error",
          confirmButtonColor: "#5E72E4",
        });
      }
    );
  }
}
