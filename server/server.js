var express = require('express');
var server = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
    // host : '54.183.138.146',
    // user : 'ec2-user',
    // password : '1234',
    // database : 'voice',
    user     : 'root',
    password : '1234',
    database : 'voice'

});
connection.connect(function(error){
    if(error){
        console.log(error);
    }
    else{
        console.log('Connected');
    }
});
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.get('/voice/', function (req, res, next) {
    //res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
    connection.query("SELECT * FROM family", function(err, result, fields){
        if(err){
            console.log(err);
            console.log("쿼리문에 오류가 있습니다.");
        }
        else{
            console.log('Access');
            console.log(result);
            res.json(result);
        }
    });
});

server.get('/test/', function (req, res, next) {
    connection.query("SELECT * FROM family", function(err, result, fields){
        if(err){
            console.log(err);
            console.log("쿼리문에 오류가 있습니다.");
        }
        else{
            console.log('Access');
            console.log(result);
            res.json(result);
        }
    });    
});

server.post('/test/', function (req, res, next) {
    var body = req.body;
    console.log(body)
    console.log('123123');
    if(parseInt(body.message.indexOf('관리자')) !== -1){
        res.json({
                isOk : true, 
                message : body.message + '사용자가 등록되었습니다.'
        
        });
    }
    else{
        res.json({
            isOk : false, 
            message : body.message + '사용자가 등록이 실패했습니다.'

        });
    }
    console.log('444');
});

server.get('/state/:device_id', function (req, res, next) {
    connection.query("SELECT * FROM object WHERE device_id = ?", req.params.device_id, function(err, result, fields){
        if(err){
            console.log(err);
            console.log("쿼리문에 오류가 있습니다.");
        }
        else{
            console.log('Access');
            console.log(result);
            res.json(result.state);
        }
    });
});

server.get('/password/:user_id', function (req, res, next) {
    connection.query("SELECT * FROM user WHERE user_id = ?", req.params.user_id, function(err, result, fields){
        if(err){
            console.log(err);
            console.log("쿼리문에 오류가 있습니다.");
        }
        else{
            console.log('Access');
            console.log(result);
            res.json(result.password);
        }
    });
});

server.post('/user/', function (req, res, next) {
    var body = req.body;
    connection.query("INSERT INTO user SET ?", body, function(err, result, fields){
        if(err){
            console.log(err);
            console.log("쿼리문에 오류가 있습니다.");
            res.json({
                result : {
                        isOk : false, 
                        error : "쿼리문에 오류가 있습니다."
                }
            });
        }
        else{
            console.log('Access');
            console.log(result);
            res.json({
                result : {
                        isOk : true, 
                        message : '사용자가 등록되었습니다.'
                }
            });
        }
    });
}); 

server.post('/device/', function (req, res, next) {
    var body = req.body;
    connection.query("INSERT INTO user SET ?", body, function(err, result, fields){
        if(err){
            console.log(err);
            console.log("쿼리문에 오류가 있습니다.");
            res.json({
                result : {
                        isOk : false, 
                        error : "쿼리문에 오류가 있습니다."
                }
            });
        }
        else{
            console.log('Access');
            console.log(result);
            res.json({
                result : {
                        isOk : true, 
                        message : '디바이스가 등록되었습니다.'
                }
            });
        }
    });
});

server.delete('/user/:user_name', function (req, res, next) {
    var i = 0;
    var user_name;
    var body = req.body;
    connection.query("SELECT * FROM user", function(err, result, fields){
        if(err){
            console.log(err);
            console.log("쿼리문에 오류가 있습니다.");
        }
        else{
            console.log('Access');
            console.log(result);
            for(i = 0; i < result.length; i++){
                user_name = body.name.indexOf(result[i].user_name);
                if(parseInt(name) !== -1){
                    if(parseInt(body.name.indexOf('삭제')) !== -1){
                        connection.query("DELETE * FROM user WHERE user_name = ?", user_name, function(error, rows){ 
                            if(error){ 
                                throw error;
                            }	
                            else{ 
                                console.log(rows); 
                            } 
                        });
                        res.json({
                            isOk : true,
                            message : result[i].user_name + '가 삭제되었습니다.'
                        });
                    }                  
                    else {
                        res.json({
                            isOk : false, 
                            error : '명령을 확인해주세요.'
                        });
                    }
                }
            }
            res.json({
                isOk : false, 
                error : 'user가 존재하지 않습니다.'
            });
        }
    });
    // connection.query("DELETE * FROM user WHERE user_id = ?", req.params.user_id, function(err, result, fields){
    //     if(err){
    //         console.log(err);
    //         console.log("쿼리문에 오류가 있습니다.");
    //         res.json({
    //             result : {
    //                     isOk : false, 
    //                     error : "쿼리문에 오류가 있습니다."
    //             }
    //         });
    //     }
    //     else{
    //         console.log('Access');
    //         console.log(result);
    //         res.json({
    //             result : {
    //                     isOk : true, 
    //                     message : req.params.user_id + '가 삭제되었습니다.'
    //             }
    //         });
    //     }
        
    // });
}); 

