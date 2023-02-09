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