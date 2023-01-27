import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AuthGuard } from "./guards/auth.guard";
import { HistoryComponent } from "./pages/history/history.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { SignupComponent } from "./pages/signup/signup.component";

const routes: Routes = [
   {
      path: "home",
      component: HomeComponent,
      //canActivate: [AuthGuard],
   },
   {
      path: "signup",
      component: SignupComponent,
   },
   {
      path: "login",
      component: LoginComponent,
   },
   {
      path: "home",
      component: HomeComponent,
   },
   {
      path: "home/:category",
      component: HomeComponent,
   },
   {
      path: "home/:category/:food",
      component: HomeComponent,
   },
   {
      path: "profile",
      component: ProfileComponent,
      canActivate: [AuthGuard],
   },
   {
      path: "history",
      component: HistoryComponent,
      canActivate: [AuthGuard],
   },
   {
      path: "**",
      component: NotFoundComponent,
   },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
