$(document).ready(function(){
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
}
