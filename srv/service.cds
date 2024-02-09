using { media as db } from '../db/schema';

service Attachments {
    entity Files as projection on db.Files;
    @odata.draft.enabled
    entity parent as projection on db.parent;
}