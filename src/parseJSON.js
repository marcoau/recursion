// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  // your code goes here
  if(json !== undefined){
	  if(json[0] === '\"'){
	  	//json is a string.
	  	return json.slice(1, json.length - 1);
	  }else if(json[0] === '['){
	  	//json is an array.
	  	//var jsonStr = json.slice(1, json.length - 1);
	  	var newArr = [];
	  	var levelCount = 0;
	  	var startSlice = 1;
	  	for(var i = 0; i < json.length; i++){
	  		if(i === json.length - 1){
	  			newArr.push(json.slice(startSlice, i));	  			
	  		}
	  		else if(json[i] === '['){
	  			levelCount ++;
	  		}else if(json[i] === ']'){
	  			levelCount --;
	  		}else if(json[i] === ','){
	  			if(levelCount === 1){
	  				newArr.push(json.slice(startSlice, i));
	  				startSlice = i + 1;
	  			}
	  		}
	  	}
	  	for(var i = 0; i < newArr.length; i++){
	  		newArr[i] = parseJSON(newArr[i]);
	  	}
	  	return newArr;
	  }else if(json[0] === '{'){
	  	//json is an object.
	  	var obj = {};
	  	var objArray = json.slice(1, json.length - 1).split(',');
	  	_.each(objArray, function(item){
	  		var valueKey = item.split(':');
	  		obj[parseJSON(valueKey[0])] = parseJSON(valueKey[1]);
	  	});
	  	return obj;
	  }else if(json === 'true' || json === 'false'){
	  	//json is a boolean.
	  	return json === 'true' ? true : false;
	  }else{
	  	//json is a number.
	  	return json === 'null' ? null : Number(json);
	  }
	}
};
