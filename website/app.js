/**
 *script responsible for setting up the client side
 *and interacting with API and DOM
 *
 * Dependencies: -express
 *               -body-parser
 *               -cors
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 * @author Mohamed El-Khouly <msirag95@gmail.com>
*/


/**
 *Global Variables
 *
*/

/*DOM Variables*/
const generateBtn = document.getElementById('generate'),
      feeling     = document.getElementById('feelings'),
      zip         = document.getElementById('zip');

/*API Variables*/
const baseURL     = 'https://api.openweathermap.org/data/2.5/weather?',
      apiKey      = config;

/*Helper Functions */
/**
* @description Function responsible of user input validation.
* @param {string} zip - The value of the Zip code entered by user
*/
const validInput = (zip) => {
    if (zip.length !== 5) {
      alert("Zip code must be 5 numbers");
      return false
    } else {
      return true
    }
}
/*Main Functions*/
/**
* @description generate button event listener active on click
*              responsible for collecting user inputs calling API data
*              then posting collected data finally modifying the UI through HTML
*/
generateBtn.addEventListener('click', (err)=>{
    if (validInput(zip.value)) {
      getTemperature(baseURL,zip.value,apiKey).then((data)=>{
        let d = new Date();
        let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
        postData('/addTemperature',{date: newDate,temperature:data.main.temp,feeling: feeling.value});
      }).then(()=>{
        updateUI()
      })
    }else{
      zip.value='';
      feeling.value='';
    }
});

/**
* @description asynchronous function responsible for API communication
* @param {string} baseURL - API base URL
* @param {string} zip - zip code value entered by user
* @param {string} apiKey - API Activation key
*/
const getTemperature = async (baseURL, zip, apiKey)=>{
    const apiURL = `${baseURL}zip=${zip},us&units=metric&appid=${apiKey}`;
    console.log(apiURL);
    const res = await fetch(apiURL);
    try {
        const data = await res.json();
        return data
    } catch (error) {
        console.log("error", error);
    }
}

/**
* @description client side http POST request
* @param {string} url - route to post to
* @param {object} data - data to be posted
*/
const postData = async (url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });

      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
        console.log("error", error);
      // appropriately handle the error
      }
}

/**
* @description client side http Get request to require data from server end point and modify UI
*/
const updateUI = async ()=>{
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = `<i class="fas fa-calendar-day"></i> Date: ${allData.date}`;
      document.getElementById('temp').innerHTML = `<i class="fas fa-sun"></i> Temperature: ${allData.temperature.toFixed(0)} &#8451`;
      document.getElementById('content').innerHTML = `<i class="fa fa-smile"></i> Feeling: ${allData.feeling}`;

    }catch(error){
      console.log("error", error);
    }
}
