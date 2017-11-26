import * as d3 from 'd3';

const lineStyle = {strokeWidth:'1px',fill:'none'}
const rectStyle = {stroke:'none'}

export var tranSlate = (x,y)=>'translate('+x+','+y+')';
export var drawCircle = (radius) => 'M '+(0-radius)+' '+0+' a '+radius+' '+radius+', 0, 1, 0, '+(radius*2)+' '+0+' '+'a '+radius+' '+radius+', 0, 1, 0, '+(-radius*2)+' '+0;
export var drawRect = (width,height,x=0,y=0) => 'M'+(x-width/2)+','+(y-height/2)+' h '+width+' v '+height+' h '+(0-width)+' Z ';
export var drawLine = (sourse,target) => 'M'+sourse.x+','+sourse.y+' L '+target.x+','+target.y;

//oldRange,Maxlines,step => newRange
export var pagination = (oldRange,boundry,step) => (oldRange.length<boundry && oldRange[0]+step >= 0 && oldRange[oldRange.length-1]+step <= boundry)?oldRange.map((d)=>d+step):oldRange ;
export var createArray = d3.range;

//dendrogram
export var dendrogram = function(data,width,height){
	let root = d3.hierarchy(data);
    let cluster = d3.cluster().size([width,height]).separation((a,b)=>a.parent == b.parent?1:1)
    cluster(root);
    return root
}

//draw the links from parent to children
export var drawBraceLine = (node,nodes) => drawLine({y:node.y,x:d3.max(nodes.map((d)=>d.x))},{y:node.y,x:d3.min(nodes.map((d)=>d.x))})+nodes.map((d)=>drawLine({y:node.y,x:d.x},d)).join('')

//scaleBand
export var scaleBand = (range,domain)=>d3.scaleBand.range(range).domain(domain)

export var colorFn = (values)=>d3.scaleSequential().domain([d3.max(values),d3.min(values)]).interpolator(d3.interpolateWarm)

export var colorMap = (length)=> (index)=> index>=0?d3.scaleSequential(d3.interpolateRainbow)(index/length):'#ffffff'


export var createLine = function(dataset,width,height){
    

    let xScale = d3.scaleBand().range([0,width]).domain(d3.range(dataset.length));
    let bandwidth = xScale.bandwidth();
    if(dataset.map((v)=>typeof v).includes('number')){

    
    let yScale = d3.scaleLinear().range([height,0]).domain([d3.min(dataset),d3.max(dataset)]).nice();
    let lineFunction = d3.line()
                               .x(function (d,index) {return xScale(index)+bandwidth*0.5;})
                               .y(function (d) {return d?yScale(d):yScale(0)})
                               .curve(d3.curveMonotoneX)
    return [Object.assign({d:lineFunction(dataset),stroke:'#000000'},lineStyle)];                           

    }else{
    
    let uniqueV = dataset.filter((d,i,self)=>self.indexOf(d)===i && d)
    let colorfn = colorFn(uniqueV.map((d,i)=>i))

    return dataset.map((e,index)=>(Object.assign({d:drawRect(bandwidth,height,xScale(index)+bandwidth*0.5,height*0.5),fill:e?colorfn(uniqueV.indexOf(e)):'#ffffff'},rectStyle)))   
    }
}

//canvas draw
export var canvasDraw = function(ctx,dataset,width,height){
    
    let xScale = d3.scaleBand().range([0,width]).domain(d3.range(dataset.length));
    let bandwidth = xScale.bandwidth();
    if(dataset.map((v)=>typeof v).includes('number')){

    
    let yScale = d3.scaleLinear().range([height-5,0]).domain([d3.min(dataset),d3.max(dataset)]).nice();
    let lineFunction = d3.line()
                               .x((d,index)=> xScale(index))
                               .y((d)=>d?yScale(d):yScale(0))
                               .curve(d3.curveMonotoneX)
                               .context(ctx);
    ctx.beginPath();
    lineFunction(dataset); 
    ctx.lineWidth = 1;
    ctx.strokeStyle = "steelblue";
    ctx.stroke();                           
                              

    }else{
    
    let uniqueV = dataset.filter((d,i,self)=>self.indexOf(d)===i)
    let colorfn = colorFn(uniqueV.map((d,i)=>i))

      dataset.forEach((e,index)=>{
        ctx.fillStyle = e?colorfn(uniqueV.indexOf(e)):'#ffffff'
        ctx.fillRect(xScale(index),0,bandwidth,height)   
      })   
    }
}


