import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashbordComponent } from './comps/adminComp/admin-dashbord/admin-dashbord.component';
import { AdminoverviewComponent } from './comps/adminComp/adminoverview/adminoverview.component';
import { UserlistComponent } from './comps/adminComp/userlist/userlist.component';
import { UseraddComponent } from './comps/adminComp/useradd/useradd.component';
import { ProdactlistComponent } from './comps/adminComp/prodactlist/prodactlist.component';
import { ProdactaddComponent } from './comps/adminComp/prodactadd/prodactadd.component';
import { ProdacteditComponent } from './comps/adminComp/prodactedit/prodactedit.component';
import { ShippingComponent } from './comps/adminComp/shipping/shipping.component';
import { OrderComponent } from './comps/adminComp/order/order.component';
import { FeedbackComponent } from './comps/adminComp/feedback/feedback.component';
import { CopondComponent } from './comps/adminComp/copond/copond.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './comps/logincomp/login/login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeneratecopComponent } from './comps/adminComp/generatecop/generatecop.component';
import { CaroselComponent } from './comps/statuccomp/carosel/carosel.component';
import { AboutPAgeComponent } from './comps/statuccomp/about-page/about-page.component';
import { UserprofileComponent } from './comps/usercomp/userprofile/userprofile.component';
import { TeamsComponent } from './comps/statuccomp/teams/teams.component';
import { ScroolComponent } from './comps/statuccomp/scrool/scrool.component';
import { FeedbackformComponent } from './comps/statuccomp/feedbackform/feedbackform.component';
// import { NavbarComponent } from './comps/statuccomp/navbar/navbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CatagoryComponent } from './comps/statuccomp/catagory/catagory.component';
import { ListprojectComponent } from './comps/statuccomp/listproject/listproject.component';
import { AnalysisChartComponent } from './comps/adminComp/analysis-chart/analysis-chart.component';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { AnalysisProdactComponent } from './comps/adminComp/analysis-prodact/analysis-prodact.component';
// import { LoadingpageComponent } from './comps/loadingpage/loadingpage.component';
// import { EmailtestComponent } from './comps/emailtest/emailtest.component';
import { Error404Component } from './comps/error404/error404.component';
// import { ThankyouComponent } from './check_out/thankyou/thankyou.component';
import { ViewCartComponent } from './comps/usercomp/view-cart/view-cart.component';
import { ViewOrdersComponent } from './comps/usercomp/view-orders/view-orders.component';

import { IgxCategoryChartModule } from 'igniteui-angular-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BootstrapcaroselComponent } from './comps/LandingPage/bootstrapcarosel/bootstrapcarosel.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';


import { NgApexchartsModule } from 'ng-apexcharts';  // Import NgApexchartsModule


import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea'; 
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ApexchartComponent } from './comps/adminComp/apexchart/apexchart.component';
import { ChatComponent } from './comps/usercomp/chat/chat.component';
import { ToastComponent } from './comps/services/toast/toast.component';
import { ViewordersComponent } from './comps/usercomp/vieworders/vieworders.component';
import { NewloginComponent } from './comps/newlogin/newlogin.component';
import { HoverComponent } from './temp/hover/hover.component';
import { ChatbotComponent } from './chatbot/chatbot/chatbot.component';
import { SpinnerComponent } from './comps/services/spinner/spinner.component';
import { ProdactDetailsComponent } from './comps/usercomp/prodact-details/prodact-details.component';
import { ErrorboardComponent } from './comps/services/errorboard/errorboard.component';
import { OrdersucComponent } from './comps/usercomp/ordersuc/ordersuc.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { FooterComponent } from './components/footer/footer.component';
import { FreshproductsComponent } from './components/freshproducts/freshproducts.component';
import { FruitsComponent } from './components/fruits/fruits.component';
import { HomecarouselComponent } from './components/homecarousel/homecarousel.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HomepagecustomerreviewsComponent } from './components/homepagecustomerreviews/homepagecustomerreviews.component';
import { HomepagetitleComponent } from './components/homepagetitle/homepagetitle.component';
import { NutsComponent } from './components/nuts/nuts.component';
import { OilsComponent } from './components/oils/oils.component';
import { OurlatestproductsComponent } from './components/ourlatestproducts/ourlatestproducts.component';
import { ProductslistComponent } from './components/productslist/productslist.component';
import { TwelveComponent } from './components/twelve/twelve.component';
import { VegetablesComponent } from './components/vegetables/vegetables.component';
import { EmailTestComponent } from './components/email-test/email-test.component';
import { AccessDenaiComponent } from './components/access-denai/access-denai.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminDashbordComponent,
    AdminoverviewComponent,
    UserlistComponent,
    UseraddComponent,
    ProdactlistComponent,
    ProdactaddComponent,
    ProdacteditComponent,
    ShippingComponent,
    OrderComponent,
    FeedbackComponent,
    CopondComponent,
    LoginComponent,
    GeneratecopComponent,
    CaroselComponent,
    AboutPAgeComponent,
    UserprofileComponent,
    TeamsComponent,
    ScroolComponent,
    FeedbackformComponent,
    NavbarComponent,
    CatagoryComponent,
    ListprojectComponent,
    AnalysisChartComponent,
    AnalysisProdactComponent,
    Error404Component,
    ViewCartComponent,
    ApexchartComponent,
    ChatComponent,
    ToastComponent,
    ViewordersComponent,
    NewloginComponent,
    HoverComponent,
    ChatbotComponent,
    SpinnerComponent,
    ProdactDetailsComponent,
    ErrorboardComponent,
    OrdersucComponent,
    CarouselComponent,
    ContactusComponent,
    FooterComponent,
    FreshproductsComponent,
    FruitsComponent,
    HomecarouselComponent,
    HomepageComponent,
    HomepagecustomerreviewsComponent,
    HomepagetitleComponent,
    NutsComponent,
    OilsComponent,
    OurlatestproductsComponent,
    ProductslistComponent,
    TwelveComponent,
    VegetablesComponent,
    EmailTestComponent,
    AccessDenaiComponent,
    

    
    
    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CanvasJSAngularChartsModule,
    IgxCategoryChartModule,
    BrowserAnimationsModule,
    TooltipModule,
    CarouselModule.forRoot(),
    CascadeSelectModule,
    FloatLabelModule,
    InputTextModule,
    InputNumberModule,
    FileUploadModule,
    InputTextareaModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    NgApexchartsModule,
    CommonModule


    
  ],
  providers: [
    provideClientHydration(),
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
