// "use client";

// import { useState, useRef } from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import Modal from "@mui/material/Modal";
// import { useRouter } from "next/navigation";
// import { PutBlobResult } from "@vercel/blob";
// import Image from "next/image";
// import { AddBlogType, BlogType } from "@/src/types/blogTypes";
// import { useCurrentLocale, useI18n } from "@/src/locales/client";
// import { createAddBlogAction } from "@/src/app/actions";

// export default function AddNewBlog() {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [previewImage, setPreviewImage] = useState<string | null>(null); // State for image preview URL
//   const inputFileRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();
//   const t = useI18n();
//   const locale = useCurrentLocale();

//   const initialValues = {
//     title_en: "",
//     title_ka: "",
//     description_en: "",
//     description_ka: "",
//     image_url: "",
//     user_id: 0,
//     type: "blog",
//     approved: true,
//   };

//   const blogValidation = Yup.object({
//     title: Yup.string().min(20, t("tooShort")).required(t("titleRequired")),
//     description: Yup.string()
//       .min(20, t("tooShort"))
//       .required(t("descriptionRequired")),
//     image_url: Yup.string().required(t("imageRequired")),
//   });

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setPreviewImage(null); // Reset preview image when modal is closed
//   };

//   const handleSubmit = async (
//     values: AddBlogType,
//     { setSubmitting, resetForm }: any
//   ) => {
//     try {
//       await createAddBlogAction(values);
//       resetForm();
//       handleClose();
//       router.refresh();
//     } catch (error) {
//       console.error("Error creating blog:", error);
//     }
//     setSubmitting(false);
//   };

//   const handleFileUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>,
//     setFieldValue: any
//   ) => {
//     event.preventDefault();

//     if (!inputFileRef.current?.files) {
//       throw new Error("No file selected");
//     }

//     const file = inputFileRef.current.files[0];
//     setLoading(true);

//     try {
//       const response = await fetch(`/api/upload?filename=${file.name}`, {
//         method: "POST",
//         body: file,
//       });

//       const newBlob = (await response.json()) as PutBlobResult;
//       setFieldValue("image_url", newBlob.url);
//       setPreviewImage(URL.createObjectURL(file)); // Set preview image URL
//       setLoading(false);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <button
//         className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded"
//         onClick={handleOpen}
//       >
//         {t("addBlog")}
//       </button>

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         className="flex items-center justify-center"
//       >
//         <Formik
//           initialValues={initialValues}
//           validationSchema={blogValidation}
//           onSubmit={handleSubmit}
//         >
//           {({ setFieldValue, errors, touched, isSubmitting, isValid }) => (
//             <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//               <div className="mb-4">
//                 <label
//                   className="block text-gray-700 text-sm font-bold mb-2"
//                   htmlFor="title"
//                 >
//                   {t("titleEn")}
//                 </label>
//                 <Field
//                   className={`shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline ${
//                     errors.title_en && touched.title_en ? "border-[#ff0000]" : ""
//                   }`}
//                   id="title"
//                   name="title"
//                   type="text"
//                   placeholder={t("title")}
//                 />
//                 {errors.title && touched.title && (
//                   <p className="text-[#ff0000] text-xs italic">
//                     {errors.title[locale]}
//                   </p>
//                 )}
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   {t("description")}
//                 </label>
//                 <Field
//                   className={`shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline ${
//                     errors.description && touched.description
//                       ? "border-[#ff0000]"
//                       : ""
//                   }`}
//                   name="description"
//                   as="textarea"
//                   placeholder={t("description")}
//                 />
//                 {errors.description && touched.description && (
//                   <p className="text-[#ff0000] text-xs italic">
//                     {errors.description[locale]}
//                   </p>
//                 )}
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   {t("image")}
//                 </label>
//                 <input
//                   className={`shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline ${
//                     errors.image_url && touched.image_url
//                       ? "border-[#ff0000]"
//                       : ""
//                   }`}
//                   type="file"
//                   ref={inputFileRef}
//                   onChange={(event) => handleFileUpload(event, setFieldValue)}
//                 />
//                 {previewImage && (
//                   <Image
//                     src={previewImage}
//                     alt="Preview"
//                     className="mt-2 rounded-lg shadow-md"
//                     style={{ maxWidth: "100%", maxHeight: "200px" }}
//                   />
//                 )}
//                 {loading && <p>{t("upload")}...</p>}
//               </div>
//               <div className="flex items-center justify-between">
//                 <button
//                   className={`bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
//                     isSubmitting || loading || !isValid
//                       ? "opacity-50 cursor-not-allowed"
//                       : ""
//                   }`}
//                   type="submit"
//                   disabled={isSubmitting || loading || !isValid}
//                 >
//                   {t("addBlog")}
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </Modal>
//     </>
//   );
// }

"use client";

import { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/navigation";
import { PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import { AddBlogType, TranslatedText } from "@/src/types/blogTypes";
import { useCurrentLocale, useI18n } from "@/src/locales/client";
import { createAddBlogAction } from "@/src/app/actions";

export default function AddNewBlog({ user_id }: { user_id: number }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const t = useI18n();
  const locale = useCurrentLocale();

  const initialValues = {
    title: {
      en: "",
      ka: "",
    },
    description: {
      en: "",
      ka: "",
    },
    image_url: "",
    user_id,
    type: "",
    approved: true,
  };

  const blogValidation = Yup.object({
    title: Yup.object({
      en: Yup.string().min(10, t("tooShort")).required(t("titleRequired")),
      ka: Yup.string().min(10, t("tooShort")).required(t("titleRequired")),
    }),
    description: Yup.object({
      en: Yup.string()
        .min(20, t("tooShort"))
        .required(t("descriptionRequired")),
      ka: Yup.string()
        .min(20, t("tooShort"))
        .required(t("descriptionRequired")),
    }),
    image_url: Yup.string().required(t("imageRequired")),
    type: Yup.string().min(5, t("tooShort")).required(t("type")),
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPreviewImage(null);
  };

  const handleSubmit = async (
    values: AddBlogType,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      console.log("MIKVARS MIKVARS CONSOLE LOGI");
      console.log(values);
      await createAddBlogAction(values);
      resetForm();
      handleClose();
      router.refresh();
    } catch (error) {
      console.error("Error creating blog:", error);
    }
    setSubmitting(false);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];
    setLoading(true);

    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = (await response.json()) as PutBlobResult;
      setFieldValue("image_url", newBlob.url);
      setPreviewImage(URL.createObjectURL(file));
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="bg-[#0071e3] hover:bg-[#0056b3] mb-4 text-white font-bold py-2 px-4 rounded"
        onClick={handleOpen}
      >
        {t("addBlog")}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={blogValidation}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched, isSubmitting, isValid }) => (
            <Form className="bg-[#fff] shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:text-white dark:bg-dark-secondary">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title_en"
                >
                  {t("titleEn")}
                </label>
                <Field
                  className={`shadow appearance-none border dark:text-white rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline ${
                    errors.title?.en && touched.title?.en
                      ? "border-[#ff0000]"
                      : ""
                  }`}
                  id="title_en"
                  name="title.en"
                  type="text"
                  placeholder={t("title")}
                />
                {errors.title?.en && touched.title?.en && (
                  <p className="text-[#ff0000] text-xs italic">
                    {errors.title.en}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title_ka"
                >
                  {t("titleKa")}
                </label>
                <Field
                  className={`shadow appearance-none border dark:text-white rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline ${
                    errors.title?.ka && touched.title?.ka
                      ? "border-[#ff0000]"
                      : ""
                  }`}
                  id="title_ka"
                  name="title.ka"
                  type="text"
                  placeholder={t("title")}
                />
                {errors.title?.ka && touched.title?.ka && (
                  <p className="text-[#ff0000] text-xs italic">
                    {errors.title.ka}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {t("descriptionEn")}
                </label>
                <Field
                  className={`shadow appearance-none border dark:text-white rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline ${
                    errors.description?.en && touched.description?.en
                      ? "border-[#ff0000]"
                      : ""
                  }`}
                  name="description.en"
                  as="textarea"
                  placeholder={t("description")}
                />
                {errors.description?.en && touched.description?.en && (
                  <p className="text-[#ff0000] text-xs italic">
                    {errors.description.en}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {t("descriptionKa")}
                </label>
                <Field
                  className={`shadow appearance-none border dark:text-white rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline ${
                    errors.description?.ka && touched.description?.ka
                      ? "border-[#ff0000]"
                      : ""
                  }`}
                  name="description.ka"
                  as="textarea"
                  placeholder={t("description")}
                />
                {errors.description?.ka && touched.description?.ka && (
                  <p className="text-[#ff0000] text-xs italic">
                    {errors.description.ka}
                  </p>
                )}
              </div>{" "}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="type"
                >
                  {t("type")}
                </label>
                <Field
                  className={`shadow appearance-none border dark:text-white rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline ${
                    errors.title?.ka && touched.title?.ka
                      ? "border-[#ff0000]"
                      : ""
                  }`}
                  id="type"
                  name="type"
                  type="text"
                  placeholder={t("type")}
                />
                {errors.title?.ka && touched.title?.ka && (
                  <p className="text-[#ff0000] text-xs italic">
                    {errors.title.ka}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {t("image")}
                </label>
                <input
                  className={`shadow appearance-none dark:text-white border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline ${
                    errors.image_url && touched.image_url
                      ? "border-[#ff0000]"
                      : ""
                  }`}
                  type="file"
                  ref={inputFileRef}
                  onChange={(event) => handleFileUpload(event, setFieldValue)}
                />
                {previewImage && (
                  <Image
                    src={previewImage}
                    alt="Preview"
                    className="mt-2 rounded-lg shadow-md"
                    // style={{ maxWidth: "100%", maxHeight: "200px" }}
                    width={100}
                    height={100}
                  />
                )}
                {loading && <p>{t("upload")}...</p>}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className={`bg-[#0071e3] hover:bg-[#0056b3] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    isSubmitting || loading || !isValid
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  type="submit"
                  disabled={isSubmitting || loading || !isValid}
                >
                  {t("addBlog")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
