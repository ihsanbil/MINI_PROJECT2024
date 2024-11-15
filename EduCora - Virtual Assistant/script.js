let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

let voices = []; 


function populateVoices() {
    voices = window.speechSynthesis.getVoices();
}


window.speechSynthesis.onvoiceschanged = populateVoices;

function speak(text, language = "en-GB") { 
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;

  
    let selectedVoice = voices.find(voice => voice.lang === language);
    if (selectedVoice) {
        text_speak.voice = selectedVoice;
    }
    
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir", "en-GB"); 
    } 
    else if (hours >= 12 && hours < 16) { 
        speak("Good Afternoon Sir", "en-US"); 
    } 
    else {
        speak("Good Evening Sir", "id-ID"); 
    }
}



let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript; 
    content.innerText = transcript;
    takeCommand(transcript);
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

recognition.onend = () => { 
    btn.style.display = "flex";
    voice.style.display = "none";
};

function takeCommand(message) {
    message = message.toLowerCase();
    if (message.includes("halo") || message.includes("hey") || message.includes("hello") || message.includes("hallo")) {
        speak("Hallo sobat EduCora, ada yang bisa dibantu?", "id-ID"); 
    } 
    else if (message.includes("siapa kamu")) {
        speak("Aku adalah sebuah virtual assistant, yang dibuat oleh Bilhaq tv official. Jangan lupa subrek!", "id-ID"); 
    } 
   
    else if (message.includes("open youtube")) {
        speak("Opening YouTube...", "en-GB");
        window.open("https://www.youtube.com/", "_blank");
    }
    else if (message.includes("open facebook")) {
        speak("Opening Facebook...", "en-US");
        window.open("https://www.facebook.com/", "_blank");
    }
    else if (message.includes("open twitter")) {
        speak("Opening Twitter...", "en-US");
        window.open("https://www.twitter.com/", "_blank");
    }
    else if (message.includes("open instagram")) {
        speak("Opening Instagram...", "en-US");
        window.open("https://www.instagram.com/", "_blank");
    }
    else if (message.includes("open linkedin")) {
        speak("Opening LinkedIn...", "en-GB");
        window.open("https://www.linkedin.com/", "_blank");
    }
    else if (message.includes("open tiktok")) {
        speak("Opening TikTok...", "en-US");
        window.open("https://www.tiktok.com/", "_blank");
    }
    
   
    else if (message.includes("open amazon")) {
        speak("Opening Amazon...", "en-US");
        window.open("https://www.amazon.com/", "_blank");
    }
    else if (message.includes("open ebay")) {
        speak("Opening eBay...", "en-US");
        window.open("https://www.ebay.com/", "_blank");
    }
    else if (message.includes("open tokopedia")) {
        speak("Opening Tokopedia...", "id-ID");
        window.open("https://www.tokopedia.com/", "_blank");
    }
    else if (message.includes("open shopee")) {
        speak("Opening Shopee...", "id-ID");
        window.open("https://www.shopee.co.id/", "_blank");
    }
    else if (message.includes("open aliexpress")) {
        speak("Opening AliExpress...", "en-US");
        window.open("https://www.aliexpress.com/", "_blank");
    }

  
    else if (message.includes("open cnn")) {
        speak("Opening CNN...", "en-US");
        window.open("https://www.cnn.com/", "_blank");
    }
    else if (message.includes("open bbc")) {
        speak("Opening BBC...", "en-GB");
        window.open("https://www.bbc.com/", "_blank");
    }
    else if (message.includes("open reuters")) {
        speak("Opening Reuters...", "en-US");
        window.open("https://www.reuters.com/", "_blank");
    }
    else if (message.includes("open the guardian")) {
        speak("Opening The Guardian...", "en-GB");
        window.open("https://www.theguardian.com/", "_blank");
    }
    else if (message.includes("open kompas")) {
        speak("Opening Kompas...", "id-ID");
        window.open("https://www.kompas.com/", "_blank");
    }
    else if (message.includes("open detik")) {
        speak("Opening Detik...", "id-ID");
        window.open("https://www.detik.com/", "_blank");
    }

   
    else if (message.includes("open github")) {
        speak("Opening GitHub...", "en-GB");
        window.open("https://github.com/", "_blank");
    }
    else if (message.includes("open stackoverflow")) {
        speak("Opening Stack Overflow...", "en-US");
        window.open("https://stackoverflow.com/", "_blank");
    }
    else if (message.includes("open medium")) {
        speak("Opening Medium...", "en-GB");
        window.open("https://medium.com/", "_blank");
    }
    else if (message.includes("open techcrunch")) {
        speak("Opening TechCrunch...", "en-US");
        window.open("https://techcrunch.com/", "_blank");
    }
    else if (message.includes("open the verge")) {
        speak("Opening The Verge...", "en-US");
        window.open("https://www.theverge.com/", "_blank");
    }

    
    else if (message.includes("open coursera")) {
        speak("Opening Coursera...", "en-US");
        window.open("https://www.coursera.org/", "_blank");
    }
    else if (message.includes("open udemy")) {
        speak("Opening Udemy...", "en-US");
        window.open("https://www.udemy.com/", "_blank");
    }
    else if (message.includes("open khan academy")) {
        speak("Opening Khan Academy...", "en-GB");
        window.open("https://www.khanacademy.org/", "_blank");
    }
    else if (message.includes("open edx")) {
        speak("Opening edX...", "en-US");
        window.open("https://www.edx.org/", "_blank");
    }
    else if (message.includes("open futurelearn")) {
        speak("Opening FutureLearn...", "en-GB");
        window.open("https://www.futurelearn.com/", "_blank");
    }

    
    else if (message.includes("open netflix")) {
        speak("Opening Netflix...", "en-GB");
        window.open("https://www.netflix.com/", "_blank");
    }
    else if (message.includes("open spotify")) {
        speak("Opening Spotify...", "en-GB");
        window.open("https://www.spotify.com/", "_blank");
    }
    else if (message.includes("open reddit")) {
        speak("Opening Reddit...", "en-US");
        window.open("https://www.reddit.com/", "_blank");
    }
    else if (message.includes("open hulu")) {
        speak("Opening Hulu...", "en-US");
        window.open("https://www.hulu.com/", "_blank");
    }
    else if (message.includes("open disney plus")) {
        speak("Opening Disney+...", "en-GB");
        window.open("https://www.disneyplus.com/", "_blank");
    }

    else if (message.includes("open whatsapp web")|| message.includes("open whatsappweb")) {
        speak("Opening Whatsapp web", "id-ID");
        window.open("https://web.whatsapp.com/", "_blank");
    }
    
    else if (message.includes("open educourse") || message.includes("open edu course") || message.includes("open educause")) {
        speak("Opening educourse...", "en-GB"); 
        window.open("https://educourse.id/", "_blank");
    }
    else if (message.includes("open school educourse") || message.includes("open school edu course") || message.includes("open school edu chord") || message.includes("open school educors")) {
        speak("Opening school educourse...", "id-ID"); 
        window.open("https://school.educourse.id/", "_blank");
    }
    else if (message.includes("play music on youtube") || message.includes("play musik on youtube")) {
        let songTitle = message.replace("play music on youtube", "").replace("play musik on youtube", "").trim(); 
        if (songTitle) {
            speak(`Playing ${songTitle} on YouTube...`, "id-ID"); 
            window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(songTitle)}+official+audio`, "_blank"); 
        } else {
            speak("Tolong sebutkan judul lagunya", "id-ID");
        }
    }
    
    else {
        speak(`Ini yang saya temukan di internet untuk ${message}`, "id-ID"); 
        window.open(`https://www.google.com/search?q=${message}`); 
    }
}
