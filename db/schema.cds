namespace media;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity parent{
    key id: String;
    name:String;
}

entity Files: cuid, managed{
    key id1 : String;
    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
}

entity draft_attachments
{
    key id : UUID;
    attach_id1 : String;
    parent_id : String;
}

