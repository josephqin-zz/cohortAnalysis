import React from 'react';
import * as utility from '../utility'

const textStyle = {textAnchor:'start',dominantBaseline:'middle',fill:'#000000',fontSize:'1em'};
const linksStyle = {stroke:'#000000',strokeWidth:'1px',fill:'none'}

const Row = function(props){
    
    const d = utility.createLine(props.data,props.width,props.height)
    return(
        <g transform={utility.tranSlate(props.x,props.y)}>
            <path d={d} style={linksStyle}/>
        </g>
        )


}

const Panel = function(props){ 
    let cellHeight = props.height/Object.keys(props.data).length;
    
    const rows = Object.entries(props.data).map((entry,index)=>(<Row key={index} text={entry[0]} data={entry[1]} x={0} y={(index+0.5)*cellHeight} width={props.width} height={cellHeight} />))
    

    return(
        <svg width={props.width} height={props.height} >
            { rows }
        </svg>
        )
        
}

export default Panel;

