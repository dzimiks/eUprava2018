$(document).ready(function () {

  // // Sticky footer
  $(window).resize(function () {
    var footerHeight = $('.footer').outerHeight();
    $('.push').height(footerHeight);

    $('.wrapper').css({ 'marginBottom': '-' + footerHeight + 'px' });
  });

  $(window).resize();

  $('[data-toggle="popover"]').popover({
    html: true,
    placement: 'left',
    trigger: 'focus',
    content: function () {
      return '<div class="row row-eq-height">' +
          '<div class="col-xs-12 text-left">' +
          '<h4 class="text-center" style="font-weight: bold;">еУправа Асистент</h4><hr>' +
          '<h5>Потребна вам је помоћ? Контактирајте нашу подршку!</h5>' +
          '<h5>Емаил: <a href="mailto:euprava@gmail.com" style="color: blue; text-decoration: none;">euprava@gmail.com</a></h5>' +
          '<div class="text-center"><a href="tel:+12025550132">' +
          '<button class="btn btn-warning btn-md">Позивни број</button>' +
          '</a></div></div>' +
          '</div>';
    }
  });
  
  if (localStorage.getItem("jmbg")) {
    $("#prijava-link").text("Одјава");
  }

  // login
  $(document).on('click', '#login', function (e) {
    let email = $("#email").val();
    let password = $("#password").val();
    $.post("/prijava", { email: email, password: password }, function (data) {
      if (data.ok) {
        localStorage.setItem("email", email);
        console.log("Uspesno i jmbg=" + data.jmbg);
        window.location.replace("/verifikacija");
      } else {
        console.log("neuspesno logovanje");
      }
    });
  });

  $(document).on('click', '#prijava', function (e) {
    if (localStorage.getItem("jmbg")) {
      localStorage.removeItem("jmbg");
      localStorage.removeItem("email");
    }
  });

  $(document).on('click', '#profil', function (e) {
    console.log("evo me");

    if (!localStorage.getItem("jmbg")) {
      e.preventDefault();
      window.location.replace("/prijava");
    }
  });


  // verify
  $(document).on('click', '#verify', function (e) {
    let email = localStorage.getItem("email");
    let key = $("#key").val();
    $.post("/verifikacija", { email: email, key: key }, function (data) {
      if (data.jmbg) {
        console.log("Uspesne i jmbg=" + data.jmbg);
        localStorage.setItem("jmbg", data.jmbg);
        window.location.replace("/profil");
      } else {
        console.log("neuspesno logovanje");
      }
    });
  });

  // Dropdown event
  $(".timeline-card .dropdown-menu li a").click(function () {
    $(".btn:first-child").text($(this).text());
    $(".btn:first-child").val($(this).text());
  });

  $('.dropdown').click(function () {
    $('.badge-notify').hide();
  });

  // $(document).on('click', '.nav-item', function(e) {
  //   $(".navbar-nav li .active").removeClass("active");
  //   $(e.target).addClass("active");
  // });

  var url_string = window.location.href;
  var url = new URL(url_string);
  var c = url.searchParams.get("id");
  $('#' + c).modal('show');

  //Konstruktor za nas objekat
  function Pretraga(naziv) {
    this.naziv = naziv;
    this.tagovi = [];

    // alert('PRETRAGA');

    this.dodajTag = function (newTag) {this.tagovi.push(newTag);}
    this.ispisiTagove = function () {
      console.log("TAGOVI");
      for(let i = 0; i < this.tagovi.length; i++){
        alert(this.tagovi[i]);
      }
    };

    this.equals = function(text){
      for(let i = 0; i < this.tagovi.length; i++){
        if(this.tagovi[i].substr(0, text.length) === text){
          return true;
        }
      }
    }
  }

  var p1 = new Pretraga("Израда пасоша");
  var p2 = new Pretraga("Израда личнe карте");
  var p3 = new Pretraga("Издавање докумената");
  var p4 = new Pretraga("Продужетак докумената");

  //P1
  p1.dodajTag("pasos");
  p1.dodajTag("pasoš");
  p1.dodajTag("пасош");
  p1.dodajTag("putna isprava");
  p1.dodajTag("путна исправа");
  p1.dodajTag("izdavanje pasosa");
  p1.dodajTag("izdavanje pasoša");
  p1.dodajTag("издавање пасоша");
  p1.dodajTag("izrada pasosa");
  p1.dodajTag("izrada pasoša");
  p1.dodajTag("израда пасоша");
  p1.dodajTag("produženje pasoša");
  p1.dodajTag("produzenje pasoša");


  //P2
  p2.dodajTag("licna karta");
  p2.dodajTag("lična karta");
  p2.dodajTag("лична карта");
  p2.dodajTag("karta");
  p2.dodajTag("карта");
  p2.dodajTag("издавање личне карте");
  p2.dodajTag("издавање личнa картa");
  p2.dodajTag("izdavanje licne karte");
  p2.dodajTag("izdavanje lična karte");
  p2.dodajTag("produzenje licna karta");
  p2.dodajTag("produženje lična karta");
  p2.dodajTag("продужење личне карте");
  p2.dodajTag("продужење личнa картa");
  p2.dodajTag("izrada licne karte");
  p2.dodajTag("izrada licna karta");
  p2.dodajTag("izrada lična karte");
  p2.dodajTag("izrada lična karta");
  p2.dodajTag("израда личне карте");
  p2.dodajTag("израда личнa картa");

  //P3
  p3.dodajTag("izdavanje pasosa");
  p3.dodajTag("izdavanje pasoša");
  p3.dodajTag("издавање пасоша");
  p3.dodajTag("izdavanje licne karte");
  p3.dodajTag("izdavanje lična karte");
  p3.dodajTag("izdavanje licna karta");
  p3.dodajTag("izdavanje lična karta");
  p3.dodajTag("издавање личне карте");
  p3.dodajTag("издавање личнa картa");
  p3.dodajTag("pasos");
  p3.dodajTag("pasoš");
  p3.dodajTag("пасош");
  p3.dodajTag("putna isprava");
  p3.dodajTag("путна исправа");
  p3.dodajTag("licna karta");
  p3.dodajTag("lična karta");
  p3.dodajTag("лична карта");
  p3.dodajTag("karta");
  p3.dodajTag("карта");
  p3.dodajTag("izrada licne karte");
  p3.dodajTag("izrada licna karta");
  p3.dodajTag("izrada lična karte");
  p3.dodajTag("izrada lična karta");
  p3.dodajTag("израда личне карте");
  p3.dodajTag("израда личнa картa");
  p3.dodajTag("izrada pasosa");
  p3.dodajTag("izrada pasoša");
  p3.dodajTag("израда пасоша");

  //P4
  p4.dodajTag("produzenje pasosa");
  p4.dodajTag("produženje pasoša");
  p4.dodajTag("produzenje licne karte");
  p4.dodajTag("produženje lična karte");
  p4.dodajTag("produzenje licna karta");
  p4.dodajTag("produženje lična karta");
  p4.dodajTag("продужење пасоша");
  p4.dodajTag("продужење личне карте");
  p4.dodajTag("продужење личнa картa");
  p4.dodajTag("pasos");
  p4.dodajTag("pasoš");
  p4.dodajTag("пасош");
  p4.dodajTag("putna isprava");
  p4.dodajTag("путна исправа");
  p4.dodajTag("licna karta");
  p4.dodajTag("lična karta");
  p4.dodajTag("лична карта");
  p4.dodajTag("karta");
  p4.dodajTag("карта");

  var data = [p2, p1, p3, p4];

  ///Button pretrazi akcija

  // $('#btn_pretrazi').click(function () {
  //
  // });

  $(document).on('click', '#btn_pretrazi', function () {
    let text = $('#autocompleteInput').val();

    let izdavanjePasosa = document.getElementById("izdavanje_pasosa");
    let izdavanjeLicne = document.getElementById("izdvanje_licne");
    let izdavanjeZdravstvene = document.getElementById("izdavanje_zdravstvene");
    let produzetakPasosa = document.getElementById("produzetak_pasosa");
    let produzetakLicne = document.getElementById("produzetak_licne");
    let onaLinija = document.getElementById("ona_linija");

    izdavanjePasosa.style.display = "none";
    izdavanjeLicne.style.display = "none";
    izdavanjeZdravstvene.style.display = "none";
    produzetakPasosa.style.display = "none";
    produzetakLicne.style.display = "none";
    onaLinija.style.display = "block";



    if(p1.equals(text)){
      izdavanjePasosa.style.display = "block";
      produzetakPasosa.style.display = "block";
    }else if(text == p1.naziv){
      izdavanjePasosa.style.display = "block";
    }else if(p2.equals(text)){
      izdavanjeLicne.style.display = "block";
      produzetakLicne.style.display = "block";
    }else if(p2.naziv === text){
      izdavanjeLicne.style.display = "block";
    }else if(text === p3.naziv || p3.equals(text)) {
      izdavanjePasosa.style.display = "block";
      izdavanjeLicne.style.display = "block";
      izdavanjeZdravstvene.style.display = "block";
    }else if(text === p4.naziv || p4.equals(text)){
      produzetakPasosa.style.display = "block";
      produzetakLicne.style.display = "block";
    }else{
      onaLinija.style.display = "none";
    }
  });

  // ======
  // Search
  // ======

  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false; }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/

      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        for(let j = 0; j < arr[i].tagovi.length; j++){
          if (arr[i].tagovi[j].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML += arr[i].naziv;
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i].naziv + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
            });
            a.appendChild(b);
            break;
          }
        }
      }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
      closeAllLists(e.target);
    });
  }

  /*An array containing all the country names in the world:*/
  var countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central Arfrican Republic", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauro", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

  /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
  autocomplete(document.getElementById("autocompleteInput"), data);

  // ====================

  let searchResults = [
    'awesome',
    'bakery',
    'creator',
    'doritos',
    'efficient',
    'falafel',
    'great work',
    'high times',
    'idiom',
    'jargon',
    'krill',
    'lazy',
    'masters',
    'nope',
    'opacity',
    'purple rain',
    'quaint',
    'readability',
    'simpleton',
    'terrible',
    'umqua',
    'verocious',
    'waffles',
    'x-rays',
    'yard sale',
    'zappos'
  ];

  let escapeChars = '/\\/|\\\\|\\.|\\||\\*|\\&|\\+|\\(|\\)|\\[|\\]|\\?|\\$|\\^/g';
  let match = '/[A-Z]?[a-z]+|[0-9]+/g';
  let keys = [13, 9];
  let resultsLength = searchResults.length;
  let searchContainer = $('.search-container');
  let searchText = $('.search-text');
  let search = $('.search-bar');
  let searchTextPlaceholder = searchText.val();

  search.on('keydown', function (e) {
    if (keys.indexOf(e.keyCode) !== -1) {
      search.val(searchText.val());
      return false;
    }
  }).on('keyup', function () {
    let value = search.val().replace(escapeChars, '');
    let regex = new RegExp('^' + value + 'i');
    let matches = [];

    if (value) {
      for (let i = resultsLength; i--;) {
        if (regex.test(searchResults[i])) {
          matches.push(searchResults[i]);
        }
        else {
          searchText.val('');
        }
      }

      if (matches.length) {
        for (let i = matches.length; i--;) {
          searchText.val(matches[i]);
        }
      }
    }
    else {
      searchText.val(searchTextPlaceholder);
    }
  });
});

