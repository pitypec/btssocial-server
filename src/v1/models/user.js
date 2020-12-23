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
    method: {
      type: String,
      enum: ['local', 'google', 'facebook'],
      required: true
    },
    local: {
      email: {
        type: String,
        lowercase: true
      },
      password: {
        type: String
      }
    },
    google: {
      id: {
        type: String
      },
      email: {
        type: String,
        lowercase: true
      }
    },
    facebook: {
      id: {
        type: String
      },
      email: {
        type: String,
        lowercase: true
      }
    },

    profile: profileSchema
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  try {
    if (this.method !== 'local') {
      next();
    }

    const salt = await bcrypt.genSalt(10);
    // turn plain password to hashed password
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    // reassigned plain password to hashed password
    this.local.password = passwordHash;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};
const User = mongoose.model('user', userSchema);

export default User;
