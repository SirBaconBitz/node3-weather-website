const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');
const weatherIcon = document.querySelector('#weather-icon');

let defaultAddress = localStorage.getItem('address');

if(defaultAddress !== null)
{
    fetch('/weather?address=' + defaultAddress).then((response) =>
    {
        response.json().then((data) =>
        {
            if(!data.error)
            {
                weatherIcon.src = data.image;
                messageOne.textContent = 'Location: ' + data.location;
                messageTwo.textContent = 'Current conditions: ' + data.weather;
                messageThree.textContent = 'Temperature: ' + data.temperature + ' degrees';
                messageFour.textContent = 'Perceived temperature: ' + data.feelslike + ' degrees';
            }
        });
    });
}

weatherForm.addEventListener('submit', (e) =>
{
    e.preventDefault();
    const location = search.value;
    console.log(location);

    weatherIcon.src = '';
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    messageThree.textContent = '';
    messageFour.textContent = '';

    fetch('/weather?address=' + location).then((response) =>
    {
        response.json().then((data) =>
        {
            if(data.error)
            {
                messageOne.textContent = data.error;
            }
            else
            {
                weatherIcon.src = data.image;
                messageOne.textContent = 'Location: ' + data.location;
                messageTwo.textContent = 'Current conditions: ' + data.weather;
                messageThree.textContent = 'Temperature: ' + data.temperature + ' degrees';
                messageFour.textContent = 'Perceived temperature: ' + data.feelslike + ' degrees';
                localStorage.setItem('address', location);
            }
        });
    });
});