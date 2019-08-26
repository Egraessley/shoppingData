import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sd-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onLogOut() {
    this.router.navigateByUrl('login');
  }
}
