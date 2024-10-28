import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {AboutComponent} from "./pages/about/about.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {ProductComponent} from "./pages/product/product.component";
import {MenuComponent} from "./pages/menu/menu.component";
import {BattnsComponent} from "./companents/battns/battns.component";
import {FooterComponent} from "./companents/footer/footer.component";
import {CardsComponent} from "./pages/cards/cards.component";
import {DimaxodlarComponent} from "./pages/dimaxodlar/dimaxodlar.component";
import {GumbzalarComponent} from "./pages/gumbzalar/gumbzalar.component";
import {ProfnastillarComponent} from "./pages/profnastillar/profnastillar.component";
import {AksesuarlarComponent} from "./pages/aksesuarlar/aksesuarlar.component";
import {VintilatsiyaComponent} from "./pages/vintilatsiya/vintilatsiya.component";
import {TurbalarComponent} from "./pages/turbalar/turbalar.component";
import {NewproductComponent} from "./pages/newproduct/newproduct.component";

export const routes: Routes = [

  {path : 'about/menu', component : MenuComponent},
  {path : 'about/product', component : ProductComponent},
  {path : 'about/gumbazlar', component : GumbzalarComponent},
  {path : 'about/contact', component : ContactComponent},
  {path : 'about/dimaxodlar', component : DimaxodlarComponent},
  {path : 'about/gumbazlar', component : GumbzalarComponent},
  {path : 'about/profnastil', component : ProfnastillarComponent},
  {path : 'about/aksesuarlar', component : AksesuarlarComponent},
  {path : 'about/vintilatsiya', component : VintilatsiyaComponent},
  {path : 'about/turubalar', component : TurbalarComponent},



  {path : '', component : AboutComponent},
  {path : 'login', component : LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'about', component : AboutComponent},
  {path : 'contact', component : ContactComponent},
  {path : 'product', component : ProductComponent},
  {path : 'menu', component : MenuComponent},
  {path : 'footer', component : FooterComponent},
  {path : 'cards', component : CardsComponent},

  {path : 'about/menu/dimaxodlar', component : DimaxodlarComponent},
  {path : 'about/menu/gumbazlar', component : GumbzalarComponent},
  {path : 'about/menu/profnastillar', component : ProfnastillarComponent},
  {path : 'about/menu/aksesuarlar', component : AksesuarlarComponent},
  {path : 'about/menu/vintilatsiya', component : VintilatsiyaComponent},
  {path : 'about/menu/turubalar', component : TurbalarComponent},

  {path : 'menu/about', component : AboutComponent},
  {path : 'menu/menu', component : MenuComponent},
  {path : 'menu/product', component : ProductComponent},
  {path : 'menu/contact', component : ContactComponent},
  {path : 'menu/dimaxodlar', component : DimaxodlarComponent},
  {path : 'menu/gumbazlar', component : GumbzalarComponent},
  {path : 'menu/profnastillar', component : ProfnastillarComponent},
  {path : 'menu/aksesuarlar', component : AksesuarlarComponent},
  {path : 'menu/vintilatsiya', component : VintilatsiyaComponent},
  {path : 'menu/turubalar', component : TurbalarComponent},

  {path : 'menu/menu/about', component : AboutComponent},
  {path : 'menu/menu/product', component : ProductComponent},
  {path : 'menu/menu/contact', component : ContactComponent},
  {path : 'menu/menu/dimaxodlar', component : DimaxodlarComponent},
  {path : 'menu/menu/gumbazlar', component : GumbzalarComponent},
  {path : 'menu/menu/profnastillar', component : ProfnastillarComponent},
  {path : 'menu/menu/aksesuarlar', component : AksesuarlarComponent},
  {path : 'menu/menu/vintilatsiya', component : VintilatsiyaComponent},
  {path : 'menu/menu/turubalar', component : TurbalarComponent},
  {path : 'details/:id', component : NewproductComponent},

  {path : 'contact/gumbazlar', component : GumbzalarComponent},
  {path : 'contact/dimaxodlar', component : DimaxodlarComponent},
  {path : 'contact/profnastil', component : ProfnastillarComponent},
  {path : 'contact/aksesuarlar', component : AksesuarlarComponent},
  {path : 'contact/vintilatsiya', component : VintilatsiyaComponent},
  {path : 'contact/turubalar', component : TurbalarComponent},

  {path : 'contact/about', component : AboutComponent},
  {path : 'contact/menu', component : MenuComponent},
  {path : 'contact/product', component : ProductComponent},
  {path : 'contact/gumbazlar', component : GumbzalarComponent},
  {path : 'contact/contact', component : ContactComponent},

  {path : 'about', component : AboutComponent},
  {path : 'menu', component : MenuComponent},
  {path : 'product', component : ProductComponent},
  {path : 'gumbazlar', component : GumbzalarComponent},
  {path : 'contact', component : ContactComponent},
  {path : 'dimaxodlar', component : DimaxodlarComponent},
  {path : 'gumbazlar', component : GumbzalarComponent},
  {path : 'profnastil', component : ProfnastillarComponent},
  {path : 'aksesuarlar', component : AksesuarlarComponent},
  {path : 'vintilatsiya', component : VintilatsiyaComponent},
  {path : 'turubalar', component : TurbalarComponent},

  {path : 'produc/tabout', component : AboutComponent},
  {path : 'product/menu', component : MenuComponent},
  {path : 'product/product', component : ProductComponent},
  {path : 'product/gumbazlar', component : GumbzalarComponent},
  {path : 'product/contact', component : ContactComponent},
  {path : 'product/dimaxodlar', component : DimaxodlarComponent},
  {path : 'product/gumbazlar', component : GumbzalarComponent},
  {path : 'product/profnastil', component : ProfnastillarComponent},
  {path : 'product/aksesuarlar', component : AksesuarlarComponent},
  {path : 'product/vintilatsiya', component : VintilatsiyaComponent},
  {path : 'product/turubalar', component : TurbalarComponent},


  // {path : '**', component : AboutComponent},
  {path: '**', redirectTo: '/about', pathMatch: 'prefix' }

];
