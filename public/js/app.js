const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');

weatherForm.addEventListener('submit', (e) =>
{
    e.preventDefault();
    const location = search.value;
    console.log(location);

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
                messageOne.textContent = 'Location: ' + data.location;
                messageTwo.textContent = 'Current conditions: ' + data.weather;
                messageThree.textContent = 'Temperature: ' + data.temperature + ' degrees';
                messageFour.textContent = 'Perceived temperature: ' + data.feelslike + ' degrees';
            }
        });
    });
});