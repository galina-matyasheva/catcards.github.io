if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function(callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

var cards = document.querySelectorAll(".card");
cards.forEach(function(cardDiv) {
    var buyDiv = cardDiv.querySelector(".push-buy");
    var pElements = buyDiv.querySelectorAll("p");
    var switchStateFunction = function(event) {
        event.preventDefault();
        cardDiv.classList.remove('hover');
        if (cardDiv.classList.contains('default')) {
            cardDiv.classList.remove('default');
            cardDiv.classList.add('selected');
            pElements[0].setAttribute("hidden", "true");
            pElements[1].removeAttribute("hidden");
            pElements[2].setAttribute("hidden", "true");


        } else if (cardDiv.classList.contains('selected')) {
            cardDiv.classList.remove('selected');
            cardDiv.classList.add('default');
            pElements[0].removeAttribute("hidden");
            pElements[1].setAttribute("hidden", "true");
            pElements[2].setAttribute("hidden", "true");
        }
    };

    cardDiv.addEventListener("click", switchStateFunction);

    cardDiv.addEventListener("mouseenter", function() {
        cardDiv.classList.add('hover');
    });
    cardDiv.addEventListener("mouseleave", function() {
        cardDiv.classList.remove('hover');
    });
});