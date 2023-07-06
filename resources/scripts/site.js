/*
 * GNB
 */
;(function() {
	var AccessibleNav = function() {
		this.status = false;
		this.anchor = [];
	};

	AccessibleNav.prototype = {
		initialize:function() {
			var that = this;
			that.hook = $(that.options.hook);
			that.listParent = that.options.listParent;
			that._map();

			that.anchor.on('focus', function() {
					that._focus.apply(that, [this, 'focus']);
				}).on('focusout', function() {
					that.status = false;
					setTimeout(function() {
						if(that.status === false) {
							that._blur();
						}
					}, 12);
				}).on('focusin', function() {
					that.status = true;
				}).on('mouseenter', function() {
					that._focus.apply(that, [this, 'mouseover']);
				});

			that.hook.on('mouseleave', function() {
				$(this).find(that.listParent).removeClass(that.options.mouseoverClass);
				that.hook.removeClass(that.options.selectClass);
			});
		},
		_map:function() {
			var that = this;

			that.hook.find('a').each(function() {
				that.anchor = $.merge($(this), that.anchor);
			});
		},
		_focus:function(el, type) {
			var that = this,
				_class = type === 'focus' ? that.options.focusClass : that.options.mouseoverClass;

			$(el).closest(that.hook).addClass(that.options.selectClass);

			$(el).closest(that.listParent).addClass(_class)
				.siblings().removeClass(_class);
		},
		_blur:function() {
			var that = this;

			that.hook.removeClass(that.options.selectClass)
				.find(that.listParent).removeClass(that.options.focusClass);
		}
	};

	var gnb = new AccessibleNav();

	return {
		load:function() {
			var that = this;
			$(window).on('load', function() {
				gnb.options = {
					hook:'.gnb',
					listParent:'li.gnb-menu',
					selectClass:'selected',
					focusClass:'focus',
					mouseoverClass:'over'
				};

				gnb.initialize();
			});
		}
	};
})().load();


/* 3차 추가 */
function gnbThird() {

	jQuery('.gnb .sub-nav__3rd a').closest('.sub-nav__box__list').addClass('has_3rd');


	var oldIndex = 0;

	jQuery('.gnb .has_3rd').mouseenter(function() {
		var thisIndex = jQuery('.has_3rd').index(this);

		jQuery('.gnb .has_3rd').removeClass('focus');
		jQuery('.gnb .has_3rd .sub-nav__3rd').eq(thisIndex).addClass('on');
		jQuery('.gnb .has_3rd').eq(thisIndex).addClass('on');
		if(oldIndex != null && thisIndex != oldIndex){
			jQuery('.gnb .has_3rd .sub-nav__3rd').eq(oldIndex).removeClass('on');
			jQuery('.gnb .has_3rd').eq(oldIndex).removeClass('on');

			}
		oldIndex = thisIndex;

		return false;
	});

	jQuery('.gnb .has_3rd').mouseleave(function() {
		var thisIndex = jQuery('.gnb .has_3rd').index(this);

			jQuery('.gnb .has_3rd .sub-nav__3rd').eq(oldIndex).removeClass('on');
			jQuery('.gnb .has_3rd').eq(oldIndex).removeClass('on');

		oldIndex = thisIndex;

		return false;
	});
	jQuery('.gnb .sub-nav__box__list > a').focusin(function() {
		var thisIndex = jQuery('.gnb .has_3rd > a').index(this);
		var momItem = jQuery(this).closest('.sub-nav__box__list');

		jQuery('.gnb .has_3rd').removeClass('focus');

		if(momItem.hasClass('has_3rd') == true){
			jQuery('.gnb .has_3rd').eq(thisIndex).addClass('focus');
		} else if (momItem.hasClass('has_3rd') != true){
			jQuery('.gnb .has_3rd').removeClass('focus');
		}
		oldIndex = thisIndex;

		return false;
	});
	jQuery('.gnb-menu > a').focusin(function() {
		jQuery('.gnb .has_3rd').removeClass('focus');
	});

	jQuery('.gnb .gnb-menu').each(function(i) {
		$(this).addClass('sel_' + (i + 1));
	});
}



/* skip navigation */

function skipNavi() {

	jQuery('.skiptoContent').focusin(function(){
		jQuery('.skiptoContent').addClass('on');

	});
	jQuery('.skiptoContent').focusout(function(){
		jQuery('.skiptoContent').removeClass('on');

	});
}

