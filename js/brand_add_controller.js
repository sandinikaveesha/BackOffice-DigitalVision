$(document).ready(function () {
    loadTable();
});

function save() {
    var brand_name = $('.brand-name').val();
    var description = $('.brand-decs').val();
    if (brand_name == "" || description == "") {
        if (brand_name == "") {
            $('#brand-name-error').css("display", "block");
        }
        if (description == "") {
            $('#description-error').css("display", "block");
        }
    } else {
        var apiData = {
            name: brand_name,
            description: description,
            status: "Active"
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/brands/add',
            crossDomain: true,
            contentType: "application/json",
            data: JSON.stringify(apiData),
            success: (data, status) => {
                if (status == 'success') {
                    $('#alert').css("display", "block");
                    $('#alert').addClass("alert-success");
                    $('#alert-title').text("Saved!");
                    $('#alert-info').text("Successfully Published Brand to the System");
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
        brand: id
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/brands/brand/deactivate',
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

function unlock(id){
    var apiData = {
        brand_id: id
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/brands/brand/activate',
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

function loadTable() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/brands/all',
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
                $('#brand-table').html(brands);
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
        url: 'http://localhost:8080/brands/brand',
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify(apiData),
        success: (data, status) => {
            if (status == "success") {
                console.log(data);
                $('.brand-name').val(data.name);
                $('.brand-decs').val(data.description);
                $('.brand-id').val(data.id);
                $('.brand-status').val(data.status);
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

function edit() {
 var id = $('.brand-id').val();
 var name = $('.brand-name').val();
 var desc = $('.brand-decs').val();
 var sts = $('.brand-status').val();
 var apiData ={
    id: id,
    name: name,
    description: desc,
    status: sts
 }
 $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/brands/brand/update',
    crossDomain: true,
    contentType: "application/json",
    data: JSON.stringify(apiData),
    success: (data, status) => {
        if (status == "success") {
            $('#alert').css("display", "block");
            $('#alert').addClass("alert-success");
            $('#alert-title').text("Saved!");
            $('#alert-info').text("Successfully updated Brand details "+data.name);    
            loadTable();
            $('.brand-name').val(null);
            $('.brand-decs').val(null);
            $('.brand-id').val(null);
            $('.brand-status').val(null);
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