import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
	apiKey: 'AIzaSyDeiFVwYAkMpGFV9KJmOGOzbtgodlDKL-g',
	authDomain: 'barkparkapp-cbf40.firebaseapp.com',
	databaseURL: 'https://barkparkapp-cbf40.firebaseio.com',
	projectId: 'barkparkapp-cbf40',
	storageBucket: 'barkparkapp-cbf40.appspot.com',
	messagingSenderId: '570123592403',
	appId: '1:570123592403:web:15ae6f19117a3716112a26',
};
firebase.initializeApp(config);
export default firebase;