function NotificationFinal(title, msg) {

  this.title = title;
  this.msg = msg;
  this.activeNotification = true;


  let mainDiv = document.createElement("div");
  mainDiv.className = "card card-1";

  let closeButton = document.createElement("span");
  closeButton.innerHTML = "&times";
  closeButton.className = "notificaiton_button close";
  closeButton.onclick = function () {
    mainDiv.style.display = 'none';
  };

  let h3Title = document.createElement("h3");
  h3Title.innerHTML = title;

  let text = document.createElement("p");
  text.innerHTML = msg;

  //Dva dugmeta
  let buttonDiv = document.createElement("div");
  buttonDiv.className = "notification-buttons";

  let buttonPostpone = document.createElement("button");
  buttonPostpone.className = "btn btn-danger btn-margin";
  buttonPostpone.type = "Button";
  buttonPostpone.innerHTML = "Одложи";
  buttonPostpone.id = "branko";
  buttonPostpone.onclick = function () {
    mainDiv.style.display = 'none';
  } 

  let buttonAccept = document.createElement("button");
  buttonAccept.className = "btn btn-success btn-margin milos";
  buttonAccept.type = "Button";
  buttonAccept.innerHTML = "Настави";

  $(".milos").attr('data-toggle','modal');
  $(".milos").attr('data-target','#cardModal');
  

  buttonDiv.appendChild(buttonAccept);
  buttonDiv.appendChild(buttonPostpone);


  //Main Div
  mainDiv.appendChild(closeButton);
  mainDiv.appendChild(h3Title);
  mainDiv.appendChild(text);
  mainDiv.appendChild(buttonDiv);

  //Dodaje notifikaciju
  document.getElementById("notification_panel_scroll").appendChild(mainDiv);


  isActive = function () { return this.activeNotification };

  setActive = function (active) { this.activeNotification = active };
}

