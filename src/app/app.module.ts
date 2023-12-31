import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './components/layout/layout.module';
import { HomeModule } from './home/home.module';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
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
    provideFirebaseApp(() => initializeApp({"projectId":"bazarelectronico-347d2","appId":"1:812323407064:web:042203b640dc91d69f43ad","storageBucket":"bazarelectronico-347d2.appspot.com","locationId":"us-central","apiKey":"AIzaSyBLbAnbZwyNuzpDVxf4k01Cz_ykD5bWfzo","authDomain":"bazarelectronico-347d2.firebaseapp.com","messagingSenderId":"812323407064"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
