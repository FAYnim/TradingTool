class IndodaxAPI {
	static getTicker(ticker = 'btc_idr'){
		return $.get(`https://indodax.com/api/${ticker}/ticker`);
	}
}

$(document).ready(function(){
	let userpos = 'order';

	load_modul(userpos);

//	getTicker();

	$('.footer-nav').on('click', 'li', function() {
		$(this).addClass('active').siblings().removeClass('active');
		let navclick = $(this).attr('id');
		userpos = navclick;
		load_modul(userpos);
	});

	$('.new-order-trigger').click(function() {
		$('.floating-order-controls').toggleClass('active');
	});

	$('.cancel-btn').click(function() {
		$('.floating-order-controls').removeClass('active');
	});
});

var load_modul = function(userpos){
	$('[id$="-section"]').hide();
	$("#loading-section").show();
	$('.new-order-trigger').hide();
	if(userpos === 'order'){
		$('.new-order-trigger').show();
		$.get('api/orders').done(function(orders){
			renderOrders(orders);
			$("#loading-section").hide();
			$("#order-section").show();
		}).fail(function(){
			$("#error-section").show();
		});

	} else if(userpos === 'calc') {
		$("#calc-section").show();
		$("#loading-section").hide();
	}
}

var getTicker = function(){
	IndodaxAPI.getTicker()
	.then(response => {
		const lastPrice = parseFloat(response.ticker.last);
		$('.ticker-price').text(lastPrice.toLocaleString('id-ID'));
	})
	.catch(error => {
		$('.ticker-price').text('Error').css('color', 'var(--muted-red');
	});
}
var renderOrders = function(orders){
	const tableHtml = `
			${orders.map(order => `
				<tr class='order-row ${order.status}'>
					<td>${order.id}</td>
	                <td>${order.symbol}</td>
	                <td>${order.type}</td>
	                <td class="${order.side}">${order.side}</td>
	                <td>${order.price.toLocaleString()}</td>
	                <td>${order.amount}</td>
	                <td>${order.filled}</td>
	                <td><span class="status-badge ${order.status}">${order.status.replace('_', ' ')}</span></td>
	                <td>${new Date(order.timestamp).toLocaleString()}</td>
				</tr>
			`).join('')}
	`;
	$("#orders-data").html(tableHtml);
}
