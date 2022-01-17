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
        return mongoose ? mongoose.toObject() : mongoose;
    },
     convertDate:function (date) { // Use 1 for January, 2 for February, etc.
        var current_day = date.getDay();
 
// Biến lưu tên của thứ
    var day_name = '';
 
// Lấy tên thứ của ngày hiện tại
    switch (current_day) {
    case 0:
     day_name = "Sunday";
         break;
    case 1:
      day_name = "Monday";
     break;
    case 2:
        day_name = "Tuesday";
    case 3:
     day_name = "Wednesday";
     break;
    case 4:
        day_name = "Thursday";
        break;
    case 5:
     day_name = "Friday";
        break;
    case 6:
        day_name = "Saturday";
    }
    return day_name;
      },
};