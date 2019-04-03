import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';
import { Facebook } from '@ionic-native/facebook/ngx';

/* Login Mail: https://javebratt.com/ionic-firebase-tutorial-auth/ */
/* Login Google: https://devdactic.com/google-sign-in-ionic-firebase/ */
/* Login Facebook: https://blog.ionicframework.com/ionic-firebase-facebook-login/ */

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	userProfile: any = null;

	constructor(private gplus: GooglePlus, private facebook: Facebook, private platform: Platform) {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.userProfile = user;
			} else {
				this.userProfile = null;
			}
		});
	}

	loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	async loginGooglePlus(): Promise<any> {
		//return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
		if (this.platform.is('cordova')) {
			try {
				const gplog = await this.gplus.login({
					'webClientId': '208139077873-nedaqhajbjig8lfjj908uh91panj7k72.apps.googleusercontent.com',
					'offline': true
				}).then(
					res => {console.log("res", res); return res;},
					err => {console.error("err", err); return undefined;}
				);
				const googleCredential = firebase.auth.GoogleAuthProvider.credential(gplog.idToken);
				const user = firebase.auth().signInWithCredential(googleCredential);
				return user;
			} catch(e) {
				console.error(e);
				return undefined;
			}
			
		} else {
			return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
		}
	}

	async loginFacebook(): Promise<any> {
		if (this.platform.is('cordova')) {
			return this.facebook.login(['email']).then( response => {
				const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
				firebase.auth().signInWithCredential(facebookCredential).then( success => { 
					console.log("Firebase success: " + JSON.stringify(success)); 
				});
			})
		} else {
			return firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
		}
	}

	signupUser(email: string, password: string): Promise<any> {
		return firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((newUserCredential: firebase.auth.UserCredential) => {
				firebase
					.firestore()
					.doc(`/userProfile/${newUserCredential.user.uid}`)
					.set({ email });
			})
			.catch(error => {
				console.error(error);
				throw new Error(error);
			});
	}

	resetPassword(email: string): Promise<void> {
		return firebase.auth().sendPasswordResetEmail(email);
	}

	logoutUser(): Promise<void> {
		return firebase.auth().signOut();
	}
}