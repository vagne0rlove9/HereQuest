const initialState = {
    isRight: "",
    user: null,
    role:"",
    answer: null,
    isDesc: true,
    questsTourism: []
};

const reducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case 'isRight':
            newState.isRight = action.value;
            break;
        case 'role':
            newState.role = action.value;
            break;
        case 'answer':
            newState.answer = action.value;
            break;
        case 'isDesc':
            newState.isDesc = action.value;
            break;
        case 'questsTourism':
            newState.questsTourism = action.value;
            break;
    }
    return newState;
};

export default reducer;