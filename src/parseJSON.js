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
	  	if(json !== '[]'){
	  		var newArr = safeSplit(json, ',');
	  	}else{
	  		var newArr = [];
	  	}
	  	//Utilizes safeSplit function.
	  	for(var i = 0; i < newArr.length; i++){
	  		newArr[i] = parseJSON(newArr[i]);
	  	}
	  	return newArr;

	  }else if(json[0] === '{'){
	  	//json is an object.
	  	var objArray = safeSplit(json, ',');
	  	objArray = _.map(objArray, function(obj){
	  		//Slight calibration for safeSplit.
	  		return safeSplit('[' + obj + ']', ':')
	  	});
	  	var newObj = {};
	  	if(json !== '{}'){
	  		_.each(objArray, function(obj){
	  			newObj[parseJSON(obj[0])] = parseJSON(obj[1]);
	  		});
	  	}
	  	//Utilizes safeSplit function.
	  	return newObj;

	  }else if(json === 'true' || json === 'false'){
	  	//json is a boolean.
	  	return json === 'true' ? true : false;
	  }else{
	  	//json is a number.
	  	return json === 'null' ? null : Number(json);
	  }
	}
};

var safeSplit = function(source, separator){
	//take JSON object with arrays/objects as source.
	//Beware: different uses for arrays and objects.
	var newArr = [];
	var nested = [];
	var startSlice = 1;
	for(var i = 1; i < source.length; i++){
		if(i === source.length - 1){
			newArr.push(source.slice(startSlice, i));
		}else if(nested.indexOf(source[i]) !== -1){
			nested.splice(nested.indexOf(source[i]), 1);
		//Storing 'passwords' for un-nesting.
		}else if(source[i] === '['){
			nested.push(']');
		}else if(source[i] === '{'){
			nested.push('}');
		}else if(source[i] === '\"'){
			nested.push('\"');
		}else if(source[i] === separator && nested.length === 0){
			newArr.push(source.slice(startSlice, i));
			startSlice = i + 1;
		}
	}
	return newArr;
};
