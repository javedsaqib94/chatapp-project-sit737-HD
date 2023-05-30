//catch Errors Handlers

exports.catchErrors = (fn) =>{
    return function (req,res, next){
        fn(req, res, next).catch((err) => {
            if (typeof err === "string"){
                res.status(400).json({
                    message : err
                });
            } else{
                next(err);
            }
        });
        
    };
};



//mongoose Errors

exports.mongoseErrors = (err, req, res, next) =>{
    if(!err.errors) return next(err);
    const errorkeys  = object.keys(err.errors);
    let message = "";
    errorkeys.forEach((key) => (message += err.errors[key].message + ","))
    message = err.message;
    res.status(400).json({
        message,
    });
};



//development errors
exports.developmentErrors = (err, req, res, next) =>{
    err.stack = err.status || "";
    const errorDetails = {
        messsage:  err.message,
        status: err.status,
        stack: err.stack
    };
     res.status(err.status || 500).json(errorDetails);   
};




//Production error  Handler

exports.productionErorrs = (err, req, res, next) =>{
    res.status(err.status || 500 ).json({
        message : "Internal Server Error",
    });
};



// 404 not found

exports.notFound = (req, res, next) =>{
    res.status(404).json({
        message : "Route Not Found",
    });
};


