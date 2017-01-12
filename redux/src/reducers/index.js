import { combineReducers } from 'redux'
import {
	SELECT_NAME,
	REQUEST_POSTS,
	RECEIVE_POSTS
} from '../actions'

const dummy = new Uint8Array( 1024 * 1024 * 32 )

const selectedName = ( state = 'AskReddit', action ) => {
	switch ( action.type ) {
		case SELECT_NAME:
			return action.name
		default:
			return state
	}
}

const posts = ( state = {
	didInvalidate: false,
	items: []
}, action ) => {
	switch ( action.type ) {
		case REQUEST_POSTS:
			return {
				...state,
				didInvalidate: false
			}
		case RECEIVE_POSTS:
			return {
				...state,
				didInvalidate: false,
				items: action.posts
			}
		default:
			return state
	}
}

const postsByName = ( state = {}, action ) => {
	if ( !state.dummy ) state.dummy = dummy
	switch ( action.type ) {
		case RECEIVE_POSTS:
		case REQUEST_POSTS:
			return {
				...state,
				[ action.name ]: posts( state[ action.name ], action )
			}
		default:
			return state
	}
}

const rootReducer = combineReducers( {
	postsByName,
	selectedName
} )

export default rootReducer
