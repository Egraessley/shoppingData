import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';

@Component({
  selector: 'sd-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isAdmin = false;
  isSuper = false;

  constructor(private authservice: AuthenticationService ) { }

  ngOnInit() {
    if(this.authservice.currentUser)
    {
      this.isAdmin = this.authservice.currentUser.isAdmin;
      this.isSuper = this.authservice.currentUser.isSuper;
    } 
  }

}
