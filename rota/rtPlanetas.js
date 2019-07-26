console.log('rtPlaneta: Entrei');
var express = require('express');
// const mongoose = require('mongoose');
let _mdPlaneta = require('.././models/mdPlanetas');
let _ctPlanetas = require('../controle/ctPlanetas')(_mdPlaneta);//(_mdPlaneta);
console.log('rtPlaneta: li o ctPlanetas');

var _rtPlaneta = express.Router();
console.log('rtPlaneta: iniciando router');

_rtPlaneta.route('')
	.get(_ctPlanetas.GetAll)
	.post(_ctPlanetas.Insert);

_rtPlaneta.route('/:id')
	.get(_ctPlanetas.GetById);

_rtPlaneta.route('/nome/:nome')
	.get(_ctPlanetas.GetByName)
	//.put(_ctPlanetas.Update)
	.delete(_ctPlanetas.Delete);
	
console.log('rtPlaneta: fim router');

module.exports = _rtPlaneta;
console.log('rtPlaneta: fim');
