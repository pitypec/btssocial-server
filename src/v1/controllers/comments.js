import Comment from '../models/comments.js';



export const getAllComments = (req, res, next) => {
     const posts = await Comment.find({});
     return res.json(200).json(posts)

}


export const createComment = async (req, res, next) => {
    const data = req.body;

    const newComment = new Comment(data)
    const post = await newComment.save()
    if(post){
        return res.status(201).json({msg: 'post created sucessfully'})
    }else{
        return res.status(400).json({msg: 'please try again'})
    }
}

export const getComment = async (req, res, next) => {
    const {commentId} = req.params;

    const comment = await Comment.findById(commentId);

    return res.status(201).json({
        confirmation: 'success',
        comment
    })
}
export const deleteComment = async (req, res, next) => {
    const {commentId} = req.params;

    await Comment.findByIdAndDelete(commentId);

    return res.status(204).json({
        confirmation: 'success',
        msg: 'deleted successfully'
    })
}

export const likeComment = (req, res, next) =>{
    const {commentId} = req.params;

}
