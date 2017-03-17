var oddelements = document.getElementsByClassName('odd'); 
var evenelements = document.getElementsByClassName('even');

var new_ul = document.createElement('ul');
var new_li1 = document.createElement('li');
var newTextOdd = document.createTextNode('oddTotal');
new_li1.appendChild(newTextOdd);
var new_li2 = document.createElement('li');
var newTextEven = document.createTextNode('evenTotal');
new_li2.appendChild(newTextEven);

new_ul.appendChild(new_li1);
new_ul.appendChild(new_li2);

var body_element = document.getElementsByTagName('body')[0];

body_element.insertBefore(new_ul, body_element.firstChild);

//get all the currency children
//var oddDonations = oddelements.getElementsByClassName("currency");
var total_odd = 0.0;
for (var i = 0; i < oddelements.length; i++) {
    //let oddEl = oddelements[i];
    console.log(oddelements[i]);
    //let oddDonations = oddEl.getElementsByTagName("td");
    //console.log(oddDonations[1]);
    //let donation = oddDonations[1].firstChild.textContent
    //console.log(donation);
    //let donation2 = oddelements[i].children[1].textContent;
    //console.log(donation2);
    let currency =  oddelements[i].children[1].textContent;

    var vsqft_float = currency.replace("$", "");
    var csqft_float = vsqft_float.replace(",", "");
    console.log("csqft_float is: " + csqft_float);
    var price= parseFloat(csqft_float);
    console.log("price is: " + price);

    //let oddFloat = Number(currency.replace(/[^0-9\.-]+/g,""));
    //console.log("oddFLoat is: " + oddFloat);
    total_odd = total_odd + price;
    console.log ("total odd is now: " + total_odd.toFixed(2));
}

newTextOdd.textContent = "The total value of Odd Contributions is: " + total_odd;

var total_even = 0.0;
for (var i = 0; i < evenelements.length; i++) {
    console.log(evenelements[i]);
    let currency = evenelements[i].children[1].textContent;
    var vsqft_float = currency.replace("$", "");
    var csqft_float = vsqft_float.replace(",", "");
    console.log("csqft_float is: " + csqft_float);
    var price= parseFloat(csqft_float);
    console.log("price is: " + price);
    total_even = total_even +  price;
    console.log ("total even is now: " + total_even.toFixed(2));
}

newTextEven.textContent = "The total value of Even Contributions is: " + total_even.toFixed(2);




