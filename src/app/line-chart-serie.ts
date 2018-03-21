export class LineChartSerie {
	values:LineChartDatum[];
	key:String;
	color:String;
	candidateId:String;
}


class LineChartDatum{
	y:Number;
	x:Date;
}