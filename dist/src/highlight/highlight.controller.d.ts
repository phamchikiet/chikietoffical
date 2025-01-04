import { HighlightService } from './highlight.service';
export declare class HighlightController {
    private readonly highlightService;
    constructor(highlightService: HighlightService);
    create(data: any): Promise<any>;
    findAll(): Promise<import("./entities/highlight.entity").HighlightEntity[]>;
    findOne(id: string): Promise<import("./entities/highlight.entity").HighlightEntity>;
    findslug(slug: string): Promise<import("./entities/highlight.entity").HighlightEntity>;
    findQuery(SearchParams: any): Promise<{
        items: import("./entities/highlight.entity").HighlightEntity[];
        totalCount: number;
    }>;
    update(id: string, data: any): Promise<import("./entities/highlight.entity").HighlightEntity>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
