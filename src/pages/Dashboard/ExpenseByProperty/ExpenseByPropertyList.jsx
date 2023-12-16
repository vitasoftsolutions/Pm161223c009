import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import Swal from "sweetalert2";
import {
  deleteExpenseByProperty,
  fetchExpenseByPropertyList,
  searchExpenseByProperty,
} from "../../../redux/Actions/ExpenseByPropertyAction";

const t_head = [
  { name: "Expenser name" },
  { name: "Receipt" },
  { name: "Amount" },
  { name: "Created at" },
  { name: "Expense Date" },
  { name: "Status" },
  { name: "Actions" },
];

const formsData = [
  {
    fieldName: "Expenser Name",
    fieldType: "text",
    fieldPlaceholder: "Expenser Name",
  },
  {
    fieldName: "Amount",
    fieldType: "number",
    fieldPlaceholder: "Amount",
  },
];

const ExpenseByPropertyList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.expenseByPropertyReducer);
  // allDataList
  console.log("first", state);
  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    expenser_name: item.expenser_name,
    image: item.reciept,
    amount: item.amount,
    date: item.created_at,
    expense_date: item.expense_date,
    status: item.status,
  }));
  const tableData = {
    ...state,
    data: newData,
  };
  //

  // console.log(tableData, "tableData");

  const current_page = state.currentPage;
  const total_page = state.totalPages;

  // Pages
  let page_number = [];
  for (let i = current_page - 1; i <= current_page + 1; i++) {
    if (i < 1) continue;
    if (i > total_page) break;
    page_number.push(i);
  }

  useEffect(() => {
    dispatch(fetchExpenseByPropertyList(current_page));
  }, [dispatch, current_page, state.isDelete, state.isUpdate]);

  const handlePageChange = (newPage) => {
    dispatch(fetchExpenseByPropertyList(newPage));
  };

  // console.log(state, "state_ page");

  const deleteFunction = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteExpenseByProperty(id));
        if (state.isDelete === true) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  // Filter Code
  const handleSearch = (formData) => {
    const allKeysEmpty = Object.values(formData).every(
      (value) => value === "" || value === null
    );
    const app_model = "projects/ExpenseByProperty/";
    const serializer_class = "ExpensedByproperty";
    const searchData = { formData, app_model, serializer_class };
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchExpenseByPropertyList(current_page));
    } else {
      dispatch(searchExpenseByProperty(searchData));
    }
  };
  //
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Expense By Property"}
        redirectLink={"/expense-by-property/expense-by-property-crete"}
        model_name={"expenseByProperty"}
        app_label={"projects"}
        url_endpoint={"/export-csv/?model=expenseByProperty&app_label=projects"}
         // For filters
         onSearch={handleSearch}
         formsData={formsData}
      />
      <GlobalTable
        t_head={t_head}
        t_data={tableData}
        allDataList={allDataList}
        handlePageChange={handlePageChange}
        current_page={current_page}
        page_number={page_number}
        deleteFunction={deleteFunction}
        editLink={"/expense-by-property/edit-expense-by-property"}
        erp_modalCol={12}
        photoSection={false}
        nidSection={false}
      />
    </div>
  );
};

export default ExpenseByPropertyList;
