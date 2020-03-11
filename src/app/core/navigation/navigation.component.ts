import {Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {ConnectionService} from 'ng-connection-service';

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

  constructor(private breakpointObserver: BreakpointObserver, connectionService: ConnectionService) {
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

}
