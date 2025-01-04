import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BeforeInsert,
    BeforeUpdate,
    getRepository
  } from 'typeorm';
@Entity('todos', {orderBy: { CreateAt: 'DESC' } })
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  pid: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  idDM: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  idUser: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Title: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Mota: string;
  @Column({ default: '' })
  Slug: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  attachments: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  Content: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Image: string;
  @Column({ default: '' })
  Type: string;
  @Column({ default: 1 })
  Ordering: number;
  @Column({ default: false })
  isDelete: boolean;
  @Column({ default: 0 })
  Priority: number;
  @Column({ default: 0 })
  Status: number;
  @CreateDateColumn()
  CreateAt: Date;
  @UpdateDateColumn()
  UpdateAt: Date;
  @DeleteDateColumn()
  DeleteAt: Date;
  @Column({ nullable: true })
  idCreate: string;
  @BeforeInsert()
  @BeforeUpdate()
  checkTitle() {
    if (!this.Title || this.Title.trim() === '') {
      this.Title = 'Noname';
    }
  }
  @BeforeInsert()
  async setOrdering() {
    const repo = getRepository(TodoEntity);
    const maxOrdering = await repo
      .createQueryBuilder("todo")
      .select("MAX(todo.Ordering)", "max")
      .getRawOne();
    this.Ordering = (maxOrdering.max || 0) + 1;
  }
}