export var canvasDrawV2 = function(ctx,dataset,width,height){
    
    let xScale = d3.scaleBand().range([0,width]).domain(d3.range(dataset.length));
    let bandwidth = xScale.bandwidth();
    let yScale = (d) => height;
    let colorfn = (d)=> 'steelblue';
    if(dataset.map((v)=>typeof v).includes('number')){

    
    yScale = d3.scaleLinear().range([height-5,0]).domain([d3.min(dataset),d3.max(dataset)]).nice();
   
                              

    }else{
     let uniqueV = dataset.filter((d,i,self)=>self.indexOf(d)===i && d)
     let cfn = colorMap(uniqueV.length)
     colorfn = (e) => cfn(uniqueV.indexOf(e))
    }
      dataset.forEach((e,index)=>{
        ctx.fillStyle = colorfn(e);
        ctx.fillRect(xScale(index),height,bandwidth,-yScale(e))   
      })   
    
}


export var canvasDrawV3 = function(ctx,dataset,width,height,metaData){
    
    let xScale = d3.scaleBand().range([0,width]).domain(d3.range(dataset.length));
    let bandwidth = xScale.bandwidth();
     let yScale = (d) => height;
    let colorfn = (d)=> 'steelblue';
    if(metaData.type === 'number'){

    
    yScale = d3.scaleLinear().range([height-5,0]).domain(metaData.range).nice();
    let lineFunction = d3.line()
                               .x((d,index)=> xScale(index))
                               .y((d)=>d?yScale(d):yScale(0))
                               .curve(d3.curveMonotoneX)
                               .context(ctx);
    ctx.beginPath();
    lineFunction(dataset); 
    ctx.lineWidth = 1;
    ctx.strokeStyle = "steelblue";
    ctx.stroke();
    
                              

    }else{
     
     let cfn = colorMap(metaData.range.length)
     colorfn = (e) => cfn(metaData.range.indexOf(e))
     dataset.forEach((e,index)=>{
        ctx.fillStyle = colorfn(e);
        ctx.fillRect(xScale(index),0,bandwidth,height)
     }) 
    }
        
    
}

export var getDatainfo = function(dataset){
  if(dataset.every((v)=>typeof v ==='number')){
  
    return {type:'number',range:[d3.min(dataset),d3.max(dataset)]}
  
  }else{
    
    return {type:'string',range: dataset.filter((d,i,self)=>self.indexOf(d)===i && d)}
  }

}



//get attrTable
// export var pivotData = data => {
//         let frame = {...d3.range(data.length).map((d)=>null)}
//         return data.reduce((acc,d,index)=>{

//         Object.keys(d).forEach((k)=>{
//             if (!acc.hasOwnProperty(k))acc[k]={...frame}
//             acc[k][index]=d[k]  
//         })
//         return acc;
//     },{})
//    }

var pivotData = data => data.reduce((acc,d)=>{
          let diff = Object.keys(d).filter((a)=>acc.keys.indexOf(a)===-1);
          
          if(diff.length>0){
            acc.keys = [...acc.keys,...diff];
            acc.values = [...acc.values,...diff.map((a)=>data.map((d)=>d[a]))];
          }
          return acc;   
        },{keys:[],values:[]})

export var sort2D=function(aa,rowid,fn){
      let newindex = aa[rowid].map((value,index)=>({index,value})).sort((a,b)=>fn(a.value,b.value)).map((d)=>d.index)
      return aa.map((a)=>newindex.map((i)=>a[i]))
   }

