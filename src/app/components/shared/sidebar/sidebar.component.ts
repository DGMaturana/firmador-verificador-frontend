import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  private authService = inject(AuthService);
  private router = inject( Router );
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
