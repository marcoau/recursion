// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  // your code here
  var elementList = [];
  var pushRightElements = function(element){
  	_.each(element.childNodes, function(object){
  	 	if(object.classList !== undefined && object.classList.contains(className)){
  	 		elementList.push(object);
  	 	}
  	 	pushRightElements(object);
  	});
  };
  pushRightElements(document.body);
  return elementList;
};
