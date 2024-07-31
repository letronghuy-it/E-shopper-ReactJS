const initialState = {
    tongQTY :0,
    tongWL :0
}

//reducers
const hobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_HOBBY': {
            const State = {
                tongQTY : action.payload,
            };

            localStorage.setItem('tongQTY', JSON.stringify(State.tongQTY));
            return State;
        }
        case 'ADD_WISHLIST_QTY': {

            const State2 = {
                tongWL : action.payload,
            };

            localStorage.setItem('tongWL', JSON.stringify(State2.tongWL));
            return State2;
        }
        default:
            return state;
    }
};

export default hobbyReducer;
