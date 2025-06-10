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
	$('main').html("<div class='error'>Loading...</div>");
	$('.new-order-trigger').hide();
	if(userpos === 'order'){
		$('.new-order-trigger').show();
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
	} else if(userpos === 'calc') {
		const renderCalc = `
			<div id="calculator-container">
			    <h2 class="calculator-title">Trading Calculators</h2>
			    <div class="calculator-grid">
			        <!-- Kolom 1 -->
			        <div class="calculator-column">
			            <div class="calculator-box" data-calc="profit">
			                <div class="calculator-icon">💰</div>
			                <h3>Profit Calculator</h3>
			                <p>Hitung profit/loss trading</p>
			            </div>
			            <div class="calculator-box" data-calc="position-size">
			                <div class="calculator-icon">📊</div>
			                <h3>Position Size</h3>
			                <p>Ukuran posisi berdasarkan risiko</p>
			            </div>
			        </div>
			        <!-- Kolom 2 -->
			        <div class="calculator-column">
			            <div class="calculator-box" data-calc="moving-average">
			                <div class="calculator-icon">📈</div>
			                <h3>Moving Average</h3>
			                <p>Analisis crossover MA</p>
			            </div>
			            <div class="calculator-box" data-calc="risk-reward">
			                <div class="calculator-icon">⚖️</div>
			                <h3>Risk/Reward</h3>
			                <p>Rasio risiko vs reward</p>
			            </div>
			        </div>
			    </div>
			</div>
		`;

		$('main').html(renderCalc);
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
