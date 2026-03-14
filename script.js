// 1حساب مجموع السعر 
//انشاء منتج جديد عند الضغض على crount 
//حفظ اللبينات فى                               local storage
//clear input تحديث الصفحه
//عرض المنتجات read
//delete
//count
//update
//search
//clean date بينات نظيفه
 

let title = document.getElementById("title");                                      //امساك اسم المنتج 
let price = document.getElementById("price");                                     //سعر المنتج 
let taxes = document.getElementById("taxes");                                    //الضرايب
let ads = document.getElementById("ads");                                       //تكلفه الاعلانات 
let discount = document.getElementById("discount");                            //الخصم       
let total = document.getElementById("total");                                 //السعر النهاءى 
let category = document.getElementById("category");                         //النوع 
let create = document.getElementById("submit");                            // الزر الصحيح لإنشاء منتج
let search = document.getElementById("search");                           //كلمه اللبحث
let searchCategory = document.getElementById("searchCategory");          // حل مشكلة التكرار
let updateButtons = document.querySelectorAll("#update");               // لأنك كررته في الجدول
let deleteButtons = document.querySelectorAll("#delete");              // لأنك كررته في الجدول
let quantity =document.getElementById("quantity")                     // حقل ادخال الكميه المتاحه 
let searchTitle = document.getElementById("searchTitle");            // البحث حسب العنوان   
let mood = 'create';

let tmp;
let datapro = [];

if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product);
}

// 1حساب مجموع السعر 
function getTotal(){                       //فانكشن الحساب
    if(price.value !=''){                 // يعمل عندما يكون مكتوب شىء فى سعر المنتج
        let result =  (+price.value + +taxes.value + +ads.value)- +discount.value ;
        total.innerHTML = result                            //كتابه الناتج فى التوتال 
        total.style.background = 'rgb(33 163 33)'           //تغير خلفيه التوتال 
    }                                                     
    else{
        total.innerHTML = '';                                  //لو لم يكتب شىء فى سعر المنتج لم يتم تنفيز الفانكشن
        total.style.background = 'rgba(26, 206, 194, 0.9)'  // ارجع اللون الى الاصل 
    }
}
 


//انشاء منتج جديد عند الضغض على crount 
  document.addEventListener("DOMContentLoaded", function () {
    let create = document.getElementById("submit");

    create.onclick  = function(){
        let newpro = {
            
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            quantity: quantity.value,
            discount: discount.value,
            total: total.innerHTML,
            category: category.value.toLowerCase(),
            
        }; 


        if (title.value === '' || price.value === '' || category.value === '') {
            // لو في بيانات ناقصة، ما نعملش أي عملية  
            
            showNotification ('Please fill in the required fields.');
        
            // هنا مش بنلمس أي حاجة، علشان المدخلات تفضل زي ما هي
        } else {
            if (mood === 'create') {
                datapro.push(newpro);
            } else {
                datapro[tmp] = newpro;
                mood = 'create';
                create.innerHTML = 'Create';
                quantity.style.display = 'block';
            }
        
            // بعد إضافة أو تعديل المنتج بنفضي الحقول
            localStorage.setItem('product', JSON.stringify(datapro));
            cleardata();
            showData();
        }       
    };
    function showNotification(message) {
        let notification = document.getElementById("notification");
        notification.textContent = message;
         // إخفاء التنبيه أولاً قبل تعديل النص
         notification.classList.remove("show");
         notification.classList.remove("hide");
    
        // تحديث النص داخل التنبيه
        notification.textContent = message;
        
        // إلغاء الـ display: none لإظهار العنصر
        notification.style.display = "block"; // أو "inline" حسب التصميم
    
        notification.classList.add("show");  // أضف الكلاس show لعرض الرسالة
    
        setTimeout(() => {
            notification.classList.add("hide");  // إضافة الكلاس hide لإخفاء الرسالة
        }, 2000); // الرسالة تختفي بعد 3 ثواني

        // بعد 3 ثواني، أخفِ الرسالة تدريجيًا
        setTimeout(() => {
            notification.classList.remove("show");  // إزالة الكلاس show لإخفاء الرسالة
            notification.style.display = ("hide");  // إعادة إخفاء العنصر بعد اختفاء الرسالة
        }, 3500); // الرسالة تختفي بعد 3 ثواني
    }
    
    
      

});


//clear input تحديث الصفحه
function cleardata(){
    title.value ='';
    price.value ='';
    taxes.value ='';
    ads.value ='';
    discount.value ='';
    total.innerHTML ='';
    category.value ='';
    quantity.value ='';
}

//عرض المنتجات read
function showData(){
    getTotal();
    let table = '';
    for(let i = 0; i < datapro.length; i++){
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].quantity}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
    }

    document.getElementById("tbody").innerHTML = table;

    let btndelete = document.getElementById("deleateall");
    if(datapro.length > 0){
        btndelete.innerHTML = `<button onclick="deleateall()"> delete all </button>`;
    } else {
        btndelete.innerHTML = '';
    }
}

//delete
function deleteData(i){
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showData();
}

function deleateall(){
    localStorage.clear();
    datapro.splice(0);
    showData();
}

//update
function updateData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;    
    quantity.value = datapro[i].quantity;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    getTotal();
    create.innerHTML = 'update';
    mood = 'update';
    tmp = i;
    quantity.style.display = 'none';
    scroll({
        top:0,
        behavior:'smooth'
    })
}

//عرض البيانات عند تحميل الصفحة
showData();




//search
let searchMood = 'title';


function getserchmood(id){
    let search = document.getElementById("search");
    if(id == 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title'; 
    } else {
        searchMood = 'category';
        search.placeholder = 'Search By Category';

    }  
    search.focus();
    search.value = '';
    showData();
}


function searchdata(value){
    let table =""
    if(searchMood == 'title'){ 

        for(let i =0; i<datapro.length ;i++){
            if(datapro[i].title.includes(value)){ 
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].quantity}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
            }       
        }   
    }
    else{
        
        for(let i =0; i<datapro.length ;i++){
            if(datapro[i].category.includes(value.tolowercase())){ 
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].quantity}</td>
                    <td>${datapro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>`;
            }
        }

    }
    document.getElementById('tbody').innerHTML =table;

}



//clean date بينات نظيفه
