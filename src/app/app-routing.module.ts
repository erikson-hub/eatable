import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AuthGuard } from "./guards/auth.guard";
import { EditProfileComponent } from "./pages/edit-profile/edit-profile.component";
import { HistoryComponent } from "./pages/history/history.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { CartComponent } from "./pages/cart/cart.component";

const routes: Routes = [
   {
      path: "",
      pathMatch: "full",
      redirectTo: "home",
   },
   {
      path: "home",
      component: HomeComponent,
      canActivate: [AuthGuard],
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
      path: "signup",
      component: SignupComponent,
   },
   {
      path: "login",
      component: LoginComponent,
   },
   {
      path: "profile",
      component: ProfileComponent,
      canActivate: [AuthGuard],
   },
   {
      path: "profile/edit",
      component: EditProfileComponent,
      canActivate: [AuthGuard],
   },
   {
      path: "history",
      component: HistoryComponent,
      canActivate: [AuthGuard],
   },
   {
      path: "cart",
      component: CartComponent,
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
