const countries = document.querySelector('.countries');
const regionSelect = document.querySelector('.region-box');
const africaSelect = document.querySelector('#Africa');
const americasSelect = document.querySelector('#Americas');
const asiaSelect = document.querySelector('#Asia');
const europeSelect = document.querySelector('#Europe');
const oceaniaSelect = document.querySelector('#Oceania');
const allSelect = document.querySelector('#All');
const filterSelect = document.querySelector('.filter-box');
const dropDown = document.querySelector('.filter-box img');
const searchCountries = document.querySelector('#search');
const changeMode = document.querySelector('#mode');
const brightMode = document.querySelector('#mode-b');
const body = document.querySelector('.body');
const frame = document.querySelector('.frame-container');
const text = document.getElementsByTagName('h3');
const div = document.getElementsByTagName('div');
const paratext = document.getElementsByTagName('p');
const spantext = document.getElementsByTagName('span');

let fullFilterData = []

const getCountry = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital');
    const data = await response.json()
    
    const filterData = data.filter(arrival => 
        arrival.name.common === "Germany" ||
        arrival.name.official === "United States of America" ||
        arrival.name.common === "Brazil" ||
        arrival.name.common === "Iceland" ||
        arrival.name.common === "Afghanistan" ||
        arrival.name.official === "Åland Islands" ||
        arrival.name.common === "Albania" ||
        arrival.name.common === "Algeria"
    );
    
    const newFilterData = [filterData[2], filterData[5], filterData[7], filterData[3], filterData[0], filterData[4], filterData[6], filterData[1], data[5], data[15], data[40], data[138], data[200], data[20], data[69]];
    
    const finalFilterData = data.filter(i => !newFilterData.includes(i));

    fullFilterData = newFilterData.concat(finalFilterData)

    filterCountries(fullFilterData)

    return fullFilterData
};

getCountry()
.then(myData => {console.log(myData)})
.catch(error => console.log('An error occurred', error));

const filterCountries = (countryList) => {
    countries.innerHTML = ''    

    countryList.forEach((i) => {
        let countryFlag = i.flags.png;

        if (i.name.common === "Afghanistan") {
            countryFlag = 'https://flagcdn.com/w320/af.png'
        };

        let countryPop = i.population;
    
        const addToPop = addComma(countryPop);
        
        const country = `
        <div style="border-box; background-color: white; border-radius: 5px; box-shadow: 2px 2px 2px 2px whitesmoke; height: 345px; width: 260px;">
            <img style="height: 150px; width: 260px; border-top-right-radius: 5px; border-top-left-radius: 5px;" src = ${countryFlag} alt="${i.name.common} flag">
            <div style="box-sizing: border-box; margin: 25px;">
                <h3 style="font-size: 20px; font-family: Nunito Sans; font-weight: 800; margin-bottom: 20px;">${i.name.common}</h3>
                <p style="font-size: 16px; font-family: Nunito Sans; font-weight: 600;">Population: <span style="font-weight: 400;">${addToPop}</span></p>
                <p style="font-size: 16px; font-family: Nunito Sans; font-weight: 600;">Region: <span style="font-weight: 400;">${i.region}</span></p>
                <p style="font-size: 16px; font-family: Nunito Sans; font-weight: 600;">Capital: <span style="font-weight: 400;">${i['capital'][0]}</span></p>
            </div>
        </div>`;

        countries.innerHTML += country; 
    });

};

const addComma = (num) => {
    let k = num.toString()
    let popResult = ''
    let popCounter = 0

    for (let j = k.length - 1; j >= 0; j--) {
        popResult = k[j] + popResult;
        popCounter++;

        if (popCounter % 3 === 0 && j !== 0) {
            popResult = ',' + popResult
        }
    }

    return popResult;
};

dropDown.addEventListener('click', () => {
    regionSelect.style.display = 'flex';
});

africaSelect.addEventListener('click', () => {
    const filterAfrica = fullFilterData.filter(i => i.region === 'Africa');

    filterCountries(filterAfrica)

    regionSelect.style.display = 'none';

    return
});

americasSelect.addEventListener('click', () => {
    const filterAmericas = fullFilterData.filter(i => i.region === 'Americas');

    filterCountries(filterAmericas)

    regionSelect.style.display = 'none';

    return
});

asiaSelect.addEventListener('click', () => {
    const filterAsia = fullFilterData.filter(i => i.region === 'Asia');

    filterCountries(filterAsia)

    regionSelect.style.display = 'none';

    return
});

europeSelect.addEventListener('click', () => {
    const filterEurope = fullFilterData.filter(i => i.region === 'Europe');

    filterCountries(filterEurope)

    regionSelect.style.display = 'none';

    return
});

oceaniaSelect.addEventListener('click', () => {
    const filterOceania = fullFilterData.filter(i => i.region === 'Oceania');

    filterCountries(filterOceania)

    regionSelect.style.display = 'none';

    return
});

allSelect.addEventListener('click', () => {
    filterCountries(fullFilterData)

    regionSelect.style.display = 'none';

    return
});

