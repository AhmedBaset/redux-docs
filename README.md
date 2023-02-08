---
title: Redux simple docs
author: Ahmed Abdelbaset
tags: redux, javascript, react, redux-saga, redux-thunk, redux-observable, redux-logger, redux-devtools-extension, redux-persist, redux-form, redux-saga-test-plan, redux-mock-store, redux-actions, redux-act, redux-logic, redux-loop, redux-first-router, redux-first-history, redux-first-router-link, redux-first-router-restore-scro
---

<style>
   body {
      /* background-color: #000a10; */
      color: white;
   }
   h1, h2, h3, h4, h5, h6 {
      font-weight: bold;
      color: deepskyblue;
      margin-top: 2rem;
   }
   p {
      color: white;
   }
   p::first-letter {
      font-weight: bold;
      color: deepskyblue;
   }
</style>

# Redux simple docs:

written by: [Ahmed Abdelbaset](https://github.com/A7med3bdulBaset).


# Introduction:

## What is Redux?

Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger.

## How does it work?

Redux is a pattern and library for managing and updating application state, using events called "actions". It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion.

## What is a state?

A state is a plain JavaScript object describing your entire data store. It can be whatever you want - but it is very common for it to be a single object containing many other key-value pairs.

## What is an action?

An action is a plain JavaScript object that has a type field. You can think of an action as an event that describes something that happened in the application. The only requirement for an action is that it has a type field that indicates the type of action being performed. Types should typically be defined as string constants. Once your app is large enough, you may want to move them into a separate module.

## What is a reducer?

A reducer is a pure function that takes the previous state and an action, and returns the next state. (previousState, action) => newState

## What is a store?

The store has the following responsibilities:

- Holds application state;
- Allows access to state via getState();
- Allows state to be updated via dispatch(action);
- Registers listeners via subscribe(listener);
- Handles unregistering of listeners via the function returned by subscribe(listener).

---

# Learn with examples:

## 1. Simple counter (Vanilla JS):

First of all, we need to install redux:
```bash
npm install redux
```

See this javascript code and the explanation in comments:
```javascript
// TODO: Initial State
/**
 * Initial State is an object that has the same shape as the state object in the store.
 */
const initialState = {
   count: 0
}

// TODO: Actions
/**
   * Action is an object that has a type property and a payload property (optional).
   * Action is dispatched to the store.
   * Action is received by the reducer.
   @example {
      type: 'ACTION_TYPE', // Required
      payload: 'PAYLOAD' // Optional
   }
*/

// Instead of passing an object, we can pass a function that returns an object. to avoid spelling mistakes.
const increment = () => ({ type: 'INCREMENT' })
const decrement = () => ({ type: 'DECREMENT' })
const reset = () => ({ type: 'RESET' })
const incrementBy = (amount) => ({ type: 'INCREMENT_BY', payload: amount })

// TODO: Reducer
const reeducer = (state = initialState, action) => {
   switch (action.type) {
      case 'INCREMENT':
         return { count: state.count + 1 }
      case 'DECREMENT':
         return { count: state.count - 1 }
      case 'RESET':
         return { count: 0 }
      case 'INCREMENT_BY':
         return { count: state.count + action.payload }
      // If Payload is unknown, return the current state
      default:
         return state
   }
}

// TODO: Store
/**
 * Store is an object that has the following methods:
 * 1. getState() - returns the current state of the store
 * 2. dispatch(action) - dispatches an action to the store
 * 3. subscribe(listener) - subscribes a listener to the store
 * 
 * `createStore` is a function that takes a reducer as an argument and returns a store.
 */
import { createStore } from 'redux'
const store = createStore(reeducer);

// TODO: Listen for changes
/**
 * `subscribe` is a method that start listening for changes in the store.
 * `subscribe` takes a callback function as an argument. The callback function is called every time the store changes.
 * `subscribe` returns a function that can be called to unsubscribe the listener.
 */
const unSubscribe = store.subscribe(() => {
   console.log(store.getState())
})

// TODO: Dispatch Actions
/**
 * `dispatch` is a method that dispatches an action to the store.
 * `dispatch` accepts an action { type: 'ACTION_TYPE', payload: 'PAYLOAD' } as an argument.
 * `dispatch` returns the action that was dispatched.
 * `dispatch` is the only way to change the state of the store.
 * @example store.dispatch({ type: 'INCREMENT' })
*/
store.dispatch(increment()); // { count: 1 }
store.dispatch(increment()); // { count: 2 }
store.dispatch(increment()); // { count: 3 }
store.dispatch(decrement()); // { count: 2 }
store.dispatch(reset()); // { count: 0 }
store.dispatch(incrementBy(5)); // { count: 5 }
```

---

## 2. Posts (Vanilla JS):

Install redux:

```bash
npm install redux
```

```javascript
//* See more documentation on counter file for more details ./../counter/counter.js

// TODO: Initial State
const initialState = {
	posts: [],
};

// TODO: Actions
const getPosts = () => ({ type: "GET_POSTS" });
const deletePost = (id) => ({ type: "DELETE_POST", payload: id });
const createPost = (post) => ({ type: "CREATE_POST", payload: post });
const updatePost = (id, data) => ({ type: "UPDATE_POST", payload: { id, data } });

// TODO: Reducer
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_POSTS":
			return { posts: state.posts };
		case "DELETE_POST":
			return {
				posts: state.posts.filter((post) => post.id !== action.payload),
			};
		case "CREATE_POST":
			return { posts: [...state.posts, action.payload] };
		case "UPDATE_POST":
			return {
				posts: state.posts.map((post) =>
					post.id === action.payload.id ? { ...post, ...action.payload.data } : post
				),
			};
		default:
			return state;
	}
};

// TODO: Store
import { createStore } from "redux";
const store = createStore(reducer);

// TODO: Start Listening
const unSubscribe = store.subscribe(() => {
   console.log("Store Changed", store.getState());
});

// TODO: Dispatch Actions
store.dispatch(getPosts()); // { posts: []}
store.dispatch(createPost({ id: 1, title: "Post 1", text: "Post 1 text" }));
// { posts: [{ id: 1, ... }]}
store.dispatch(createPost({ id: 2, title: "Post 2", text: "Post 2 text" }));
// { posts: [{ id: 1, ... }, { id: 2, ... }]}
store.dispatch(createPost({ id: 3, title: "Post 3", text: "Post 3 text" }));
// { posts: [{ id: 1, ... }, { id: 2, ... }, ...]}
store.dispatch(updatePost(1, { title: "Post 1 Updated" }))
// { posts: [{ id: 1, title: "Post 1 Updated", ...}, ...]}
store.dispatch(deletePost(2));
// {posts: [{ id: 1, ...}, { id: 3, ...}]
store.dispatch(getPosts());
// { posts: [{ id: 1, ...}, { id: 3, ...}]
```

---

Let's talk about `combineReducers`:

## combineReducers

Combines multiple reducers into a single reducer function. It will call every child reducer, and gather their results into a single state object, whose keys correspond to the keys of the passed reducer functions.

It's useful for large applications with many reducers, for example, let's imagine we are building a blog application. We have a reducer for posts and a reducer for users. We can use `combineReducers` to combine these two reducers into a single reducer.

```javascript
import { combineReducers } from 'redux'

const postsInitialState = {posts: []}
const usersInitialState = {users: []}

const postsReducer = (state: postsInitialState, action) => {...}
const usersReducer = (state: usersInitialState, action) => {...}

const rootReducer = combineReducers({
   posts: postsReducer,
   users: usersReducer
})

const store = createStore(rootReducer)

store.dispatch(getPosts()) // { posts: [], users: [] }
store.dispatch(getUsers()) // { posts: [], users: [] }
store.dispatch(createPost({ id: 1, title: 'Post 1', text: 'Post 1 text' })) // { posts: [{ id: 1, ... }], users: [] }
store.dispatch(createUser({ id: 1, name: 'User 1' })) // { posts: [{ id: 1, ... }], users: [{ id: 1, ... }] }
```

---


## Middleware

Redux middleware is a way to extend Redux with custom functionality. It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer. 

Middleware is a function that takes an action and decide how to handle it.

There are two types of middleware:

- Third-party middleware
- Custom middleware

Uses of middleware:

- Handle the action before it reaches the reducer.
- Dispatch a new action (i.e. create side-effect such as making an API call).
- Log the action in the console or in redux-dev-extension tool.

### 1. Third party middleware

Let's install `redux-logger`:

```bash
npm install redux-logger redux
```

```javascript
import { createStore, applyMiddleware } from "redux";
import reduxLogger from "redux-logger";
const logger = reduxLogger.createLogger();

const store = createStore(reducer, applyMiddleware(logger));

store.subscribe(() => {
  console.log(store.getState());
});
```

Let's Dispatch an action to see the console:

```javascript
store.dispatch({type: 'INCREMENT'});
```

The output without logger:

```js
{ count: 1 }
```
The otput with logger:

```js
prev state { count: 0 }
action { type: 'INCREMENT' }
next state { count: 1 }
```

### 2. Custom middleware

Let's create a custom middleware:

```javascript
const customLogger = (store) => {
	return (next) => {
		return (action) => {
			console.log(`==> Previous State: ${JSON.stringify(store.getState())}`);
			console.log(`==> Action: ${JSON.stringify(action)}`);
			next(action);
			console.log(`==> Next State: ${JSON.stringify(store.getState())}`);
		}
	}
}
const store = createStore(reducer, applyMiddleware(customLogger));
```

Let's Dispatch an action to see the console:

```javascript
store.dispatch({type: 'INCREMENT'});
```

The output without the custom logger:

```js
{ count: 1 }
```
The otput with the custom logger:

```js
==> Previous State: {"count":0}
==> Action: {"type":"INCREMENT"}
==> Next State: {"count":1}
```

## Redux Thunk

`redux-thunk` is a middleware that allows you to write async actions.
`redux-thunk` is a function (action creator) that returns another function instead of an action object.
It receives the dispatch method as an argument and returns a function that will be called later.

To know the benefits of `redux-thunk`, let's imagine we are fetching data from an API. If we don't use `redux-thunk`, when dispatch an action like `getData` to the store. The store will call the `reducer` to handle the action. But, the API response take some time to return. So, the reducer will return empty data. The store and the UI will be updated with empty data. 

But `redux-thunk` will prevent call the reducer until the API response is returned. So, the store and the UI will be updated with the data from the API response.

## 3. Api Posts (Vanilla JS):

### Redux with Async Actions

If we are building app that uses an API. The API response maybe take some time to return. We can't just dispatch an action and expect the store to be updated immediately. We need to wait for the API response to return before we can update the store. If we dispatch an action and the API response is slow, the store will be updated with the old data or empty data.

So, Let's install dependencies:

```bash
npm install redux redux-thunk axios
```

```javascript
import axios from "axios";

// TODO: Initial State
const initialState = {
	posts: [],
	loading: false,
	error: ""
};

// TODO: Actions
const fetchingStarted = () => ({ type: "FETCHING_STARTED" });
const fetchingSuccessed = (posts) => ({ type: "FETCHING_SUCCESS", payload: posts });
const fetchingFailured = (error) => ({ type: "FETCHING_FAILURE", payload: error });

//* Thunk Action that handle all actions
const fetchData = () => {
	return async (dispatch) => {
		// TODO: Start Fetching
		dispatch(fetchingStarted());

		// TODO: Fetch Data
		try {
			const data = await axios.get("https://jsonplaceholder.typicode.com/posts");
			dispatch(fetchingSuccessed(data.data));
		} catch (error) {
			// TODO: Handle Error
			dispatch(fetchingFailured(error));
		}
	}
}

// TODO: Reducer
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "FETCHING_STARTED":
			return { ...state, loading: true };
		case "FETCHING_SUCCESS":
			return { ...state, loading: false, posts: action.payload };
		case "FETCHING_FAILURE":
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

// TODO: Store
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
const thunk = reduxThunk.default;
const store = createStore(reducer, applyMiddleware(thunk));

// TODO: Start Listening
const unSubscribe = store.subscribe(() => {
   console.log("Store Changed", store.getState());
});

// TODO: Dispatch Actions
store.dispatch(fetchData()); // Thunk Action
```

The output:
```js
Store Changed { posts: [], loading: true, error: '' }
Store Changed { posts: [
   {...}, {...}, {...}, ...
], loading: false, error: '' }
OR: Store Changed { posts: [], loading: false, error: 'Error: Request failed with status code 404' }
```


# NEXT