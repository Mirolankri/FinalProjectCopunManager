const connectDB = (ENVIRONMENT)=>{
    if(ENVIRONMENT === 'development') require('./mongoDB/connectToLocal');
    if(ENVIRONMENT === 'preproduction') require('./mongoDB/connectToAtlasDev');
    if(ENVIRONMENT === 'production') require('./mongoDB/connectToAtlas');
}

module.exports = connectDB;