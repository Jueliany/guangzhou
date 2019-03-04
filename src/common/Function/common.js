
// 公告方法
export default{
	// 获得城市名
	getCityName(list,id){
		for (var i = 0; i < list.length; i++) {
			if(list[i].id == id){
				return list[i].name;
			}
		}
		return "";
	},
	//
	getAgeAndPrice(data){
		var age = {};

		if(data.adultAgePrice != 0){
			age.price = data.adultAgePrice;
			age.age = 0;
		}else{
			age.price = data.childrenAgePrice;
			age.age = 1;
		}
		console.log(age)
		return age;
	},

	//校验
	checkDataType: function (val, type){
		/**邮箱验证**/
		if(type==59){
			/**获取用户输入的值,在将值中的空格过滤掉**/
			var value = val.replace(/\s/g,"");
			/**验证正则**/ 
            var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");		
			if(value.indexOf("@") == -1){
				return false;
			}else if(reg.test(value)){
				return false;
			}else{
				return true;
			}
		}
		
		/**手机格式验证**/
		else if(type==60){
			/**获取用户输入的值,在将值中的空格过滤掉**/
			var value = val.replace(/\s/g,"");
			/**验证正则**/ 
            var reg = /^[0-9]*$/;
			if(!reg.test(value.trim())){
				return false;
			}else{
				return true;
			}
		}
		/**数字格式验证**/
		else if(type==61){
			/**获取用户输入的值,在将值中的空格过滤掉**/
			var value = val.replace(/\s/g,"");
			/**将过滤掉的值返回回去**/
             
			/**验证正则**/ 
			var reg = /^[\d]+$/;
			if(!reg.test(value.trim())){
				return false;
			}else{
				return true;
			}
		}
		
		/**正整数格式验证**/
		else if(type==62){
			/**获取用户输入的值,在将值中的空格过滤掉**/
			var value = val.replace(/\s/g,"");
			/**将过滤掉的值返回回去**/
             
			/**验证正则**/ 
			var reg = /^[0-9]*[1-9][0-9]*$/;
			 
			if(!reg.test(value.trim())){
				return false;
			}else{
				return true;
			}
		}
		/**中文格式验证**/
		else if(type==63){
			/**获取用户输入的值,在将值中的空格过滤掉**/
			var value = val.replace(/\s/g,"");
			/**将过滤掉的值返回回去**/
             
			/**验证正则**/ 
			var reg = /^[\u4E00-\u9FA5]+$/;
			 
			if(!reg.test(value.trim())){
				return false;
			}else{
				return true;
			}
		}
		/**全英文格式验证**/
		else if(type==64){
			/**获取用户输入的值,在将值中的空格过滤掉**/
			var value = val.replace(/\s/g,"");
			/**将过滤掉的值返回回去**/
             
			/**验证正则**/ 
			var reg = /^[A-Za-z]+$/;
			 
			if(!reg.test(value.trim())){
				return false;
			}else{
				return true;
			}
		}
		/**单独非空格式验证**/
		else if(type==65){
			/**获取用户输入的值,在将值中的空格过滤掉**/
			//var value = val.replace(/\s/g,""); YRZ之前是过滤值中的空格，现在改为过滤前后空格 2017-3-29
			var value = val;
			/**将过滤掉的值返回回去**/
			if(value.trim()==""){
				return false;
			}else{
				return true;
			}
		}
		else{
			return true;
		}
	},
	// 是否为空
	isUndefine(data){
		if(data == undefined  || data == 'undefined' || data == ""){
			return null;
		}else{
			return data;
		}
	}

}