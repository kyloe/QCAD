// HSObject.js
// library.js contains some convenience functions like 'isNull':
include("scripts/library.js");
include("scripts/WidgetFactory.js");	


var HXObject = function (documentInterface, addOperation) {
	this.di = documentInterface;
	this.ao = addOperation;
	this.objects = [];
	this.root = new RVector(0,0);
	this.end = new RVector(0,0);
	this.rotation = 0; // Radians	
	this.height = 0; 
	this.width = 0;
};

HXObject.prototype.getBoundingBox = function(pRoot) {
	return new RBox(this.root,this.root.operator_add(new RVector(this.height,this.width)));	
};

HXObject.prototype.setRoot = function(pRoot) {
	return this.width;	
};

HXObject.prototype.setEnd = function(pEnd) {
	this.end = pEnd;	
};

HXObject.prototype.getRoot = function() {
	return this.root;	
};

HXObject.prototype.getEnd = function() {
	return this.end;	
};

HXObject.prototype.clone = function() {
	var x = new HXObject(this.di,this.ao);
	
	var i = 0;
	
	while (this.objects[i] !== undefined)
		{
		x.objects[i] = this.objects[i].clone();
		i++;		
		}
	
	x.end = new RVector(this.end.getX(),this.end.getY());
	x.root = new RVector(this.root.getX(),this.root.getY());	

	return x;
};

HXObject.prototype.move = function(pOffset) {
	// for each object - move 
	var i = 0;
	while (this.objects[i] !== undefined)
		{
		this.objects[i].move(pOffset);
		i++;		
		}
	this.end.move(pOffset);
	this.root.move(pOffset);
};

HXObject.prototype.rotate = function(pAngle) {
	// for each object - rotate 
	var i = 0;
	while (this.objects[i] !== undefined)
		{
		this.objects[i].move(pAngle);
		i++;		
		}
	this.end.rotate(pAngle);
	this.root.rotate(pAngle);
};

HXObject.prototype.plot = function() {
		
	var i = 0;
	while (this.objects[i] !== undefined)
		{
		if (this.objects[i] instanceof HXObject)
			{
			this.objects[i].plot();
			}
		else
			{
			this.ao.addObject(this.objects[i]);
			}
		i++;		
		}
		
	return this.end
};

HXObject.prototype.join = function() {
		
	var i = 0;
	var start = this.root;
	//this.objects.reverse();
	while (this.objects[i] !== undefined)
		{
		if (this.objects[i] instanceof HXObject)
			{
			var lineData = new RLineData(start, this.objects[i].root);
    		var line = new RLineEntity(this.di.getDocument(), lineData);
			this.addObject(line);
			start = this.objects[i].end;
			}
		i++;
		}

	var lineData = new RLineData(start, this.end);
	var line = new RLineEntity(this.di.getDocument(), lineData);
	this.addObject(line);
		
	return this.end
};


HXObject.prototype.addObject = function(pObject) {
		this.height = max(this.height,pObject.getBoundingBox().getHeight());
		this.width = max(this.width,pObject.getBoundingBox().getWidth());
		this.objects.push(pObject);
};

HXObject.prototype.getWidth = function() {
		return this.getBoundingBox().getWidth();
};

HXObject.prototype.getHeight = function() {
		return this.getBoundingBox().getHeight();
};


HXObject.prototype.addObjectArray = function(pObject, pCount, pStart,pStep) {
	var i;
	pObject.move(pStart);	
	for (i=0;i<pCount;i++)
		{
		var p = pObject.clone();
		this.objects.push(p);
		if (p instanceof HXObject)
			{
			this.end = new RVector(p.end.getX(),p.end.getY());
			}
		pObject.move(pStep);
		}


};




