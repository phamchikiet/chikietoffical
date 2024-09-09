import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity('hoadonchitiet', {orderBy: { CreateAt: 'DESC' } })
export class HoadonchitietEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'text', collation: 'utf8_general_ci',nullable:true })
  nbmst: string;
  @Column({ type: 'text', collation: 'utf8_general_ci',nullable:true })
  khmshdon: string;
  @Column({ type: 'text', collation: 'utf8_general_ci',nullable:true })
  khhdon: string;
  @Column({ type: 'text', collation: 'utf8_general_ci',nullable:true })
  shdon: string;
  @Column({ type: 'text', collation: 'utf8_general_ci',nullable:true })
  nbten: string;
  @Column({ type: 'text', collation: 'utf8_general_ci',nullable:true })
  nbdchi: string;
  @Column({ type: 'text', collation: 'utf8_general_ci',nullable:true })
  nmtnmua: string;
  @Column({ type: 'text', collation: 'utf8_general_ci',nullable:true })
  nmdchi: string;
  @Column()
  tdlap: Date;
  @Column({ type: 'bigint'})
  tgtcthue: Number;
  @Column({ type: 'bigint'})
  tgtthue: Number;
  @Column({ type: 'bigint'})
  tgtttbso: Number;
  @Column({collation: "utf8_general_ci",type:"simple-json",default: () => "('[]')" })
  hdhhdvu: string;
  @Column({ default: '' })
  thlap: string;
  @Column({ default: '' })
  Type: string;
  @Column({ default: false })
  idDelete: boolean;
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