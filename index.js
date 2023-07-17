import { catsData } from "./data" // cats data

const emotionRadios = document.getElementById("emotion-radios")
const getImgBtn = document.getElementById("get-image-btn")
const gifOnlyBtn = document.getElementById("gifs-only-option")

emotionRadios.addEventListener("change",highlightedCheckedOption)//listener for changing radios button
getImgBtn.addEventListener("click",renderCat)//listener for submit button

function getMatchingCatsArray(){//with this function we control checked btn and according to this function sumbit button return to user what he/she choosed option
   //returns an array of cat objects that matches the user's criteria
    if(document.querySelector("input[type='radio']:checked")){
        const selectedEmotion = document.querySelector("input[type='radio']:checked").value
        const isGif = gifOnlyBtn.checked //gif only option check
        const matchingCatsArray = catsData.filter((cat) => {
            if (isGif) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            } else {
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingCatsArray

    }
}

function getSingleCatObject(){
// will return a single cat object selected from the array provided by getMatchingCatsArray
    
    const catsArray = getMatchingCatsArray()
    
    if(catsArray.length === 1){

        console.log(catsArray)
    }
}


function renderCat(){
//will use the cat object provided by getSingleCatObject to create HTML string which it will render it to the dom
    getSingleCatObject()
}


function highlightedCheckedOption(e){ //remove all higlighted options with that function
    const radios = document.getElementsByClassName("radio")
    for(let radio of radios){//rerender radio list for remove highlighted classes
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")//add highlight class

}


function getEmotionsArray(cats){ // we returned cats emotion array using that function
    const emotionsArray = []
    for (let cat of cats){//we loop over all cats data for searching cats emotion
        for (let emotion of cat.emotionTags){
            if(!emotionsArray.includes(emotion)){//we delete duplicate emotion data
                    emotionsArray.push(emotion)
                }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){ // according to our cats emotion array we create radio buttons using that function
    let emotionRadioItems = ""
    const emotions = getEmotionsArray(catsData)
    for (let emotion of emotions){
        emotionRadioItems += `
        <div class="radio">
            <label for=${emotion}>${emotion}</label>
                                <input
                                    type="radio"                    
                                    id=${emotion}
                                    value=${emotion}
                                    name="emotions"
                                    
                                    >
        </div>
        `
    }
    emotionRadios.innerHTML = emotionRadioItems
}



renderEmotionsRadios(catsData)