import { useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/shared/Breadcrumb/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import MainForm from "../../../Components/shared/Forms/MainForm";
import {
  fetchPropertyPurchase,
  updatePropertyPurchase,
} from "../../../redux/Actions/_PropertyPurchaseAction";
import PropertyPurchaseForm from "./PropertyPurchaseForm";
import { fetchCustomerBeneAllList } from "../../../redux/Actions/CustomerBenAction";
import { fetchProjectsAllList } from "../../../redux/Actions/ProjectsAction";
import { fetchPropertyAllList } from "../../../redux/Actions/PropertyAction";

function EditPropertyPurchase() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxState = useSelector((state) => state.propertyPurchaseReducer);
  //
  const customersState = useSelector((state) => state.customersBenReducer.data);
  const propertysState = useSelector((state) => state.propertyReducer.data);
  const projectState = useSelector((state) => state.projectsReducer.con_data);
  //
  const location = useLocation();
  const state = reduxState.sData;

  console.log(state);

  useEffect(() => {
    dispatch(fetchPropertyPurchase(location.state));
  }, [location.state, dispatch]);

  //

  useEffect(() => {
    dispatch(fetchCustomerBeneAllList());
    dispatch(fetchProjectsAllList());
    dispatch(fetchPropertyAllList());
  }, [dispatch]);

  const formsData = [
    {
      fieldName: "Amount",
      fieldType: "number",
      fieldPlaceholder: "Amount",
      defaultValue: state.amount,
    },
    {
      fieldName: "Down payment",
      fieldType: "number",
      fieldPlaceholder: "Down payment",
      defaultValue: state.down_payment,
    },
    {
      fieldName: "Installment",
      fieldType: "number",
      fieldPlaceholder: "Installment",
      defaultValue: state.installment,
    },
    {
      fieldName: "Installment Duration",
      fieldType: "number",
      fieldPlaceholder: "Installment Duration",
      defaultValue: state.installment_duration,
    },
    {
      fieldName: "Handover status",
      fieldType: "select",
      fieldPlaceholder: "Handover status",
      defaultValue: state.handover_status,
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
      ],
    },
    {
      fieldName: "Customer id",
      fieldType: "select",
      fieldPlaceholder: "Customer id",

      options: customersState?.map((dt, index) => ({
        is_select: state.customer_id === dt.id ? "selected" : "",
        index: state.customer_id === dt.id ? index : null,
        value: dt.id,
        label: `${
          dt?.name === null ? dt.username : dt.first_name + " " + dt.last_name
        }`,
      })),
      defaultValue: state.customer_id
        ? customersState?.findIndex((dt) => dt.id === state.customer_id)
        : null,
    },
    {
      fieldName: "Project id",
      fieldType: "select",
      fieldPlaceholder: "Project id",
      multiSelect: true,
      options: projectState?.map((dt, index) => ({
        is_select: state.project_id === dt.id ? "selected" : "",
        index: state.project_id?.map((pi) => (pi === dt.id ? index : null)),
        value: dt.id,
        label: `${dt?.name === null ? dt.username : dt?.name}`,
      })),
      defaultValue: state.project_id
        ? projectState?.findIndex((dt) => dt.id === state.project_id)
        : null,
    },
    {
      fieldName: "Property id",
      fieldType: "select",
      fieldPlaceholder: "Property id",
      multiSelect: true,
      options: propertysState?.map((dt, index) => {
        const isSelected =
          state.property_id && state.property_id.includes(dt.id);
        console.log(isSelected, "isSelected");
        return {
          is_select: isSelected ? "selected" : "",
          index: isSelected ? index : null,
          value: dt.id,
          label: `${dt?.code}`,
        };
      }),
      defaultValue: state.property_id
        ? propertysState?.findIndex((dt) => state.property_id?.includes(dt?.id))
        : null,
    },
  ];

  const submitFunction = (data) => {
    if (state) {
      const updateData = {
        amount: data.amount
          ? data.amount
          : data.amount === ""
          ? state.amount
          : state.amount,
        down_payment: data.down_payment
          ? data.down_payment
          : data.down_payment === ""
          ? state.down_payment
          : state.down_payment,
        installment: data.installment
          ? data.installment
          : data.installment === ""
          ? state.installment
          : state.installment,
        installment_duration: data.installment_duration
          ? data.installment_duration
          : data.installment_duration === ""
          ? state.installment_duration
          : state.installment_duration,
        due_amount: data.due_amount
          ? data.due_amount
          : data.due_amount === ""
          ? state.due_amount
          : state.due_amount,
        due_installment: data.due_installment
          ? data.due_installment
          : data.due_installment === ""
          ? state.due_installment
          : state.due_installment,
        final_return: data.final_return
          ? data.final_return
          : data.final_return === ""
          ? state.final_return
          : state.final_return,
        handover_status: data.handover_status
          ? data.handover_status
          : data.handover_status === ""
          ? state.handover_status
          : state.handover_status,
        customer_id: data.customer_id
          ? data.customer_id
          : data.customer_id === ""
          ? state.customer_id
          : state.customer_id,
        project_id: data.project_id
          ? data.project_id
          : data.project_id === ""
          ? state.project_id
          : state.project_id,
        property_id: data.property_id
          ? data.property_id
          : data.property_id === ""
          ? state.property_id
          : state.property_id,
        status: data.status ? data.status : state.status,
      };

      dispatch(
        updatePropertyPurchase({
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
        navigate("/property-purchase");
      }, 3000);
    }
  }, [reduxState.isUpdate, navigate]);

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

export default EditPropertyPurchase;
