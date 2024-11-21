"use strict"; 

/* global variables */
var twentyNine = document.createDocumentFragment();
var thirty = document.createDocumentFragment();
var thirtyOne = document.createDocumentFragment();
var formValidity = true;

/* seet up node building blocks for selection list of days */
function setupDays() {
	var dates = document.getElementById("reserveDy").getElementsByTagName("option");
	twentyNine.appendChild(dates[28].cloneNode(true)); //add 29th

	thirty.appendChild(dates[28].cloneNode(true));
	thirty.appendChild(dates[29].cloneNode(true)); //add 29th and 30th

	thirtyOne.appendChild(dates[28].cloneNode(true));
	thirtyOne.appendChild(dates[29].cloneNode(true)); //add 29th and 30th
	thirtyOne.appendChild(dates[30].cloneNode(true)); //add 29th, 30th and 31st   
}

function updateDays() {
	var reservationDay = document.getElementById("reserveDy");
	var dates = reservationDay.getElementsByTagName("option");
	var reservationMonth = document.getElementById("reserveMo");
	var reservationYear = document.getElementById("reserveYr");
	var selectedMonth = reservationMonth.options[reservationMonth.selectedIndex].value;

	while (dates[28]) {
		//remove child with an index of 28 until this index is empty
		reservationDay.removeChild(dates[28]);
	}

	if (reservationYear.selectedIndex === -1) {
		// if no year has been selected, choose a default year so the length of Feb can be determined
		reservationYear.selectedIndex = 0;
	}

	if (selectedMonth === "2" && reservationYear.options[reservationYear.selectedIndex].value === "2020") {
		// if leap year, Feb has 29 days
		reservationDay.appendChild(twentyNine.cloneNode(true));
	}

	else if (selectedMonth === "4" || selectedMonth === "6" || selectedMonth === "9" || selectedMonth === "11") {
		// these minths have 30 days
		reservationDay.appendChild(thirty.cloneNode(true));
	}

	else if (selectedMonth === "1" || selectedMonth === "3" || selectedMonth ==="5" || selectedMonth === "7" || selectedMonth === "8" || selectedMonth === "10" || selectedMonth === "12") {
		// these months have 21 days
		reservationDay.appendChild(thirtyOne.cloneNode(true));
	}
}

/* remove default values and formatting from state and reservation selection lists */

function removeSelectDefaults () {
	var emptyBoxes = document.getElementsByTagName("select");
	for (var i = 0; i < emptyBoxes.length; i++) {
		emptyBoxes[i].selectedIndex = -1;
	}
}

/* validate form */
function validateForm(evt) {
	if(evt.preventDefault){
		evt.preventDefault(); // prevent form from submitting
	} else {
		evt.returnValue = false // prevent form from submitting in IE8 or older
	}
	formValidity = true // resets value for revalidation

	validateReservationDate();

	if (formValidity === true) {
		document.getElementById("errorText").innerHTML = "";
		document.getElementById("errorText").style.display = "none";
		document.getElementsByTagName("form")[0].submit();
	} else {
		document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your order.";
		document.getElementById("errorText").style.display = "block";
		scroll(0,0);
	}

}

/* create event listeners */
function createEventListeners() {
	
	var reservationMonth = document.getElementById("reserveMo");
	if (reservationMonth.addEventListener) {
		reservationMonth.addEventListener("change", updateDays, false);
	} else if (reservationMonth.attachEvent) {
		reservationMonth.attachEvent("change", updateDays);
	}

	var reservationYear = document.getElementById("reserveYr");
	if (reservationYear.addEventListener) {
		reservationYear.addEventListener("change", updateDays, false);
	} else if (reservationYear.attachEvent) {
		reservationYear.attachEvent("change", updateDays);
	}

	var form = document.getElementsByTagName("form")[0];
	if (form.addEventListener) {
		form.addEventListener("submit", validateForm, false);
	} else if (form.attachEvent) {
		form.attachEvent("onsubmit", validateForm);
	}
}

function setUpPage() {
	removeSelectDefaults();
	setupDays();
	createEventListeners();
}
/* run setup function when page finishes loading */
if (window.addEventListener) {
	window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
	window.attachEvent ("onload", setUpPage);
}
