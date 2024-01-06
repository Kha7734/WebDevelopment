import mongoose from 'mongoose';

const billboardSchema = new mongoose.Schema({


    boardLocation:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'board_locations', 
        required: true
    },
    imgBoard: {
        type: String,
        require: true,
    },
    size: {
        type: String,
        require: true,
    },
    boardType: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'billboard_types', 
        required: true
    },
    expireDate: {
    // date with iso8601 format
        type: Date,
        require: true,
        default: Date.now,
    }
});


const billboardModel = mongoose.model("boards", billboardSchema);  
export default billboardModel;