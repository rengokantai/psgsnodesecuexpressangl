'use strict';
var url = require('url');

module.exports = function(whitelist){
    return function(req,res,next){
        var method = req.method;
        if(method === 'GET'||method==='OPTIONS'|| method==='HEAD'){
            return next();
        }

        var origin = getBaseUrl(req.headers.origin);
        var referer = getBaseUrl(req.headers.referer);
        var errorMsg;

        if(!origin&&!referer){
            return next();
        }

        if(origin && whitelist.indexOf(origin)<0){
            errorMsg = 'invalid '+origin;
        }else if(referrer && whitelist.indexOf(referrer)<0){
            errorMsg = 'invalid '+referer;
        }else{
            errorMsg=undefined;
        }

        if(errorMsg){
            res.statusCode=403;
            return next(new Error(errorMsg));
        }else {
            return next();
        }

        function getBaseUrl(fullurl){
            var parsedUrl = url.parse(fullurl);
            return parsedUrl.protocol + '//' + parsedUrl.host;
        }
    }
}
