import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../../Components/shared/TableHeader/TableHeader";
import GlobalTable from "../../../Components/shared/Tables/GlobalTable";
import Swal from "sweetalert2";
import { deleteRepairRecords, fetchRepairRecordsList, searchRepairRecords } from "../../../redux/Actions/RepairRecordsAction";

const t_head = [
  { name: "Reason" },
  { name: "Property Name" },
  { name: "Project Name" },
  { name: "Renter Name" },
  { name: "Amount" },
  { name: "Created at" },
  { name: "Status" },
  { name: "Actions" },
];

const formsData = [
  {
    fieldName: "Reason",
    fieldType: "text",
    fieldPlaceholder: "Reason",
  },
  {
    fieldName: "Amount",
    fieldType: "number",
    fieldPlaceholder: "Amount",
  },
];

const RepairRecordsList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.repairRecordsReducer);
  console.log(state);
  // allDataList
  const allDataList = state.data;
  const newData = state?.data?.map((item) => ({
    id: item.id,
    reason: item.reason,
    property_id: item.property_name,
    project_id: item.project_name,
    renter_id: item.renter_name,
    amount: item.amount,
    date: item.created_at,
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
    dispatch(fetchRepairRecordsList(current_page));
  }, [dispatch, current_page, state.isDelete, state.isUpdate]);

  const handlePageChange = (newPage) => {
    dispatch(fetchRepairRecordsList(newPage));
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
        dispatch(deleteRepairRecords(id));
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
    const app_model = "renter/RepairRecords/";
    const serializer_class = "RepairRecords";
    const searchData = { formData, app_model, serializer_class };
    if (allKeysEmpty) {
      // If the search field is empty, fetch all formData
      dispatch(fetchRepairRecordsList(current_page));
    } else {
      dispatch(searchRepairRecords(searchData));
    }
  };

  //
  return (
    <div className="max-w-screen">
      <TableHeader
        title={"Repair Records"}
        redirectLink={"/repear-records/repear-records-crete"}
        model_name={"repairRecords"}
        app_label={"renter"}
        url_endpoint={"/export-csv/?model=repairRecords&app_label=renter"}
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
        editLink={"/repear-records/edit-repear-records"}
        erp_modalCol={12}
        photoSection={false}
        nidSection={false}
      />
    </div>
  );
};

export default RepairRecordsList;
