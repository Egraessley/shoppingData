import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';

@Component({
  selector: 'sd-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  name = '';
  constructor(private authservice: AuthenticationService) { }

  ngOnInit() {
    if(this.authservice.currentUser)
    {
      this.name = this.authservice.currentUser.userName;
    }
  }

}
