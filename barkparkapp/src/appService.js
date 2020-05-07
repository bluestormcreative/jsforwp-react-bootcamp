import firebase from './firebase';

export default new (class AppService {
	login = (email, password) => {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	};

	logout = () => {
		return firebase.auth().signOut();
	};

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

	subscribeToEvents = (callback) => {
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
	};

	getUserData = async (user) => {
		const snapshot = await firebase
			.database()
			.ref('/users/' + user.uid)
			.once('value');
		const userInfo = { ...snapshot.val() };
		return userInfo;
	};
})();
