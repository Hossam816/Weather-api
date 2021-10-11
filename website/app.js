
/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '3969d4e8b98e1f5d26504f648b504aa6&units=imperial'
let zipCodeInput = document.getElementById('zip')
let feelingInput = document.getElementById('feelings')
let tooltip = document.querySelector('.warn')

// Create a new date instance dynamically with JS
let d = new Date();

//check if the input is empty or not a number



//add event to the btn

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const newZipCode = zipCodeInput.value;
    const feelings = feelingInput.value;
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

    if (newZipCode == '' ) {
        tooltip.style.display = 'block'
        tooltip.innerHTML = `Error: Input Shouldn't Be Empty`
        
    }else if(newZipCode < 0){
        tooltip.style.display = 'block'
        tooltip.innerHTML = `Error: ZipCode Should Be More Than ZERO`
    }else{
        tooltip.style.display = 'none'
    }
    

    

    getWeather (baseUrl, newZipCode, apiKey)
    .then(function(data){
        //print the data
        console.log(data)
        //adding data to post
        postData('/add', {date:d, temp:data.main.temp+'°C', content:feelings})
        .then(
            updateUI()
        );
    })

};

//function to get web api data

const getWeather = async (baseUrl, ZipCode, key)=>{
    const response = await fetch(baseUrl+ZipCode+',us'+'&appid='+key)
    try{
        const data = await response.json();
        console.log(data);
        
        return data;
    }catch (error){
        console.log('error', error)
    }
}

//function to post the data

const postData = async(url = '', data = {})=>{
    console.log(data)
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try{
        const newData = await response.json()
        console.log(newData)
        return newData
    }catch (error){
        console.log('error', error)
    }
}

//function to get all the data

//updateUI

const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('date').innerHTML = `date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `temp: ${allData.temp}`;
        document.getElementById('content').innerHTML = `content: ${allData.content}`;
        console.log(document.getElementById('content'))
    }catch(error){
        console.log('error', error)
    }

}


