$(document).ready(function() {
  $(document).ajaxComplete(function(){
	  $("#load").hide();
		$("#search").show();
		$("#reset").show();
  });

	$("#search").on("click", function(e) {
		e.preventDefault();
		$("#load").show();
		$("#search").hide();
		$("#reset").hide();
		e.stopImmediatePropagation();
		dataTable.ajax.url("/search-0.0.1-SNAPSHOT/item/search/getByNumberOrDescription?itemNumber="
    			+ $('#itemNumber').val()
    			+ "&itemDescription="
    			+ $('#itemDescription').val()
    			+ "&contains="
    			+ $("#contains").is(":checked")).load();
	});

	$("#reset").on("click", function(e) {
		e.preventDefault();
		$('#itemNumber').val("");
		$('#itemDescription').val("");
		$("#contains").prop("checked", false);
		$("#search").trigger("click");
	});
	
	$(document).on('keypress', function(e) {
		if (e.which == 13) {
			$("#search").trigger("click");
		}
	});

	$(window).on('load', function() {
		$('#cookieModal').modal('show');
	});

	$('#cookieModal').on('hidden.bs.modal', function() {
		$("#itemNumber").focus();
	});
	
	$("#reject").on("click", function(e) {
		e.preventDefault();
		window.location.href='logout';
	});
	
	var dataTable = $('#dataTable').DataTable( {
		"searching": false,
		"info": true,
		"lengthChange": false,
        "ajax": {
            "url": "/search-0.0.1-SNAPSHOT/item/search/getByNumberOrDescription?itemNumber="
    			+ $('#itemNumber').val()
    			+ "&itemDescription="
    			+ $('#itemDescription').val()
    			+ "&contains="
    			+ $("#contains").is(":checked"),
            "type": "GET"
        },
        "columns": [
            { "data": "ITEM_NUMBER" },
            { "data": "ITEM_DESCRIPTION" },
            { "data": "UPC_CODE" },
            { "data": "MANUFACTURER" },
            { "data": "CATEGORY" },
            { "data": "DIVISION" },
            { "data": "QUANTITY_AVAILABLE" },
            { "data": "NEXT_DATE_RECEIPT" }
        ]
    } 
	
	);

});
