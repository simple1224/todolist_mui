require.config({
	baseUrl: './mui/js',
	paths: {
		"mui": "./mui.min",
		"showloading": "./showloading",
		"mui.picker.min": "./mui.picker.min",
		// "httpRequest": "../style/js/utils/httpRequest",
		"jquery": "./jquery"
	},
	shim: {
		'showloading': {
			deps: ['mui'],
			exports: 'showloading'
		},
		'mui.picker.min': {
			deps: ['mui'],
			exports: 'mui'
		}
	}
});
require(['mui', 'jquery', 'showloading', 'mui.picker.min'], function (mui, $) {
	//点击新建
	mui(".mui-inner-wrap").on('tap', '.new_button', function () {
		// $('#pop_window').show();
		$('.mask').show()
	})

	// 点击确认保存
	mui(".mui-input-group").on('tap', '#confirm', function () {
		console.log("确认")
		var title = mui('#title')[0].value.replace(/(^\s*)|(\s*$)/g, "");
		var content = mui('#content')[0].value.replace(/(^\s*)|(\s*$)/g, "");
		console.log('title', title)
		console.log('content', content)
		mui.ajax({
			type: "post",
			url: "http://132.232.2.53/todos",
			data: {
				'content': content,
				'title': title
			},
			dataType: "json",
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			},
			success: function (response) {
				console.log(response)
				if (data.code == "0") {
					resolve(data.data);
					return `
						<li class="mui-table-view-cell mui-collapse">
							<a class="mui-navigate-right" href="#">
								<div class="mui-card-header mui-card-media">
									<img src="./img/img1.jpg" />
									<div class="mui-media-body">
										<input id="nick_name" readonly value="标题"></input>
										<p>创建于 <span id="creat_date"></span></p>
									</div>
								</div>
							</a>
							<div class="mui-collapse-content">
								<div class="mui-card-content">
									<textarea name="" id="" cols="30" rows="10"></textarea>
								</div>
							</div>
						</li>	
					`
				} else {
					reject(data.msg)
				}
			}
		});
	})

	// 点击取消
	mui(".mui-input-group").on('tap', '#cancel', function () {
		$('.mask').hide();
	})



















	// 设置提醒时间
	$("#remindTime")[0].addEventListener('tap', function () {
		var this1 = this; //把这个点击记住
		var optionsJson = this1.getAttribute('data-options') || '{}';
		var options = JSON.parse(optionsJson);
		var picker = new mui.DtPicker(options);
		picker.show(function (rs) {
			console.log(rs.text);
			$("#remindTime")[0].value = rs.text;
			picker.dispose();
		});
	});

	// 获取编辑时间
	var myDate = new Date();
	var TRANSFER_DATE = '' + myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + '      ' + myDate.getHours() + ':' + myDate.getMinutes();
	console.log(TRANSFER_DATE)
	$('#creat_date')[0].textContent = TRANSFER_DATE;

	mui(".mui-inner-wrap").on('tap', '.save_button', function () {
		// 把input的值保存到localStorage

	})




	function init() {
		//mui组件初始化

		offCanvasWrapper = mui('#offCanvasWrapper');
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005
		});
		//主界面和侧滑菜单界面均支持区域滚动；
		mui('#offCanvasSideScroll').scroll();
		mui('#offCanvasContentScroll').scroll();
		//获取页面传递的参数并请求数据
		// pageParam = $http.getParam(window.location.href);
		//值列表
		// $list = $(".result-list");
	}

	init();

})

















// require.config({
//     baseUrl: './mui/js',
//     paths: {
//         "mui": "./mui.min",
//         "showloading": "./showloading",
//         "mui.picker.min": "./mui.picker.min",
//         "httpRequest": "../style/js/utils/httpRequest",
//         "jquery": "../style/js/utils/jquery"
//     },
//     shim: {
//         'showloading': {
//             deps: ['mui'],
//             exports: 'showloading'
//         },
//         'mui.picker.min': {
//             deps: ['mui'],
//             exports: 'mui'
//         }
//     }
// });

// require(['mui', 'jquery', 'httpRequest', 'showloading', 'mui.picker.min'], function (mui, $, $http) {
// 	//列表元素
// 	var $list = null
// 	//侧滑容器父节点
// 	var offCanvasWrapper = null;
// 	var pageNo = 1;
// 	var param = null;
// 	var pageParam = null;//页面传递的参数

