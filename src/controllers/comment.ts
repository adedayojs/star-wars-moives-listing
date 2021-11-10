import { Comment } from '@models/comment';
const CommentController = {
  /**
   *
   * Display All Comments
   */
  show() {
    return Comment.find();
  },

  /**
   *
   * Create a new Comment
   */
  create(data: any): Promise<Comment> {
    const comment = new Comment() as any;
    for (let key in data) {
      comment[key] = data[key];
    }
    return comment.save();
  },
};
export default CommentController;
