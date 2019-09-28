(function(){
	mui.init();
	var Index = 0;
	var tabsHref = ['view/home.html','view/info.html','view/find.html','view/personal.html'];
	mui.plusReady(function(){
		var current = plus.webview.currentWebview();
		// 创建子菜单
		for(var i = 0; i < tabsHref.length; i++) {
			var newview = plus.webview.create(tabsHref[i],tabsHref[i],{
				top: '46px',
				bottom: '50px',
			});
			if(i != Index){
				newview.hide();
			}
			current.append(newview);
		};
		// 创建底部导航栏
		var tabBar = plus.webview.create('tabBar.html','tabBar.html',{
			height: '50px',
			bottom: 0,
		});
		current.append(tabBar);
		
		// 接收窗体传参
		window.addEventListener('getTitle',function(e){
			var titleText = e.detail.title;
			var title = mui('.mui-title')[0];
			title.innerHTML = titleText;
		})
	});
	
	// 凸起按钮
	mui.plusReady(function () {
	    var self = plus.webview.currentWebview(),
	    	leftPos = Math.ceil((window.innerWidth - 60) / 2); // 设置凸起大图标为水平居中
	    
	    /**	
	     * drawNativeIcon 绘制带边框的半圆，
	     * 实现原理：
	     *   id为bg的tag 创建带边框的圆
	     *   id为bg2的tag 创建白色矩形遮住圆下半部分，只显示凸起带边框部分
	     * 	 id为iconBg的红色背景图
	     *   id为icon的字体图标
	     *   注意创建先后顺序，创建越晚的层级越高
	     */
	    var drawNativeIcon = new plus.nativeObj.View('icon', {
	    	bottom: '4px',
	    	left: leftPos + 'px',
	    	width: '60px',
	    	height: '70px'
	    }, [{
	    	tag: 'rect',
	    	id: 'bg',
	    	position: {
	    		top: '1px',
	    		left: '0px',
	    		width: '100%',
	    		height: '100%'
	    	},
	    	rectStyles: {
	    		color: '#fff',
	    		radius: '50%',
	    		borderColor: '#DD524D',
	    		borderWidth: '1px'
	    	}
	    }, {
	    	tag: 'rect',
	    	id: 'bg2',
	    	position: {
	    		bottom: '0px',
	    		left: '0px',
	    		width: '100%',
	    		height: '45px'
	    	},
	    	rectStyles: {
	    		color: '#fff'
	    	}
	    }, {
	    	tag: 'rect',
	    	id: 'iconBg',
	    	position: {
	    		top: '6px',
	    		left: '5px',
	    		width: '50px',
	    		height: '50px'
	    	},
	    	rectStyles: {
	    		color: '#d74b28',
	    		radius: '50%'
	    	}
	    }, {
	    	tag: 'font',
	    	id: 'icon',
	    	text: '+', //此为字体图标Unicode码'\e600'转换为'\ue600'
	    	position: {
	    		top: '-5px',
	    		left: '5px',
	    		width: '50px',
	    		height: '100%'
	    	},
	    	textStyles: {
	    		// fontSrc: '_www/fonts/iconfont.ttf',
	    		align: 'center',
	    		color: '#fff',
	    		size: '30px'
	    	}
	    }]);
	    // append 到父webview中
	    self.append(drawNativeIcon);
		
		// 事件监听
		drawNativeIcon.addEventListener('click',function(){
			alert('弹了个皮卡丘！');
		})
	})
})()