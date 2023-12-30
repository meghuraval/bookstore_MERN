/* eslint-disable react/prop-types */
function BookModal({ book, onClose }) {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white max-w-3xl w-[70%] mx-auto rounded-[3%] p-8 h-[800px]">
        <div className="flex mb-4">
          <button onClick={onClose}>Close</button>
        </div>
        <h2 className="text-3xl font-semibold text-center mb-5">
          {book.title}
        </h2>
        <div>
          <img
            className="w-full object-cover object-center mb-4 h-[400px]"
            src={book.pictureURL}
            alt={book.title}
            style={{ objectFit: "contain" }}
          />
          <p className="text-lg mb-4 mt-5 text-center">{book.description}</p>
          <p className="text-gray-700 text-center">Author: {book.author}</p>
          <p className="text-green-700 text-center">
            Listed Price: ${book.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookModal;
