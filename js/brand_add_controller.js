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
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/brands/add',
            cache: "false",
            data: {
                name: brand_name,
                description: description,
                status: "Active"
            },
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
    var id = id;
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/brands/brand/deactivate',
        cache: "false",
        data: {
            number: id
        },
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
    var id = id;
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/brands/brand/activate',
        cache: "false",
        data: {
            number: id
        },
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
                    brands += '<tr><th scope="row">' + index + '</th><td>' + data[i].name + '</td><td>' + data[i].description + '</td><td>' + data[i].status + '</td><td width="150px"><button class="btn btn-sm btn-outline-dark px-3 ml-2 mr-1"><i class="fa fa-edit"></i></button><button class="btn btn-sm btn-outline-danger " id="' + data[i].id + 'lock" onclick="lock(' + data[i].id + ')" ><i class="fa fa-lock"></i></button><button  id="' + data[i].id + 'unlock" class="btn btn-sm btn-outline-success " onclick="unlock(' + data[i].id + ')"><i class="fa fa-unlock"></i></button></td></tr>'
                    index++;
                }
                $('#brand-table').html(brands);
            }
            console.log(status);
        }
    })
}