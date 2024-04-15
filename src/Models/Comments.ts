interface Comments {
    id: string;
    text: string;
    date: string;
    entityId: string;
    userId: string;
    parentId: string;
    replies: Comments[];
}