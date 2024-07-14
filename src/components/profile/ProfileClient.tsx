"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useI18n } from "@/src/locales/client";
import { editProfileInfo } from "@/src/app/actions";

export interface ProfileData {
  userSub: string;
  name: string;
  phone: string;
  address: string;
}

export default function ProfileInfo({ user }: { user: any }) {
  const [editProfileMessage, setEditProfileMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userSub = user?.sub;

  const t = useI18n();

  const validationSchema = Yup.object({
    name: Yup.string().required(t("Namerequired")),
    phone: Yup.string().required(t("phoneIsRequired")),
    address: Yup.string().required(t("addressIsRequired")),
  });

  return (
    <Formik
      initialValues={{
        name: user?.name || "",
        phone: user?.phone || "",
        address: user?.address || "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const formData: ProfileData = {
          userSub,
          name: values.name,
          phone: values.phone,
          address: values.address,
        };
        try {
          await editProfileInfo(formData);
          setEditProfileMessage(true);
          setErrorMessage("");
          // resetForm();
        } catch (error) {
          console.error("Error updating profile:", error);
          setErrorMessage("Failed to update profile. Please try again.");
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="text-gray-700 dark:text-gray-200 max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <table className="min-w-full">
            <tbody>
              <tr>
                <td className="py-2 px-4 font-medium">{t("email")}</td>
                <td className="py-2 px-4">
                  <span className="opacity-75">{user?.email}</span>
                </td>
              </tr>
              <tr>
                <td className="border-b py-2 px-4 font-medium dark:border-gray-700">
                  {t("name")}
                </td>
                <td className="border-b py-2 px-4 dark:border-gray-700">
                  <Field
                    type="text"
                    name="name"
                    className="text-lg leading-6 h-10 w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 dark:text-red-400"
                  />
                </td>
              </tr>
              <tr>
                <td className="border-b py-2 px-4 font-medium dark:border-gray-700">
                  {t("phone")}
                </td>
                <td className="border-b py-2 px-4 dark:border-gray-700">
                  <Field
                    type="text"
                    name="phone"
                    className="text-lg leading-6 h-10 w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-500 dark:text-red-400"
                  />
                </td>
              </tr>
              <tr>
                <td className="border-b py-2 px-4 font-medium dark:border-gray-700">
                  {t("address")}
                </td>
                <td className="border-b py-2 px-4 dark:border-gray-700">
                  <Field
                    type="text"
                    name="address"
                    className="text-lg leading-6 h-10 w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 dark:text-red-400"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          {editProfileMessage && (
            <p className="mt-4 text-green-600 dark:text-green-400">
              {t("yourInfoIsUpdated")}
            </p>
          )}
          {errorMessage && (
            <p className="mt-4 text-red-500 dark:text-red-400">
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            className="mt-6 text-lg leading-6 h-10 bg-[#11545c] hover:bg-[#11545c] text-white px-4 py-2 rounded-md shadow-md  transition duration-300"
            disabled={isSubmitting}
          >
            {t("update")}
          </button>
        </Form>
      )}
    </Formik>
  );
}
