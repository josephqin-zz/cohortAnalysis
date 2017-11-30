import React from 'react'
import ReactDom from 'react-dom'
import Panel from './component/PanelV4.jsx'
import { pivotData } from './utility.js'
// import tableApp from './reducers'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'

var width = 1000,
	height = 1000,
	dataset = [],
	containerID = null;



var renderModule = function(){
// let store = createStore(tableApp,{rawData:dataset,colList:dataset.reduce((acc,d)=>[...acc,...Object.keys(d)],[]).filter((d,i,self)=>self.indexOf(d)===i)})     



ReactDom.render(
	<Panel width={width} height={height} data={dataset}/ >,
	document.getElementById(containerID)
	)

}

renderModule.setContainer = function(data){
	if(!arguments.length) return containerID;
	containerID = data;
	return this;
}

renderModule.bindData = function(data){
	if(!arguments.length) return dataset;
	dataset = data.sort((a,b)=>a.type[0]>b.type[0]?-1:1);
	return this;
}


renderModule.setHeight = function(data){
	if(!arguments.length) return height;
	height = data;
	return this;
}

renderModule.setWidth = function(data){
	if(!arguments.length) return dataset;
	width = data;
	return this;
}

renderModule.remove = function(){
	ReactDom.unmountComponentAtNode(document.getElementById(containerID));
}


module.exports = renderModule
