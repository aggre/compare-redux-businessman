import { worker } from 'businessman'
import { post } from '../types/storeTypes'
import { REQUEST_POSTS } from '../types/actionTypes'
import { postsByName } from '../types/getterTypes'
import { addPosts } from '../types/mutationTypes'
import { fetchPostsIfNeeded } from '../types/managerTypes'

const fat = data => {
	let res = []
	for ( let i = 0; i < 1000; i++ ) {
		Array.prototype.push.apply( res, data )
	}
	res = null
	return data
}

worker.registerStore( {
	type: post,
	state: {},
	mutations: {
		[ addPosts ]: ( state, payload ) => {
			if ( !( payload.name in state ) ) {
				state[ payload.name ] = payload.posts
			}
			return state
		}
	},
	actions: {
		[ REQUEST_POSTS ]: ( commit, name ) => {
			fetch( `https://www.reddit.com/r/${name}.json` )
			.then( response => response.json() )
			.then( json => commit( addPosts, { name: name, posts: fat( json.data.children.map( child => child.data ) ) }, false ) )
		}
	},
	getters: {
		[ postsByName ]: ( state, name ) => state[ name ]
	}
} )

worker.registerManager( {
	type: fetchPostsIfNeeded,
	handler: ( stores, name ) => {
		if ( !name || stores[ post ].getState( postsByName, name ) ) {
			return
		}
		stores[ post ].dispatch( REQUEST_POSTS, name )
	}
} )

worker.start()
