import { countries } from './countries.js';
import { cities } from './cities.js';

window.addEventListener('onload', welcome())
function welcome() {
    if (window.localStorage.hasOwnProperty('visited')) {
        visited()
    } else {
        welcomeScreen()
    }
}


function welcomeScreen() {
    const welcomeScreenContent = `
    <div class="welcomeScreen">
        <div class="logoContainer">
            <img src="../assets/imgs/testLogo.png" alt="" class="logo logoWelcomeScreen">
        </div>
        <form action="" class="choices choicesWelcomeScreen">
            <div class="choice">
                <div class="choiceTitle">
                    <span class="arabic">اللغة :</span>
                    <span class="english">Language :</span>
                </div>
                <div class="choiceInputs">
                    <div>
                        <div class="label">
                            <label for="radioArabic" class="arabic">عربي</label>
                            <label for="radioArabic" class="english">عربي</label>
                        </div>
                        <input type="radio" value="arabic" id="radioArabic" onclick="langRadiosHandel(this)" checked>
                    </div>
                    <div>
                        <div class="label">
                            <label for="radioEnglish" class="arabic">English</label>
                            <label for="radioEnglish" class="english">English</label>
                        </div>
                        <input type="radio" value="english" id="radioEnglish" onclick="langRadiosHandel(this)">
                    </div>
                </div>
            </div>
            <div class="choice">
                <div class="choiceTitle">
                    <label for="country" class="arabic">الدولة :</label>
                    <label for="country" class="english">Country :</label>
                </div>
                <div class="choiceInputs">
                    <select name="country" id="country">
                        
                    </select>
                </div>
            </div>
            <div class="choice">
                <div class="choiceTitle">
                    <label for="city" class="arabic">المدينة :</label>
                    <label for="city" class="english">City :</label>
                </div>
                <div class="choiceInputs">
                    <select name="city" id="city">
                        <option value="null">-- Select a city --</option>
                    </select>
                </div>
            </div>
        </form>
        <div class="text textContainer textWelcomeScreen">
            <div class="title">
                <h2 class="arabic">تنويه :</h2>
                <h2 class="english">Attention :</h2>
            </div>
            <div class="textContent">
                <p class="arabic">
                    سيتم حفظ اللغة والدولة والمدينة <br>
                    وسيتم عرض الموقع بناء عليها بشكل تلقائي <br>
                    بالإضافة الى امكانية تغييرها في اي وقت
                </p>
                <p class="english">
                    The information of Language and Country and City well be saved <br>
                    And website will be shown on this information by default And you can change it anytime
                </p>
            </div>
        </div>
        <div class="btn" id="Continu">Continu</div>
    </div>
    `
    document.querySelector('body').innerHTML = welcomeScreenContent
    document.querySelector('body').classList = 'welcome'
    window.localStorage.setItem('lang', 'arabic');
    document.querySelector('body').classList.add(localStorage.valueOf('lang').lang)
    const Continu = document.getElementById('Continu')
    Continu.addEventListener('click', () => {
        window.localStorage.setItem('reqAvalibleNum', 0);
        window.localStorage.setItem('reqAvalibleTime', new Date().getTime());
        window.localStorage.setItem('visited', 'true');
        saveInfo()
    })
}

function reqHandling() {
    if (Number(window.localStorage.reqAvalibleNum) == 0) {
        window.localStorage.reqAvalibleNum = 1
        window.localStorage.reqAvalibleTime = new Date().getTime() + (5 * 1000 * 60)
    } else if (Number(window.localStorage.reqAvalibleNum) == 1) {
        window.localStorage.reqAvalibleNum = 2
        window.localStorage.reqAvalibleTime = new Date().getTime() + (10 * 1000 * 60)
    } else if (Number(window.localStorage.reqAvalibleNum) == 2) {
        window.localStorage.reqAvalibleNum = 3
        window.localStorage.reqAvalibleTime = new Date().getTime() + (30 * 1000 * 60)
    } else if (Number(window.localStorage.reqAvalibleNum) == 3) {
        window.localStorage.reqAvalibleNum = 0
        window.localStorage.reqAvalibleTime = new Date().getTime() + (180 * 1000 * 60)
    } 
}

