var row = document.getElementById('rowData');
var links = document.querySelectorAll(".nav-link");
var closeBtn = document.querySelectorAll('.closeBtn');
var allData = [];
var allSubData = [];
var exampleModal = document.getElementById('exampleModal');
var modalBody = document.getElementById('modalBody');
var ulData = document.getElementById('ulData');


for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
        var term = e.target.innerHTML;
        console.log(term);
        makeCall(term);
    });
}


function makeCall(word) {
    var xml = new XMLHttpRequest();

    xml.open('GET', `https://forkify-api.herokuapp.com/api/search?q=${word}`);
    xml.send();

    xml.addEventListener('readystatechange', function () {

        if (xml.readyState == 4 && xml.status == 200) {
            // console.log(xml.response);

            allData = JSON.parse(xml.response);

            allData = allData.recipes;
            displayData();

        }
    });
}


function displayData() {
    var str = ``;
    for (var i = 0; i < allData.length; i++) {

        str += `<div class = " col-md-2 text-center">
    <div class ="">
    <img src = "${allData[i].image_url}" class="w-100 showImg" onclick="displayImage(${i})" />
    <h6>${allData[i].title}</h6>
    <h5>${allData[i].publisher}</h5>
    </div>
    </div>
    `;
    }
    row.innerHTML = str;
    showImg = document.querySelectorAll('.showImg');

}

function makeCallSub(num) {
    var xml = new XMLHttpRequest();

    xml.open('GET', `https://forkify-api.herokuapp.com/api/get?rId=${num}`);
    xml.send();

    xml.addEventListener('readystatechange', function () {

        if (xml.readyState == 4 && xml.status == 200) {

            allSubData = JSON.parse(xml.response);

            allSubData = allSubData.recipe.ingredients;
            console.log(allSubData);
            displaySubData();
        }
    });
}


function displayImage(i) {
    exampleModal.style.display = "block";
    modalBody.innerHTML = `<img src = " ${allData[i].image_url}" class = " w-50" />`;
    makeCallSub(allData[i].recipe_id);

}

function displaySubData() {
    console.log('test');
    var str = ``;
    for (var k = 0; k < allSubData.length; k++) {

        str += `<li class="mb-2">${allSubData[k]}</li>
    `;
    }
    ulData.innerHTML = str;

}


for (var i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener('click',function(){
        exampleModal.style.display = "none";

    });
}