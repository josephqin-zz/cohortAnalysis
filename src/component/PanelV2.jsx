import React from 'react';
import * as utility from '../utility'

const textStyle = {textAnchor:'start',dominantBaseline:'middle',fill:'#000000',fontSize:'1em'};
const lineStyle = {strokeWidth:'1px',fill:'none'}
const rectStyle = {stroke:'none'}
const panelStyle ={marginTop:'5px',padding:'2px',backgroundColor:'#f0f0f5'}
const canvasStyle ={float:'left'}

const Plot = function(props){
    const lines = utility.createLine(props.data,props.width,props.height).map((line,index)=>(<path key={index} {...line} />))
    return (
        <svg width={props.width} height={props.height}>
            { lines }  
        </svg>
        )
}

class Canvas extends React.Component{

    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }


    updateCanvas() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.props.width, this.props.height);
        utility.canvasDrawV2(ctx,this.props.data,this.props.width,this.props.height);
    }
    
    render(){
        return(
            <canvas ref={ref => this.canvas=ref} width={this.props.width} height={this.props.height} />
            )
    }
}

class Infopanel extends React.Component{
   constructor(props){
        super(props);
    }
   
   render(){
      return (
        <div>
            <h3>{this.props.text}</h3>
        </div>
        )
   }

}

class Row extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        
        return(
        <div style={panelStyle}>
            <div style={canvasStyle}>
                <Canvas data={this.props.data} width={this.props.width} height={this.props.height}/>
            </div>
            <Infopanel text={this.props.text} />
            {/*<Plot data={props.data} width={props.width} height={props.height}/>*/}
            
        </div>
        )
    }
    
}

class Panel extends React.Component{

    constructor(props){
        super(props);
        this.state = {order:0}
    }

    sortHandler(name){
        
        this.setState({order:this.props.data.keys.indexOf(name)})
    }


    render(){ 

    const dataset = utility.sort2D(this.props.data.values,this.state.order,(a,b)=>b-a)
     
    const rows = dataset.map((entry,index)=>(<Row key={index} text={this.props.data.keys[index]} data={entry} width={this.props.width} height={60} sortFn={this.sortHandler.bind(this)}/>))
    
    return(
        <div>
            { rows }
        </div>
        )
      
    }
}
export default Panel;

