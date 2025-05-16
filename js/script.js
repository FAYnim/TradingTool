$(document).ready(function() {
  $(".button").click(function() {
    $(this).addClass("button-loading");

    $.ajax({
      url: "get-data.php",
      type: "GET",
      dataType: "json",
      success: function(data) {
        $("#h24").val(data.h24);
        $("#cp").val(data.cp);
        $("#l24").val(data.l24);

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
