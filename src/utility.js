export var pivotData = data => data.reduce((acc,d,index)=>{
    	Object.keys(d).forEach((k)=>{
        	if (!acc.hasOwnProperty(k))acc[k]={}
        	acc[k][index]=d[k]	
        })
        return acc;
    },{})