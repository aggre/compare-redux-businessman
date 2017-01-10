import React, { Component } from 'react'
import { subscribe, getState, operate } from 'businessman'
import { post } from '../storeTypes'
import { postsByName } from '../getterTypes'
import { fetchPostsIfNeeded } from '../managerTypes'
import Posts from '../components/Posts'

let queue = [
	'AskReddit',
	'news',
	'funny',
	'pics',
	'todayilearned',
	'videos',
	'worldnews',
	'gifs',
	'gaming',
	'aww',
	'movies',
	'Jokes'
]

class App extends Component {
	constructor () {
		super()
		this.state = { posts: [] }
		subscribe( post, ( state ) => {
			getState( post, postsByName, queue[ 0 ] )
			.then( state => {
				queue.shift()
				this.setState( { posts: state } )
			} )
		} )
	}

	componentDidMount () {
		operate( fetchPostsIfNeeded, queue[ 0 ] )
	}

	componentWillUpdate () {
		if ( !this.state.posts || queue.length === 0 ) {
			return
		}
		operate( fetchPostsIfNeeded, queue[ 0 ] )
	}

	render () {
		const { posts } = this.state
		return (
			<div>
				<div>
					<Posts posts={posts}/>
				</div>
			</div>
		)
	}
}

export default App
