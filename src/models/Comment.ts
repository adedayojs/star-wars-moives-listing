import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn } from 'typeorm';

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

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}

export interface IComment {
  id: number;
  movieId: number;
  comment: string;
  created_at: Date;
  commenterIpAddress: string;
}
