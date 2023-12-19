import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './components/layout/layout.module';
import { HomeModule } from './home/home.module';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EditDeleteComponent } from './home/admin/edit-delete/edit-delete.component';
import { DetallesComponent } from './home/pages/detalles/detalles.component';

@NgModule({
  declarations: [AppComponent, EditDeleteComponent, DetallesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HomeModule,
    LayoutModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
