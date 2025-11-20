import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'app-dash',
  template: `
    <iframe
      [src]="embedUrl"
      width="100%" height="900"
      frameborder="0" allowfullscreen="true">
    </iframe>
  `
})
export class Dash4Page {
  embedUrl: SafeResourceUrl;
  constructor(private s: DomSanitizer) {
    const url =
       'https://app.powerbi.com/reportEmbed?reportId=68288e7d-594a-44f1-8076-b727659cc34f&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730&pageName=46e9b17a79663c5d04a5&filterPaneEnabled=false&navContentPaneEnabled=false';

    this.embedUrl = this.s.bypassSecurityTrustResourceUrl(url);
  }
}

