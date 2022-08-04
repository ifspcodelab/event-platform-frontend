import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RegistrationService } from "../../../core/services/registration.service";
import { first } from "rxjs";

@Component({
  selector: 'app-registration-verify',
  templateUrl: './registration-verify.component.html',
  styleUrls: ['./registration-verify.component.scss']
})
export class RegistrationVerifyComponent implements OnInit {
  token: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.verifyToken(this.token);
  }

  verifyToken(token: string): void {
    this.registrationService.patchAccount(token)
      .pipe(first())
      .subscribe({
        next: () => {
          alert("Conta verificada com sucesso!");
          this.router.navigate(['login']);
        }
      })
  }
}