function visited() {
    document.querySelector('body').classList = localStorage.valueOf('lang').lang
    if (Number(window.localStorage.reqAvalibleTime) == new Date().getTime()) {
        window.localStorage.reqAvalibleTime = new Date().getTime()
    }
    printTimes()
}

// Countries and Cities Dropdown Lists
const citiesSelectDrop = document.getElementById('city')
countriesDropDown() 
citiesSelectDrop.addEventListener('focus', citiesDropDown)

function countriesDropDown() {
    const countriesSelectDrop = document.getElementById('country')
    // let options = `<option value="${localStorage.valueOf('country').country}">${localStorage.valueOf('country').country}</option>`;
    let options = '';
    for (let country in countries) {
        let countryName = ''
        for (let letter of country) {
            if (letter != ' ') {
                countryName += letter
            } else {
                countryName += '_'
            }
        }
        options += `<option value="${countryName}">${countryName}</option>`
        countryName = ''
    }
    countriesSelectDrop.innerHTML = options;
}

function citiesDropDown(){
    let countryName = document.getElementById('country').value
    let countryExist = false;
    const citiesList = Object.entries(cities)
    for (let i = 0; i < citiesList.length; i++) {
        if (countryName == citiesList[i][0].replaceAll(' ', '_')) {
            console.log(citiesList[i][0].replace(' ', '_'))
            countryExist = true
            let ctitesOfCountry = citiesList[i][1]
            let options = '<option value="none">-- Select a city --</option>';
            if (ctitesOfCountry.length > 0) {
                for (let i = 0; i < ctitesOfCountry.length; i++) {
                    let cityName = ''
                    for (let letter of ctitesOfCountry[i]) {
                        if (letter != ' ') {
                            cityName += letter
                        } else {
                            cityName += '_'
                        }
                    }
                    options += `<option value=${cityName}>${cityName}</option>`
                    cityName = ''
                }
                citiesSelectDrop.innerHTML = options;
            } else {
                citiesSelectDrop.innerHTML =  `<option value='${countryName}'>${countryName}</option>`;
            }
        }
    }
    if (countryExist != true) {
        citiesSelectDrop.innerHTML =  `<option value='${countryName}'>${countryName}</option>`;
    }
}

// Save Informations
function saveInfo(){
    if (new Date().getTime() >= Number(window.localStorage.reqAvalibleTime)) {
        window.localStorage.setItem('country', document.getElementById('country').value);
        let nullCity
        if (document.getElementById('city').value === 'null') {
            window.localStorage.setItem('city', document.getElementById('country').value)
        } else {
            window.localStorage.setItem('city', document.getElementById('city').value)
        }
        document.querySelector('#mainBody').classList.remove('settings')
        reqHandling()
        getPrayTimes()
        window.location.reload()
    }
}