// 	/*
// 	* 请求值列表
// 	* */
//  	function loadData() {
// 		return new Promise(function (resolve, reject) {
// 			console.log("=====当前查询页=========",pageNo);
// 			$http.ajax('json',{
// 				ServiceName: "ITEquipmentService",
// 				TransName: param['TransName'],
// 				MCH_NAME_QUERY_LIKE: param['keyword']||'',
// 				type: 'query',
// 				pageSize: '15',
// 				pageNo: pageNo + ''
// 			},true).then(function(data){
// 				console.log("data",data);
// 				if(data && data.length>0){
// 					$list.append(data.map((v, i) => {
// 						return `
// 							<li class="mui-table-view-cell" target="${param['target']}" data-meta="${$http.addUrlParam(param['target'],v)}">
// 								${v[param['content']]}
// 							</li>
// 						`;
// 					}).join(""));
// 					resolve(data.length);
// 				} else {
// 					mui.toast("没有更多数据");
// 					pageNo--;
// 				}
// 			}).catch(function(e){
// 				reject(e)
// 			});
// 		})
// 	}

// 	/*
// 	* 上拉加载更多
// 	* */
// 	function pullupRefresh () {
// 		pageNo++;
// 		loadData().finally(function(){
// 			mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
// 		});
// 	}

// 	/*
// 	* 新的部门点击事件
// 	* */
// 	mui(".mui-off-canvas-wrap").on('tap', '#NEW_DEPARTMENT', function () {
// 		$list.empty();
// 		pageNo = 1;
// 		param = {TransName: "departmentCode",content: "ORG_NAME",target:"NEW_DEPARTMENT"};
// 		loadData().then(function(){
// 			offCanvasWrapper.offCanvas('show');
// 		});
// 	})

// 	/*
// 	* 新的专业点击事件
// 	* */
// 	mui(".mui-off-canvas-wrap").on('tap', '#NEW_PROFESSION', function () {
// 		$list.empty();
// 		pageNo = 1;
// 		param = {TransName: "major",content: "LOV_KEY",target:"NEW_PROFESSION"};
// 		loadData().then(function(){
// 			offCanvasWrapper.offCanvas('show');
// 		});
// 	})

// 	/*
// 	* 新的责任人点击事件
// 	* */
// 	mui(".mui-off-canvas-wrap").on('tap', '#NEW_PRINCIPAL', function () {
// 		$list.empty();
// 		pageNo = 1;
// 		param = {TransName: "principal",content: "NAME",target:"NEW_PRINCIPAL"};
// 		loadData().then(function(){
// 			offCanvasWrapper.offCanvas('show');
// 		});
// 	})

// 	/*
// 	* 新的安装地点点击事件
// 	* */
// 	mui(".mui-off-canvas-wrap").on('tap', '#NEW_ALLOCAPLACE', function () {
// 		$list.empty();
// 		pageNo = 1;
// 		param = {TransName: "installationSite",content: "DESCRIPTION",target:"NEW_ALLOCAPLACE"};
// 		loadData().then(function(){
// 			offCanvasWrapper.offCanvas('show');
// 		});
// 	})

// 	/*
// 	* 值列表点击事件
// 	* */
// 	mui(".result-list").on('tap', '.mui-table-view-cell', function () {
// 		mui('#pullrefresh').scroll().scrollTo(0,0,0);
// 		var dataMeta = $http.getParam(this.getAttribute("data-meta")) ;
// 		var target = this.getAttribute("target");
// 		switch(target){
// 			case "NEW_DEPARTMENT":
// 				$('#NEW_DEPARTMENT')[0].value=dataMeta["ORG_NAME"]?dataMeta["ORG_NAME"]:"";
// 				mui("#NEW_DEPARTMENT")[0].setAttribute("formdata",dataMeta["ORG_CODE"]?dataMeta["ORG_CODE"]:"");
// 				break;
// 			case "NEW_PROFESSION":
// 				$('#NEW_PROFESSION')[0].value=dataMeta["LOV_KEY"]?dataMeta["LOV_KEY"]:"";
// 				mui("#NEW_PROFESSION")[0].setAttribute("formdata",dataMeta["LOV_VALUE"]?dataMeta["LOV_VALUE"]:"");
// 				break;
// 			case "NEW_PRINCIPAL":
// 				$('#NEW_PRINCIPAL')[0].value=dataMeta["NAME"]?dataMeta["NAME"]:"";
// 				mui("#NEW_PRINCIPAL")[0].setAttribute("formdata",dataMeta["PERSON_ID"]?dataMeta["PERSON_ID"]:"");
// 				break;
// 			case "NEW_ALLOCAPLACE":
// 				$('#NEW_ALLOCAPLACE')[0].value=dataMeta["DESCRIPTION"]?dataMeta["DESCRIPTION"]:"";
// 				mui("#NEW_ALLOCAPLACE")[0].setAttribute("formdata",dataMeta["CODE"]?dataMeta["CODE"]:"");
// 				break;
// 		}
// 		offCanvasWrapper.offCanvas('close');
// 	})

