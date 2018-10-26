// 顶部搜索栏
window.onload = function(){
	var tb_top = new Vue({
		el:".tb_top",
		data:{
			url:"fl_images/tbicon.png",
			url1:"fl_images/search.png",
			isFixed:true
		},
		methods:{
			//点击搜索框跳转至新页面搜索
			go_page:function(){
				window.location.href = "search.html";
			},
			scroll:function(){
				//获取滚动距离距离屏幕顶端的距离
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				//当滚动距离大于等于400时，显示；其余时候隐藏
				if (scrollTop >= 400 || scrollTop<=35) {
					this.isFixed = true;
				} else {
					this.isFixed = false;
				}
			}
    	}, 
    	//添加监听滚动事件
		mounted () {
			window.addEventListener('scroll', this.scroll)
		}
	});
	//轮播图
	var slider = new Vue({
		el:'.slider',
		data:{
			//第一张显示的图片
			img:"goods_pics/q14.jpg",
			//存储图片
			imgarr:[
				"goods_pics/q50.jpg",
				"goods_pics/q51.jpg",
				"goods_pics/q54.jpg",
				"goods_pics/q75.jpg",
				"goods_pics/q81.jpg",
				"goods_pics/q14.jpg"
			],
			index:0, //图片所在索引值
			activeColor:'#ff4d21', //默认第一张图片位置color标识为'#ff4d21'
		},
		methods:{
			picSlide:function(){
				let self=this;
				var i=0; //轮播图的位置i
                // 定时器，每5秒换一张图片  
                setInterval(function(){  
                    self.img=self.imgarr[self.index++];
                    i = i+2; //i自增，增量为2
                    //当i小于子节点的数目时，定义其颜色为'#ff4d21'，并让其前一个节点的color为'#fff',
                    //当i大于子节点的数目时，让其最后一个节点color为'#ff4d21'，第一个节点color为'#fff'
                    if(i<11){
                    	var j = i-2;	 
                    	document.getElementById('wrap').childNodes[j].style.color='#fff';
                    	document.getElementById('wrap').childNodes[i].style.color='#ff4d21';
                    }else{
                    	i=0;
                    	document.getElementById('wrap').childNodes[0].style.color="#ff4d21";
                    	document.getElementById('wrap').childNodes[10].style.color='#fff';	
                    }
                    //当图片轮播到第六张时，返回第一张
                    if(self.index>5){  
                        self.index=0;  
                    }  
                },5000); 
			}
		},
		//钩子函数，在实例创建之后被调用，调用picSlide()
		created:function(){
			this.picSlide();
		}
	});
	//底部导航栏
	var master = new Vue({
		el:'.master',
		data:{

		},
		methods:{
			// 点击导航栏中首页回到首页
			home:function(){
				window.location.href = "TB.html"
			},
			buy:function(){
				window.location.href = "shopping.html"
			}
		}
	});
	//点击显示隐藏部分商品
	var love_pics = new Vue({
		el:'.love_pics_module',
		data:{
			msg:'点击看看还有新商品嘛~',
			url1:"fl_images/search1.png",
			saw:false,
			see:true
		},
		methods:{
			ne:function(){
				//点击后将商品隐藏部分显示，将提示点击文字隐藏
				this.saw = true;
				this.see = false;
			},
			goods:function(){
				window.location.href = "goods_particulars.html";
			}
		}
	});
	var bottom_nav = new Vue({
		el:'.bottom_nav',
		data:{
			json:["登录","注册","电脑版","用户反馈"],
			index:0
		},
		methods:{
			btn:function(e){
				//点击‘电脑版’按钮，跳转至电脑版淘宝页面
				if(e.currentTarget.textContent=='电脑版'){
					window.location.href="https://www.taobao.com/index.php?spm=a215s.7406091.footer.3&from=wap";
				}
				//点击‘登录’按钮，跳转至登录页面
				else if(e.currentTarget.textContent=='登录'){
					window.location.href="login.html";
				}
				//点击‘注册’按钮，跳转至注册页面
				else if(e.currentTarget.textContent=='注册'){
					window.location.href="register.html";
				}
				//点击‘用户反馈’按钮，跳转至注册页面
				else if(e.currentTarget.textContent=='用户反馈'){
					window.location.href="response.html";
				}
			}
				
		}
	});
	var login = new Vue({
		el:'.tb_login',
		data:{
			username1:[], //存储用户名数据
			password1:[], //存储密码数据
			username:'',
			password:'',
			index:0,
			show:false,
			show1:false,
			show2:false,
			phone:'',
			pass:'',
			pass1:''
		},
		methods:{
			// 点击免费注册按钮，跳转至注册页
			regis:function(){
				window.location.href="register.html";
			},
			//点击登录按钮验证用户名和密码
			login:function(){
				//接收已存储的username1和password1并将其转换回数组格式
				var userName = JSON.parse(localStorage.getItem('this.username1'));
				var passWord = JSON.parse(localStorage.getItem('this.password1'));
				while(this.index!=userName.length-1 && username1.length!=0){
					this.index++;
				}
				for(var i=0;i<=this.index;i++){
					//登录成功时的条件，并在匹配成功后退出循环
					if(userName[i]==this.username&&passWord[i]==this.password){
						window.location.href="TB.html";
						//登录成功进入淘宝首页
						break;
					}else{
						//当循环的i值不等于this.index值时，继续循环但不输出
						if(i!=this.index)
							continue;
						//匹配失败，弹出提示框
						else{
							//用户名和密码不匹配时弹出提示
							this.show=true;
							let self=this;
							//弹出的提示框两秒后消失
							setTimeout(function(){
								self.show=false;
							},2000);
							break;
						}
					}
				}
			},
			//点击按钮验证手机号是否符合规范
			verrif:function(){
				var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				if(!reg.test(this.phone)){
					//检测失败，弹出提示框
                    this.show=true;
					let self=this;
					//弹出的提示框两秒后消失
					setTimeout(function(){
						self.show=false;
					},2000);
                }else{
                	//检测成功将手机号添加到用户名数据中并跳转至设置密码页
                	this.username1.push(this.phone);
                	//本地存储已更新的this.username1并将其转换为字符串格式
         			localStorage.setItem('this.username1',JSON.stringify(this.username1));
                	window.location.href='password.html';
                }
			},
			//点击按钮验证密码
			verrify:function(){
				//验证密码的位数在6位到15位之间
				if(this.pass.length>=6&&this.pass.length<=15){
					if(this.pass==this.pass1){
						this.password1.push(this.pass);
						//本地存储已更新的this.password1并将其转换为字符串格式
						localStorage.setItem('this.password1',JSON.stringify(this.password1));
						this.show2=true;
						let self=this;
						//两秒后跳转至登录页
						setTimeout(function(){
							window.location.href='login.html';
						},2000);
					}else{
						//弹出密码不一致的提示框
						this.show1=true;
						let self=this;
						//弹出的提示框两秒后消失
						setTimeout(function(){
							self.show1=false;
						},2000);
					}
				}else{
					//弹出密码不符合规范的提示框
					this.show=true;
					let self=this;
					//弹出的提示框两秒后消失
					setTimeout(function(){
						self.show=false;
					},2000);
				}
			}
		}
	});
	var back_click = new Vue({
		el:'.back',
		data:{},
		methods:{
			//返回上一页
			back:function(){
				window.history.back();
			}
		}
	});
	var response = new Vue({
		el:'.response',
		data:{
			text:'【新版H5首页】',
			activeColor:'#ddd',
			show_response:false
		},
		methods:{
			//当按下键盘按键，判断文本框是否等于this.text，若不等于，改变按钮的背景颜色
			change:function(){
				if(this.text!='【新版H5首页】'){
					this.activeColor = '#ff8401';
				}
			},
			submit:function(e){
				//当文本框this.text值改变时，发表按钮生效，否则阻止点击事件
				if(this.text!='【新版H5首页】'){
					this.show_response='true';
					let self=this;
					//弹出的提示框两秒后消失并跳转至淘宝首页
					setTimeout(function(){
						self.show_response=false;
						window.location.href='TB.html';
					},2000);
				}else{
					//阻止点击（默认）事件
					e.preventDefault();
				}
			}
		}
	});
	var goods_particulars = new Vue({
		el:'.goods_particulars',
		data:{
			price:45, //商品价格
			price1:8.00, //快递价格
			amount:11, //月销数量
			color:['本白','米黄','天蓝','浅粉'],
			size:'75*33cm',
			activeColor1:'#f5f5f5',
			amount1:1, //购买商品数量,
			choose:false, //立即购买 模块隐藏
			pay_money:0,//支付钱数
			pay_nav:false, //确认支付提示框隐藏
			cert:false,  //支付成功提示框隐藏
			name:'查米真丝'
		},
		methods:{
			//点击减号购买商品数量依次减少直至1为止
			minus:function(){
				if(this.amount1>1){
					this.amount1--;
					this.amount1 = this.amount1--;
				}
			},
			//点击加号购买商品数量依次增加
			add:function(){
				this.amount1++;
				this.amount1 = this.amount1++;
			},
			//点击立即购买弹出选择规格框
			buy:function(){
				this.choose = true;
			},
			//点击确定弹出付款提示框
			sure:function(){
				this.choose = false; //隐藏选择规格模块
				this.pay_nav=true;  //付款提示框显示
				//计算要支付的钱数
				this.pay_money = this.price*this.amount1+this.price1;
				localStorage.setItem('this.amount1',JSON.stringify(this.amout1));

			},
			//点击取消返回商品详情页
			cancle:function(){
				this.pay_nav=false;
			},
			//点击确定弹出支付成功提示框
			certain:function(){
				this.cert = true;
				this.pay_nav=false;
				//月销量增加
				this.amount = this.amount+this.amount1;
				//两秒后提示框消失
				let self = this;
				setTimeout(function(){
					self.cert = false;
				},2000);
			},
			//点击返回按钮，返回上一页
			back:function(){
				window.history.back();
			},
			add_shopping:function(){
				var nrr = []; //创建新数组
				//将对象添加到数组中
				arr = Object.assign({}, arr, {
	  				'name':this.name,
					'size':this.size,
					'price':this.price,
					'count':this.amount1
				});
				nrr.push(arr);
				if(localStorage.nrr){//
					let brr = localStorage.getItem('nrr');//原始购物车数据[{}]
					nrr = JSON.parse(brr);
					nrr.push(arr);
					localStorage.setItem('nrr',JSON.stringify(nrr));
				}else{
					localStorage.setItem('nrr',JSON.stringify(nrr)); //本地保存arr数据
				}
			}
		}
	});
	var search_moduel = new Vue({
		el:'.search_moduel',
		data:{
			myData:[],//存储提示文字的数据
			search1:'', //输入搜索商品的关键字
			now:-1, //判断位置的初始数值
			li_show:true, //下拉菜单初始呈显示状态
			history:[],//存储查询历史记录的数据
			clear:false //提示弹窗隐藏
		},
		methods:{
			search:function(e){
				//当点击回车时，跳转至查询结果页，并将下拉菜单隐藏
				if(e.keyCode==13){
					//这块还有一个浏览器兼容的问题，还没实现
					window.open('https://s.taobao.com/search?q='+this.search1);
					this.li_show = false; //搜索完成后隐藏下拉菜单
					var arr = []; //创建新数组用来存储经过整理的历史记录数据
					//在this.history原数组第一项之前添加搜索记录，以保证后搜索的记录在最前面
					if(this.search1){
						this.history.splice(0,0,this.search1); 
						//循环遍历this.history数组,删除重复项
						for(var i=0;i<this.history.length;i++){
							for(var j=i+1;j<=this.history.length;j++){
								this.history[i]!=this.history[j]&&arr.indexOf(this.history[i])==-1&&arr.push(this.history[i]);		
							}
						}
						// 将arr数组赋值给this.history数组
						this.history=arr;
						// 本地存储this.history数据
						localStorage.setItem('this.history',JSON.stringify(this.history));
						this.search1='';//搜索完成后清空搜索框的值
					}
				} 
                this.$http.jsonp("https://suggest.taobao.com/sug",{  
                    params:{  
                        q:this.search1 //搜索值等于输入的值 
                    }  
                }).then(resp=>{
                	//当搜索框里没有值时，清空this.myData的值
                	if(this.search1.trim()==''){
                		this.myData='';
                	}else{
                		var obj = []; //定义一个新数组
                		for(var i=0;i<resp.data.result.length;i++){
                			//将result中的每一个值放入数组中
                			obj.push(resp.data.result[i][0]);
                			//将obj数组的值赋给this.myData 
                			this.myData = obj;
                			this.li_show = true;
                		}
                	}
                },response => {  
                    console.log("发送失败"+response.status+","+response.statusText);  
                }).catch();          
			},
			//按下键，并且搜索框随时更新值
			changeDown:function(){
				this.now++;
				if(this.now==this.myData.length){
					this.now=0;
				}
				this.search1=this.myData[this.now];
			},

			//按上键，并且搜索框随时更新值
			changeUp:function(){
				this.now--;
				if(this.now==-1){
					this.now=this.myData.length-1;
				}
				this.search1=this.myData[this.now];
			},
			//点击搜索按钮，跳转至搜索结果页，并隐藏下拉菜单
			sure_search:function(){
				//这块还有一个浏览器兼容的问题，还没实现
				window.open('https://s.taobao.com/search?q='+this.search1);
				this.li_show = false; //搜索完成后隐藏下拉菜单
				var arr = []; //创建新数组用来存储经过整理的历史记录数据
				//在this.history原数组第一项之前添加搜索记录，以保证后搜索的记录在最前面
				if(this.search1){
				this.history.splice(0,0,this.search1); 
				//循环遍历this.history数组,删除重复项
				for(var i=0;i<this.history.length;i++){
					for(var j=i+1;j<=this.history.length;j++){
						this.history[i]!=this.history[j]&&arr.indexOf(this.history[i])==-1&&arr.push(this.history[i]);		
					}
				}
				// 将arr数组赋值给this.history数组
				this.history=arr;
				// 本地存储this.history数据
				localStorage.setItem('this.history',JSON.stringify(this.history));
				this.search1='';//搜索完成后清空搜索框的值
				}
			},
			//点击返回，回到上一页
			back:function(){
				window.history.back();
			},
			//刷新页面或者从别的页面进入，提取this.history的值
			getPageData:function(){
				this.history = JSON.parse(localStorage.getItem('this.history')) || [];
			},
			//点击清除全部，弹出提示框
			clearAll:function(){
				this.clear = true;
			},
			//点击确认，清空搜索历史记录并保存当前的this.history的值
			certain:function(){
				this.history = [];
				localStorage.setItem('this.history',JSON.stringify(this.history));
				this.clear = false;
			},
			//点击取消，将弹出框隐藏
			cancle:function(){
				this.clear = false;
			}
		},
		//钩子函数，在实例创建之后被调用，调用getPageData()
		created:function(){
			this.getPageData();
		}
	});

	var shopping_moduel = new Vue({
		el:'.shopping_moduel',
		data:{
			item:[],
			index:0, //item数组中的索引值
			pay:0, //购物车中物品总价格
			pay_nav:false,
			cert:false
		},
		methods:{
			btn_cut:function(){
				if(this.item.count>1){
					this.item.count--;
					this.item.count = this.item.count--;
					localStorage.setItem()
				}
			},
			btn_add:function(){
				this.item.count++;
				this.item.count = this.item.count++;
			},
			getPageData:function(){
				if(localStorage.nrr){
					let arr = JSON.parse(localStorage.getItem('nrr')); //提取arr数据
					this.item.push(...arr); //将arr添加到item中
					//计算购物车中商品的总价格
					var len = this.item.length;
					var pay_count=0;
					for(let i=0;i<len;i++){
						pay_count += this.item[i].price; 
					}
					this.pay = pay_count;
				}
			},
			//点击取消返回购物车页面
			cancle:function(){
				this.pay_nav=false;
			},
			//点击确定弹出支付成功提示框
			certain:function(){
				this.cert = true;
				this.pay_nav=false;
				//月销量增加
				this.amount = this.amount+this.amount1;
				//两秒后提示框消失
				let self = this;
				setTimeout(function(){
					self.cert = false;
				},2000);
				//购买完成清空购物车
				this.item = [];
				this.pay = 0;
			},
			//点击支付，弹出支付窗口
			pay1:function(){
				this.pay_nav = true;
			}
		},
		created:function(){
			this.getPageData();
		}
	});
};


