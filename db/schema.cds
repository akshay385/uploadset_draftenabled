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
    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
}