module.exports = {
    mutipleMongooseToObject: function (mongooses) {
        return mongooses.map((mongoose) => mongoose.toObject());
    },
    searchInMongoose: function (products,s,PAGE_SIZE,page,page_items) {
        var search=[]
        var result=[]
        if (!s)
        {
            s=''
        }
        s=s.toLowerCase()
        for(let i=0;i<products.length;i++)
        {
            if(products[i]._nameproduct.toLowerCase().indexOf(s)!=-1)
            {
                search.push(products[i]);
            }
        }
        for(let i=(page-1)*PAGE_SIZE;result.length<PAGE_SIZE && i<search.length;i++)
        {
            result.push(search[i])
        }
        var si=[]
        for (let i=1;i<Math.ceil(search.length/PAGE_SIZE)+1;i++)
        {
            si.push(i)
        }
        var t=[s]
        page_items.push({page:si,search:t})
        return result;
    },
    mongooseToObject: function (mongoose) {
       console.log(mongoose._idcate)
        return mongoose ? mongoose.toObject() : mongoose;
    },
};