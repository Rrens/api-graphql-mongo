const mongoose = require("mongoose");

// connection to mongodb
mongoose.connect("mongodb://localhost:27017/graphql-mongo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
