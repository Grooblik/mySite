$(function(){
	function showNav(){
		$('.header__nav').slideToggle();
	}

	function initialHeader(){
		let wid = $(window).width()
			nav = $('.header__nav')
		if (wid > 1024) {
			nav.css('display', 'inline-block');
		} else {
			nav.css('display', 'none');
		}
	}

	function anchors(event){
		event.preventDefault();
		let id  = $(this).attr('href'),
		    top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 700);

	}

	function killScroll() {
		let pagePosition = window.scrollY;
		$('body').addClass('disable-scroll');
		document.body.dataset.position = pagePosition;
		document.body.style.top = -pagePosition + 'px';
	}

	function resurrectScroll() {
		let pagePosition = parseInt(document.body.dataset.position, 10);
		document.body.style.top = 'auto';
		$('body').removeClass('disable-scroll');
		window.scroll({top: pagePosition, left: 0});
		document.body.removeAttribute('data-position');
	}

	function showPopup(){
		killScroll();
		$('.popup-container').fadeIn();
	}

	function hidePopup(){
		resurrectScroll();
		$('.popup-container').fadeOut();
		setTimeout(function(){
			$('.popup__form').show();
			$('.popup_valid').hide();
		},400);
	}

	initialHeader();

	$('.header__button_show-nav').on('click', showNav);

	$(window).on('resize', initialHeader);

	setTimeout(function(){
		$('.introduction__flying-elements').addClass('flying__element_active');
	},500);

	$('body').on('click', '.nav__link', anchors);

	$('.button-action').on('click', showPopup);

	$('.header__button_call-order').on('click', showPopup);

	$('.footer__button_call-order').on('click', showPopup);

	$('.popup-container').on('click', function(event){
		if (event.target == this) {
			hidePopup();
		}
	});

	$('#popup__form').validate({
		validClass: "success",
		focusInvalid: false,
		rules: {
			email: {
				required: true,
				email: true
			},
			name: {
				required: true,
				minlength: 2
			},
			tel: {
				required: true,
				minlength: 11
			}
		},
		messages: {
			email: {
				required: "Обязательно для заполнения",
				email: "Введите корректный адрес"
			},
			name: {
				required: "Обязательно для заполнения",
				minlength: "Не менее двух символов"
			},
			tel: {
				required: "Обязательно для заполнения",
				minlength: "Введите корректный номер"				
			},
		},
		submitHandler(form) {
			let forms = $('#popup__form');
			$('.popup__form').fadeOut();
			setTimeout(function(){
				$('.popup_valid').fadeIn();
			},400);
			
			$.ajax({
				type: 'POST',
				url: '../php/contacts.php',
				data: forms.serialize(),
			}).done(() => {
				forms.trigger('reset');
			});

			return false;
		}
	});

	$('.popup__close').on('click', hidePopup);

	$('#tel').inputmask({"mask": "+7 (999) 999-99-99"});

});