// FUNGSI RESOLVER UNTUK MENGHANDLE REQUEST YANG DATANG

const BookModel = require("./models/Book");

module.exports = {
  Query: {
    getAllBooks: async () => await BookModel.find({}),
    getBook: async (_, args) => await BookModel.findById(args._id),
  },

  Mutation: {
    createBook: async (_, args) => {
      const book = new BookModel(args);
      await book.save();
      return book;
    },

    updateBook: async (_, args) => {
      // FUNGSI { new:true } untuk mengembalikan data ke database setelah data ter update
      const book = await BookModel.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      return book;
    },

    deleteBook: async (_, args) => {
      const book = await BookModel.findByIdAndRemove(args._id);
      if (book) return "Sukses dihapus";
      return "Gagal dihapus";
    },
  },
};
