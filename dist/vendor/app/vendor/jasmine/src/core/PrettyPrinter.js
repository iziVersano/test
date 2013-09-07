jasmine.PrettyPrinter=function(){this.ppNestLevel_=0},jasmine.PrettyPrinter.prototype.format=function(e){this.ppNestLevel_++;try{e===jasmine.undefined?this.emitScalar("undefined"):e===null?this.emitScalar("null"):e===jasmine.getGlobal()?this.emitScalar("<global>"):e.jasmineToString?this.emitScalar(e.jasmineToString()):typeof e=="string"?this.emitString(e):jasmine.isSpy(e)?this.emitScalar("spy on "+e.identity):e instanceof RegExp?this.emitScalar(e.toString()):typeof e=="function"?this.emitScalar("Function"):typeof e.nodeType=="number"?this.emitScalar("HTMLNode"):e instanceof Date?this.emitScalar("Date("+e+")"):e.__Jasmine_been_here_before__?this.emitScalar("<circular reference: "+(jasmine.isArray_(e)?"Array":"Object")+">"):jasmine.isArray_(e)||typeof e=="object"?(e.__Jasmine_been_here_before__=!0,jasmine.isArray_(e)?this.emitArray(e):this.emitObject(e),delete e.__Jasmine_been_here_before__):this.emitScalar(e.toString())}finally{this.ppNestLevel_--}},jasmine.PrettyPrinter.prototype.iterateObject=function(e,t){for(var n in e){if(!e.hasOwnProperty(n))continue;if(n=="__Jasmine_been_here_before__")continue;t(n,e.__lookupGetter__?e.__lookupGetter__(n)!==jasmine.undefined&&e.__lookupGetter__(n)!==null:!1)}},jasmine.PrettyPrinter.prototype.emitArray=jasmine.unimplementedMethod_,jasmine.PrettyPrinter.prototype.emitObject=jasmine.unimplementedMethod_,jasmine.PrettyPrinter.prototype.emitScalar=jasmine.unimplementedMethod_,jasmine.PrettyPrinter.prototype.emitString=jasmine.unimplementedMethod_,jasmine.StringPrettyPrinter=function(){jasmine.PrettyPrinter.call(this),this.string=""},jasmine.util.inherit(jasmine.StringPrettyPrinter,jasmine.PrettyPrinter),jasmine.StringPrettyPrinter.prototype.emitScalar=function(e){this.append(e)},jasmine.StringPrettyPrinter.prototype.emitString=function(e){this.append("'"+e+"'")},jasmine.StringPrettyPrinter.prototype.emitArray=function(e){if(this.ppNestLevel_>jasmine.MAX_PRETTY_PRINT_DEPTH){this.append("Array");return}this.append("[ ");for(var t=0;t<e.length;t++)t>0&&this.append(", "),this.format(e[t]);this.append(" ]")},jasmine.StringPrettyPrinter.prototype.emitObject=function(e){if(this.ppNestLevel_>jasmine.MAX_PRETTY_PRINT_DEPTH){this.append("Object");return}var t=this;this.append("{ ");var n=!0;this.iterateObject(e,function(r,i){n?n=!1:t.append(", "),t.append(r),t.append(" : "),i?t.append("<getter>"):t.format(e[r])}),this.append(" }")},jasmine.StringPrettyPrinter.prototype.append=function(e){this.string+=e};