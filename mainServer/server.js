const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const formidable = require('express-formidable');
const app = express();
const port = 4646;
const Sequelize = require('sequelize');
const Data = require('./models/Data')
app.use(cors());
app.use(formidable());


const mainCatId = 15;
const defaultSubCatId = 366;
const subcats = {
    "Kitchenware ": 243,
    "Baby & Kids Food": 365,
    "Disposable Items" : 367,
    "Canned & Jarred Foods" : 233,
    "Yogurt & Puddings": 365
};
app.post('/addItem',async (req, res) => {
    // "cat\":[{\"category\":448,\"subcategory\":464}]
    let message = '';
    const {data} = req.fields;

    console.log(data);
    const filteredByCategory = (()=>{
        const filtered = [];
        
        for(let i=0;i<data.length;i++){
            if(subcats[data[i].split('/')[2]]){
                filtered.push(data[i])
            }
        }
        return filtered;
    })();
    const datas = [];
    message += `After Filtered: ${filteredByCategory.length}`;
    for(let i=0;i<filteredByCategory.length;i++){
        const item = {
            status: 'new',
            key: filteredByCategory[i],
            data : JSON.stringify({
                cat: [
                    {
                        category: mainCatId,
                        subcategory: subcats[data[i].split('/')[2]]
                    }
                ]
            })
        }
        datas.push(item);
    }
    const dataSaved = Data.bulkCreate(datas,{
        ignoreDuplicates: true,
        returning: true,
        fields: ['key','status','data']
    });
    // console.log(dataSaved)
    res.json({
        status: 'Success',
        message: message,
    })
});
app.get('/loadItem',async (req, res) => {
    const user = req.query.user;
    let message = '';
    const item = await Data.findOne({
        where: {
            [Sequelize.Op.or]: [
                {
                  [Sequelize.Op.and]: [
                    { status: "current" },
                    { user: user }, // Replace 'user' with the actual user value
                  ]
                },
                { status: "new" }
            ]
        },
    });
    message += `position: ${item.dataValues.position}`
    await item.update({ user: user, status: "current" });
    await item.save();
    
    res.json({
        status: "success",
        message: message,
        data: item
    });
});
app.get('/done',async (req, res) => {
    const position = req.query.position;
    await Data.update({
        status: 'done'
    },{
        where:{
            position: position
        }
    });
    res.json({
        status: "Success",
        message: "Item marked as done"
    })
});
app.get('/skip',async (req, res) => {
    const position = req.query.position;
    await Data.update({
        status: 'skip'
    },{
        where:{
            position: position
        }
    });
    res.json({
        status: "Success",
        message: "Item marked as skipped"
    })
});
app.listen(port,'0.0.0.0');