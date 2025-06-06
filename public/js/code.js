const schüler  = new Array ("Abboud Al-Ibrahim","Amary Niyomsuk", "Ate Veenstra", "Bennet Frey","Charlotte Weber", "Deike Ferdinand", "Finn Gebken", "Hendrik Bodenstein", "Henry Ulferts", "Imke Meints", "Inke Baumfalk", "Ivo Sander","Jannes Lehmann", "Jannik Peters","Jonah Elsner", "Julian Bruns", "Justus Hartmann","Kim Grüssing", "Leon Wenke", "Lucian Frey","Lukas Adler","Maya Harb", "Mila Bleeker", "Patricia Ruberg", "Suvi Kuwan", "Tammo Helbig", "Tim Renken","Tino Brinker")

const aktuellerSchüler = document.getElementById("aktuellerSchüler")
const nächsterSchüler = document.getElementById("nächsterSchüler")
const day = document.getElementById("day")
const day2 = document.getElementById("day2")


let current_index = 0;
getData()
aktuellerSchüler.innerHTML = schüler[current_index]

nächsterSchüler.innerHTML = schüler[parseInt(current_index) + 1]
console.log(current_index + 1)


function getData() {
    $.ajax({
        dataType: "text",
        traditional: true,
        type: 'POST',
        async : false,
        url: '/public/getData',
        success: function (data) {
            console.log(data);
            current_index = data;
        }                   
      });
}



const startDate = new Date();

const getNextFriday = (date) => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = (5 - day + 7) % 7;
  result.setDate(result.getDate() + diff);
  return result;
};

const ferien = [
  '2025-10-03',
  "2025-07-04",
  "2025-07-18",
  "2025-08-01",
  "2025-09-10", 
];


const generateBiweeklyFridays = (start, count) => {
  const fridays = [];
  let date = getNextFriday(start);
  while (fridays.length < count) {
    if (!ferien.includes(date.toISOString().split('T')[0])) {
      fridays.push(new Date(date));
    }
    date.setDate(date.getDate() + 14); // every other Friday
  }
  return fridays;
};

const fridays = generateBiweeklyFridays(startDate, 10);
console.log(fridays);

day.innerHTML = fridays[1].toLocaleDateString('de-DE');
day2.innerHTML = fridays[2].toLocaleDateString('de-DE');
