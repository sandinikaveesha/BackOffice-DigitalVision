$(document).ready(function(){
    loadTable();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/brands/all/active',
        cache: "false",
        success: (data)=>{
           
            var brands = "";
            brands = '<option value="">Select Brand</option>';
            for(var i=0; i<data.length; i++){
                brands +='<option value="'+data[i].id+'">'+data[i].name+'</option>';
            }
            $('.brand').html(brands);
            console.log(data);
        }

    })

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/categories/all/active',
        cache: "false",
        success: (data)=>{
            var categories = "";
            categories = '<option value="">Select Category</option>';
            for(var i=0; i<data.length; i++){
                categories +='<option value="'+data[i].id+'">'+data[i].name+'</option>'
            }
            $('.category').html(categories);
            console.log(data);
        }
    })

});

function save(){
    var product_name = $('.product-name').val();
    var brand = $('.brand').val();
    var category = $('.category').val();
    var description = $('.product-decs').val();
    var price = $('.price').val();
    var qty = $('.qty').val();
    var image = $('.image').val();
    if(product_name == ""){
        $('#product-name-error').css("display","block");
    }
    if(brand == ""){
        $('#brand-error').css("display","block");
    }
    if(category == ""){
        $('#category-error').css("display","block");
    }
    if(description == ""){
        $('#description-error').css("display","block");
    }
    if(price == ""){
        $('#price-error').css("display","block");
    }
    if(qty == ""){
        $('#qty-error').css("display","block");
    }
    if(image == ""){
        $('#image-error').css("display","block");
    }
    else{
        var apiData = {
            brand:{
               id: brand, 
            },
            category:{
                id: category
            },
            name: product_name,
            price: price,
            quantity: qty,
            description: description,
            image: image,
            status: "Active"
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/products/add',
            crossDomain: true,
            contentType: "application/json",
            data: JSON.stringify(apiData),
            success: (data, status) => {
                if(status == "success"){
                    $('#alert').css("display", "block");
                    $('#alert').addClass("alert-success");
                    $('#alert-title').text("Saved!");
                    $('#alert-info').text("Successfully Published Product to the System");
                    loadTable();   
                }else {
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

function loadTable(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/products/all',
        cache: "false",

        success: (data, status) => {
            if (status == "success") {
                console.log(data);
                var products = "";
                for (var i = 0; i < data.length; i++) {
                    products += '<tr><td><img src="'+data[i].image+'" alt="'+data[i].name+'" width="100px" height="100px"/></td><td><h5>'+data[i].name+'</h5>'+data[i].description+'</td><td>'+data[i].price+'</td><td>'+data[i].quantity+'</td><td>'+data[i].status+'</td><td><div class="row"><button class="btn btn-outline-dark btn-sm m-1" onclick="publish('+data[i].id+')">Publish</button><button class="btn btn-outline-dark btn-sm m-1" onclick="unpublish('+data[i].id+')">Unpublish</button><button class="btn btn-outline-dark btn-sm m-1" onclick="stockAdd('+data[i].id+','+data[i].name+')">Add New Stock</button><button class="btn btn-outline-dark btn-sm m-1" onclick="edit('+data[i].id+')">Edit Details</button></div></td></tr>';
                }
                $('#product-tbody').html(products);
            }
            console.log(status);
        }
    })
}

function edit(id){
    console.log("check");
    var apiData = {
        id: id,
    }

}

function publish(id){
    var apiData = {
        id: id,
    } 
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/products/product/activate',
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

function unpublish(id){
    var apiData = {
        id: id,
    } 
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/products/product/deactivate',
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