/*탭*/
function mainTab(tabName) {
	var oldIndex = 0;
	jQuery(tabName).find('.js-nav__list').click(function() {
		var thisIndex = jQuery(tabName).find('.js-nav__list').index(this);
		var tabItem = jQuery(tabName).find('.js-nav__list');
		//var nextItem = jQuery(tabName).find('.js-nav__list').next();
		var boxItem = jQuery(tabName).find('.js-box');

		tabItem.removeClass('on');
		boxItem.removeClass('on');
		//nextItem.removeClass('next-item');
		tabItem.eq(thisIndex).addClass('on');
		boxItem.eq(thisIndex).addClass('on');
		//nextItem.eq(thisIndex).addClass('next-item');

		return false;
	});
};

/*서브탭*/
function subTab(tabName) {

	//	document.title =  jQuery(tabName).find( '.js-nav__list.on a' ).html() + ' /' + jQuery('.loc_tit').html() + ' | ';

		var locItem = $('.location-box__cont > span');
		var loc = [locItem.eq(2).text(),
			locItem.eq(4).text(),
			locItem.eq(6).text(),
			locItem.eq(8).text()
			];
		var locL = locItem.length;
		var siteTitle = '사이트이름';
		jQuery(tabName).find('.js-nav__list').click(function() {
			var thisIndex = jQuery(tabName).find('.js-nav__list').index(this);
			var tabItem = jQuery(tabName).find('.js-nav__list');
			var boxItem = jQuery(tabName).find('.js-box');

			tabItem.removeClass('on');
			boxItem.removeClass('on');
			tabItem.eq(thisIndex).addClass('on');
			boxItem.eq(thisIndex).addClass('on');


			if (locL == 5) {
				document.title = $(tabName).find( '.js-nav__list.on a' ).text() + ' < ' + loc[1] + ' < ' + loc[0] + ' | ' + siteTitle
			} else if (locL == 7) {
				document.title = $(tabName).find( '.js-nav__list.on a' ).text() + ' < ' + loc[2] + ' < ' + loc[1] + ' < ' + loc[0] + ' | ' + siteTitle
			} else if (locL == 9) {
				document.title = $(tabName).find( '.js-nav__list.on a' ).text() + ' < ' + loc[3] + ' < ' + loc[2] + ' < ' + loc[1] + ' < ' + loc[0] + ' | ' + siteTitle
			} else {
				document.title = $(tabName).find( '.js-nav__list.on a' ).text() + ' < ' + loc[0] + ' | ' + siteTitle
			}

			var firstTabItem = $(tabName).find('.js-nav__list.on a');
			$('.js-nav__list a').find('small').remove();
			firstTabItem.append("<small class='hidden_word'>(선택됨)</small>");

			return false;
		});
	};

/*서브탭 2 탭안에 탭일 경우 내부탭은 이걸 사용*/
function subTab2(tabName) {

	var firstTabItem = jQuery(tabName).find('.js-nav2__list.on');
		firstTabItem.attr('title', '선택됨');

	jQuery(tabName).find('.js-nav2__list').click(function(e) {

		var thisIndex = jQuery(tabName).find('.js-nav2__list').index(this);
		var tabItem = jQuery(tabName).find('.js-nav2__list');
		var boxItem = jQuery(tabName).find('.js-box2');

		tabItem.removeClass('on');
		boxItem.removeClass('on');
		tabItem.eq(thisIndex).addClass('on');
		boxItem.eq(thisIndex).addClass('on');

		tabItem.attr('title', '');
		tabItem.eq(thisIndex).attr('title', '선택됨');

		return false;
	});
};


