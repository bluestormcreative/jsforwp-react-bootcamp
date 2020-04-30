import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
	apiKey: 'AIzaSyBwYvHJC8pV0SM0SJa7FJPKB9jzMDR2PiU',
	authDomain: 'jsforwp-react-blog-demo.firebaseapp.com',
	databaseURL: 'https://jsforwp-react-blog-demo.firebaseio.com',
	projectId: 'jsforwp-react-blog-demo',
	storageBucket: 'jsforwp-react-blog-demo.appspot.com',
	messagingSenderId: '913404506441',
	appId: '1:913404506441:web:4b48c8e96bfca5749aaa98',
};
firebase.initializeApp(config);
export default firebase;
