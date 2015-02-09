function operateFormatter(value, row, index) {
        return [
            '<a class="like" href="javascript:void(0)" title="Like">',
                '<i class="glyphicon glyphicon-export"></i>',
            '</a>',
            '<a class="edit ml10" href="javascript:void(0)" title="Edit">',
                '<i class="glyphicon glyphicon-edit"></i>',
            '</a>',
            '<a class="remove ml10" href="javascript:void(0)" title="Remove">',
                '<i class="glyphicon glyphicon-remove"></i>',
            '</a>'
        ].join('');
    }

function linkFormatter(value, row, index) {
    return [
        '<a class="like" href="tests/'+ row.cTestsId+'" title="Like">',
            '<i class="glyphicon glyphicon-share-alt"></i>'+ ' ' +value+' ',
        '</a>'        
    ].join('');
}


    window.operateEvents = {
        'click .like': function (e, value, row, index) {
            alert('You click like icon, row: ' + JSON.stringify(row));
            console.log(value, row, index);
        },
        'click .edit': function (e, value, row, index) {
            console.log('You click edit icon, row: ' + JSON.stringify(row) + "index: "+ index);
            $('#addNewTestModal').on('show.bs.modal', function (e) {
            	 console.log('You click edit icon, row: inside show.bs.modal ' + JSON.stringify(row));
            	 $.each($('#addNewTestModal').find('input'),function(i,v){
                     console.log(row[$(v).attr('name')])
                     $(v).val(row[$(v).attr('name')]);
          })
            })
            $('#addNewTestModal').find('form').attr('action',ctx+"/tests/edit").data('index',index);
            $('#addNewTestModal').modal('show');
            
        },
        'click .remove': function (e, value, row, index) {
            if(confirm('Are you really want to delete this record: ' + JSON.stringify(row))){
            	 console.log(value, row, index);          	
            	 $.ajax(
            	         {
            	            url : ctx+"/tests/delete/"+row.cTestsId ,
            	            type: "DELETE",
            	            contentType:"application/json",
            	            beforeSend:function(){
            	            	 $('#statusbar').empty();
            	            },
            	            success:function(data, textStatus, jqXHR) 
            	            {
            	                //data: return data from server
            	             	 console.log(JSON.stringify(data));
            	             	 $('#statusbar').append(' <div align="middle" > <strong> Record deleted successfully!. </strong> </div>').show();
            	            	 $('#test-table').bootstrapTable('remove',{field:"cTestsId",values:[row.cTestsId]});
            	            },
            	            error: function(jqXHR, textStatus, errorThrown) 
            	            {
            	            	alert(errorThrown);     
            	            }
            	        });
            	 
            }
        }
    };
    
 $('#addBtn').click(function(e){
    	console.log('action is changed to tests/add: ');
      	$('#ajaxform').attr('action',ctx+"/tests/add"); 
    });
 $('#addBtnDetail').click(function(e){
 	console.log('action is changed to tests/add: ');
   	$('#ajaxform').attr('action',ctx+"/tests/"+ $('#test-table').data('testid')+ "/add");  
 });
 
$('#addNewTestModal').on('hidden.bs.modal', function() {
	console.log('Form is reset: ');
	$('#ajaxform').bootstrapValidator('resetForm',true);
});
//Bootstrap validator for add vendor modal form.
$('#ajaxform').bootstrapValidator().on('success.form.bv', function(e) {
    // Prevent form submission
    e.preventDefault();
  
    // Get the form instance
    var $form = $(e.target);

    // Get the BootstrapValidator instance
    var bv = $form.data('bootstrapValidator');

    $.ajax({
              url : $form.attr('action'),
              type: "POST",
              data :  $form.serialize(),
              beforeSend:function(){
            	  $('#statusbar').empty();
            	  $("#addNewTestLabel").html("<font color='black'>"+ "Saving Test . Please wait!. "  +"</font>");
              },
              success:function(data, textStatus, jqXHR) 
              {
                  //data: return data from server
              	 console.log(JSON.stringify(data));
            	 $('#addNewTestModal').modal('hide');
            	 console.log(this.url);
            	 if(this.url=="/certifier/tests/3/add"){
            		 $('#test-table').bootstrapTable('append', data);
            		 $("#addNewTestLabel").html("<font color='black'>"+ "Add new Test "  +"</font>");
            		 $('#statusbar').append(' <div align="middle" > <strong> Record saved successfully!. </strong> </div>').show();
            	 }
            	 else{
            		 $("#addNewTestLabel").html("<font color='black'>"+ "Edit Test"  +"</font>");
            		 $('#test-table').bootstrapTable('updateRow', {"index":$form.data('index'),"row":JSON.parse(data)});
            		 $('#statusbar').append(' <div align="middle" > <strong> Record updated successfully!. </strong> </div>').show();
            	 }
            	 
              },
              error: function(jqXHR, textStatus, errorThrown) 
              {
              	alert(errorThrown);     
              }
          });
});
