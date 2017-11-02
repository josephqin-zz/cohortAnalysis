import React from 'react';
import * as utility from '../utility'

const textStyle = {textAnchor:'start',dominantBaseline:'middle',fill:'#000000',fontSize:'1em'};
const lineStyle = {strokeWidth:'1px',fill:'none'}
const rectStyle = {stroke:'none'}

const Plot = function(props){
    const lines = utility.createLine(props.data,props.width,props.height).map((line,index)=>(<path key={index} {...line} />))
    return (
        <svg width={props.width} height={props.height}>
            { lines }
        </svg>
        )
}

class Canvas extends React.component{

}


const Row = function(props){
   
    return(
        <div>
            <h3>{ props.text }</h3>
            {/*<Plot data={props.data} width={props.width} height={props.height}/>*/}
            <Canvas data={props.data} width={props.width} height={props.height}/>
        </div>
        )
}

const Panel = function(props){ 
     
    const rows = Object.entries(props.data).map((entry,index)=>(<Row key={index} text={entry[0]} data={entry[1]} width={props.width} height={props.height/Object.keys(props.data).length}/>))
    
    return(
        <div>
            { rows }
        </div>
        )
      
}

export default Panel;

