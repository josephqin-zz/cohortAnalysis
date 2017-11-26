import React from 'react';


export default class Selection extends React.Component{
    constructor(props){
        super(props);
    }
    handleChange(e){
    	this.props.selectedHandler(e.target.value)
    }

    render(){
    const opts = this.props.options.map((opt,index)=><option key={index} value={opt}>{opt}</option>)	
    return(
        <select onChange={this.handleChange.bind(this)}>
        	{opts}
        </select> 
        )
    }
}
