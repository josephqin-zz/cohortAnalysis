import React from 'react';
import * as utility from '../utility'

class Cell extends React.Component{
    
    // componentDidMount() {
    //     this.tCell.addEventListener('click', this.props.onClick );
       
    // }

    // componentWillUnmount(){
    //     this.tCell.removeEventListener('click', this.props.onClick );
        
    // }


    render(){
	    let attrs = {d:utility.drawRect(this.props.width,this.props.height),fill:this.props.bgColor,stroke:'none'}
	    // let textstyle = (this.props.text && this.props.text.length > 0)?{...textStyle,fontSize:fontSize(this.props.text,this.props.width)}:textStyle;
		return (
			<g ref={ ref=>this.tCell=ref } transform={utility.tranSlate(this.props.x,this.props.y)}>
			 	<path {...attrs}/>
			 	{/* <text style={textstyle}>{ this.props.text }</text> 	*/}
			</g>
		)
	}
}

const textStyle = {textAnchor:'start',dominantBaseline:'middle',fill:'#000000',fontSize:'1em'};

const Row = function(props){
    
    const color = utility.colorFn(props.frame)
    const cells = props.frame.map((cellIndex,index)=>(<Cell key={index} x={ (index+0.5)*props.cellWidth } y={0} width={props.cellWidth} height={props.cellHeight} bgColor={ color(cellIndex) }/>))
    
    return(
    	<g transform={utility.tranSlate(props.x,props.y)}>
    		{ cells }
    		<text transform={utility.tranSlate(props.cellWidth*props.frame.length,0.5*props.cellHeight)} style={textStyle} >{ props.tex }</text>
    	</g>
    	)


}

const Panel = function(props){ 
    let cellHeight = props.height/Object.keys(props.data).length;
    
    const rows = Object.entries(props.data).map((entry,index)=>(<Row key={index} text={entry[0]} data={entry[1]} x={0} y={(index+0.5)*cellHeight} cellWidth={props.width/props.dataLength} cellHeight={cellHeight} frame={utility.createArray(props.dataLength)} />))
    

	return(
		<svg width={props.width} height={props.height} >
			{ rows }
		</svg>
		)
		
}

export default Panel;

