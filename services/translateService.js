import axios from 'axios';
const url = 'https://translate.googleapis.com/translate_a/single?client=gtx'

class TranslateService {

    getTranslation(text, sl = 'fr', tl = 'en') {
        return axios.get(`${url}&sl=${sl}&tl=${tl}&dt=t&q=${text}`);
    }
}

export default TranslateService;