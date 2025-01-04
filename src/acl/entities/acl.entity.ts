import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinTable,
    ManyToMany,
  } from 'typeorm';
  @Entity('acl', {orderBy: { CreateAt: 'DESC' } })
  export class AclEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Title: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    Slug: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    resourceType: string;
    @Column()
    resourceId: string;
    @Column({ type: 'text', collation: 'utf8_general_ci' })
    subjectType: string;
    @Column()
    subjectId: string;
    @Column({ type: 'set', enum: ['read', 'write', 'delete'] })
    permissions: ('read' | 'write' | 'delete')[];    
    @Column({ default: '' })
    Type: string;
    @Column({ default: 1 })
    Ordering: number;
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
  }