searchCountries.addEventListener('input', () => {
    const searchValue = searchCountries.value;
    
    const findCountries = fullFilterData.filter(i => i.name.common === searchValue || i.name.common.toLowerCase() === searchValue );

    if (findCountries.length > 0) {
        filterCountries(findCountries)
    } else if (searchValue === ''){
        filterCountries(fullFilterData)
    } else {
        countries.style.marginTop = '50px'
        countries.innerHTML = '<p style="margin: auto;font-size: 32px; font-family: Nunito Sans; font-weight: 600;">Country Unavaliable...</p>';
    };

});

const darkMode = changeMode.addEventListener('click', () => {
    body.style.backgroundColor = 'hsl(207, 26%, 17%)';

    frame.style.backgroundColor = 'hsl(209, 23%, 22%)';
    frame.style.border = '1px solid hsl(209, 23%, 22%)';
    frame.style.boxShadow = 'none';

    changeMode.style.display = 'none'
    brightMode.style.display = 'block'

    dropDown.src = './assets/dropdown-arrow-svgrepo-com (1).png'
    
    text[1].innerHTML = '<h3 style="font-size: 18px; font-family: Nunito Sans; font-weight: 300;">Bright Mode</h3>'

    for (let i = 0; i < text.length; i++) {
    text[i].style.color = 'hsl(0, 0%, 100%)'; 
    };

    for (let i = 10; i < div.length; i++) {
        div[i].style.backgroundColor = 'hsl(209, 23%, 22%)';
        div[i].style.boxShadow = 'none';
    };
   
    for (let i = 0; i < paratext.length; i++) {
        paratext[i].style.color = 'hsl(0, 0%, 100%)';
        paratext[i].style.fontWeight = '400'
    };

    for (let i = 0; i < spantext.length; i++) {
        spantext[i].style.fontWeight = '100';  
    };

    searchCountries.style.backgroundColor = 'hsl(209, 23%, 22%)';
    searchCountries.style.border = '1px solid hsl(209, 23%, 22%)';
    searchCountries.style.color = 'white';
    searchCountries.style.boxShadow = 'none';

    const searchPlaceholder = document.createElement('style');
    searchPlaceholder.innerHTML = '#search::placeholder {color: white}';
    
    document.head.appendChild(searchPlaceholder);

    regionSelect.style.backgroundColor = 'hsl(209, 23%, 22%)';
    regionSelect.style.border = '1px solid hsl(209, 23%, 22%)';
    regionSelect.style.color = 'hsl(0, 0%, 100%)';
    regionSelect.style.boxShadow = 'none';

    filterSelect.style.backgroundColor = 'hsl(209, 23%, 22%)';
    filterSelect.style.border = '1px solid hsl(209, 23%, 22%)';
    filterSelect.style.color = 'hsl(0, 0%, 100%)';
    filterSelect.style.boxShadow = 'none';
});

brightMode.addEventListener('click', () => {
    body.style.backgroundColor = 'hsl(0, 0%, 98%)';

    frame.style.backgroundColor = 'white';
    frame.style.border = '1px solid whitesmoke';
    frame.style.boxShadow = '2px 2px 2px 2px whitesmoke';

    changeMode.style.display = 'block'
    brightMode.style.display = 'none'
    
    text[1].innerHTML = '<h3 style="font-size: 20px; font-family: Nunito Sans; font-weight: 600;">Dark Mode</h3>'

    dropDown.src = './assets/dropdown-arrow-svgrepo-com.png'

    for (let i = 0; i < text.length; i++) {
        text[i].style.color = 'hsl(200, 15%, 8%)';
    };

    for (let i = 10; i < div.length; i++) {
        div[i].style.backgroundColor = 'white';
    };

    for (let i = 0; i < paratext.length; i++) {
        paratext[i].style.color = 'hsl(200, 15%, 8%)';
        paratext[i].style.fontWeight = '600'
    };

    for (let i = 0; i < spantext.length; i++) {
        spantext[i].style.fontWeight = '400';
    };

    searchCountries.style.backgroundColor = 'white';
    searchCountries.style.color = 'hsl(0, 0%, 52%)';
    searchCountries.style.border = 'none';
    searchCountries.style.boxShadow = '2px 2px 2px 2px whitesmoke';

    const searchPlaceholder = document.createElement('style');
    searchPlaceholder.innerHTML = '#search::placeholder {color: hsl(0, 0%, 52%)}';

    document.head.appendChild(searchPlaceholder);

    regionSelect.style.backgroundColor = 'white';
    regionSelect.style.border = 'none';
    regionSelect.style.color = 'hsl(200, 15%, 8%)';
    regionSelect.style.boxShadow = '2px 2px 2px 2px whitesmoke';

    filterSelect.style.backgroundColor = 'white';
    filterSelect.style.border = 'none';
    filterSelect.style.color = 'hsl(200, 15%, 8%)';
    filterSelect.style.boxShadow = '2px 2px 2px 2px whitesmoke';
});



