import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import { createPropertyPurchase } from "../../../redux/Actions/_PropertyPurchaseAction";
import jwtDecode from "jwt-decode";
import { fetchProjectsAllList } from "../../../redux/Actions/ProjectsAction";
import { fetchPropertyAllList } from "../../../redux/Actions/PropertyAction";
import { fetchCustomerBeneAllList } from "../../../redux/Actions/CustomerBenAction";
import PropertyPurchaseForm from "./PropertyPurchaseForm";

function CreatePropertyPurchase() {
  const dispatch = useDispatch();
  const propertyState = useSelector((state) => state.propertyPurchaseReducer);
  //
  const customersState = useSelector((state) => state.customersBenReducer.data);
  const propertysState = useSelector((state) => state.propertyReducer.data);
  // const projectsState = useSelector((state) => state.projectsReducer.data);
  const projectsState = useSelector((state) => state.projectsReducer.con_data);
  //
  const navigate = useNavigate();
  const submitFunction = (data) => {
    dispatch(createPropertyPurchase(data));
  };

  useEffect(() => {
    dispatch(fetchCustomerBeneAllList());
    dispatch(fetchProjectsAllList());
    dispatch(fetchPropertyAllList());
  }, [dispatch]);

  // Get the user
  const token = sessionStorage.getItem("jwt_token");
  const result = jwtDecode(token);
  const userId = result.user_id;

  console.log(projectsState, "projectsStateprojectsStateprojectsState")

  const formsData = [
    {
      fieldName: "Amount",
      fieldType: "number",
      fieldPlaceholder: "Amount",
      // isRequired: true,
    },
    {
      fieldName: "Down payment",
      fieldType: "number",
      fieldPlaceholder: "Down payment",
      isRequired: true,
    },
    {
      fieldName: "Installment",
      fieldType: "number",
      fieldPlaceholder: "Installment",
      isRequired: true,
    },
    {
      fieldName: "Installment Duration",
      fieldType: "number",
      fieldPlaceholder: "Installment Duration",
      isRequired: true,
    },
    {
      fieldName: "Handover status",
      fieldType: "select",
      fieldPlaceholder: "Handover status",
      isRequired: true,
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
      ],
    },
    {
      fieldName: "Customer id",
      fieldType: "select",
      fieldPlaceholder: "Customer id",
      isRequired: true,
      // customersState
      options: customersState?.map((dt) => ({
        value: dt.id.toString(),
        label: `${dt.first_name} ${dt.last_name}`,
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
      fieldName: "Project id",
      fieldType: "select",
      fieldPlaceholder: "Project id",
      multiSelect: true,
      options: projectsState?.map(
        (dt) => (
          console.log(dt),
          {
            value: dt.id.toString(),
            label: dt.name,
          }
        )
      ),
      isRequired: true,
    },
    {
      fieldName: "Property id",
      fieldType: "select",
      fieldPlaceholder: "Property id",
      multiSelect: true,
      isRequired: true,
      options: propertysState?.map((dt) => ({
        value: dt.id.toString(),
        label: dt.code,
      })),
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
        navigate("/property-purchase");
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
  }, [
    propertyState.isError,
    propertyState.data,
    propertyState.isCreated,
    navigate,
  ]);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Breadcrumb />
        <div className="flex space-x-4">
          <Link
            to={"/property-purchase"}
            className="btn btn-sm font-semibold flex gap-2 items-center justify-center bg-erp_primary text-erp_light px-2"
          >
            <BsArrowLeftShort /> Back
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg shadow-blue-200 md:mx-10 mb-5 rounded-lg md:p-4">
        <PropertyPurchaseForm
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

export default CreatePropertyPurchase;
