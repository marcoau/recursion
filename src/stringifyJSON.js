// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  // your code goes here
  if(typeof obj === 'number' || typeof obj === 'boolean' || obj === null){
    return String(obj);
  }else if(typeof obj === 'string'){
    return '\"' + obj + '\"';
  }else if(Array.isArray(obj)){
    var arr = [];
    _.each(obj, function(item){
      if(item !== undefined){
        arr.push(stringifyJSON(item));
      }else{
        arr.push(stringifyJSON(null));
      }
    });
    return '[' + arr.join(',') + ']';
  }else if(typeof obj === 'object'){
    var arr = [];
    _.each(obj, function(value, key){
      if(stringifyJSON(value) !== undefined){
        arr.push(stringifyJSON(key) + ":" + stringifyJSON(value));
      }
    });
    return '{' + arr.join(',') + '}';
  }
};
