import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { createRentCollection } from "../../../redux/Actions/RentCollectionAction";
import jwtDecode from "jwt-decode";
import { fetchProjectsAllList } from "../../../redux/Actions/ProjectsAction";
import { fetchPropertyAllList } from "../../../redux/Actions/PropertyAction";
import { fetchRenterBeneficariesAllList } from "../../../redux/Actions/RenterBenAction";

function CreateRentCollection() {
  const dispatch = useDispatch();
  const rentState = useSelector((state) => state.rentCollectionReducer);
  const propertyState = useSelector((state) => state.propertyReducer.data);
  const projectsState = useSelector((state) => state.projectsReducer.con_data);
  const renterState = useSelector(
    (state) => state.renterBeneficiaryReducer.data
  );

  console.log(projectsState, "projectsState")
  
  const navigate = useNavigate();
  const submitFunction = (data) => {
    dispatch(createRentCollection(data));
  };

  useEffect(() => {
    dispatch(fetchProjectsAllList());
    dispatch(fetchPropertyAllList());
    dispatch(fetchRenterBeneficariesAllList());
  }, [dispatch]);

  // Get the user
  const token = sessionStorage.getItem("jwt_token");
  const result = jwtDecode(token);
  const userId = result.user_id;

  const formsData = [
    {
      fieldName: "Rent Amount",
      fieldType: "number",
      fieldPlaceholder: "Rent Amount",
      isRequired: true,
    },
    {
      fieldName: "Due Amount",
      fieldType: "number",
      fieldPlaceholder: "Due Amount",
      isRequired: true,
    },
    {
      fieldName: "Rent Date",
      fieldType: "date",
      fieldPlaceholder: "Rent Date",
      isRequired: true,
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
      options: propertyState?.map((dt) => ({
        value: dt.id.toString(),
        label: dt.code,
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
    {
      fieldName: "Renter id",
      fieldType: "select",
      fieldPlaceholder: "Renter id",
      isRequired: true,
      options: renterState?.map((dt) => ({
        value: dt.id.toString(),
        label: `${dt.first_name}  ${dt.last_name}`,
      })),
    },
  ];

  useEffect(() => {
    if (rentState.isCreated) {
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
        navigate("/rent-collections");
      }, 3000);
    }

    if (rentState.isError) {
      toast.error(rentState.data[0], {
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
    rentState.isError,
    rentState.data,
    rentState.isCreated,
    navigate,
  ]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/rent-collections"}
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

export default CreateRentCollection;
