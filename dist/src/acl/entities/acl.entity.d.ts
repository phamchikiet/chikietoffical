export declare class AclEntity {
    id: string;
    Title: string;
    Slug: string;
    resourceType: string;
    resourceId: string;
    subjectType: string;
    subjectId: string;
    permissions: ('read' | 'write' | 'delete')[];
    Type: string;
    Ordering: number;
    Status: number;
    CreateAt: Date;
    UpdateAt: Date;
    DeleteAt: Date;
    idCreate: string;
}
