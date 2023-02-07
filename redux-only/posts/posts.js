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
// { posts: [{ id: 1, title: "Post 1", text: "Post 1 text" }]}
store.dispatch(createPost({ id: 2, title: "Post 2", text: "Post 2 text" }));
// { posts: [{ id: 1, title: "Post 1", text: "Post 1 text" }, { id: 2, title: "Post 2", text: "Post 2 text" }]}
store.dispatch(createPost({ id: 3, title: "Post 3", text: "Post 3 text" }));
// { posts: [{ id: 1, title: "Post 1", text: "Post 1 text" }, { id: 2, title: "Post 2", text: "Post 2 text" }, { id: 3, title: "Post 3", text: "Post 3 text" }]}
store.dispatch(updatePost(1, { title: "Post 1 Updated" }))
// { posts: [{ id: 1, title: "Post 1 Updated", text: "Post 1 text" }, { id: 2, title: "Post 2", text: "Post 2 text" }, { id: 3, title: "Post 3", text: "Post 3 text" }]}
store.dispatch(deletePost(2));
// { posts: [{ id: 1, title: "Post 1 Updated", text: "Post 1 text" }, { id: 3, title: "Post 3", text: "Post 3 text" }]}
store.dispatch(getPosts());
// { posts: [{ id: 1, title: "Post 1 Updated", text: "Post 1 text" }, { id: 3, title: "Post 3", text: "Post 3 text" }]}