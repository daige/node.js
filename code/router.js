//by daige
function route(handle,pathname,response,request)
{
	console.log("路由请求:" + pathname);

	if (typeof handle[pathname] === "function") 
		{
			 handle[pathname](response,request);
		}
		else
		{
			console.log("路由请求没找到 " + pathname);
			response.writeHead(404,{"Content-Type":"text/plain"});

			response.write("404 Not Found");
			response.end();
		}
}

exports.route = route;
