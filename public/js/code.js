const aktuellerSchüler = document.getElementById("aktuellerSchüler")
const nächsterSchüler = document.getElementById("nächsterSchüler")
const day = document.getElementById("day")
const day2 = document.getElementById("day2")

getData()



function getData() {
    $.ajax({
        dataType: "text",
        traditional: true,
        type: 'POST',
        async : false,
        url: '/public/getData',
        success: function (data) {
            data = JSON.parse(data)
            console.log(data);
            day.innerHTML = new Date (data[0].tag).toLocaleDateString('de-DE');
            day2.innerHTML = new Date (data[1].tag).toLocaleDateString('de-DE');

            aktuellerSchüler.innerHTML = data[0].schüler
            nächsterSchüler.innerHTML = data[1].schüler

        }                   
      });
}



