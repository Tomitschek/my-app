import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {ConnectionService} from 'ng-connection-service';
import {AuthService} from '../auth/auth.service';
import {User} from '../auth/user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  isConnected = true;
  status = 'ONLINE';
  user: User;

  isAuth = false;
  authSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private breakpointObserver: BreakpointObserver, connectionService: ConnectionService, private auth: AuthService) {
    connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = 'ONLINE';
        console.log(this.isConnected);
      } else {
        this.status = 'OFFLINE';
        console.log(this.isConnected);
      }
    });
  }

  ngOnInit() {
    this.authSubscription = this.auth.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
    this.userSubscription = this.auth.user$.subscribe(user =>
      this.user = user);
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
