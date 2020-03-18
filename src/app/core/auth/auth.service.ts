import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

@Injectable()
export class AuthService {
  public authChange = new Subject<boolean>();
  public user$: Observable<User>;
  public userkey: string;

  private isAuthenticated = false;

  constructor(private router: Router,
              private afs: AngularFirestore,
              private afAuth: AngularFireAuth) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in

        if (user) {
          console.log('users$', user);
          this.userkey = user.uid;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.authSuccessfully(result.user);
      })
      .catch(error => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.authSuccessfully(result.user);
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
  }

  isAuth() {
    return this.isAuthenticated;
  }

  canRead(user: User): boolean {
    const allowed = ['admin', 'arzt', 'schwester', 'mitarbeiter'];
    return this.checkAthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'arzt'];
    return this.checkAthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAthorization(user, allowed);
  }

  private authSuccessfully(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        mitarbeiter: true
      }
    };
    console.log(user.uid);
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/patientslist']);
    return userRef.set(data, {merge: true});
  }

  private checkAthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

}
