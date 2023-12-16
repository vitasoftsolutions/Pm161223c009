import { useEffect, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import { fetchProperty, updateProperty } from "../../../redux/Actions/PropertyAction";
import { fetchProjectsAllList } from "../../../redux/Actions/ProjectsAction";

function EditProperty() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.propertyReducer);
  const projectsState = useSelector((state) => state.projectsReducer.data);
  // 
  const location = useLocation();
  const state = reduxState.sData;

  useEffect(() => {
    dispatch(fetchProjectsAllList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProperty(location.state));
  }, [location.state, dispatch]);

  const formsData = [
    {
      fieldName: "Size",
      fieldType: "number",
      fieldPlaceholder: "Size",
      isRequired: true,
      defaultValue: state.size,
    },
    {
      fieldName: "Code",
      fieldType: "text",
      fieldPlaceholder: "Code",
      isRequired: true,
      defaultValue: state.code,
    },
    {
      fieldName: "Side",
      fieldType: "text",
      fieldPlaceholder: "Side",
      isRequired: true,
      defaultValue: state.side,
    },
    {
      fieldName: "Project id",
      fieldType: "select",
      fieldPlaceholder: "Project id",
      isRequired: true,

      options: projectsState?.map((dt, index) =>
      // console.log("vl", state.project_id === dt.id ? index : null),
      ({
        is_select: state.project_id === dt.id ? "selected" : "",
        index: state.project_id === dt.id ? index : null,
        value: dt.id,
        label: `${dt?.name === null ? dt.username : dt?.name}`,
      })
    ),
    defaultValue: state.project_id
      ? projectsState?.findIndex((dt) => dt.id === state.project_id)
      : null,
    },
    {
      fieldName: "type",
      fieldType: "text",
      fieldPlaceholder: "type",
      isRequired: true,
      defaultValue: state.type,
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      const updateData = {
        size: data.size ? data.size : state.size,
        code: data.code ? data.code : state.code,
        side: data.side ? data.side : state.side,
        project_id: data.project_id ? data.project_id : state.project_id,
        type: data.type ? data.type : state.type,
        status: data.status ? data.status : state.status,
      };

      dispatch(
        updateProperty({
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
        navigate("/property");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

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

export default EditProperty;
