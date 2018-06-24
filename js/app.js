(function (window, document) {
	'use strict';

	var file = '/gulp-starter/symbol_sprite.html',
		revision = 5.1;

	if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)
		return true;

	var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
		request,
		data,
		insertIT = function () {
			document.body.insertAdjacentHTML('afterbegin', data);
		},
		insert = function () {
			if (document.body) insertIT();
			else document.addEventListener('DOMContentLoaded', insertIT);
		};

	if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
		data = localStorage.getItem('inlineSVGdata');
		if (data) {
			insert();
			return true;
		}
	}

	try {
		request = new XMLHttpRequest();
		request.open('GET', file, true);
		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				data = request.responseText;
				insert();
				if (isLocalStorage) {
					localStorage.setItem('inlineSVGdata', data);
					localStorage.setItem('inlineSVGrev', revision);
				}
			}
		}
		request.send();
	}
	catch (e) { }

}(window, document));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvY2FsU3RvcmFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKHdpbmRvdywgZG9jdW1lbnQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBmaWxlID0gJy9zeW1ib2xfc3ByaXRlLmh0bWwnLFxuXHRcdHJldmlzaW9uID0gNS4xO1xuXG5cdGlmICghZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TIHx8ICFkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpLmNyZWF0ZVNWR1JlY3QpXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0dmFyIGlzTG9jYWxTdG9yYWdlID0gJ2xvY2FsU3RvcmFnZScgaW4gd2luZG93ICYmIHdpbmRvd1snbG9jYWxTdG9yYWdlJ10gIT09IG51bGwsXG5cdFx0cmVxdWVzdCxcblx0XHRkYXRhLFxuXHRcdGluc2VydElUID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBkYXRhKTtcblx0XHR9LFxuXHRcdGluc2VydCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChkb2N1bWVudC5ib2R5KSBpbnNlcnRJVCgpO1xuXHRcdFx0ZWxzZSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5zZXJ0SVQpO1xuXHRcdH07XG5cblx0aWYgKGlzTG9jYWxTdG9yYWdlICYmIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpbmxpbmVTVkdyZXYnKSA9PSByZXZpc2lvbikge1xuXHRcdGRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaW5saW5lU1ZHZGF0YScpO1xuXHRcdGlmIChkYXRhKSB7XG5cdFx0XHRpbnNlcnQoKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdHRyeSB7XG5cdFx0cmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdHJlcXVlc3Qub3BlbignR0VUJywgZmlsZSwgdHJ1ZSk7XG5cdFx0cmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XG5cdFx0XHRcdGRhdGEgPSByZXF1ZXN0LnJlc3BvbnNlVGV4dDtcblx0XHRcdFx0aW5zZXJ0KCk7XG5cdFx0XHRcdGlmIChpc0xvY2FsU3RvcmFnZSkge1xuXHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdpbmxpbmVTVkdkYXRhJywgZGF0YSk7XG5cdFx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lubGluZVNWR3JldicsIHJldmlzaW9uKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXF1ZXN0LnNlbmQoKTtcblx0fVxuXHRjYXRjaCAoZSkgeyB9XG5cbn0od2luZG93LCBkb2N1bWVudCkpOyJdfQ==
