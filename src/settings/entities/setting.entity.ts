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
@Entity('setting', {orderBy: { CreateAt: 'DESC' } })
export class SettingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Title: string;
  @Column({ type: 'text', collation: 'utf8_general_ci' })
  Mota: string;
  @Column({ default: '' })
  Slug: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Image: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('{}')" })
  Field: string;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  Setting: string;
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
    if (!this.Title || this.Title.trim() === '') {
      this.Title = 'Noname';
    }
  }
}