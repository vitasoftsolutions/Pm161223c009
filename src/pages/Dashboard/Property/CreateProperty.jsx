import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { createProperty } from "../../../redux/Actions/PropertyAction";
import { fetchProjectsAllList } from "../../../redux/Actions/ProjectsAction";


function CreateProperty() {
  const dispatch = useDispatch();
  const propertyState = useSelector((state) => state.propertyReducer);
  const projectsState = useSelector((state) => state.projectsReducer.data);

  const navigate = useNavigate();
  const submitFunction = (data) => {
    dispatch(createProperty(data));
  };

  useEffect(() => {
    dispatch(fetchProjectsAllList());
  }, [dispatch]);

  const formsData = [
    {
      fieldName: "Size",
      fieldType: "number",
      fieldPlaceholder: "Size",
      isRequired: true,
    },
    {
      fieldName: "Code",
      fieldType: "text",
      fieldPlaceholder: "Code",
      isRequired: true,
    },
    {
      fieldName: "Side",
      fieldType: "text",
      fieldPlaceholder: "Side",
      isRequired: true,
    },
    {
      fieldName: "Project id",
      fieldType: "select",
      fieldPlaceholder: "Project id",
      isRequired: true,
      options: projectsState.map(dt => ({
        value: dt.id.toString(),
        label: dt.name,
      })),
    },
    {
      fieldName: "type",
      fieldType: "text",
      fieldPlaceholder: "type",
      isRequired: false,
    },
  ];

  useEffect(() => {
    if (propertyState.isCreated) {
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
        navigate("/property");
      }, 3000);
    }

    if (propertyState.isError) {
      toast.error(propertyState.data[0], {
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
  }, [propertyState.isError, propertyState.data, propertyState.isCreated, navigate]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/property"}
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

export default CreateProperty;
