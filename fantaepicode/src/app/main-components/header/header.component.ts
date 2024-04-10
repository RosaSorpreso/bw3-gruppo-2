import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  user: iUser | undefined;

  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);

  constructor(private authSvc:AuthService) { }

  ngOnInit() {
    this.authSvc.user$.subscribe(user => {
      this.user = user || undefined;
    })
  }

  logout(){
    this.authSvc.logout();
  }

}
