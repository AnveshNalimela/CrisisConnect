import Disaster from '../models/DisasterModel';

export const addDisaster = async (formData) => {
    try {
        console.log(formData);
        const newDisaster = new Disaster(formData);
        console.log('newDisaster:', newDisaster);
        await newDisaster.save();
        console.log('Disaster data added successfully:', newDisaster);
    } catch (error) {
        console.error('Error adding disaster data:', error);
    }
};