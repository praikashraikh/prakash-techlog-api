           /*
* Service class for Post
* params: mongoDb connection url
* v1.0
*  2018-11-1
@C 2018, Prakash Rai
*/
const HttpClient = require('http');
const config = require('../config/app.config');

module.exports = function(mongoose, PostSchema) {
    class PostService {
        /*
        * Connect to mongoose if its disconnected
        */
        connectMongoose(){
            if(mongoose.connection.readyState === 0){
                mongoose.connect(config.connections.mongoDb, { useNewUrlParser: true });
            }
        }

        /*
        * Connect to mongoose if its disconnected
        */
       disConnectMongoose(){
            if(mongoose.connection.readyState === 3){
                mongoose.disconnect();
            }
        }

        /*
        * Get total number of post in document
        * returns promise
        */
       _getTotalCount() {
           return PostSchema.countDocuments();
       }
        
       /*
       * Process the query parameters for filtering sorting and pagination
       */
      _buildQuery(query) {
        // pagination
        query.page = (query.page) - 1 ? parseInt(query.page) : 0;
        query.pageSize = (query.pageSize) ? parseInt(query.pageSize) : 1000;

        //sorting
        query.sort = (query.sort) ? query.sort : "_id:desc";
        query.sort = (query.sort.includes(":")) ? query.sort : "_id:desc";
        var sortQuery = {};
        const fields = Object.keys(PostSchema.schema.paths);
        const order = ["asc", "desc"];

        if(fields.includes(query.sort.split(":")[0]) && order.includes(query.sort.split(":")[1])){
            sortQuery[query.sort.split(":")[0]] = query.sort.split(":")[1];
        } else {
            if(!fields.includes(query.sort.split(":")[0])) {
                sortQuery["_id"] = query.sort.split(":")[1];
            }

            if(!order.includes(query.sort.split(":")[1])) {
                sortQuery[query.sort.split(":")[0]] = "asc";
            }
        }
        query.sort = sortQuery;

        // search
        const regex = new RegExp(query.search, 'i');
        query.search = {
            "title": regex
        };

        return query;
       }
        /*
        * Get list of posts
        * returns promise
        */
        _readPosts(query) {
            const proQuery = this._buildQuery(query)

            // var path = require('path');
            // var XLSX = require('xlsx');
            // console.log('PATH ==>',  __dirname);
            //  var workbook = XLSX.readFile(__dirname + '/eq.xlsx');
            // console.log('WORK BOOK', workbook);
            //  var sheet_name_list = workbook.SheetNames;
            //  var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
            // // console.log(xlData);
            
            // const arr1 = Array.from(xlData);
            // let returnArr = [];

            // arr1.forEach(data => {
            //     console.log("ROW ===>", data)
            //     const obj = {
            //         category1: data['Category'].trim(),
            //         subCategory1: data['Sub-Category'].trim(),
            //         type1: data['Type'].trim(),
            //         size1: data['Size'],
            //         tps: {
            //             type12: data['Equipment Type'],
            //             subMode12: data['TPS Submode']
            //         }
            //     };

            //     returnArr.push(obj);
            // })
            
            // return Promise.all(returnArr);
            return PostSchema.find(proQuery.search, { _id : 0, __v: 0 }).sort(proQuery.sort).skip(proQuery.page).limit(proQuery.pageSize);
        }

        /*
        * Get list of posts with total page number
        */
       readPosts(query){
           
           return Promise.all([this._readPosts(query), this._getTotalCount()]);
       }

        /*
        * Get post by id
        * returns promise
        */
        readPostById(_id) {
            return PostSchema.find({"_id": _id});
        }

        /*
        * Adds post to collection
        * returns promise
        */
        createPost(post) {
            const newPost = new PostSchema(post);
            newPost.createdDateTime = new Date();
            newPost.modifiedDateTime = new Date();
            return newPost.save();
        }

        /*
        * Updates the post 
        * returns promise
        */
        updatePost(_id, post) {
            post.modefiedDateTime = new Date();
            return PostSchema.findOneAndUpdate(_id, post);
        }

        /*
        * Deletes the post 
        * returns promise
        */
        deletePost(_id) {
            return PostSchema.findByIdAndRemove(_id);
        }
    };

    return new PostService();
};