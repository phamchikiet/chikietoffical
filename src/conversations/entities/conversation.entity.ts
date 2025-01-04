import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BeforeInsert,
    BeforeUpdate,
  } from 'typeorm';
@Entity('conversations', {orderBy: { CreateAt: 'DESC' } })
export class ConversationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  idConversation: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  idSender: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  idReceiver: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  message: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  timestamp: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  attachment: string;
  @Column({ default: '' })
  Type: string;
  @Column({ default: 1 })
  Ordering: number;
  @Column({ default: 0 })
  Status: number;
  @Column({ default: false })
  isDelete: boolean;
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
    if (!this.message || this.message.trim() === '') {
      this.message = 'No Message';
    }
  }
}