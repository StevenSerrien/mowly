import { Component } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { BusinessComponent } from './business/business.component';
import { AuthenticationService } from './services/authentication.service';


@Component({
  selector: 'mowly-app',
  templateUrl: 'app/app.component.html'
})
export class AppComponent {
  constructor(private auth: AuthenticationService) { }


 }
