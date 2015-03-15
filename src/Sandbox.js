// Sandbox.js
// library.js contains some convenience functions like 'isNull':
include("scripts/library.js");
include("scripts/WidgetFactory.js");	
include("/home/ian/CloudStation/Projects/Eclipse/workspace/HalifaxIronWorks/HXObject.js");	
include("/home/ian/CloudStation/Projects/Eclipse/workspace/HalifaxIronWorks/HXUtils.js");	

//********************************
// Create main object - set up interface methods
//********************************

function Sandbox() {
}


Sandbox.init = function(formWidget) {
    if (!isNull(formWidget)) {
        Sandbox.widgets = getWidgets(formWidget);
    }        
};

Sandbox.get = function(param) {
	if (Sandbox.widgets[param])
		{
		return parseFloat(Sandbox.widgets[param].text, 10);
		}
	throw "Named parameter does not exist in widget: ("+param+")";
};

Sandbox.getText = function(param) {
	if (Sandbox.widgets[param])
		{
		return Sandbox.widgets[param].text;
		}
	throw "Named parameter does not exist in widget: ("+param+")";
};

//
// Main function to generate the frames
//

Sandbox.generate = function(documentInterface, file) {
    return this.create(documentInterface);	
};

Sandbox.generatePreview = function(documentInterface, iconSize) {
 	return this.createIcon(documentInterface);	
};


Sandbox.build = function(documentInterface) {
	this.di = documentInterface;
	this.ao = new RAddObjectsOperation(false);    
};

Sandbox.create = function (documentInterface) {
    
	this.build(documentInterface);

	c = this.createComb(200,-30,12,37);
	s = this.createSocket(200,-30,12,37);
	s.move(new RVector(0,50));
    c.plot();
    s.plot();
    
	return this.ao;
};


Sandbox.createLug = function() {
	var x = new HXObject(this.di,this.ao);
	
	var lineData = new RLineData(new RVector(0,0), new RVector(0,10));
    var line = new RLineEntity(this.di.getDocument(), lineData);
    var lineData2 = new RLineData(new RVector(0,10), new RVector(10,10));
    var line2 = new RLineEntity(this.di.getDocument(), lineData2);
    var lineData3 = new RLineData(new RVector(10,10), new RVector(10,0));
    var line3 = new RLineEntity(this.di.getDocument(), lineData3);
    //var lineData4 = new RLineData(new RVector(10,0), new RVector(0,0));
    //var line4 = new RLineEntity(this.di.getDocument(), lineData4);
	var circleData = new RCircleData(new RVector(5,5),2.5);
	var circle = new RCircleEntity(this.di.getDocument(), circleData);
	x.addObject(line);
	x.addObject(line2);
	x.addObject(line3);
	//x.addObject(line4);
	x.addObject(circle);
	x.setRoot(new RVector(0,0));
	x.setEnd(new RVector(10,0));
	return x;
};

Sandbox.createLugHole = function() {
	var x = new HXObject(this.di,this.ao);
	
	var lineData = new RLineData(new RVector(0,0), new RVector(0,5));
    var line = new RLineEntity(this.di.getDocument(), lineData);
    var lineData2 = new RLineData(new RVector(0,5), new RVector(10,5));
    var line2 = new RLineEntity(this.di.getDocument(), lineData2);
    var lineData3 = new RLineData(new RVector(10,5), new RVector(10,0));
    var line3 = new RLineEntity(this.di.getDocument(), lineData3);
    var lineData4 = new RLineData(new RVector(10,0), new RVector(0,0));
    var line4 = new RLineEntity(this.di.getDocument(), lineData4);
	x.addObject(line);
	x.addObject(line2);
	x.addObject(line3);
	x.addObject(line4);
	x.setRoot(new RVector(0,0));
	x.setEnd(new RVector(10,0));
	return x;
};




Sandbox.createComb = function (pWidth,pHeight,pInset,pMaxSpacing) {

	var x = new HXObject(this.di,this.ao);
	
	var  w = this.createLug();	
			
	var objArrDef = calculatePitch(pWidth,pInset,pMaxSpacing,w.getWidth());

	x.addObjectArray(w,objArrDef.count,new RVector(pInset,0),new RVector(objArrDef.pitch,0));

	x.end.move(new RVector(pInset,0));
	
	x.join();

	var lineData = new RLineData(x.root, x.root.operator_add(new RVector(0,pHeight)));
    var line = new RLineEntity(this.di.getDocument(), lineData);
	x.addObject(line);

	lineData = new RLineData(x.root.operator_add(new RVector(0,pHeight)),x.root.operator_add(new RVector(pWidth,pHeight)));
    line = new RLineEntity(this.di.getDocument(), lineData);
	x.addObject(line);

	lineData = new RLineData(x.root.operator_add(new RVector(pWidth	,pHeight)),x.root.operator_add(new RVector(pWidth,0)));
    line = new RLineEntity(this.di.getDocument(), lineData);
	x.addObject(line);
	

	return x;

};

Sandbox.createSocket = function (pWidth,pHeight,pInset,pMaxSpacing) {

	var x = new HXObject(this.di,this.ao);

	var  w = this.createLugHole();	
			
	var objArrDef = calculatePitch(pWidth,pInset,pMaxSpacing,w.getWidth());
	
	var v = new RVector(pInset,pHeight/2-w.getHeight()/2);

	x.addObjectArray(w,objArrDef.count,v,new RVector(objArrDef.pitch,0));

	x.end.move(new RVector(pInset,0));

	var lineData = new RLineData(x.root, x.root.operator_add(new RVector(0,pHeight)));
    var line = new RLineEntity(this.di.getDocument(), lineData);
	x.addObject(line);

	lineData = new RLineData(x.root.operator_add(new RVector(0,pHeight)),x.root.operator_add(new RVector(pWidth,pHeight)));
    line = new RLineEntity(this.di.getDocument(), lineData);
	x.addObject(line);

	lineData = new RLineData(x.root.operator_add(new RVector(pWidth	,pHeight)),x.root.operator_add(new RVector(pWidth,0)));
    line = new RLineEntity(this.di.getDocument(), lineData);
	x.addObject(line);
	
	lineData = new RLineData(x.root.operator_add(new RVector(pWidth	,0)),x.root);
    line = new RLineEntity(this.di.getDocument(), lineData);
	x.addObject(line);
	

	return x;

};




Sandbox.createIcon = function (documentInterface) {

	var addOperation = new RAddObjectsOperation(false);    
           
    //this.createRectangle(documentInterface, addOperation,new RVector(0,0),10,12);
    //this.createRectangle(documentInterface, addOperation,new RVector(1,1),8,10);
	//this.createText(documentInterface, addOperation,new RVector(10,10),"HX");
	
	return addOperation;
};


