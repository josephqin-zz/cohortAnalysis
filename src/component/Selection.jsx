import React from 'react';
import * as utility from '../utility';

function Options(props){

   return (
    <select onChange={(e)=>props.onChange(e.target.value)} value={0}>
        <option disabled={"disabled"} value={0}>Select...</option>
        {props.options.map((opt,index)=><option key={index} value={opt}  style={{color:props.colorFn(index)}}>{opt}</option>)}
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
        const colorFn = utility.colorMap(this.props.data.range.length)
    return(
        
        <div>
            <button onClick={()=>this.props.updateFn(this.props.data.name,[...this.state.selected])}>{this.props.data.name}</button>
            <Options options={this.props.data.range} colorFn={colorFn} onChange={this.addItems.bind(this)}/> 
            <button onClick={this.reset.bind(this)}>&#x21bb;</button>
            <p>{this.state.selected.map((d,index)=>(<span key={index} ><span style={{color:colorFn(this.props.data.range.indexOf(d))}}>&#9658;</span>{d}<br/></span>))}</p>
        </div>  
        )
    }
}
