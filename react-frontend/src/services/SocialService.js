import axios from 'axios'

const SOCIAL_BASE_REST_API_URL = 'http://localhost:8080/api/v1/socials'

class SocialService{
    
    getAllSocials(){
        return axios.get(SOCIAL_BASE_REST_API_URL)
    }

    createSocial(social){
        return axios.post(SOCIAL_BASE_REST_API_URL, social)
    }

    loginAndReturnSocial(social){
        return axios.post(SOCIAL_BASE_REST_API_URL + '/login', social)
    }

    getSocialById(socialId){
        return axios.get(SOCIAL_BASE_REST_API_URL + '/' + socialId);
    }

    getSocialByEmailId(socialEmail){
        return axios.get(SOCIAL_BASE_REST_API_URL + '/email/' + socialEmail);
    }

    updateSocial(socialId, social){
        return axios.put(SOCIAL_BASE_REST_API_URL + '/' + socialId, social);
    }

    deleteSocial(socialId){
        return axios.delete(SOCIAL_BASE_REST_API_URL + '/' + socialId);
    }
}

export default new SocialService();