import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import jwtDecode from "jwt-decode";
import { createRepairRecords } from "../../../redux/Actions/RepairRecordsAction";
import { fetchRenterBeneficariesAllList } from "../../../redux/Actions/RenterBenAction";
import { fetchProjectsAllList } from "../../../redux/Actions/ProjectsAction";
import { fetchPropertyAllList } from "../../../redux/Actions/PropertyAction";

function CreateRepairRecords() {
  const dispatch = useDispatch();
  const projectPState = useSelector((state) => state.repairRecordsReducer);
  //
  const propertyState = useSelector((state) => state.propertyReducer.data);
  const projectsState = useSelector((state) => state.projectsReducer.con_data);
  const renterState = useSelector(
    (state) => state.renterBeneficiaryReducer.data
  );
  const navigate = useNavigate();
  const submitFunction = (data) => {
    dispatch(createRepairRecords(data));
  };

  useEffect(() => {
    dispatch(fetchRenterBeneficariesAllList());
    dispatch(fetchProjectsAllList());
    dispatch(fetchPropertyAllList());
  }, [dispatch]);

  // Get the user
  const token = sessionStorage.getItem("jwt_token");
  const result = jwtDecode(token);
  const userId = result.user_id;

  const formsData = [
    {
      fieldName: "Reason",
      fieldType: "text",
      fieldPlaceholder: "Reason",
      isRequired: true,
      hasWidth: 2,
    },
    {
      fieldName: "Amount",
      fieldType: "number",
      fieldPlaceholder: "Amount",
      isRequired: true,
    },
    {
      fieldName: "Expensed by",
      fieldType: "select",
      fieldPlaceholder: "Expensed by",
      isRequired: true,
      hasWidth: 2,
      options: [
        { value: "Admin", label: "Admin" },
        { value: "Renter", label: "Renter" },
      ],
    },
    {
      fieldName: "Project id",
      fieldType: "select",
      fieldPlaceholder: "Project id",
      isRequired: true,
      options: projectsState?.map((dt) => ({
        value: dt.id.toString(),
        label: dt.name,
      })),
    },
    {
      fieldName: "Property id",
      fieldType: "select",
      fieldPlaceholder: "Property id",
      isRequired: true,
      hasWidth: 2,
      options: propertyState?.map((dt) => ({
        value: dt.id.toString(),
        label: dt.code,
      })),
    },
    {
      fieldName: "Renter id",
      fieldType: "select",
      fieldPlaceholder: "Expensed by",
      isRequired: true,
      options: renterState?.map((dt) => ({
        value: dt.id.toString(),
        label: `${dt.first_name}  ${dt.last_name}`,
      })),
    },
    {
      fieldName: "Author id",
      fieldType: "number",
      fieldPlaceholder: "Author id",
      defaultValue: userId,
      isRequired: true,
      isHidden: true,
    },
  ];

  useEffect(() => {
    if (projectPState.isCreated) {
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

    if (projectPState.isError) {
      toast.error(projectPState.data[0], {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [
    projectPState.isError,
    projectPState.data,
    projectPState.isCreated,
    navigate,
  ]);

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
        />
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
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

export default CreateRepairRecords;
