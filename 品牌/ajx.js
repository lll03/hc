var ajax={
	http:function(fs,url,data,b,sfun,efun){
		try{
			var xml=new XMLHttpRequest();
		}catch(e){
			var xml=new ActiveXObject("Microsoft.XMLHTTP");
		}
		var str="";
		for(var key in data){
			str+=key+"="+data[key]+"$";
		}
		str=str.replce(/&$/,"");
		if(fs=="get"){
			xml.open(fs,url+"?"+str,b);
			xml.send(null);
		}else{
			xml.open(fs,url,b);
			xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xml.send(data);
		}
		xml.onreadystatechange=function(){
			if(xml.readyState==4){
				if(xml.status==200){
					var data=xml.responseText;
					data=JSON.parse(data);
					sfun(data)
				}else{
					efun("加载失败")
				}
			}else{
				console.log("加载中...")
			}
		}
	},
	get:function(obj){
		this.http("get",obj.data,obj.url,obj.b,obj.success,obj.error);
	}
	post:function(obj){
		this.http("post",obj.data,obj.url,obj.b,obj.success,obj.error);
	}
}
