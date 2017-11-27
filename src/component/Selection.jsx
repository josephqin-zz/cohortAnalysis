import React from 'react';
function Options(props){
   return (
    <select onChange={(e)=>props.onChange(e.target.value)}>
        {props.options.map((opt,index)=><option key={index} value={opt}>{opt}</option>)}
    </select>
    )
}

export default class Selection extends React.Component{
    constructor(props){
        super(props);
        
        this.state={selected:[]}
    }
    addItems(value){
        this.setState(prestate=>({selected:[...prestate.selected,value].filter((d,i,self)=>self.indexOf(d)===i)}))
    }

    reset(){
        this.setState({selected:[]})
    }

    render(){
    return(
        <div>
            <p>{this.state.selected.join(',')}</p>
            <Options options={this.props.options} onChange={this.addItems.bind(this)}/> 
            <button  onClick={(e)=>console.log('done')}>update</button>
            <button  onClick={this.reset.bind(this)}>reset</button>
        </div>  
        )
    }
}
