import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashbordComponent } from './comps/adminComp/admin-dashbord/admin-dashbord.component';
import { AdminoverviewComponent } from './comps/adminComp/adminoverview/adminoverview.component';
import { ProdactaddComponent } from './comps/adminComp/prodactadd/prodactadd.component';
import { LoginComponent } from './comps/logincomp/login/login.component';
import { ProdactlistComponent } from './comps/adminComp/prodactlist/prodactlist.component';
import { ProdacteditComponent } from './comps/adminComp/prodactedit/prodactedit.component';
import { UseraddComponent } from './comps/adminComp/useradd/useradd.component';
import { UserlistComponent } from './comps/adminComp/userlist/userlist.component';
import { OrderComponent } from './comps/adminComp/order/order.component';
import { FeedbackComponent } from './comps/adminComp/feedback/feedback.component';
import { ShippingComponent } from './comps/adminComp/shipping/shipping.component';
import { CopondComponent } from './comps/adminComp/copond/copond.component';
import { GeneratecopComponent } from './comps/adminComp/generatecop/generatecop.component';
import { AboutPAgeComponent } from './comps/statuccomp/about-page/about-page.component';
import { UserprofileComponent } from './comps/usercomp/userprofile/userprofile.component';
import { ListprojectComponent } from './comps/statuccomp/listproject/listproject.component';
import { CatagoryComponent } from './comps/statuccomp/catagory/catagory.component';
import { AnalysisChartComponent } from './comps/adminComp/analysis-chart/analysis-chart.component';
import { AnalysisProdactComponent } from './comps/adminComp/analysis-prodact/analysis-prodact.component';
import { Error404Component } from './comps/error404/error404.component';
import { ViewCartComponent } from './comps/usercomp/view-cart/view-cart.component';
import { ThankyouComponent } from './comps/usercomp/thankyou/thankyou.component';
import { ChatComponent } from './comps/usercomp/chat/chat.component';
import { ViewordersComponent } from './comps/usercomp/vieworders/vieworders.component';
import { NewloginComponent } from './comps/newlogin/newlogin.component';
import { HoverComponent } from './temp/hover/hover.component';
import { ProdactDetailsComponent } from './comps/usercomp/prodact-details/prodact-details.component';
import { OrdersucComponent } from './comps/usercomp/ordersuc/ordersuc.component';
import { VegetablesComponent } from './components/vegetables/vegetables.component';
import { FruitsComponent } from './components/fruits/fruits.component';
import { NutsComponent } from './components/nuts/nuts.component';
import { OilsComponent } from './components/oils/oils.component';
import { ProductslistComponent } from './components/productslist/productslist.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { EmailTestComponent } from './components/email-test/email-test.component';
// import { AuthGuard } from './services/auth/auth.guard'; // Import the AuthGuard
import { authGuard } from './services/auth/auth.guard';
import { AccessDenaiComponent } from './components/access-denai/access-denai.component';

const routes: Routes = [
  { path: "login", component: NewloginComponent },
  { path: "signin", component: NewloginComponent },
  { path:"", component:HomepageComponent},
  // admin children routing with guard
  {
    path: "admindash",
    component: AdminDashbordComponent,
    canActivate: [authGuard], // Protecting the admin dashboard
    children: [
      { path: "", component: AnalysisChartComponent },
      { path: "prodactadd", component: ProdactaddComponent },
      { path: "prodactlist", component: ProdactlistComponent },
      { path: ":id/editeprodact", component: ProdacteditComponent },
      { path: "useradd", component: UseraddComponent },
      { path: "userlist", component: UserlistComponent },
      { path: "orderlist", component: OrderComponent },
      { path: "feedback", component: FeedbackComponent },
      { path: "shipping", component: ShippingComponent },
      { path: "copond", component: CopondComponent },
      { path: "gencop", component: GeneratecopComponent },
      { path: "userprofile", component: UserprofileComponent },
      { path: "chart", component: AnalysisChartComponent },
      { path: "chart1", component: AnalysisProdactComponent },
      { path: "adminoverview", component: AdminoverviewComponent },
    ]
  },

  { path: "landingpage", component: HomepageComponent },
  { path: "about", component: AboutPAgeComponent },
  // Protected routes
  {
    path: "prodact",
    component: ProductslistComponent,
    canActivate: [authGuard],
    children: [
      { path: "", component: FruitsComponent },
      { path: "fruits", component: FruitsComponent },
      { path: "vegetables", component: VegetablesComponent },
      { path: "nuts", component: NutsComponent },
      { path: "oils", component: OilsComponent },
      { path: "cart", component: ViewCartComponent },
      { path: "orderview", component: ViewordersComponent },
      { path: "orders", component: OrdersucComponent },
      { path: "catagory", component: CatagoryComponent },
      { path: "thankyou", component: ThankyouComponent },
      { path: "userprofile", component: UserprofileComponent },
    ]
  },

  {path:"access-denied", component:AccessDenaiComponent},

  // Other routes
  // { path: "hover", component: HoverComponent },
  // { path: "prodact", component: ProdactDetailsComponent },
  
  { path: "email", component: EmailTestComponent },
  
  
  // { path: "prodactlist", component: ListprojectComponent },
  { path: "home", component: CatagoryComponent},
  { path: "**", component: Error404Component },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
