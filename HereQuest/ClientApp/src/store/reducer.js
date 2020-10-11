const initialState = {
    isRight: "",
    user: null,
    role:"",
    answer: null,
    isDesc: true,
    questsTourism: [],
    questsPopular: [],
    questsRiddle: [],
    questsTeam: [],
    countRightAns: 0,
    countQuestions: 0,
    questName: null,
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
        case 'questsPopular':
            newState.questsPopular = action.value;
            break;
        case 'questsRiddle':
            newState.questsRiddle = action.value;
            break;
        case 'questsTeam':
            newState.questsTeam = action.value;
            break;
        case 'countRightAns':
            newState.countRightAns = action.value;
            break;
        case 'countQuestions':
            newState.countQuestions = action.value;
            break;
        case 'questName':
            newState.questName = action.value;
            break;
    }
    return newState;
};

export default reducer;