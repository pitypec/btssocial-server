import mongoose from 'mongoose';
const schema = mongoose.Schema;

const replySchema = new schema(
  {
    message: {
      type: String,
      required: true
    },
    likeCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);
const commentSchema = new schema({
  postId: [
    {
      type: schema.Types.ObjectId,
      ref: 'post'
    }
  ],
  message: {
    type: String,
    required: true,
    trim: true
  },
  likeCount: {
    type: Number,
    default: 0
  },
  reply: [replySchema]
});

const Comment = mongoose.model('comment', commentSchema);

export default Comment;