// Azan Times Api 
function getPrayTimes() {
    let country = localStorage.valueOf('country').country
    let city = localStorage.valueOf('city').city
    // fetch(`http`)
    fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=8`).then(response => response.json()).then(data => {
        console.log('good')
        let times = data.data.timings;
        let prayesNames = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']
        Object.entries(times).forEach(function([key, value]) {
            if (prayesNames.includes(`${key}`)) {
                window.localStorage.setItem(`${key}`, `${value}`)
            }
        });
    }).catch((err) => {
        console.log(err)
        console.log('fuck')
        let prayesTimes = {
            'Fajr': '05:01', 
            'Sunrise': '06:22', 
            'Dhuhr': '12:27', 
            'Asr': '15:57', 
            'Maghrib': '18:35', 
            'Isha': '20:04'
        }
        Object.entries(prayesTimes).forEach(function([key, value]) {
            window.localStorage.setItem(`${key}`, `${value}`)
        })
    })
}

// Print Times On Screen
function printTimes() {
    let dateContainer = document.querySelector('.row.dateContainer')
    let date = new Date()
    dateContainer.innerHTML = `
    <div class="hijriDate">
        <p class="day">${date.toLocaleDateString("ar-SA", {weekday: 'long'})}</p>
        <div class="date">
            <span class="days">${date.toLocaleDateString("ar-SA", {day: 'numeric'})}</span> / <span class="months">${date.toLocaleDateString("ar-SA", {month: 'numeric'})}</span> / <span class="years">${date.toLocaleDateString("ar-SA", {year: 'numeric'})}</span>
        </div>
    </div>
    <div class="miladiDate">
        <p class="day">${date.toLocaleDateString("en-US", {weekday: 'long'})}</p>
        <div class="date">
        <span class="days">${date.toLocaleDateString("en-US", {day: 'numeric'})}</span> / <span class="months">${date.toLocaleDateString("en-US", {month: 'numeric'})}</span> / <span class="years">${date.toLocaleDateString("en-US", {year: 'numeric'})}</span> M
        </div>
    </div>
    `
    let praies = document.querySelectorAll('.prayTimeContainer')
    praies.forEach(pray => {
        const prayTime = localStorage[pray.id]
        const [hours, minutes] = prayTime.split(':');
        const seconds = '00'
        let formattedHours = hours % 12;
        if (formattedHours === 0) {
            formattedHours = 12;
        }
        const formattedHoursString = formattedHours < 10 & formattedHours > 0 ? `0${formattedHours}` : formattedHours.toString();
        const formattedMinutesString = minutes;
        const period = hours >= 12 ? 'PM' : 'AM';
        
        // Counter
        const countDate = new Date();
        countDate.setHours(hours);
        countDate.setMinutes(minutes);
        countDate.setSeconds(seconds);
        const timeNow = new Date().getTime()
        const timeDiff = (countDate.getTime()) - timeNow
        let hoursCounter = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        let minutesCounter = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
        pray.childNodes[1].childNodes[3].innerHTML = `
        <div class="time">
            <span class="hours">${formattedHoursString}</span>:<span class="mints">${formattedMinutesString}</span> <span class="amPm">${period}</span>
        </div>
        `
        pray.childNodes[3].childNodes[3].innerHTML = `
        <span class="hours">${hoursCounter < 10 & hoursCounter > 0 ? `0${hoursCounter}` : hoursCounter < 0 ? ' -- ' : hoursCounter}</span>:<span class="mints">${minutesCounter < 10 & minutesCounter > 0 ? `0${minutesCounter}` : minutesCounter < 0 ? ' -- ' : minutesCounter}</span>
        `
    })
    let counterItems = []
    document.querySelectorAll('.until .time .hours').forEach((item)=>{
        if (Number(item.innerHTML) >= 0) {
            counterItems.push(Number(item.innerHTML))
        } else {
            item.parentNode.parentNode.parentNode.classList.add('done')
        }
    })
    let minItem = Math.min(...counterItems)
    document.querySelectorAll('.until .time .hours').forEach(item => {
        if (item.innerHTML == minItem) {
            item.parentNode.parentNode.parentNode.classList.add('active')
        }
    })
}

// Settings Factunality
const settingsBtn = document.getElementById('settings')
settingsBtn.addEventListener('click', () => {
    document.getElementById('mainBody').classList.toggle('settings')
    if (window.localStorage.lang == 'arabic') {
        document.getElementById('radioArabic').checked = true
        document.getElementById('radioEnglish').checked = false
    } else {
        document.getElementById('radioEnglish').checked = true
        document.getElementById('radioArabic').checked = false
    }

    if (new Date().getTime() >= Number(window.localStorage.reqAvalibleTime)) {
        const saveBtn = document.getElementById('save')
        saveBtn.addEventListener('click', () => {
            saveInfo()
            document.getElementById('mainBody').classList.remove('settings')
        })
        document.querySelector('.settingsSection').classList.remove('notReq')
    } else {
        document.querySelector('form.choices').innerHTML = `
        <div class="choice">
            <div class="choiceTitle">
                <span class="arabic">اللغة :</span>
                <span class="english">Language :</span>
            </div>
            <div class="choiceInputs">
                <div>
                    <div class="label">
                        <label for="radioArabic" class="arabic">عربي</label>
                        <label for="radioArabic" class="english">Arabic</label>
                    </div>
                    <input type="radio" value="arabic" id="radioArabic" onclick="langRadiosHandel(this)">
                </div>
                <div>
                    <div class="label">
                        <label for="radioEnglish" class="arabic">انجليزي</label>
                        <label for="radioEnglish" class="english">English</label>
                    </div>
                    <input type="radio" value="english" id="radioEnglish" onclick="langRadiosHandel(this)">
                </div>
            </div>
        </div>
        <div class="choice">
            <div class="choiceTitle">
                <label for="country" class="arabic">الدولة :</label>
                <label for="country" class="english">Country :</label>
            </div>
            <div class="choiceInputs">
                <select name="country" id="country" disabled>
                    <option value="null">-- Select a country --</option>
                </select>
            </div>
        </div>
        <div class="choice">
            <div class="choiceTitle">
                <label for="city" class="arabic">المدينة :</label>
                <label for="city" class="english">City :</label>
            </div>
            <div class="choiceInputs">
                <select name="city" id="city" disabled>
                    <option value="null">-- Select a city --</option>
                </select>
            </div>
        </div>
        <div class="choice notReq">
            <div class="choiceTitle">
                
            </div>
            <div class="choiceInputs">
                <p class="arabic">يرجى الانتظار لمدة ${Math.floor((Number(window.localStorage.reqAvalibleTime) - new Date().getTime()) / 1000 / 60)} دقائق حتى تتمكن من تغيير الموقع !</p>
                <p class="english">Please wait for ${Math.floor((Number(window.localStorage.reqAvalibleTime) - new Date().getTime()) / 1000 / 60)} minutes befour change the location !</p>
            </div>
        </div>
        `
        document.querySelectorAll('form.choices select').disabled = true
        document.querySelector('.settingsSection').classList.add('notReq')
        if (window.localStorage.lang == 'arabic') {
            document.getElementById('radioArabic').checked = true
            document.getElementById('radioEnglish').checked = false
        } else {
            document.getElementById('radioEnglish').checked = true
            document.getElementById('radioArabic').checked = false
        }
        const saveBtn = document.getElementById('save')
        saveBtn.addEventListener('click', () => {
            document.getElementById('mainBody').classList.remove('settings')
        })
    }
})


// Time Now
let date = new Date()
let timeNow = document.querySelector('.timeNow .time')
let hourNow = 0;
let amPm = '';
if (date.getHours() !== 0) {
    if (date.getHours() > 12) {
        hourNow = date.getHours() - 12;
        amPm = 'pm'
    } else {
        hourNow = date.getHours();
        amPm = 'am'
    }
} else {
    hourNow = 12;
    amPm = 'am'
}
let mintNow = '';
if (date.getMinutes() < 10) {
    mintNow += String(date.getMinutes())
} else {
    mintNow = String(date.getMinutes())
}
timeNow.innerHTML = `
<span class="hours">${String(hourNow < 10 & hourNow > 0 ? `0${hourNow}` : hourNow.toString())}</span>:<span class="mints">${String(mintNow < 10 & mintNow > 0 ? `0${mintNow}` : mintNow.toString())}</span> <span class="amPm">${amPm}</span>
`;

setInterval(function() {
    location.reload();
}, 60000);