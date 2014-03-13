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
	  	var jsonStr = json.slice(1, json.length - 1);
	  	var commaArr = [];
	  	var levelCount = 0;
	  	for(var i = 0; i < jsonStr.length; i++){
	  		if(jsonStr[i] === '['){
	  			levelCount ++;
	  		}else if(jsonStr[i] === ']'){
	  			levelCount --;
	  		}else if(jsonStr[i] === ','){
	  			if(levelCount === 0){
	  				commaArr.push(i);
	  			}
	  		}
	  	}
	  	commaArr.unshift(-1);
	  	commaArr.push(jsonStr.length);
	  	var arrArray = [];
	  	for(var i = 0; i < commaArr.length - 1; i++){
	  		arrArray.push(jsonStr.slice(commaArr[i]+1, commaArr[i+1]));
	  	}
	  	for(var i = 0; i < arrArray.length; i++){
	  		arrArray[i] = parseJSON(arrArray[i]);
	  	}
	  	return arrArray;
	  	//var arrArray = json.slice(1, json.length - 1).split(',');
	  	//return _.map(arrArray, function(item){return parseJSON(item);});
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
