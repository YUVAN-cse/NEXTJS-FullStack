import mongoose from "mongoose";

interface SchemaTypes {
    name: string;
    email: string;
    image?: string;
    password: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new mongoose.Schema<SchemaTypes>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
});

// export const User = mongoose.model("User", UserSchema);
//when ever u change the code in model file, it will create a new collection


export const User = mongoose.models?.User || mongoose.model("User", UserSchema);
