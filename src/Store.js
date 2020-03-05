import React from 'react';

const initalState = {
    general: [
        {from:'aaron',msg:'hello'},
        {from:'vule',msg:'hello'},
        {from:'dek',msg:'hello'},
    ],
    topic2: [
        {from:'cale',msg:'hello'},
        {from:'maca',msg:'hello'},
        {from:'ana',msg:'hello'},
    ]
}
export const CTX = React.createContext();

function reducer(state, action) {
    switch (action.type) {
        case 'RECIVE_MESSAGE':
            return {
                ...state,
                [action.payload.topic] : [
                    ...state[action.payload.topic],
                    {
                        from: action.payload,
                        msg: action.payload.msg
                    }
                ]
            }
    
        default:
            return state;
    }
}



// function sendChatAction(value) {
//     socket.emit('chat message', value)
// }
export default function Store(props) {


const [allChats, dispatch] = React.useReducer(reducer, initalState);
    return(
        <CTX.Provider value={{allChats}}>
            {props.children}
        </CTX.Provider>
    )
}