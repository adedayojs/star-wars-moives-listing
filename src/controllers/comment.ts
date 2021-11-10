import { Comment } from '../models/comment';
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
   * Display Comments by movie Id
   */
  getByMovieId(movieId: number, options?: any) {
    return Comment.find({ where: { movieId }, order: { created_at: 'DESC' }, ...options });
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
