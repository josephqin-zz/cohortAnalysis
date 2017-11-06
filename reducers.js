keys: [a1,a2,a3]

order: [1,4,5,6,7]

values:[[1,2,3],[1,2,4]]

function keys(state=[],action){
	switch(action.type){
		case ADD_KEY:
			return [...state,action.key]
		default:
			return state	 
	}
}

function values(state=[],action){
	switch(action.type){
		case ADD_KEY:
			return [...state,action.values]
		default:
			return state	 
	}
}

function order(state=[],action){
	switch(action.type){
		case RESET:
			return d3.range(action.data.length)
        case SORT:
            return action.order

		default:
			return state	 
	}
}