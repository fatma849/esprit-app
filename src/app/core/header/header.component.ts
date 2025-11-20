import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user = {
    name: 'directeur_generale',
    role: 'Directeur général',
    avatar: 'assets/avatar.png' // ton image (mets le vrai chemin)
  };
}
