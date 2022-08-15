import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteModule } from './site/site.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./core/security/auth.interceptor";
import { AuthGuard } from "./core/security/auth.guard";
import { AccountRolePipe } from './core/pipes/account-role.pipe';
import { AdminGuard } from "./core/security/admin.guard";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";

@NgModule({
  declarations: [
    AppComponent,
    AccountRolePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SiteModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    [AuthGuard],
    [AdminGuard]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
