import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ml-shell',
  standalone: true,
  templateUrl: './ml-shell.html',
  styleUrl: './ml-shell.scss',
  imports: [
    RouterModule,
    MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatButtonModule
  ],
})
export class MlShellComponent {}
