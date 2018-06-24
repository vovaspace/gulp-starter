(function (window, document) {
	'use strict';

	var file = '/gulp-starter/symbol_sprite.html',
			revision = 1.0;

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvY2FsU3RvcmFnZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKHdpbmRvdywgZG9jdW1lbnQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBmaWxlID0gJy9zeW1ib2xfc3ByaXRlLmh0bWwnLFxuXHRcdFx0cmV2aXNpb24gPSAxLjA7XG5cblx0aWYgKCFkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMgfHwgIWRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJykuY3JlYXRlU1ZHUmVjdClcblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHR2YXIgaXNMb2NhbFN0b3JhZ2UgPSAnbG9jYWxTdG9yYWdlJyBpbiB3aW5kb3cgJiYgd2luZG93Wydsb2NhbFN0b3JhZ2UnXSAhPT0gbnVsbCxcblx0XHRyZXF1ZXN0LFxuXHRcdGRhdGEsXG5cdFx0aW5zZXJ0SVQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGRhdGEpO1xuXHRcdH0sXG5cdFx0aW5zZXJ0ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGRvY3VtZW50LmJvZHkpIGluc2VydElUKCk7XG5cdFx0XHRlbHNlIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbnNlcnRJVCk7XG5cdFx0fTtcblxuXHRpZiAoaXNMb2NhbFN0b3JhZ2UgJiYgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2lubGluZVNWR3JldicpID09IHJldmlzaW9uKSB7XG5cdFx0ZGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdpbmxpbmVTVkdkYXRhJyk7XG5cdFx0aWYgKGRhdGEpIHtcblx0XHRcdGluc2VydCgpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9XG5cblx0dHJ5IHtcblx0XHRyZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0cmVxdWVzdC5vcGVuKCdHRVQnLCBmaWxlLCB0cnVlKTtcblx0XHRyZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcblx0XHRcdFx0ZGF0YSA9IHJlcXVlc3QucmVzcG9uc2VUZXh0O1xuXHRcdFx0XHRpbnNlcnQoKTtcblx0XHRcdFx0aWYgKGlzTG9jYWxTdG9yYWdlKSB7XG5cdFx0XHRcdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2lubGluZVNWR2RhdGEnLCBkYXRhKTtcblx0XHRcdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaW5saW5lU1ZHcmV2JywgcmV2aXNpb24pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJlcXVlc3Quc2VuZCgpO1xuXHR9XG5cdGNhdGNoIChlKSB7IH1cblxufSh3aW5kb3csIGRvY3VtZW50KSk7Il19
