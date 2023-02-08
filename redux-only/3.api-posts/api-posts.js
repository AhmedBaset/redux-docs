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
//						// import { createStore, applyMiddleware } from "redux";

//						// // USE middleware:
//						// // 1. Third Party Middleware:
//						// import reduxLogger from "redux-logger";
//						// const logger = reduxLogger.createLogger();
//						// // const store = createStore(reducer, applyMiddleware(logger));

//						// // 2. Custom Middleware:
//						// const customLogger = (store) => {
//						// 	return (next) => {
//						// 		return (action) => {
//						// 			console.log(`Previous State: ${JSON.stringify(store.getState())}`);
//						// 			console.log(`Action: ${JSON.stringify(action)}`);
//						// 			next(action);
//						// 			console.log(`Next State: ${JSON.stringify(store.getState())}`);
//						// 		}
//						// 	}
//						// }
//						// const store = createStore(reducer, applyMiddleware(customLogger));

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