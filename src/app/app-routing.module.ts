import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AuthGuard } from "./guards/auth.guard";
import { HistoryComponent } from "./pages/history/history.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { MainComponent } from "./pages/main/main.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { SignupComponent } from "./pages/signup/signup.component";

const routes: Routes = [
   {
      path: "",
      pathMatch: "full",
      redirectTo: "login",
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
      path: "main",
      component: MainComponent,
      //canActivate: [AuthGuard],
      children: [
         {
            path: "home",
            component: HomeComponent,
         },
         {
            path: "profile",
            component: ProfileComponent,
         },
         {
            path: "history",
            component: HistoryComponent,
         },
      ],
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
