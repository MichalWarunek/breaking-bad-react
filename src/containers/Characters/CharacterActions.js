import axios from 'axios';



export const loadCharacter = (id, callback) => async () => {
    const config = {
        url: `/characters/${id}`
    };
    const result = await axios.request(config);
    callback(result.data);
};

export const deleteCharacter = (id, callback) => async () => {
    const config = {
        url: `/characters/${id}`,
        method: 'DELETE'
    };
    await axios.request(config);
    callback();
};

export const saveCharacter = (character, callback) => async () => {
    const config = {
        url: `/characters/${character.id ? character.id : ''}`,
        method: character.id ? 'PUT' : 'POST',
        data: {character},
    };
    const result = await axios.request(config);
    callback(result.data);
};

export const uploadImage = (file, character, message, callback) => async () => {
    let formData = new FormData();
    formData.append('image', file[0]);
    let config = {
        url: `/characters/${character.id}/attach_image`,
        data: formData,
        method: 'PUT',
        message
    };
    const response = await axios.request(config);
    callback(response.data);
};