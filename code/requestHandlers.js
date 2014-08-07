//by daige
var querystring = require("querystring");

//本地文件读取模块
var fs          = require("fs");

//使用formidable模块
var formidable      = require("formidable");


function start(response,request)
{
	console.log("请求处理函数：正在处理start");
    
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8 />'+
    '</head>'+
    '<boby>'+
    '<form action="/upload" enctype="multipart/form-data"  method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="文件上传" />'+
    '</form>'+
    '</boby>'+
    '</html>';

    response.writeHead(200,{"Content-Type":"text/html"});
    response.write(body);
    response.end();
}

function upload(response,request)
{
	console.log("请求处理函数：正在处理upload");

	var form = new formidable.IncomingForm();
	console.log("开始解析");
	form.parse(request,function(error,fields,files)
		{
			console.log("解析完成");
			fs.rename(files.upload.path,"D:/test.png",function(err)
				{
					if(err)		
					{
							fs.unlink("D:/test.png");
							fs.rename(files.upload.path,"D:/test.png")
					}
				}
			);

		response.writeHead(200,{"Content-Type":"text/plain"});
	    response.write("接收到图片:<br/>");
	   	response.write("<img src='/show' />")
	    response.end();
		}
	);

	
}

function show(response)
{
	console.log("请求处理函数：正在处理show");
	response.writeHead(200,{"Content-Type":"image/png"});
	//打开文件
	fs.createReadStream("D:/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
