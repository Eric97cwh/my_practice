jsx - 
✅ When writing React components (contains JSX syntax).
✅ Better tooling support (IDE/editor highlights JSX syntax properly).
✅ Clearer intent (signals that the file contains JSX markup).
js - 
✅ For non-React JavaScript (utils, configs, Redux, etc.).
✅ When JSX is not needed (e.g., pure logic files).
✅ Legacy projects (older React setups defaulted to .js).
============
directory
============
- .env.development
- .env.production
- src
    | - api
    | - assets
    | - componenets
    | - pages
    | - coupon
        | - couponAction    //redux
        | - couponReducer   //redux
        | - couponSaga      //redux
        | - couponPage
        | - couponSelector
        | - couponValidation
        | - createCouponModal   //pop out screen
    | - reducers.js
    | - sagas.js
    | - stores.js
    | - routes.jsx
    | - util
    | - validation

=======
SAGA
=======
Redux Saga is a middleware library for Redux that helps manage side effects (like async API calls, timers, or other impure operations)

call(): Invoke a function (e.g., API call).
put(): Dispatch a Redux action.
take(): Wait for a specific action.
fork(): Run a non-blocking task.
all(): Run multiple sagas in parallel.

=======
SLICE / (ACTION, REDUCER)
=======
Slice is the modern way for redux where actions is tradition way of redux

"slice" is a collection of Redux reducer logic and actions for a specific feature (e.g., userSlice, authSlice). It replaces the traditional way of writing separate action types, action creators, and reducers by combining them into a single, concise definition.

slice = reducer + actions
No more switch-case reducers or manual action creators.

========
App.js
========
Redux (State Management)
Redux Persist (Persisting state to storage)
Toast Notifications (react-toastify)
Helmet (HTML <head> management)
Localization (i18n)
WebSocket (Socket.io or similar)
Theme Provider (Styling)
Error Boundary (Global error handling)