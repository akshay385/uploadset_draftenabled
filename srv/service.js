const cds = require('@sap/cds');
module.exports = async function () {
    let {
        Files,
        draft_attachments
    }=this.entities;

    this.before('CREATE', 'Files', req => {
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `/odata/v4/attachments/Files(ID=${req.data.ID},id1='${req.data.id1}')/content`
    })

    this.before('READ', 'Files', req => {
        //check content-type
        console.log('content-type: ', req.headers['content-type'])
    });

    this.on("draft_attach", async (req) => {
        let id = req.data.ID;
        let data = await SELECT.from(Files).where  `id1=${req.data.ID}`;
        console.log(data);
        var len = data.length;
        for (let i = 0; i < len; i++) {
           var dat = data[i];
           var i_d = dat.ID 
           var unique_id = dat.id1;
           const data1 = [{
            attach_id1:i_d,
            parent_id:unique_id
        }]
           await INSERT.into(draft_attachments).entries(data1);
        }
        let draft_attch = await SELECT `id,attach_id1,parent_id`.from(draft_attachments);
        console.log();

        return JSON.stringify(draft_attch)
    });

    this.on("get_attach_data",async (req) => {
        let id = req.data.ID;
        let data = await SELECT.from(Files).where  `id1=${req.data.ID}`;
        console.log(data);
        return JSON.stringify(data);

        });

    this.on("get_draft_attach_data",async (req)=>{
        let id = req.data.ID;
        let data = await SELECT.from(draft_attachments).where  `parent_id=${req.data.ID}`;
        console.log(data);
        return JSON.stringify(data);
    });
    this.on("delete_entry",async (req)=>{
        if(req.data.ID == 10)
        {
            let del = await DELETE.from(draft_attachments);
            console.log(del);
        }
        else {

        let id = req.data.ID;
        var final = JSON.parse(req.data.ID);
        console.log(final);
        console.log();
        for (let i = 0; i < final.id1s.length; i++) {
            debugger
            var uu_id = final.ids[i];
            var pan_id = final.id1s[i];
            let res = await DELETE.from(Files).where `ID = ${uu_id}`;
            console.log(res);
        }
        return "deleted succesfully";
    }

        // let data = await DELETE.from(Files).where 
       
    });
}