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
});

function Notification(type, title, date, msg){
    this.type = type;
    this.title = title;
    this.date = date;
    this.msg = msg;

    let mainDiv = document.createElement("div");
    mainDiv.className = "card notification_card card-1";
    mainDiv.height = 100;

    let titleDiv = document.createElement("div");
    titleDiv.className = "card-title notification_title";
    titleDiv.innerHTML = this.title;


    let bodyDiv = document.createElement("div");
    bodyDiv.className = "";

    let button = document.createElement("button");

    let span = document.createElement("span");

    button.innerHTML = span.innerHTML = "&times";
    button.type = "button";
    button.onclick = function(){
        mainDiv.style.display = 'none';
    }

    button.className = "notificaiton_button close";

    let buttonDiv = document.createElement("div");
    buttonDiv.className = "notificaiton_button_panel";

    let acceptButton = document.createElement("button");
    acceptButton.type = "Button";
    acceptButton.className = "btn btn-sm btn-success";
    acceptButton.innerHTML = "Nastavi";

    let postponeButton = document.createElement("button");
    postponeButton.type = "Button";
    postponeButton.className = "btn btn-sm btn-primary";
    postponeButton.innerHTML = "Odlozi"; //TODO


    buttonDiv.appendChild(acceptButton);
    buttonDiv.appendChild(postponeButton);


    bodyDiv.appendChild(buttonDiv);
    bodyDiv.appendChild(button);

    let text = document.createElement("p");
    text.className = "notification_text";
    text.innerHTML = this.msg;

    bodyDiv.appendChild(text);

    mainDiv.appendChild(titleDiv);

    mainDiv.appendChild(bodyDiv);

    document.getElementById("notification_panel_scroll").appendChild(mainDiv);

}

var n1 = Notification("WARNING", "NASLOV", new Date(1997, 11, 16), "Ovo je poruka za notifikaciju");
var n2 = Notification("HELlo", "Pozega", new Date(), "Malo teksta za mlade ljude koji stare trosenjem mladig dana u mlade sate");
var n3 = Notification("HELlo", "Pozega", new Date(), "Malo teksta za mlade ljude koji stare trosenjem mladig dana u mlade sate");
