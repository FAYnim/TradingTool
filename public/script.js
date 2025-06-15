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

	$(".calculator-box").on("click", function() {
		let calcData = $(this).data("calc");
		load_calc(calcData);
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

var load_calc = function(calcData){
	$(".calculator-grid").hide();
	$("#calculator-component").show();
	$("#calculator-title-default").hide();
	$("#calculator-title-back").show();
	if(calcData === "profit"){
		$("#calculator-component").load("./component/calc-profit.html");
	} else if(calcData === "risk-reward"){
		$("#calculator-component").load("./component/calc-risk-reward.html");
	}
}

var load_all_calc = function(){
	$("#calculator-component").hide();
	$(".calculator-grid").show();
	$("#calculator-title-back").hide();
	$("#calculator-title-default").show();
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
    const ordersToRender = orders.order_update && orders.order_update.length > 0 
        ? orders.order_update
        : orders.order_example;

    const tableHtml = `
        ${ordersToRender.map(order => `
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

var calc_count = function(calcpos){
	let result;
	if(calcpos === "profit") {
		result = ($("#sell-price").val() - $("#buy-price").val()) / $("#buy-price").val() * 100;
		$("#calc-result").val(result);
	} else if(calcpos == "risk-reward"){
		if(isRatio($("#rasio-riskreward").val())){
			let rasio = $("#rasio-riskreward").val();
			console.log(rasio);
			const [rasio_risk, rasio_reward] = rasio.split(":");
			let entry = $("#entry-price").val();
			let tp = $("#take-profit").val();
			let sl = $("#stop-loss").val();
			let selisih;


			if(entry && tp){
				selisih = tp - entry;
				sl = selisih / rasio_reward;
				$("#stop-loss").val(sl);
			} else if(entry && sl){
				selisih = entry - sl;
				tp = selisih * rasio_reward;
				$("#take-profit").val(tp);
			}
		}
	}
}

var isRatio = function(input) {
    const ratioRegex = /^\s*\d+\s*:\s*\d+\s*$/;
    if (!ratioRegex.test(input)) {
        return false;
    }
    const parts = input.split(':').map(part => parseInt(part.trim()));
    if (parts[0] === 0 || parts[1] === 0) {
        return false;
    }
    return true;
}
