$(document).ready(function () {
    $('.category-name').val(null);
    $('.category-decs').val(null);
    $('.category-id').val(null);
    $('.category-stat').val(null);
    loadTable();
});

function save(){
    var category_name = $('.category-name').val();
    var description = $('.category-decs').val();
   if(category_name == "" || description == ""){
    if(category_name == ""){
        $('#category-name-error').css("display","block");
    }
    if(description == ""){
        $('#description-error').css("display","block");
    }
   }
   else{
    var apiData = {
        name: category_name,
        description: description,
        status: "Active"
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/categories/add',
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify(apiData),
        success: (data, status) => {
            if (status == 'success') {
                $('#alert').css("display", "block");
                $('#alert').addClass("alert-success");
                $('#alert-title').text("Saved!");
                $('#alert-info').text("Successfully Published Category to the System");
                loadTable();
            } else {
                $('#alert').css("display", "block");
                $('#alert').addClass("alert-warning");
                $('#alert-title').text("Error!");
                $('#alert-info').text("Something went wrong Please try again");
            }
            console.log(status);
        }

    })
   }
}

function lock(id) {
    var apiData = {
        id: id
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/categories/category/deactivate',
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify(apiData),
        success: (data, status) => {
            if (status == "success") {
                loadTable();
            }
            console.log(data);
            console.log(status);
        }
    })

}

function unlock(id) {
    var apiData = {
        id : id,
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/categories/category/activate',
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify(apiData),
        success: (data, status) => {
            if (status == "success") {
                loadTable();
            }
            console.log(data);
            console.log(status);
        }
    })

}

function loadTable(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/categories/all',
        cache: "false",

        success: (data, status) => {
            if (status == "success") {
                console.log(data);
                var brands = "";
                var index = 1;
                for (var i = 0; i < data.length; i++) {
                    brands += '<tr><th scope="row">' + index + '</th><td>' + data[i].name + '</td><td>' + data[i].description + '</td><td>' + data[i].status + '</td><td width="150px"><button class="btn btn-sm btn-outline-dark px-3 ml-2 mr-1" onclick="editView('+data[i].id+')"><i class="fa fa-edit"></i></button><button class="btn btn-sm btn-outline-danger " id="' + data[i].id + 'lock" onclick="lock(' + data[i].id + ')" ><i class="fa fa-lock"></i></button><button  id="' + data[i].id + 'unlock" class="btn btn-sm btn-outline-success " onclick="unlock(' + data[i].id + ')"><i class="fa fa-unlock"></i></button></td></tr>'
                    index++;
                }
                $('#category-table').html(brands);
            }
            console.log(status);
        }
    })
}

function editView(id){
    console.log("check");
    var apiData = {
        id: id
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/categories/category',
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify(apiData),
        success: (data, status) => {
            if (status == "success") {
            console.log(data);
            $('.category-name').val(data.name);
            $('.category-decs').val(data.description);
            $('.category-id').val(data.id);
            $('.category-stat').val(data.status);
            $('.add-header').removeClass("show");
            $('.add-header').addClass("hide");
            $('.edit-header').removeClass("hide");
            $('.edit-header').addClass("show");
            $('#btn-submit').removeClass("show");
            $('#btn-submit').addClass("hide");
            $('#btn-edit').addClass("show");
            $('#btn-edit').removeClass("hide");
        
        }
        console.log(status);
    }
        
    })
}

function edit(){
    var id = $('.category-id').val();
    var name = $('.category-name').val();
    var desc = $('.category-decs').val();
    var stat = $('.category-stat').val();
    var apiData = {
        id: id,
        name: name,
        description: desc,
        status: stat
    }
    $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/categories/category/update',
    crossDomain: true,
    contentType: "application/json",
    data: JSON.stringify(apiData),
    success: (data,status) => {
        if(status == "success"){
            $('#alert').css("display", "block");
            $('#alert').addClass("alert-success");
            $('#alert-title').text("Saved!");
            $('#alert-info').text("Successfully updated category details "+data.name);    
            loadTable();
            $('.category-name').val(null);
            $('.category-decs').val(null);
            $('.category-id').val(null);
            $('.category-stat').val(null);
            $('.add-header').removeClass("hide");
            $('.add-header').addClass("show");
            $('.edit-header').removeClass("show");
            $('.edit-header').addClass("hide");
            $('#btn-submit').removeClass("hide");
            $('#btn-submit').addClass("show");
            $('#btn-edit').addClass("hide");
            $('#btn-edit').removeClass("show");
        }else {
            $('#alert').css("display", "block");
            $('#alert').addClass("alert-warning");
            $('#alert-title').text("Error!");
            $('#alert-info').text("Something went wrong Please try again");
        }
        console.log(data);
        console.log(status);
    }
    })
        
}