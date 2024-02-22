using { media as db } from '../db/schema';

service Attachments {
    entity Files as projection on db.Files;
    @odata.draft.enabled
    entity parent as projection on db.parent;
    entity draft_attachments as projection on db.draft_attachments;
    function draft_attach(ID:String) returns String;
    function get_attach_data(ID:String) returns String;
    function get_draft_attach_data(ID:String) returns String;
    function delete_entry(ID: String) returns String;
}