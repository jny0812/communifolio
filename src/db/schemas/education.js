import { Schema, model } from 'mongoose';

const EducationSchema = new Schema(
    {
        educationId: {
            type: String,
            required: true,
        },
        userId:{
            type:String,
            required:false,
        },
        schoolName:{
            type:String,
            required:true,
        },
        major:{
            type:String,
            required:true,
        },
        graduationTypeCode:{
            type:String,
            required:true,
        },
    },
    {
        timestamps: true,
    }
);

const EducationModel = model('Education', EducationSchema);

export { EducationModel };