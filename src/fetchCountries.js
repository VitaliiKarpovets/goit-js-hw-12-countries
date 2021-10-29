
export default function fetchCountries(e) {
    const partOfName = e.target.value;
    const url = `https://restcountries.com/v2/name/${partOfName}`;
    return fetch(url)
        .then(response => response.json())
        .then(country => country)
}