let date = new Date();
let monthdays = document.querySelector(".day");
let day;
let month;
let year;
function Calendar() {
    monthdays.innerHTML = "";
    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();
    date.setDate(1);
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let lastday = new Date(year, month + 1, 0).getDate();
    let firstday = date.getDay();

    document.querySelector(".monthyear div").innerHTML = months[month] + " " + year;

    let days = "";

    for (let j = firstday; j > 0; j--) {
        days = "<li></li>";
        monthdays.innerHTML += days;
    }

    for (let i = 1; i <= lastday; i++) {
        let today = new Date();
        if (i == today.getDate() && month == today.getMonth()) {
            days = "<li id='today'>" + i + "</li>";
        } else {
            days = "<li>" + i + "</li>";
        }
        monthdays.innerHTML += days;
    }
}
document.querySelector("#larrow").addEventListener('click', function () {
    date.setMonth(month - 1);
    Calendar();
})

document.querySelector("#rarrow").addEventListener('click', function () {
    date.setMonth(month + 1);
    Calendar();
})

Calendar();