// 	/*
// 	* 保存按钮点击事件
// 	* */
// 	mui(".mui-off-canvas-wrap").on('tap', '#saveBotton', function () {
// 		var myDate = new Date();
// 		var TRANSFER_DATE = ''+myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate();
// 		var NEW_DEPARTMENT = mui("#NEW_DEPARTMENT")[0].getAttribute("formdata").replace(/\s+/g,"");
// 		var NEW_POSITION = mui("#NEW_POSITION")[0].value.replace(/\s+/g,"");
// 		var NEW_PROFESSION = mui("#NEW_PROFESSION")[0].getAttribute("formdata").replace(/\s+/g,"");
// 		var NEW_PRINCIPAL = mui("#NEW_PRINCIPAL")[0].getAttribute("formdata").replace(/\s+/g,"");
// 		var NEW_ALLOCAPLACE = mui("#NEW_ALLOCAPLACE")[0].getAttribute("formdata").replace(/\s+/g,"");
// 		var MCH_CODE = pageParam["mch_code"];
// 		var CONTRACT = pageParam["contract"];
// 		if(!NEW_DEPARTMENT){return mui.toast('新的部门不能为空')}
// 		if(!NEW_POSITION){return mui.toast('新的职位不能为空')}
// 		if(!NEW_PROFESSION){return mui.toast('新的专业不能为空')}
// 		if(!NEW_PRINCIPAL){return mui.toast('新的责任人为空')}
// 		if(!NEW_ALLOCAPLACE){return mui.toast('新的安装地点不能为空')}
// 		if(!MCH_CODE){return mui.toast('设备编码有误')}
// 		if(!CONTRACT){return mui.toast('域值有误')}
//  		console.log("TRANSFER_DATE:",TRANSFER_DATE);
// 		console.log("NEW_DEPARTMENT:",NEW_DEPARTMENT);
// 		console.log("NEW_POSITION:",NEW_POSITION);
// 		console.log("NEW_PROFESSION:",NEW_PROFESSION);
// 		console.log("NEW_PRINCIPAL:",NEW_PRINCIPAL);
// 		console.log("NEW_ALLOCAPLACE:",NEW_ALLOCAPLACE);
// 		console.log("MCH_CODE:",MCH_CODE);
// 		console.log("CONTRACT:",CONTRACT);
// 		$http.ajax('json',{
// 			ServiceName: "ITEquipmentService",
// 			TransName: "rightShift",
// 			MCH_CODE: MCH_CODE,
// 			CONTRACT: CONTRACT,
// 			TRANSFER_DATE: TRANSFER_DATE,
// 			NEW_DEPARTMENT: NEW_DEPARTMENT,
// 			NEW_POSITION: NEW_POSITION,
// 			NEW_PROFESSION: NEW_PROFESSION,
// 			NEW_PRINCIPAL: NEW_PRINCIPAL,
// 			NEW_ALLOCAPLACE: NEW_ALLOCAPLACE
// 		},true,true).then(function(data){
// 			mui.later(function(){
// 				mui.back();
// 			},2000);
// 		});
// 	})

//     function init() {
//         //mui组件初始化
// 		mui.init({
// 			pullRefresh : {
// 				container:"#pullrefresh",
// 				up: {
// 					contentrefresh: '正在加载...',
// 					callback: pullupRefresh
// 				}
// 			}
// 		});
// 		//侧滑容器父节点
// 		offCanvasWrapper = mui('#offCanvasWrapper');
//         mui('.mui-scroll-wrapper').scroll({
//             deceleration: 0.0005
//         });
// 		//主界面和侧滑菜单界面均支持区域滚动；
// 		mui('#offCanvasSideScroll').scroll();
// 		mui('#offCanvasContentScroll').scroll();
// 		//获取页面传递的参数并请求数据
// 		pageParam = $http.getParam(window.location.href);
// 		//值列表
// 		$list = $(".result-list");
//     }

//     init()
// });