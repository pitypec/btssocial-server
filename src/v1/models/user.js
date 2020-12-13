import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const schema = mongoose.Schema;

const profileSchema = new schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  middleName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  profilePicture: {
    type: String
  },
  location: {
    type: String,
    trim: true
  }
});

const userSchema = new schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    profile: profileSchema
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    // turn plain password to hashed password
    const passwordHash = await bcrypt.hash(this.password, salt);
    // reassigned plain password to hashed password
    this.password = passwordHash;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};
const User = mongoose.model('user', userSchema);

export default User;
