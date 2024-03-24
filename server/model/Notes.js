const mongoose = require('mongoose');

const AddNoteSchema = new mongoose.Schema({
    note:{
        type:String,
        required:true
    },
    cname:{
        type:String
    },
    date:{
        type:String,
        required:true
    },

},{
    timestamps: true
});

const NotesData = mongoose.model('Notes',AddNoteSchema);

module.exports = NotesData;