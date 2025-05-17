$(document).ready(function() {
  $(".button").click(function() {
    $(this).addClass("button-loading");

    $.ajax({
      url: "get-data.php",
      type: "POST",
      datatype: "html",
      success: function(data) {
	var cell = JSON.parse(JSON.stringify(data));
        $("#h24").val(cell.high);
        $("#cp").val(cell.last);
        $("#l24").val(cell.low);

        $(".button").removeClass("button-loading");
      },
      error: function(xhr, status, error) {
        console.error("Terjadi kesalahan saat memuat data: " + error);

        $(".button").removeClass("button-loading");

        alert("Gagal memuat data.  Silakan coba lagi.");
      }
    });
  });
});
