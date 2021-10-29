import './sass/main.scss';
import countryTpl from "./templates/fetchCountries.hbs";
import countryListTpl from "./templates/fetchCountriesList.hbs";
import fetchCountries from './fetchCountries';
import * as _ from "lodash";
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';


const refs = {
    cardContainer: document.querySelector('.js-card-container'),
    inputName: document.querySelector('#country'),
}

refs.inputName.addEventListener('input', _.debounce(onInput, 500));

function onInput(e) {
    e.preventDefault();
    fetchCountries(e).then(country => {
        console.log(country)
        refs.cardContainer.innerHTML = '';
        if (country.length === 1) {
            const markup = countryTpl(country);
            refs.cardContainer.innerHTML = markup;
        } else if (country.length > 1 && country.length < 11) {
            refs.cardContainer.insertAdjacentHTML("beforeend", countryListTpl(country));
        } else {
            function inputError() {
            error({
                title: false,
                text: 'Too many matches found. Please enter a more specific query',
                shadow: true,
                delay: 2000,
            })
            }
            inputError();
        }

    })
    
}
// fetch('https://restcountries.com/v2/name/uk')
//     .then(response => {
//         return response.json();
//     })
//     .then(country => {
//         // console.log(country);
//         if (country.length === 1) {
//             const markup = countryTpl(country);
//             refs.cardContainer.innerHTML = markup;
//         } else if (country.length > 1 && country.length < 11) {
//             refs.cardContainer.insertAdjacentHTML("beforeend", countryListTpl(country));
//         }
//     })
//     .catch(error => {
//         console.log(error);
//     })

