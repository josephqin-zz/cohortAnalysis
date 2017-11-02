import * as d3 from 'd3';


export var tranSlate = (x,y)=>'translate('+x+','+y+')';
export var drawCircle = (radius) => 'M '+(0-radius)+' '+0+' a '+radius+' '+radius+', 0, 1, 0, '+(radius*2)+' '+0+' '+'a '+radius+' '+radius+', 0, 1, 0, '+(-radius*2)+' '+0;
export var drawRect = (width,height) => 'M'+(0-width/2)+','+(0-height/2)+' h '+width+' v '+height+' h '+(0-width)+' Z ';
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

export var colorFn = (values)=>d3.scaleSequential().domain([d3.max(values),d3.min(values)]).interpolator(d3.interpolateRainbow)

//draw one Line plot
export var createLine = function(dataset,width,height){
    let values = Object.values(dataset);
    if(values.map((v)=>typeof v).includes('number')){

    let xScale = d3.scalePoint().range([0,width]).domain(Object.keys(dataset));
    let yScale = d3.scaleLinear().range([0,height]).domain([d3.min(values),d3.max(values)]).nice();
    let lineFunction = d3.line()
                               .x(function (d) {return xScale(d[0]);})
                               .y(function (d) {return yScale(d[1]);})
                               .curve(d3.curveMonotoneX)
    return lineFunction(Object.entries(values).filter((e)=>e[1]!==null));                           

    }else{
      return '';
    }
}



//get attrTable
export var pivotData = data => {
        let frame = {...d3.range(data.length).map((d)=>null)}
        return data.reduce((acc,d,index)=>{

        Object.keys(d).forEach((k)=>{
            if (!acc.hasOwnProperty(k))acc[k]={...frame}
            acc[k][index]=d[k]  
        })
        return acc;
    },{})
   }

