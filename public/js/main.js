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


