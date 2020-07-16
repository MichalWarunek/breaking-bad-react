import axios from 'axios';

export const loadCharactersData = (callback) => async () => {
    const config = {
        url: '/characters'
    };
    const result = await axios.request(config);
    callback(result);
};
