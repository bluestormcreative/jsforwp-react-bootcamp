import firebase from './firebase';

export default new (class AppService {
	login(email, password) {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	logout() {
		return firebase.auth().signOut();
	}

	saveNewEvent = (event) => {
		return firebase
			.database()
			.ref('events')
			.push({
				...event,
			});
	};

	deleteEvent = (event) => {
		return firebase.database().ref(`events/${event.key}`).remove();
	};

	subscribeToEvents(callback) {
		firebase
			.database()
			.ref('events')
			.on('value', (snapshot) => {
				const events = snapshot.val();
				const newStateEvents = [];
				for (let event in events) {
					newStateEvents.push({
						key: event,
						start: new Date(events[event].start),
						end: new Date(events[event].end),
						title: events[event].title,
						userID: events[event].userID,
						qrValue: events[event].qrValue,
					});
				}
				callback(newStateEvents);
			});
	}

	getCurrentUser() {
		return firebase.auth().currentUser;
	}

	// getUserData(userID, callback) {
	// 	console.log(userID); // eslint-disable-line no-console
	// 	firebase
	// 		.database()
	// 		.ref('users/' + userID)
	// 		.on('value', (snapshot) => {
	// 			const user = snapshot.val();
	// 			const newUserData = {
	// 				userName: user.userName,
	// 				petNames: user.petNames,
	// 				reservedSlots: user.reservedSlots,
	// 				availSlots: user.availSlots,
	// 			};
	// 			callback(newUserData);
	// 		});
	// }
})();
