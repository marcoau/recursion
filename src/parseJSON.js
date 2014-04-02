// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
	
	var json = json.trim();

  // your code goes here
  var escapee = {
      '"':  '"',
      '\\': '\\',
      '/':  '/',
      b:    'b',
      f:    '\f',
      n:    '\n',
      r:    '\r',
      t:    '\t'
  };

  if(json !== undefined){
  	if(typeof json !== 'string'){
  		throw "Error: not a parse-able object";

  	}else if(json[0] === '\"'){
	  	//json is a string.
	  	if(json[json.length - 1] !== '\"'){
	  	  throw "Error: incomplete string";
	  	}
	  	var pos = 1;
	  	var str = '';

	  	while(pos < json.length - 1){
	  		if(json[pos] === '\\' && typeof escapee[json[pos+1]] === 'string'){
	  			//At the escape character
	  			str += escapee[json[pos+1]];
	  			pos += 2;
	  		}else{
	  			str += json[pos];
	  			pos++;
	  		}
	  	}

	  	return str;

	  }else if(json[0] === '['){
	  	//json is an array.
	  	if(json[json.length - 1] !== ']'){
	  		throw "Error: incomplete array";
	  	}

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
	  	if(json[json.length - 1] !== '}'){
	  		throw "Error: incomplete object";
	  	}

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
	  	if(json !== 'null' && isNaN(Number(json))){
	  		console.log(json);
	  		throw "Error: I don't know what you are referring to";
	  	}
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