/* 탭 로드 스크립트 */
function subTabNew(tabName) {

	var locItem = $('.location-box__cont > span');
	var loc = [locItem.eq(2).text(),
		locItem.eq(4).text(),
		locItem.eq(6).text(),
		locItem.eq(8).text()
		];
	var locL = locItem.length;
	var siteTitle = '사이트이름';

	jQuery(tabName).find('.js-nav__list a').on('click',function(e) {
		var thisIndex = jQuery(tabName).find('.js-nav__list a').index(this);
		var tabItem = jQuery(tabName).find('.js-nav__list');
		var boxItem = jQuery(tabName).find('.js-box');
		var scrollmem = $('html').scrollTop() || $('body').scrollTop();

		tabItem.removeClass('on');
		boxItem.removeClass('on');
		tabItem.eq(thisIndex).addClass('on');
		boxItem.eq(thisIndex).addClass('on');

		if (locL == 5) {
			document.title = $(tabName).find( '.js-nav__list.on a' ).text() + ' < ' + loc[1] + ' < ' + loc[0] + ' | ' + siteTitle
		} else if (locL == 7) {
			document.title = $(tabName).find( '.js-nav__list.on a' ).text() + ' < ' + loc[2] + ' < ' + loc[1] + ' < ' + loc[0] + ' | ' + siteTitle
		} else if (locL == 9) {
			document.title = $(tabName).find( '.js-nav__list.on a' ).text() + ' < ' + loc[3] + ' < ' + loc[2] + ' < ' + loc[1] + ' < ' + loc[0] + ' | ' + siteTitle
		} else {
			document.title = $(tabName).find( '.js-nav__list.on a' ).text() + ' < ' + loc[0] + ' | ' + siteTitle
		}

		var firstTabItem = $(tabName).find('.js-nav__list.on a');
		$('.js-nav__list a').find('small').remove();
		firstTabItem.append("<small class='hidden_word'>(선택됨)</small>");


		e.preventDefault();
		if($(this).attr('href').split('#')[1].length > 0) {
			location.hash = jQuery(this).attr('href').replace(/^.*#/, '');
			$('html,body').scrollTop(scrollmem);
		}

		//window.location.reload();

		return false;
	});
};

/* 탭 로드 스크립트 + 새로고침*/
function subTabNewF5(tabName) {

	// var firstTabItem = jQuery(tabName).find('.js-nav__list.on');
	// 	firstTabItem.attr('title', '선택됨');
	jQuery(tabName).find('.js-nav__list a').click(function(e) {
		var thisIndex = jQuery(tabName).find('.js-nav__list a').index(this);
		var tabItem = jQuery(tabName).find('.js-nav__list');
		var boxItem = jQuery(tabName).find('.js-box');
		var scrollmem = jQuery('html').scrollTop() || jQuery('body').scrollTop();

		tabItem.removeClass('on');
		boxItem.removeClass('on');
		tabItem.eq(thisIndex).addClass('on');
		boxItem.eq(thisIndex).addClass('on');

		// tabItem.attr('title', '');
		// tabItem.eq(thisIndex).attr('title', '선택됨');

		e.preventDefault();
		if($(this).attr('href').split('#')[1].length > 0) {
			location.hash = jQuery(this).attr('href').replace(/^.*#/, '');
			jQuery('html,body').scrollTop(scrollmem);
		}

		window.location.reload();

		return false;
	});
};



/*서브탭 추가 (스크롤 이동)*/

function newTap(tabName) {
	document.title =  jQuery(tabName).find( '.js-nav__list.on a' ).html() + ' /' + jQuery('.loc_tit').html() + ' ▦ ';

	jQuery(tabName).find('.js-nav__list').click(function() {
		var thisIndex = jQuery(tabName).find('.js-nav__list').index(this);
		var tabItem = jQuery(tabName).find('.js-nav__list');
		var boxItem = jQuery(tabName).find('.js-box');
		var siteTitle = jQuery('h1 img').attr('alt');
		var offset = $(tabName).find(".js-box.on").offset();

		tabItem.removeClass('on');
		boxItem.removeClass('on');
		tabItem.eq(thisIndex).addClass('on');
		boxItem.eq(thisIndex).addClass('on');
		document.title =  jQuery(tabName).find( '.js-nav__list.on a' ).text() + ' /' + jQuery('.loc_tit').text() + ' ▦ ' + siteTitle;


		$('html, body').animate({scrollTop : offset.top}, 400);


		return false;
	});
};

/*자동사이즈*/
function menuSize(menuName) {
	var menuWd = 100/jQuery(menuName).find('> ul > li').length;
		jQuery(menuName).find('> ul > li').css('width',menuWd + '%' );
};

/*갯수 숫자 클래스 삽입*/
function menuNumbering(menuName){
	var menuLength = jQuery(menuName).find('> ul > li').length;
	jQuery(menuName).addClass('menu-num-'+ menuLength);

}


/* title_copy */

function title_copy(siteTitle){

	var sjLine = jQuery('tr').hasClass('sj_line');
	var sjLineNew = jQuery('.board_view_top > strong').hasClass('tit');
	var sjLineNew2 = jQuery('h3').hasClass('new-big-view__top__tit');

	var jg1 = $('li').hasClass('js-nav__list');
	var jg2 = $('li').hasClass('sub-tab__ul__li');

	var locItem = $('.location-box__cont > span');
	var loc = [locItem.eq(2).text(),
		locItem.eq(4).text(),
		locItem.eq(6).text(),
		locItem.eq(8).text()
		];
	var locL = locItem.length;

	var mainLocate = jQuery('body').hasClass('mainpage');


	if (!jg1 && jg2) { //  title
		if (locL == 5) {
			document.title = $('.sub-tab').find( '.sub-tab__ul__li.on a' ).text() + ' < ' + loc[1] + ' < ' + loc[0] + ' | ' + siteTitle
		} else if (locL == 7) {
			document.title = $('.sub-tab').find( '.sub-tab__ul__li.on a' ).text() + ' < ' + loc[2] + ' < ' + loc[1] + ' < ' + loc[0] + ' | ' + siteTitle
		} else if (locL == 9) {
			document.title = $('.sub-tab').find( '.sub-tab__ul__li.on a' ).text() + ' < ' + loc[3] + ' < ' + loc[2] + ' < ' + loc[1] + ' < ' + loc[0] + ' | ' + siteTitle
		} else {
			document.title = $('.sub-tab').find( '.sub-tab__ul__li.on a' ).text() + ' < ' + loc[0] + ' | ' + siteTitle
		}

		var firstTabItem = $('.sub-tab').find('.sub-tab__ul__li.on a');
			//firstTabItem.attr('title', '선택됨');
			firstTabItem.append("<small class='hidden_word'>(선택됨)</small>");
	} else if (jg1 && jg2) {
		if (locL == 5) {
			document.title = $('.sub-tab').find( '.js-nav__list.on a' ).text() + ' < ' + loc[1] + ' < ' + loc[0] + ' | ' + siteTitle
		} else if (locL == 7) {
			document.title = $('.sub-tab').find( '.js-nav__list.on a' ).text() + ' < ' + loc[2] + ' < ' + loc[1] + ' < ' + loc[0] + ' | ' + siteTitle
		} else if (locL == 9) {
			document.title = $('.sub-tab').find( '.js-nav__list.on a' ).text() + ' < ' + loc[3] + ' < ' + loc[2] + ' < ' + loc[1] + ' < ' + loc[0] + ' | ' + siteTitle
		} else {
			document.title = $('.sub-tab').find( '.js-nav__list.on a' ).text() + ' < ' + loc[0] + ' | ' + siteTitle
		}

		var firstTabItem = $('.sub-tab').find('.js-nav__list.on a');
			//firstTabItem.attr('title', '선택됨');

			firstTabItem.append("<small class='hidden_word'>(선택됨)</small>");
	} else {

		//일반페이지 title

		if (mainLocate == true) {
			document.title = siteTitle ;
		}
		else {
			if (locL == 5) {
				document.title = loc[1] + ' < ' + loc[0] + ' | ' + siteTitle
			} else if (locL == 7) {
				document.title = loc[2] + ' < ' + loc[1] + ' < ' + loc[0] + ' | ' + siteTitle
			} else if (locL == 9) {
				document.title = loc[3] + ' < ' + loc[2] + ' < ' + loc[1] + ' < ' + loc[0] + ' | ' + siteTitle
			} else {
				document.title = loc[0] + ' | ' + siteTitle
			}

		}
		if (sjLine == true ){ // 구cms 게시판뷰
			document.title =  jQuery('.sj_line td').text() + ' / ' + jQuery( '.loc_tit' ).text() + ' | ' + siteTitle ;
		}
		if (sjLineNew == true ){ // 뉴cms 게시판뷰
			if(locL == 7){
				document.title =  jQuery('.board_view_top > strong.tit').text() + ' < ' + loc[2] + ' < ' + loc[1] + ' < ' + loc[0] + ' | ' + siteTitle
			}else{

				document.title =  jQuery('.board_view_top > strong.tit').text() + ' < ' + loc[1] + ' < ' + loc[0] + ' | ' + siteTitle
			}

		}

	}

}






//  예전 CMS 용.
// IncSubSubject.jsp 의 내용의 수정도 필요하다.첨부한 '이전CMS사용시IncSubSubject수정내용참조' 의 내용으로 변경.
function title_copy2(){
	var sjLine = jQuery('tr').hasClass('sj_line');
	var siteTitle = jQuery('h1 img').attr('alt');
	var mainLocate = jQuery('body').hasClass('mainpage');

	var locItem = jQuery('.loc-item');
	var loc = [locItem.eq(1).text(),
				locItem.eq(2).text(),
				locItem.eq(3).text(),
				locItem.eq(4).text()
			];

	if (sjLine == true ){
		document.title =  jQuery('.sj_line td').text() + ' / ' + jQuery( '.loc_tit' ).text() + ' | ' + siteTitle ;

		// 신형cms의 board 스타일 따를시 아래것으로.
		//document.title =  jQuery('.bbs-tit').text() + ' / ' + jQuery( '.loc_tit' ).text()  + ' < ' + jQuery( '.sidebar__h2' ).text() +  ' | ' + siteTitle ;
	}
	else if (mainLocate == true) {
		document.title = siteTitle ;
	}
	else {
		//document.title = jQuery( '.loc_tit' ).text() + ' | ' + siteTitle ;
		var locL = locItem.length;
		if (locL == 3) {
			document.title = loc[1] + ' < ' + loc[0] + ' < ' + jQuery( '.sidebar__h2' ).text()  + ' | ' + siteTitle
		} else if (locL ==4) {
			document.title = loc[2] + ' < ' + loc[1] + ' < ' + loc[0] + ' < ' + jQuery( '.sidebar__h2' ).text()  + ' | ' + siteTitle
		} else if (locL == 5) {
			document.title = loc[3] + ' < ' + loc[2] + ' < ' + loc[1] + ' < ' + loc[0] + ' < ' + jQuery( '.sidebar__h2' ).text()  + ' | ' + siteTitle
		} else {
			document.title = loc[0] + ' < ' + jQuery( '.sidebar__h2' ).text() + ' | ' + siteTitle
		}

	}

};

/* font size */
var $window = jQuery(window),
	$document = jQuery(document),
	$html = jQuery('html'),
	fontIndex = jQuery.cookie('webFontSize') ? jQuery.cookie('webFontSize') : 1;

function setFontSizeClass() {
	$html.removeClass(function(index,class_list_str){
		var class_list = class_list_str.split(' ');
		for(var i = 0 ; i < class_list.length ; i ++) {
			var cls = class_list[i];
			if(cls.match(/websize\-[0-9]+/)) {
				return cls;
			}
		}
	}).addClass('websize-' + fontIndex);
	jQuery.cookie('webFontSize', fontIndex, { path: '/' });
}
function js_font_plus(){
	if(fontIndex >= 7) return false;
	fontIndex++;
	setFontSizeClass();
}
function js_font_minus(){
	if(fontIndex <= 1) return false;
	fontIndex--;
	setFontSizeClass();
}
function js_font_default(){
	if(fontIndex <= 1) return false;
	fontIndex = 1;
	setFontSizeClass();
}

jQuery(function() {
	$html.addClass('websize-' + fontIndex);
});

/*배너형 스크롤*/
function mainRolling() {
		$.fn.roll = function(){
			var hook = $(this);
			var UL = hook.find('.listwrap');
			var LI = UL.find('li');
			var ULwidth = LI.outerWidth() * LI.length;
			var prev = jQuery('.r_prev');
			var next = jQuery('.r_next');
			var pause = jQuery('.r_pause');
			var start = jQuery('.r_start');
			var interval;
			var intervalPosition = 'next';

			var nextEvent = function(){
				clearInterval(interval);
				intervalPosition = 'next';
				interval = setInterval(intervalFN, 5000);

				LI = UL.find('li');
				UL.animate({left:-LI.outerWidth()},	function(){
					UL.css({left:0});
					var firstLI = LI.eq(0).remove();
					firstLI.appendTo(UL);
				});
				return false;
			};

			var prevEvent = function(){
				clearInterval(interval);
				intervalPosition = 'prev';
				interval = setInterval(intervalFN, 5000);

				LI = UL.find('li');
				var lastLI = LI.eq(LI.length-1).remove();
				lastLI.prependTo(UL);
				UL.css({left:-LI.outerWidth()});
				UL.animate({left:0});
				return false;
			};

			var pauseEvent = function() {
				clearInterval(interval);
				return false;
			};

			var startEvent = function() {
				clearInterval(interval);
				interval = setInterval(intervalFN, 5000);
				return false;
			};

			var intervalFN = function() {
				if(intervalPosition == 'next')
					nextEvent();
				else
					prevEvent();
			};

			interval = setInterval(intervalFN, 5000);

			UL.css({width:ULwidth});
			next.bind('click', nextEvent);
			prev.bind('click', prevEvent);
			start.bind('click', startEvent);
			pause.bind('click', pauseEvent);
			pauseEvent(); //stop;

		/*
			if(jQuery('.listwrap li').length <= 3) {
				jQuery('.r_next').addClass('hide');
				jQuery('.r_prev').addClass('hide');
			}else if (jQuery('.listwrap li').length >= 4) {
				jQuery('.r_next').removeClass('hide');
				jQuery('.r_prev').removeClass('hide');
			}
		*/
		}
		jQuery('#test').roll();
}

/* 상하식 롤링 */
function RollingUpDown() {
	$.fn.roll = function(){
		var hook = $(this);
		var UL = hook.find('.listwrap2');
		var LI = UL.find('li');
		var ULwidth = LI.outerHeight() * LI.length;
		var prev = $('.r_prev2');
		var next = $('.r_next2');
		var pause = $('.r_pause');
		var start = $('.r_start');
		var interval;
		var intervalPosition = 'next';

		var nextEvent = function(){
			clearInterval(interval);
			intervalPosition = 'next';
			interval = setInterval(intervalFN, 5000);

			LI = UL.find('li');
			UL.animate({top:-LI.outerHeight()},	function(){
				UL.css({top:0});
				var firstLI = LI.eq(0).remove();
				firstLI.appendTo(UL);
			});
			return false;
		};

		var prevEvent = function(){
			clearInterval(interval);
			intervalPosition = 'prev';
			interval = setInterval(intervalFN, 5000);

			LI = UL.find('li');
			var lastLI = LI.eq(LI.length-1).remove();
			lastLI.prependTo(UL);
			UL.css({top:-LI.outerHeight()});
			UL.animate({top:0});
			return false;
		};

		var pauseEvent = function() {
			clearInterval(interval);
			return false;
		};

		var startEvent = function() {
			clearInterval(interval);
			interval = setInterval(intervalFN, 5000);
			return false;
		};

		var intervalFN = function() {
			if(intervalPosition == 'next')
				nextEvent();
			else
				prevEvent();
		};

		interval = setInterval(intervalFN, 5000);

		UL.css({width:ULwidth});
		next.bind('click', nextEvent);
		prev.bind('click', prevEvent);
		start.bind('click', startEvent);
		pause.bind('click', pauseEvent);
	}
	jQuery('#rollup').roll();
}

/* 모바일 메뉴 오픈 */
function mobile_menu() {
	jQuery('.mobile_on_off').on('click',function(){
		jQuery('body').toggleClass('mobile_menu_open');
		jQuery('#gnb_nav_mobile').toggleClass('selected');
		jQuery('.mobile_top_nav').toggleClass('selected');
		jQuery('.mobile_top_nav .gnb').toggleClass('selected');
		jQuery('.header__links').toggleClass('selected');
		return false;
	});
}

function mainGnbMobile() {
	var oldIndex = 0;
	jQuery('.sub-nav__box__list').closest('.gnb-menu').addClass('has-menu'); //2차메뉴 있을시 클래스 삽입
	//jQuery('.sub-nav__box__ul').closest('li').addClass('has-menu'); //2차메뉴 있을시 클래스 삽입
	jQuery('.has-menu').siblings().addClass('no-has-menu');
	jQuery('.has-menu.no-has-menu').removeClass('no-has-menu');

	//
	jQuery('.mobile_top_nav li.gnb-menu.has-menu > .sub-nav').slideUp();
	jQuery('.mobile_top_nav li.gnb-menu.has-menu.on > .sub-nav').addClass('on').slideDown();
	jQuery('.mobile_top_nav .has-menu .gnb-menu__a').attr("href","#none"); //

	jQuery('.mobile_top_nav li.gnb-menu.has-menu > a').click(function() {
		var thisIndex = jQuery('.mobile_top_nav li.gnb-menu.has-menu > a').index(this);

		if (jQuery('.mobile_top_nav .has-menu div.sub-nav').eq(thisIndex).hasClass('on') == true) {

			jQuery('.mobile_top_nav .has-menu div.sub-nav').eq(thisIndex).slideUp();
			jQuery('.mobile_top_nav li.gnb-menu.has-menu').eq(thisIndex).removeClass('on');
			jQuery('.mobile_top_nav .has-menu div.sub-nav').eq(thisIndex).removeClass('on');

		} else {

			jQuery('.mobile_top_nav .has-menu div.sub-nav').slideUp();
			jQuery('.mobile_top_nav li.gnb-menu.has-menu').removeClass('on');
			jQuery('.mobile_top_nav .has-menu div.sub-nav').removeClass('on');

			jQuery('.mobile_top_nav .has-menu div.sub-nav').eq(thisIndex).slideDown();
			jQuery('.mobile_top_nav li.gnb-menu.has-menu').eq(thisIndex).addClass('on');
			jQuery('.mobile_top_nav .has-menu div.sub-nav').eq(thisIndex).addClass('on');
		}
		//return false;
	});



};

/* 사이드메뉴 */
function side_open(){
		jQuery('.spp__in').closest('.side-list__li').addClass('open-type');
		jQuery('.spp__in__small').closest('.spp__in').addClass('sp-open-type');

		var oldIndex = 0;
		jQuery('.open-type span').on('click',function() {//alert(jQuery('div').index(this));
			var thisIndex = jQuery('.open-type span').index(this);

			jQuery('.open-type').eq(thisIndex).toggleClass('on');
			oldIndex = thisIndex;

			return false;
		});

		jQuery('.spp__in > a').on('click',function() {
			var smallBox = jQuery(this).closest('.spp__in').children('.spp__in__small').length;
				if ( smallBox == 1 )
				{
					jQuery(this).closest('.spp__in').toggleClass('on')
				return false;
				}
			}

		) ;
}

function side_open2(){
		jQuery('.side-list__li__inbox').closest('.side-list__li').addClass('open-type');
		jQuery('.spp__in__small').closest('.spp__in').addClass('sp-open-type');

}

function sizeLength(){
	var sLength = $('.sidebar__h2').html();

	if (sLength.length > 8) {
		$('.sidebar__h2').addClass('long-type')
	} else {
		$('.sidebar__h2').addClass('short-type')
	}
	return false
}

function menuLight() {

	var menuNum = jQuery("#menuNo").val();
	var subNum = jQuery("#subMenuNo").val();
	var thirdMenuNo = jQuery("#thirdMenuNo").val();
	var menuWd = 100/jQuery('#submenu > ul > li').length;

	jQuery('#sidebar > div > ul > li.2dep_'+subNum).addClass('on');
	jQuery('#sidebar > div > ul > li > div > ul >  li.3dep_'+thirdMenuNo).addClass('on');

}

function mobileMenuOpen() {
	jQuery('.mobile-submenu-btn').on('click',function() {
		jQuery('.sidebar').toggleClass('selected');
		jQuery('.mobile-submenu-btn').toggleClass('selected');
		return false;
	});
	jQuery('.spp__in.selected').closest('.side-list__li').addClass('on');
	jQuery('.sub-nav__box__list.on').closest('.gnb-menu').addClass('on');
}

/**/
function sizeComp(){
	var thisIndex = jQuery('.none-width #gnb .gnb-ul > li').index(this);
	var size_item = jQuery('.none-width #gnb .gnb-ul ').width();

	var totalWidth = 0;
	var set = $('.none-width #gnb .gnb-ul > li');
		set.each(function(){
			totalWidth = totalWidth + $(this).width();
		});

	var gnbLiN = jQuery('.none-width #gnb .gnb-ul > li').length;
	var size_resize = ((size_item - totalWidth) / gnbLiN );
	var size_result = size_resize / 2;

		jQuery('.none-width #gnb .gnb-menu > a').css({paddingLeft:size_result});
		jQuery('.none-width #gnb .gnb-menu > a').css({paddingRight:size_result - 1});


		jQuery('.none-width #gnb .sub-nav').each(function(i) {
			var size_box = jQuery(this).eq(thisIndex).closest('.gnb-menu').children('.t_item').width();
			//jQuery(this).eq(thisIndex).css({width:size_box + size_resize -2 });
		});

}

function tgtScroll() {
	jQuery(".tgt-menu li a").on('click',function() {
		var scrollPosition = jQuery(jQuery(this).attr("data-tgt")).offset().top;
		jQuery("html, body").animate({scrollTop: scrollPosition}, 500);
		return false;
	});

}

//슬라이드 dots 없을때 off 추가
function slideDots(slideDotsWrap){
	var dotsItem = $(slideDotsWrap).find('ul').hasClass('slick-dots-list');
	if (dotsItem === false ){
		$(slideDotsWrap).addClass('off');
	}
}

//팝업존용 슬라이드
function slideBox(slideName) {
	$(slideName).slick({
		dots: true,
		dotsClass: 'slick-dots-list',
		appendDots:$(slideName).next('div').find('> div > div'),
		infinite: true,
		autoplaySpeed: 5000,
		speed: 800,
		slidesToShow: 1,
		//autoplay: true,
		pauseOnHover: true,
		adaptiveHeight: true,
		//centerMode: true,
		//variableWidth: true,
		responsive: [
			{
			breakpoint: 1200,
			settings: {
				centerMode: false,
				variableWidth: false
			}
			}
		]
	});

	//슬라이드 갯수 네비
	var popLength = $(slideName).next('div').find('.slick-dots-list > li').length;
	$(slideName).next('div').find('.popup-total-num').text(popLength);

	if (popLength > 5 == true) {
		$(slideName).closest('article').addClass('ver-total'); //방식 자동변환할경우
		$(slideName).closest('article').addClass('ver-arrow'); //방식 자동변환할경우
	}

	//슬라이드 dots 없을때 off 추가

	var dotsItem = $(slideName).next('div').find('ul').hasClass('slick-dots-list');
	if (dotsItem === false ){
		$(slideName).next('div').addClass('off');
	}

	var $progressBar = $(slideName).next('.popupzone-nav').next('.prg-result').children('.prg-result__in');

	$(slideName).on('beforeChange', function(event, slick, activeSlide, nextSlide) {
		var cchop = popLength + -1
		var calc = ( (nextSlide ) / cchop ) * 100;
		$progressBar.css('width', calc + '%');
	});
}

// all menu
function all_menu_open(){
	jQuery('.btn_all').on('click', function() {
		jQuery('.all_menu_wrap__outwrap').toggleClass('selected');
		jQuery('.btn_all').toggleClass('selected');

		return false;
	});

	$('.sub-nav__box__list').last().find('li').hasClass('sub-nav__3rd__ul__li') ? $('.all_menu_wrap .sub-nav__3rd__ul__li').last().addClass('last-item') : $('.sub-nav__box__list').last().addClass('last-item');


	$(".last-item").on('keydown blur', function(e) {
		if (e.shiftKey && e.keyCode === 9) {
			console.log('shift tab');
		} else if (e.keyCode === 9) {
			console.log('tab');
			$('.btn_all').focus();
			jQuery('.all_menu_wrap__outwrap').toggleClass('selected');
			jQuery('.btn_all').toggleClass('selected');
			return false;

		} else if(e.type == 'blur')  {
			console.log('mosueOUt')

		}

	});
}


// FAQ
function faqNew() {

	jQuery('.faq-box__list.on .faq-box__list__answer').slideDown();
	jQuery('.faq-box__list__tit').on('click',function() {
		var faqOn = jQuery(this).closest('.faq-box__list');
		if (!faqOn.hasClass('on')) {
			// 하나만 열리기 추가
			$('.faq-box__list.on').children('.faq-box__list__answer').slideUp();
			$('.faq-box__list').removeClass('on');
			// 하나만 열리기 추가

			jQuery(this).closest('.faq-box__list').children('.faq-box__list__answer').slideDown();
			jQuery(this).closest('.faq-box__list').addClass('on');
		} else if (faqOn.hasClass('on') == true ){
			jQuery(this).closest('.faq-box__list.on').children('.faq-box__list__answer').slideUp();
			jQuery(this).closest('.faq-box__list').removeClass('on');
		}
		return false;
	});


}