server.delete('/device/:object_name', function (req, res, next) {
    var i = 0;
    var name;
    var body = req.body;
    connection.query("SELECT * FROM object", function(err, result, fields){
        if(err){
            console.log(err);
            console.log("쿼리문에 오류가 있습니다.");
        }
        else{
            console.log('Access');
            console.log(result);
            for(i = 0; i < result.length; i++){
                name = body.name.indexOf(result[i].object_name);
                if(parseInt(name) !== -1){
                    if(parseInt(body.name.indexOf('삭제')) !== -1){
                        connection.query("DELETE * FROM object WHERE object_name = ?", name, function(error, rows){ 
                            if(error){ 
                                throw error;
                            }	
                            else{ 
                                console.log(rows); 
                            } 
                        });
                        res.json({
                            isOk : true,
                            message : result[i].object_name + '가 삭제되었습니다.'
                        });
                    }                  
                    else {
                        res.json({
                            isOk : false, 
                            error : '명령을 확인해주세요.'
                        });
                    }
                }
            }
            res.json({
                isOk : false, 
                error : 'object가 존재하지 않습니다.'
            });
        }
    });
});    
//     connection.query("DELETE * FROM object WHERE object_name = ?", req.params.object_name, function(err, result, fields){
//         if(err){
//             console.log(err);
//             console.log("쿼리문에 오류가 있습니다.");
//             res.json({
//                 isOk : false, 
//                 error : "쿼리문에 오류가 있습니다."
//             });
//         }
//         else{
//             console.log('Access');
//             console.log(result);
//             res.json({
//                 isOk : true, 
//                 message : req.params.object_name + '가 삭제되었습니다.'
//             });
//         }
//     });
// }); 

server.put('/state/', function (req, res, next) {
    var i = 0;
    var name;
    var body = req.body;
    connection.query("SELECT * FROM object", function(err, result, fields){
        if(err){
            console.log(err);
            console.log("쿼리문에 오류가 있습니다.");
        }
        else{
            console.log('Access');
            console.log(result);
            for(i = 0; i < result.length; i++){
                console.log(1);
                name = body.message.indexOf(result[i].object_name);
                if(parseInt(name) !== -1){
                    console.log(2);
                    if(parseInt(body.message.indexOf('켜')) !== -1){
                        console.log(3);
                        // connection.query("UPDATE object SET object_state = 1 WHERE object_name = ?", result[i].object_name, function(error, rows){ 
                        //     if(error){ 
                        //         throw error;
                        //     }	
                        //     else{ 
                        //         console.log(rows); 
                        //     } 
                        // });
                        res.json({
                            result : {
                                    isOk : true,
                                    message :  result[i].object_name
                                    //state : result[i].object_state
                            }
                        });
                    }
                    else if(parseInt(body.name.indexOf('꺼')) !== -1){
                        connection.query("UPDATE object SET state = 0 WHERE name = ?", result[i].object_name, function(error, rows){ 
                            if(error){ 
                                throw error;
                            }	 
                            else{ 
                                console.log(rows); 
                            } 
                        });
                        res.json({
                            result : {
                                    isOk : true,
                                    message :  result[i].object_name,
                                    state : result[i].object_state
                            }
                        });
                    }
                    else {
                        res.json({
                            result : {
                                    isOk : false, 
                                    error : '명령을 확인해주세요.'
                            }
                        });
                    }
                }
            }
            res.json({
                result : {
                        isOk : false, 
                        error : 'object가 존재하지 않습니다.'
                }
            });
        }
    });
}); 

server.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = server;

// server.get('/user/:id', function (req, res) {

//     for (var i = 0; i < db1.userlist.length; i++){
//         if(db1.userlist[i].id === parseInt(req.params.id)){
//             res.send(db1.userlist[i]);
//             return;
//         }
//     }
//     res.send({ 
//         error : 'ID가 존재하지 않습니다.'
//     });
// });

// server.post('/user/', function (req, res) {
//     var body = req.body;
//     var id = 0; 
//     var age = parseInt(body.age);

//     for (var i = 0; i < db1.userlist.length; i++){
//         if(id < db1.userlist[i].id){
//         id = db1.userlist[i].id;                     
//         }
//     }
//     body['age'] = age; 
//     //console.log(body.name)
//     body['id'] = ++length;
//     db1.userlist.push(body);
//     /*var result = {
//                     result : {
//                         isOk : true, 
//                         user : body
//                     }
//     }       
//     res.send(result)*/
//     res.send({   
//         result : {
//             isOk : true, 
//             user : body
//         }
//     })
//     //console.log(result.result.isOk)
//     //console.log(result.isOk)
// });

// server.delete('/user/:id', function (req, res) {
//     var index = 9999;
//     for (var i = 0; i < db1.userlist.length; i++){
//         if(db1.userlist[i].id === parseInt(req.params.id)) {
//             index = i;
//             break;
//         }
//     }    
//     if(index === 9999){
//         res.send({
//             result : {
//                 isOk : false , error : 'ID가 존재하지 않습니다.'
//             }
//         });
//     } 
//     else { 
//         res.send({
//             result : {
//                 isOk : true , user : db1.userlist[index]
//             }
//         });
//         db1.userlist.splice(index,1);  
//     }  
// });

// server.put('/user/:id', function (req, res) {
//     var body = req.body;
//     var id = 0;
//     var index;

//     for (var i = 0; i < db.length; i++){
//         if(db1.userlist[i].id === parseInt(req.params.id)){
//             index = i;
//             db1.userlist.splice(index,1);
//             body['id'] = parseInt(req.params.id);
//             db1.userlist.splice(index,0,body);
//             res.send({   
//                 result : {
//                     isOk : true, 
//                     user : body
//                 }
//             })
//         return;
//         }
//     }    
//     res.send({   
//         result : {
//             isOk : false, 
//             error : 'ID가 존재하지 않습니다.'
//         }
//     })
//     //db.push(body);
// });
