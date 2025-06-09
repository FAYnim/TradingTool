class IndodaxAPI {
	static getTicker(ticker = 'btc_idr'){
		return $.get(`https://indodax.com/api/${ticker}/ticker`);
	}
}

$(document).ready(function(){
/*	IndodaxAPI.getTicker()
	.then(response => {
		console.log(response.ticker.last);
	})
	.catch(error => {
		console.error('Error', error);
	});*/

	$.get('api/orders').done(function(orders){
		renderOrders(orders);
	}).fail(function(){
		$('main').html("<div class='error'>Failed to load order, please try again later</div>");
	});

	function renderOrders(orders){
		const tableHtml = `
			<div class='orders-container'>
				<h2>Orders</h2>
				<table class='orders-table'>
					<thead>
						<th>ID</th>
						<th>Symbol</th>
						<th>Type</th>
						<th>Side</th>
						<th>Price</th>
						<th>Amount</th>
						<th>Filled</th>
						<th>Status</th>
						<th>Time</th>
					</thead>
					<tbody>
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
					</tbody>
				</table>
			</div>
		`;

		$('main').html(tableHtml);
	}

	$('.footer-nav').on('click', 'li', function() {
		$(this).addClass('active').siblings().removeClass('active');
	});
});

$(document).ready(function() {
  $('.new-order-trigger').click(function() {
    $('.floating-order-controls').toggleClass('active');
  });

  $('.cancel-btn').click(function() {
    $('.floating-order-controls').removeClass('active');
  });
});

