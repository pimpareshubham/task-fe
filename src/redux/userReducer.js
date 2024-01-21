const initialState = {
    user: {}
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":

            console.log(action.type)
            console.log(action.payload)
            return {
                
                ...state, user: action.payload
            }
        case "LOGIN_ERROR":
            console.log(action.type)
            return initialState;
        default:
            return state;
    }
}