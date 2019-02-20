import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

/* Login Mail : https://javebratt.com/ionic-firebase-tutorial-auth/ */
/* Login Google: https://devdactic.com/google-sign-in-ionic-firebase/ */

@Injectable({
	providedIn: 'root',
})
export class AuthService {

	userProfile: any = null;

	constructor(private gplus: GooglePlus, private platform: Platform) {
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

	loginGooglePlus(): Promise<any> {
		if (this.platform.is('cordova')) {
			return this.gplus.login({
				'webClientId': '208139077873-6psqspu1cnralua03ns53qa0n0ndvroc.apps.googleusercontent.com',
				'offline': true
			}).then(res => {
				const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);

				firebase.auth().signInWithCredential(googleCredential);
			});
		} else {
			return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
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