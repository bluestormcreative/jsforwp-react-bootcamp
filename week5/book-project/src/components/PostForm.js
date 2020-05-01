import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class PostForm extends Component {
	state = {
		post: {
			key: this.props.post.key,
			slug: this.props.post.slug,
			title: this.props.post.title,
			content: this.props.post.content,
		},
		saved: false,
	};

	handlePostForm = (event) => {
		event.preventDefault();
		if (this.state.post.title) {
			if (this.props.updatePost) {
				this.props.updatePost(this.state.post);
			} else {
				this.props.addNewPost(this.state.post);
			}
			this.setState({ saved: true });
		} else {
			alert('Title required');
		}
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.post.key !== this.props.post.key) {
			this.setState({
				post: {
					id: this.props.post.key,
					slug: this.props.post.slug,
					title: this.props.post.title,
					content: this.props.post.content,
				},
			});
		}
	}

	render() {
		if (this.state.saved === true) {
			return <Redirect to='/' />;
		}
		return (
			<form className='container' onSubmit={this.handlePostForm}>
				<h1>Add a New Post</h1>
				<p>
					<label htmlFor='form-title'>Title:</label>
					<br />
					<input
						id='form-title'
						defaultValue={this.props.title}
						value={this.state.post.title}
						onChange={(event) =>
							this.setState({
								post: {
									...this.state.post,
									title: event.target.value,
								},
							})
						}
					/>
				</p>
				<p>
					<label htmlFor='form-content'>Content:</label>
				</p>
				<Quill
					defaultValue={this.state.post.content}
					onChange={(content, delta, source, editor) => {
						this.setState({
							post: {
								...this.state.post,
								content: editor.getContents(),
							},
						});
					}}
				/>
				<p>
					<button type='submit'>Save</button>
				</p>
			</form>
		);
	}
}
export default PostForm;
