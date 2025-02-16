
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={"← Back"}
      nextLabel={"Forward →"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={onPageChange}
      containerClassName={"pagination flex gap-2 justify-center mt-4 cursor-pointer "}
      activeClassName={"bg-blue-950 hover:bg-blue-700 font-medium  px-2 rounded text-white"}
      pageClassName={"border px-3 py-1 rounded"}
      previousClassName={"border px-3 py-1 rounded "}
      nextClassName={"border px-3 py-1 rounded"}
    />
  );
};

export default Pagination;
