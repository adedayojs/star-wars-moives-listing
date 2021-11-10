import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movieId: number;

  @Column('varchar', { length: 500 })
  comment: string;

  @Column('varchar')
  commenterIpAddress: string;

  // @CreateDateColumn()
  @Column({ type: 'timestamp', default: () => `CURRENT_TIMESTAMP` })
  created_at: Date;
}

export interface IComment {
  id: number;
  movieId: number;
  comment: string;
  created_at: Date;
  commenterIpAddress: string;
}
