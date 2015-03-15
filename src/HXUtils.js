function calculatePitch(pWidth,pInset,pMaxSpacing,pObjectWidth)
	{
	var usefulWidth = pWidth - 2*pInset;

	var objArrDef = {};

	objArrDef.count = Math.ceil((usefulWidth - pObjectWidth)/pMaxSpacing);
	
	objArrDef.pitch  =  pObjectWidth+(usefulWidth - objArrDef.count*pObjectWidth)/(objArrDef.count-1);
	
	return objArrDef;
	
	} 