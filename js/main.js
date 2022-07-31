$(function() {

	const menu = $('.menu');		
	
	$('.hamburger').click(function() {		
		if (menu.hasClass('visible')) {			
			menu.removeClass("visible");		
			$('.overlay').removeClass('is-visible');
			$('body').removeClass('noscroll');
			$(this).removeClass('is-active');
		} else {			
			menu.addClass('visible');	
			$('.overlay').addClass('is-visible');
			$('body').addClass('noscroll');
			$(this).addClass('is-active');
		};
	});

	$('.overlay').click(function() {	
		menu.removeClass("visible");	
		$(this).removeClass('is-visible');
		$('body').removeClass('noscroll');
		$('.hamburger').removeClass('is-active');
	})		

	$(".hero-slider").slick({ 
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: true,
		speed: 400,
		arrows: true,		
		prevArrow: '<button class="hero-slider__back back"><img src="img/back.svg" alt="Alt" class="svg"></button>',
		nextArrow: '<button class="hero-slider__next next"><img src="img/next.svg" alt="Alt" class="svg"></button>',
		dots: false,
		draggable: false,
		swipe: true,			
		fade: true,			
		autoplay: false,			
		autoplaySpeed: 2000,
		asNavFor: $('.hero-thumbs-slider'),
		responsive: [			
			{
				breakpoint: 768,
				settings: {
					arrows: false
				}
			}
		]
	});

	$(".hero-thumbs-slider").slick({ 
		slidesToShow: 3,
		slidesToScroll: 1,
		infinite: true,
		speed: 400,
		arrows: false,		
		dots: false,
		draggable: false,
		swipe: true,			
		fade: false,			
		autoplay: false,			
		autoplaySpeed: 2000,
		asNavFor: $('.hero-slider'),
		focusOnSelect: true,
		centerMode: true,
		centerPadding: 0
	});	

	$('.tizer__title').matchHeight({
		byRow: true,
		property: 'height',
		target: null,
		remove: false
	});

	$('.what-we-print-item__title').matchHeight({
		byRow: true,
		property: 'height',
		target: null,
		remove: false
	});

	$('.what-we-print-item__text').matchHeight({
		byRow: true,
		property: 'height',
		target: null,
		remove: false
	});


	$('.step__title').matchHeight({
		byRow: true,
		property: 'height',
		target: null,
		remove: false
	});

	function calc() {	
		let sum = 0;			
		$('.setting.active').each(function() {			
			const price = $(this).find('.setting__price span').text();
			sum += parseInt(price);			
		});
		$('.settings__result .accent span').text(sum);
		$('[id="callbackPrice"]').find('.btn__price span').text(sum);
	};	

	calc();	

	$('.setting').click(function(event){
		event.preventDefault();
		if(!$(this).hasClass('active')) {	
			$(this).closest('.settings__items').find('.setting').removeClass('active');		
			$(this).addClass('active');					
		};
		calc();	
	});		

	//Маска для телефона
	$('input[type="tel"]').mask("+375 99 999-99-99", {	
		placeholder: "_"
	});	

	$('.file-upload input[type=file]').change(function() {
		if ($(this).val() != '') {
			var	fileName = this.files[0].name;				
			$(this).closest('.form').find(".file-upload__name").text(fileName).css('display', 'inline-block');	
			$(this).closest('.form').find(".file-upload__delete").css('display', 'inline-block');	
		}
	});		

	$('.file-upload__delete').click(function(event) {
		event.preventDefault();
		if ($(this).closest('.form').find("input[type=file]").val() != '') {	
			$(this).closest('.form').find("input[type=file]").val('');	
			$(this).closest('.form').find(".file-upload__delete").css('display', 'none');	
			$(this).closest('.form').find(".file-upload__name").html('').css('display', 'none');	
		}
	});	
	
	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$(".form").submit(function(event) {
		var th = $(this);
		if (!event.target.checkValidity()) {
			event.preventDefault(); 
			th.find("[required]").focus();
		} else {
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: th.serialize()
			}).done(function() {
				$.fancybox.close();
				setTimeout(function(){
					$('[href="#thanks"]')[0].click();		
				}, 500);							
				th.trigger("reset");										
			});	
			return false;
		}
	});		

	$('[href="#callback"], [href="#callbackPrice"]').fancybox({
		touch: false,
		autoFocus: false
	});		
	
	// Replace all SVG images with inline SVG
	$('img.svg').each(function(){
		var $img = $(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		$.get(imgURL, function(data) {
					// Get the SVG tag, ignore the rest
					var $svg = $(data).find('svg');

					// Add replaced image's ID to the new SVG
					if(typeof imgID !== 'undefined') {
						$svg = $svg.attr('id', imgID);
					}
					// Add replaced image's classes to the new SVG
					if(typeof imgClass !== 'undefined') {
						$svg = $svg.attr('class', imgClass+' replaced-svg');
					}

					// Remove any invalid XML tags as per http://validator.w3.org
					$svg = $svg.removeAttr('xmlns:a');

					// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
					if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
						$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
					}

					// Replace image with new SVG
					$img.replaceWith($svg);

				}, 'xml');
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });		

});