import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import {
  fetchRepairRecords,
  updateRepairRecords,
} from "../../../redux/Actions/RepairRecordsAction";
import { fetchRenterBeneficariesAllList } from "../../../redux/Actions/RenterBenAction";
import { fetchProjectsAllList } from "../../../redux/Actions/ProjectsAction";
import { fetchPropertyAllList } from "../../../redux/Actions/PropertyAction";

function EditRepairRecords() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.repairRecordsReducer);
  //
  const propertyState = useSelector((state) => state.propertyReducer.data);
  const projectsState = useSelector((state) => state.projectsReducer.con_data);
  const renterState = useSelector(
    (state) => state.renterBeneficiaryReducer.data
  );
  const location = useLocation();
  const state = reduxState.sData;

  console.log(state);

  useEffect(() => {
    dispatch(fetchRepairRecords(location.state));
  }, [location.state, dispatch]);

  useEffect(() => {
    dispatch(fetchRenterBeneficariesAllList());
    dispatch(fetchProjectsAllList());
    dispatch(fetchPropertyAllList());
  }, [dispatch]);

  const optionsArray = [
    { value: "Admin", label: "Admin" },
    { value: "Renter", label: "Renter" },
  ]

  const formsData = [
    {
      fieldName: "Reason",
      fieldType: "text",
      fieldPlaceholder: "Reason",
      isRequired: true,
      defaultValue: state.reason,
    },
    {
      fieldName: "Amount",
      fieldType: "number",
      fieldPlaceholder: "Amount",
      isRequired: true,
      defaultValue: state.amount,
    },
    {
      fieldName: "Expensed by",
      fieldType: "select",
      fieldPlaceholder: "Expensed by",
      isRequired: true,
      options: optionsArray,
      defaultValue: state.expensed_by
      ? optionsArray.findIndex((option) => option.value === state.expensed_by)
      : null,
    },
    {
      fieldName: "Project id",
      fieldType: "select",
      fieldPlaceholder: "Project id",
      isRequired: true,

      options: projectsState?.map(
        (dt, index) => (
          // console.log("vl", state , dt ),
          {
            is_select: state.project_id === dt.id ? "selected" : "",
            index: state.project_id === dt.id ? index : null,
            value: dt.id,
            label: dt.name,
          }
        )
      ),
      defaultValue: state.project_id
        ? projectsState?.findIndex((dt) => dt.name === state.project_name)
        : null,
    },
    {
      fieldName: "Property id",
      fieldType: "select",
      fieldPlaceholder: "Property id",
      isRequired: true,
      options: propertyState?.map(
        (dt, index) => (
          {
            is_select: state.project_id === dt.id ? "selected" : "",
            index: state.project_id === dt.id ? index : null,
            value: dt.id,
            label: dt.code,
          }
        )
      ),
      defaultValue: state.project_id
        ? propertyState?.findIndex((dt) => dt.project_id === state.project_id)
        : null,
    },
    {
      fieldName: "Renter id",
      fieldType: "select",
      fieldPlaceholder: "Expensed by",
      isRequired: true,
      options: renterState?.map(
        (dt, index) => (
          {
            is_select: state.renter_id === dt.id ? "selected" : "",
            index: state.renter_id === dt.id ? index : null,
            value: dt.id,
            label: `${dt.first_name}  ${dt.last_name}`,
          }
        )
      ),
      defaultValue: state.renter_id
        ? renterState?.findIndex((dt) => dt.id === state.renter_id)
        : null,
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      const updateData = {
        reason: data.reason ? data.reason : state.reason,
        amount: data.amount ? data.amount : state.amount,
        expensed_by: data.expensed_by ? data.expensed_by : state.expensed_by,
        project_id: data.project_id ? data.project_id : state.project_id,
        property_id: data.property_id ? data.property_id : state.property_id,
        renter_id: data.renter_id ? data.renter_id : state.renter_id,
        status: data.status ? data.status : state.status,
      };

      dispatch(
        updateRepairRecords({
          id: state.id,
          data: updateData,
        })
      );
    }
  };

  // In a useEffect or similar, check the updated state
  useEffect(() => {
    if (reduxState.isUpdate) {
      // Perform actions after the update is successful
      toast("Successfully done", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/repear-records");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/repear-records"}
            className="btn btn-sm font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
        <MainForm
          formsData={formsData}
          submitFunction={submitFunction}
          isReset={true}
          isState={state}
        />
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default EditRepairRecords;
