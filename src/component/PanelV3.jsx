import React from 'react';
import * as utility from '../utility'
import Selection from './Selection.jsx'

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
        utility.canvasDrawV3(ctx,this.props.data,this.props.width,this.props.height,this.props.metaData);
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

   activeSort(){
    const {data,metaData,sortFn} = this.props
    let sortIndex = data.map((d,index)=>index)
    if(metaData.type==='number'){
       sortIndex = data.map((value,index)=>({index,value})).sort((a,b)=>a.value-b.value).map((d)=>d.index)
       
    }else{
       sortIndex = data.map((value,index)=>({index,value})).sort((a,b)=>metaData.range.indexOf(a.value)-metaData.range.indexOf(b.value)).map((d)=>d.index)
    }
    
    sortFn(sortIndex)     
   }

   selectedHandler(valueData){
  

    this.props.filterFn(this.props.data.map((value,index)=>({index,value})).filter((d)=>d.value===valueData).map((d)=>d.index))

   } 
   
   render(){
      return (
        <div>
            <div>
            <h3>{this.props.text}</h3>
            <button onClick={this.activeSort.bind(this)}>sort</button>
            { this.props.metaData.type!=='number' && <Selection options={this.props.metaData.range} selectedHandler={this.selectedHandler.bind(this)}/> }
            </div>
        </div>
        )
   }

}

class Row extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {data,order} = this.props
        const metaData = utility.getDatainfo(this.props.data)
        const canvasData = order.map((i)=>data[i]) 
        return(
        <div style={panelStyle}>
            <div style={canvasStyle}>
                <Canvas data={canvasData} metaData={metaData} width={this.props.width} height={this.props.height} />
            </div>
            <Infopanel text={this.props.text} metaData={metaData} data={this.props.data} sortFn={this.props.sortFn} filterFn={this.props.filterFn}/>
            {/*<Plot data={props.data} width={props.width} height={props.height}/>*/}
            
        </div>
        )
    }
    
}

class Panel extends React.Component{

    constructor(props){
        super(props);
        this.state={order:utility.createArray(props.data.values[0].length),show:utility.createArray(props.data.values[0].length)}
        
    }

    sortFn(orderIndex){
        this.setState({order:[...orderIndex]})

    }

    filterFn(filterIndex){
       this.setState({show:[...filterIndex]})
    }

    render(){ 
    
    const {values,keys}=this.props.data   
    const rows = values.map((entry,index)=>(<Row key={index} text={keys[index]} data={entry.filter((d,i)=>this.state.show.includes(i))} order={this.state.order} width={this.props.width} height={60} sortFn={this.sortFn.bind(this)} filterFn={this.filterFn.bind(this)}/>))
    
    return(
        <div>
            { rows }
        </div>
        )
      
    }
}
export default Panel;

