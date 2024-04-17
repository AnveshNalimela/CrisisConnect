// add.js
const Disaster = require('./DisasterModel');

const addDisaster = async (formData) => {
    try {
        const newDisaster = new Disaster(formData);
        await newDisaster.save();
        console.log('Disaster data added successfully:', newDisaster);
    } catch (error) {
        console.error('Error adding disaster data:', error);
    }
};

module.exports = { addDisaster };