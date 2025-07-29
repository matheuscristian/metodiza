export type EntryDataset = {
    entryId: string;
    entryType: string;
    entryParent: string;
    entryRoot?: string;
} & Record<string, string>;
