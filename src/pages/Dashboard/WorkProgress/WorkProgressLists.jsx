import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLoanBeneficiary,
  fetchLoanBeneList,
  searchLoanBeneficiaries,
} from "../../../redux/Actions/WorkProgressAction";
import Swal from "sweetalert2";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
const t_head = [
  { name: "Name" },
  { name: "Percentage" },
  { name: "Date" },
  { name: "Status" },
  { name: "Actions" },
];

const formsData = [
  {
    fieldName: "Name",
    fieldType: "text",
    fieldPlaceholder: "Name",
  },
];
const WorkProgressLists = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.workprogressReducers);
  // allDataList

  console.log(state, "state")

  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    first_name: item.name,
    percentage: item.percentage,
    date: item.created_at,
    status: item.status,
  }));
  const tableData = {
    ...state,
    data: newData,
  };

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
    dispatch(fetchLoanBeneList(current_page));
  }, [dispatch, current_page, state.isDelete, state.isUpdate]);

  const handlePageChange = (newPage) => {
    dispatch(fetchLoanBeneList(newPage));
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
        dispatch(deleteLoanBeneficiary(id));
        if (state.isDelete === true) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };

  //
  // Filter Code
  const handleSearch = (formData) => {
    const allKeysEmpty = Object.values(formData).every(
      (value) => value === "" || value === null
    );
    const app_model = "projects/WorkProgress/";
    const serializer_class = "WorkProgress";
    const searchData = { formData, app_model, serializer_class };
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchLoanBeneList(current_page));
    } else {
      dispatch(searchLoanBeneficiaries(searchData));
    }
  };
  return (
    <div>
      <TableHeader
        title={"Work Progress"}
        redirectLink={"/work-progress/create"}
        model_name={"workProgress"}
        app_label={"projects"}
        url_endpoint={"/export-csv/?model=workProgress&app_label=projects"}
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
        editLink={"/work-progress/edit"}
        erp_modalCol={12}
        photoSection={false}
      />
    </div>
  );
};

export default WorkProgressLists;
