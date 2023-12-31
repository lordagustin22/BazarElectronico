import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';

import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { LayoutComponent } from './layout.component';

import { FormsModule } from '@angular/forms';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { SearchbarComponent } from 'src/app/shared/components/searchbar/searchbar.component';

@NgModule({
	declarations: [LayoutComponent, FooterComponent],
	imports: [
		ButtonModule,
		DividerModule,
		InputTextModule,
		RippleModule,
		StyleClassModule,
		FormsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatPaginatorModule,
		AppRoutingModule,
		SearchbarComponent,
		NavbarComponent,
	],
	exports: [LayoutComponent],
})
export class LayoutModule {}
