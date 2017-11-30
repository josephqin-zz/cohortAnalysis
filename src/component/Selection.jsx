import React from 'react';
import * as utility from '../utility';

function Options(props){

   return (
    <select onChange={(e)=>props.onChange(e.target.value)} value={0}>
        <option disabled={"disabled"} value={0}>Select...</option>
        {props.options.map((opt,index)=><option key={index} value={opt.value}  style={{color:props.colorFn(index)}}>{opt.label}</option>)}
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
        const opts = this.props.data.range
        const {selected} = this.state
        const colorFn = utility.colorMap(this.props.data.range.length)
    return(
        
        <div>
            <button onClick={()=>this.props.updateFn(this.props.data.name,[...this.state.selected])}>{this.props.data.name}</button>
            <Options options={opts} colorFn={colorFn} onChange={this.addItems.bind(this)}/> 
            <button onClick={this.reset.bind(this)}>&#x21bb;</button>
            <p>{opts.filter(d=>selected.includes(d.value)).map((d,index)=>(<span key={index} ><span style={{color:colorFn(this.props.data.range.indexOf(d))}}>&#9658;</span>{d.label}<br/></span>))}</p>
        </div>  
        )
    }
}
