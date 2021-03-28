//Link : https://juejin.im/post/6844904163168485389

const defalutState = {
    inputValue:'',
    placeHolder:'',
    list : [
        ''
    ]
}

export default (state = defalutState,action) =>{
    return state
}

const defalutState = {
    inputValue:'',
    list : []
};

export default (state = defalutState,action) =>{
    if (action.type==='changeInput'){
        let newState = JSON.parse(JSON.stringify(state));
        newState.inputValue=action.value;
        return newState
    }
    if (action.type==='addItem'){
        let newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue=''
        return newState
    }
    if (action.type==='deleteItem'){
        let newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.value,1)
        return newState
    }
    return state
}

