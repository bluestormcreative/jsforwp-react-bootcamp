import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import SimpleStorage from 'react-simple-storage';
import firebase from './firebase';
import Header from './components/Header';
import Posts from './components/Posts';
import Post from './components/Post';
import PostForm from './components/PostForm';
import NotFound from './components/NotFound';
import Messages from './components/Messages';
import Login from './components/Login';
import './App.css';

class App extends Component {
	state = {
		isAuthenticated: false,
		posts: [],
		message: null,
	};

	onLogin = (email, password) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((user) => this.setState({ isAuthenticated: true }))
			.catch((error) => console.log(error));
	};

	onLogout = () => {
		firebase
			.auth()
			.signOut()
			.then(() => this.setState({ isAuthenticated: false }))
			.catch((error) => console.log(error));
	};

	displayMessage = (type) => {
		this.setState({ message: type });
		setTimeout(() => {
			this.setState({ message: null });
		}, 1600);
	};

	getNewSlugFromTitle = (title) =>
		encodeURIComponent(title.toLowerCase().split(' ').join('-'));

	addNewPost = (post) => {
		const postsRef = firebase.database().ref('posts'); // Get the posts dataset.
		post.slug = this.getNewSlugFromTitle(post.title);
		delete post.key; // Delete the null post default key.
		postsRef.push(post); // Push the new post to the database.
		this.displayMessage('saved');
	};

	updatePost = (post) => {
		const postRef = firebase.database().ref('posts/' + post.key);
		postRef.update({
			// Update method from Firebase.
			slug: this.getNewSlugFromTitle(post.title),
			title: post.title,
			content: post.content,
		});
		this.displayMessage('updated');
	};

	deletePost = (post) => {
		if (window.confirm('Delete this post?')) {
			const postRef = firebase.database().ref('posts/' + post.key);
			postRef.remove();
			this.displayMessage('deleted');
		}
	};

	componentDidMount() {
		const postsRef = firebase.database().ref('posts');
		postsRef.on('value', (snapshot) => {
			const posts = snapshot.val();
			const newStatePosts = [];
			for (let post in posts) {
				newStatePosts.push({
					key: post,
					slug: posts[post].slug,
					title: posts[post].title,
					content: posts[post].content,
				});
			}
			this.setState({ posts: newStatePosts });
		});
	}

	render() {
		return (
			<Router>
				<div className='App'>
					<SimpleStorage parent={this} />
					<Header
						isAuthenticated={this.state.isAuthenticated}
						onLogout={this.onLogout}
					/>
					{this.state.message && (
						<Messages type={this.state.message} />
					)}
					<Switch>
						<Route
							exact
							path='/'
							render={() => (
								<Posts
									isAuthenticated={this.state.isAuthenticated}
									posts={this.state.posts}
									deletePost={this.deletePost}
								/>
							)}
						/>
						<Route
							path='/post/:postSlug'
							render={(props) => {
								const post = this.state.posts.find(
									(post) =>
										post.slug ===
										props.match.params.postSlug // This match prop comes from react-router-dom.
								);
								if (post) return <Post post={post} />;
								else return <NotFound />;
							}}
						/>
						<Route
							exact
							path='/login'
							render={() =>
								!this.state.isAuthenticated ? (
									<Login onLogin={this.onLogin} />
								) : (
									<Redirect to='/' />
								)
							}
						/>
						<Route
							exact
							path='/new'
							render={() =>
								this.state.isAuthenticated ? (
									<PostForm
										addNewPost={this.addNewPost}
										post={{
											key: null,
											slug: '',
											title: '',
											content: '',
										}}
									/>
								) : (
									<Redirect to='/login' />
								)
							}
						/>
						<Route
							path='/edit/:postSlug'
							render={(props) => {
								const post = this.state.posts.find(
									(post) =>
										post.slug ===
										props.match.params.postSlug
								);
								if (post && this.state.isAuthenticated) {
									return (
										<PostForm
											post={post}
											updatePost={this.updatePost}
										/>
									);
								} else if (
									post &&
									!this.state.isAuthenticated
								) {
									return <Redirect to='/login' />;
								} else {
									return <Redirect to='/' />;
								}
							}}
						/>
						<Route component={NotFound} />
					</Switch>
				</div>
			</Router>
		);
	}
}
export default App;
