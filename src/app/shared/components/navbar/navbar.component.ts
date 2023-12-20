import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [SearchbarComponent, RouterModule],
})
export class NavbarComponent {
  title = 'ElectroBazar';
}
