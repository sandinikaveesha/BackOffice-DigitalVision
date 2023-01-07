$(document).ready(function(){
    loadTable();
    dropdownset();

});
function dropdownset(){
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
}

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
                    $('.add-product-form')[0].reset();
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
                    products += '<tr><td><img src="'+data[i].image+'" alt="'+data[i].name+'" width="100px" height="100px"/></td><td><h5>'+data[i].name+'</h5>'+data[i].description+'</td><td>'+data[i].price+'</td><td>'+data[i].quantity+'</td><td>'+data[i].status+'</td><td><div class="row"><button class="btn btn-outline-dark btn-sm m-1" onclick="publish('+data[i].id+')">Publish</button><button class="btn btn-outline-dark btn-sm m-1" onclick="unpublish('+data[i].id+')">Unpublish</button><button class="btn btn-outline-dark btn-sm m-1" onclick="stockAdd('+data[i].id+')">Add New Stock</button><button class="btn btn-outline-dark btn-sm m-1" onclick="edit('+data[i].id+')">Edit Details</button></div></td></tr>';
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
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/products/product',
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify(apiData),
        success: (data, status) => {
            if (status == "success") {
                dropdownset();
                console.log(data);
                var brand = data.brand;
                var category = data.category;
                $('.products').removeClass("show");
                $('.products').addClass("hide");
                $('.edit-form').removeClass("hide");
                $('.edit-form').addClass("show");
                $('.edit-product-name').val(data.name);
                $('.edit-product-decs').val(data.description);
                $('.edit-price').val(data.price);
                $('.edit-qty').val(data.quantity);
                $('.img-view').html('<img src="'+data.image+'" width="250px"/>');
                $('#id').val(data.id);
                $('#status').val(data.status);
                $('.edit-image').val(data.image);
                // Setup Drop downs
                $('#edit-brand-error').text("Current Brand: "+brand.name);
                $('#edit-brand-error').css("display","block");
                $('#edit-category-error').text("Current Brand: "+category.name);
                $('#edit-category-error').css("display","block");
               // $('#edit-category>option:eq('+category.id+')').attr('selected','selected');
                //$('#edit-category').val(category.id).attr("selected", "selected");
            }
        }
    })

}

function update(){

    var id = $('#id').val();
    var name = $('.edit-product-name').val();
    var price = $('.edit-price').val();
    var quantity = $('.edit-qty').val();
    var desc = $('.edit-product-decs').val();
    var image = $('.edit-image').val();
    var stat = $('#status').val();
    var brand = $('.brand').val();
    var category = $('.category').val();
    if(name == ""){
        $('#edit-product-name-error').css("display","block");  
    }
    if(price == ""){
        $('#edit-price-error').css("display","block");  
    }
    if(quantity == ""){
        $('#edit-qty-error').css("display","block");  
    }
    if(desc == ""){
        $('#edit-description-error').css("display","block");  
    }
    if(image == ""){
        $('#image-error').css("display","block");  
    }
    if(brand == ""){
        $('#edit-brand-error').text("Please select a brand.");
        $('#edit-brand-error').css("display","block");  
    }
    if(category == ""){
        $('#edit-category-error').text("Please select a category.");
        $('#edit-category-error').css("display","block");  
    }else{
        var apiData={
            id: id,
            name: name,
            price: price,
            quantity: quantity,
            description: desc,
            image: image,
            status: stat,
            brand: {
                id: brand
            },
            category:{
                id: category
            }    
        }
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/products/product/update',
            crossDomain: true,
            contentType: "application/json",
            data: JSON.stringify(apiData),   
            success: (data, status) => {
                if(status == "success"){
                    $('.products').removeClass("hide");
                    $('.products').addClass("show");
                    $('.edit-form').removeClass("show");
                    $('.edit-form').addClass("hide");
                    $('#alert').css("display", "block");
                    $('#alert').addClass("alert-success");
                    $('#alert-title').text("Saved!");
                    $('#alert-info').text("Successfully updated product details "+data.name);    
                    loadTable();
                    $('#id').val(null);
                    $('.edit-product-name').val(null);
                    $('.edit-price').val(null);
                    $('.edit-qty').val(null);
                    $('.edit-product-decs').val(null);
                    $('.edit-image').val(null);
                    $('#status').val(null);
                    $('.brand').val(null);
                    $('.category').val(null);
                }else{
                    $('.products').removeClass("hide");
                    $('.products').addClass("show");
                    $('.edit-form').removeClass("show");
                    $('.edit-form').addClass("hide");
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

function stockAdd(id){
    var apiData={
        id : id
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/products/product',
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify(apiData),
        success: (data, status) => {
            if (status == "success") {
                console.log(data);
                let qty = prompt("Add New Stock for "+data.name+"");
                if(qty != null){
                    if(/^[0-9]+$/.test(qty)){
                        let auth = confirm('Confirm your request');
                        console.log(auth);
                        if(auth == true){
                            updateStock(data.id, qty);
                        }
                    }
                    else{
                        alert("Invalid Request Please try again!");
                    }
                } 
            }
        }
    }) 
}

function updateStock(product,stock){
    var apiData={
        product_id : product,
        stock : stock
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/products/product/stock_in',
        crossDomain: true,
        contentType: "application/json",
        data: JSON.stringify(apiData),
        success: (data, status) => {
            if (status == "success") {
                console.log(data);
                loadTable();
                // Success msg
            }
            else{
                // error msg
            }
        }
    }) 

}

function updateview(){
    var img = $('.edit-image').val();
    if(img == ""){
        return;
    }
    else{
        $('.img-view').html('<img src="'+img+'" width="250px"/>');
    }
}