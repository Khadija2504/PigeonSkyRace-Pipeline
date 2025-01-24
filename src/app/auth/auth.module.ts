import { NgModule } from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RegisterComponent,
    AuthComponent,
    LoginComponent
  ],
  imports:[AuthRoutingModule,ReactiveFormsModule]
})
export class AuthModule { }
