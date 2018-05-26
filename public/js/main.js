$(document).ready(function () {

  // Sticky footer
  $(window).resize(function () {
    var footerHeight = $('.footer').outerHeight();
    $('.push').height(footerHeight);

    $('.wrapper').css({'marginBottom': '-' + footerHeight + 'px'});
  });

  $(window).resize();

  // Dropdown event
  $(".timeline-card .dropdown-menu li a").click(function(){
    $(".btn:first-child").text($(this).text());
    $(".btn:first-child").val($(this).text());
  });

  // ======
  // Search
  // ======

  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
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
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
            /*insert the value for the autocomplete text field:*/
            inp.value = this.getElementsByTagName("input")[0].value;
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
          });
          a.appendChild(b);
        }
      }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
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
  var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

  /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
  autocomplete(document.getElementById("autocompleteInput"), countries);

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
      for (let i = resultsLength; i--; ) {
        if (regex.test(searchResults[i])) {
          matches.push(searchResults[i]);
        }
        else {
          searchText.val('');
        }
      }

      if (matches.length) {
        for (let i = matches.length; i--; ) {
          searchText.val(matches[i]);
        }
      }
    }
    else {
      searchText.val(searchTextPlaceholder);
    }
  });
});

function NotificationFinal(title, msg){

    this.title = title;
    this.msg = msg;
    this.activeNotification =  true;


    let mainDiv = document.createElement("div");
    mainDiv.className = "card card-1";

    let closeButton = document.createElement("span");
    closeButton.innerHTML = "&times";
    closeButton.className = "notificaiton_button close";
    closeButton.onclick = function(){
        mainDiv.style.display = 'none';
    }

    let h3Title = document.createElement("h3");
    h3Title.innerHTML = title;

    let text =  document.createElement("p");
    text.innerHTML = msg;

    //Dva dugmeta
    let buttonDiv = document.createElement("div");
    buttonDiv.className= "notification-buttons";

    let buttonPostpone = document.createElement("button");
    buttonPostpone.className = "btn btn-primary btn-margin";
    buttonPostpone.type = "Button";
    buttonPostpone.innerHTML = "Odlozi";

    let buttonAccept = document.createElement("button");
    buttonAccept.className = "btn btn-success btn-margin";
    buttonAccept.type = "Button";
    buttonAccept.innerHTML = "Prihvati";


    buttonDiv.appendChild(buttonAccept);
    buttonDiv.appendChild(buttonPostpone);


    //Main Div
    mainDiv.appendChild(closeButton);
    mainDiv.appendChild(h3Title);
    mainDiv.appendChild(text);
    mainDiv.appendChild(buttonDiv);

    //Dodaje notifikaciju
    document.getElementById("notification_panel_scroll").appendChild(mainDiv);


    isActive = function(){return this.activeNotification};

    setActive = function(active) {this.activeNotification = active};
}

var not1 = new NotificationFinal("ALOOOO", "Idemo nissss idemo nissss idemo idemo idemo idemo");
var not2 = new NotificationFinal("Naslov", "Neka tamo poruka koja sluzi za obavestvannje biloc ega");
var not3 = new NotificationFinal("AAAAA", "BBBBBBBBBBBBBBBBBBB");