// var not1 = new NotificationFinal("Пасош ускоро истиче", "Молимо Вас да у што краћем року предате папирологију.");
// var not2 = new NotificationFinal("Лична карта ускоро истиче", "Молимо Вас да у што краћем року предате папирологију.");

// setInterval(function() {
//   var not3 = new NotificationFinal("Регистрација возила ускоро истиче", "Молимо Вас да у што краћем року предате папирологију.");
// }, 2000);
var not1 = new NotificationFinal("Пасош ускоро истиче", "Пасош Вам ускоро истиче. Кликните Настави за приступ еФормулару за продужетак пасоша.");
var not2 = new NotificationFinal("Лична карта ускоро истиче", "Молимо Вас да у што краћем року предате папирологију.");
// var not3 = new NotificationFinal("AAAAA", "BBBBBBBBBBBBBBBBBBB");

// setInterval(function() {
//   var not2 = new NotificationFinal("Регистрација возила ускоро истиче", "Регистрација возила Вам ускоро истиче. Кликните Настави за приступ еФормулару.");
// }, 3000);



for (var i = 0; i < 2; i++) {
  setTimeout(function(y) {
    var not3 = new NotificationFinal("Регистрација возила ускоро истиче", "Регистрација возила Вам ускоро истиче. Кликните Настави за приступ еФормулару.");
    setInterval(function () {
      $(".alert").fadeTo(4000, 7000).slideUp(700, function() {
        $(this).remove();
      });
    }, 1000);
  }, 180000);
}

