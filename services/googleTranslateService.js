import axios from 'axios';
const url = "https://translate.googleapis.com/translate_a/single?client=gtx&"

class GoogleTranslateService {
    getTranslation(note, sourceLanguage = 'fr', translatedLanguage = 'en') {
        return axios.get(`${url}&sl=${sourceLanguage}&tl=${translatedLanguage}&dt=t&q=${note}`);
    }
}

export default WeatherService;