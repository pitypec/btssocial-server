import mongoose from 'mongoose';
const schema = mongoose.Schema;

const postSchema = new schema(
  {
    message: {
      type: String
    },
    picture: {
      type: String
    },
    likeCount: {
      type: Number
    },
    comments: [
      {
        type: schema.Types.ObjectId,
        ref: 'comment'
      }
    ],
    dateCreated: {
      type: Date,
      default: new Date()
    }
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model('post', postSchema);

export default Post;
