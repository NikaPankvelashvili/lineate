// "use client";
// import { useState, useRef } from "react";
// import Modal from "@mui/material/Modal";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { CiEdit } from "react-icons/ci";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useI18n } from "@/src/locales/client";
// import { BlogType } from "@/src/types/blogTypes";
// import { updateBlog } from "@/src/app/actions";

// export default function EditBlog({ blogData }: {blogData: BlogType}) {
//   const [open, setOpen] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [previewImage, setPreviewImage] = useState<string | null>(null); // State for image preview URL
//   const inputFileRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();
//   const t = useI18n();

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setPreviewImage(null); // Reset preview image when modal is closed
//   };

//   const initialValues: BlogType = {
//     id: blogData.id,
//     title: blogData.title,
//     description: blogData.description,
//     image_url: blogData.image_url,
//     createdAt: blogData.createdAt,

//   };

//   const blogValidation = Yup.object({
//     title: Yup.string()
//       .min(20, t("tooShort"))
//       .max(50, t("tooLong"))
//       .required(t("titleRequired")),
//     description: Yup.string()
//       .min(20, t("tooShort"))
//       .max(50, t("tooLong"))
//       .required(t("descriptionRequired")),
//     image_url: Yup.string().required(t("imageRequired")),
//   });

//   const handleSubmit = async (values: BlogType, { setSubmitting }: any) => {
//     try {
//       await updateBlog(values);
//       console.log("Blog updated successfully");
//       handleClose();
//       router.refresh();
//     } catch (error) {
//       console.error("Failed to update blog:", error);
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

//       const newBlob = await response.json();
//       setFieldValue("image_url", newBlob.url);
//       setPreviewImage(URL.createObjectURL(file)); // Set preview image URL
//       setLoading(false);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <CiEdit
//         className="cursor-pointer mr-3"
//         onClick={handleOpen}
//         fontSize={30}
//       />
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         className="flex items-center justify-center"
//       >
//         <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl max-h-full overflow-y-auto">
//           <Formik
//             initialValues={initialValues}
//             validationSchema={blogValidation}
//             onSubmit={handleSubmit}
//           >
//             {({ setFieldValue, isSubmitting }) => (
//               <Form className="w-full">
//                 <div className="mb-4">
//                   <label
//                     className="block text-gray-700 text-sm font-bold mb-2"
//                     htmlFor="title"
//                   >
//                     {t("title")}
//                   </label>
//                   <Field
//                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
//                     id="title"
//                     name="title"
//                     type="text"
//                     placeholder={t("title")}
//                   />
//                   <ErrorMessage
//                     name="title"
//                     component="div"
//                     className="text-red-500 text-xs italic"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label
//                     className="block text-gray-700 text-sm font-bold mb-2"
//                     htmlFor="description"
//                   >
//                     {t("description")}
//                   </label>
//                   <Field
//                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
//                     id="description"
//                     name="description"
//                     as="textarea"
//                     placeholder={t("description")}
//                   />
//                   <ErrorMessage
//                     name="description"
//                     component="div"
//                     className="text-red-500 text-xs italic"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">
//                     {t("image")}
//                   </label>
//                   <input
//                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
//                     type="file"
//                     ref={inputFileRef}
//                     onChange={(event) => handleFileUpload(event, setFieldValue)}
//                   />
//                   <Field type="hidden" name="image_url" />
//                   <ErrorMessage
//                     name="image_url"
//                     component="div"
//                     className="text-red-500 text-xs italic"
//                   />
//                   {loading && <p>{t("upload")}...</p>}
//                 </div>
//                 {initialValues.image_url && (
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">
//                       {t("currentImage")}
//                     </label>
//                     <Image
//                       src={initialValues.image_url}
//                       alt="Blog Image"
//                       width={100}
//                       height={100}
//                       className="rounded-lg"
//                     />
//                   </div>
//                 )}
//                 {previewImage && (
//                   <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">
//                       {t("previewImage")}
//                     </label>
//                     <Image
//                       src={previewImage}
//                       alt="Preview Image"
//                       width={100}
//                       height={100}
//                       className="rounded-lg"
//                     />
//                   </div>
//                 )}
//                 <div className="flex items-center justify-between">
//                   <button
//                     className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     type="submit"
//                     disabled={isSubmitting || loading}
//                   >
//                     {t("edit")}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </Modal>
//     </div>
//   );
// }

"use client";
import { useState, useRef } from "react";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiEdit } from "react-icons/ci";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useI18n } from "@/src/locales/client";
import { BlogType } from "@/src/types/blogTypes";
import { updateBlog } from "@/src/app/actions";

export default function EditBlog({ blogData }: { blogData: BlogType }) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // State for image preview URL
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const t = useI18n();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPreviewImage(null); // Reset preview image when modal is closed
  };

  const initialValues: BlogType = {
    id: blogData.id,
    title: blogData.title,
    description: blogData.description,
    image_url: blogData.image_url,
    createdAt: blogData.createdAt,
    user_id: blogData.user_id,
    approved: blogData.approved,
    type: blogData.type,
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
  });

  const handleSubmit = async (values: BlogType, { setSubmitting }: any) => {
    try {
      await updateBlog(values);
      console.log("Blog updated successfully");
      handleClose();
      router.refresh();
    } catch (error) {
      console.error("Failed to update blog:", error);
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

      const newBlob = await response.json();
      setFieldValue("image_url", newBlob.url);
      setPreviewImage(URL.createObjectURL(file)); // Set preview image URL
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <CiEdit
        className="cursor-pointer mr-3"
        onClick={handleOpen}
        fontSize={30}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl max-h-full overflow-y-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={blogValidation}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="w-full">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title_en"
                  >
                    {t("titleEn")}
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="title_en"
                    name="title.en"
                    type="text"
                    placeholder={t("title")}
                  />
                  <ErrorMessage
                    name="title.en"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title_ka"
                  >
                    {t("titleKa")}
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="title_ka"
                    name="title.ka"
                    type="text"
                    placeholder={t("title")}
                  />
                  <ErrorMessage
                    name="title.ka"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description_en"
                  >
                    {t("descriptionEn")}
                  </label>
                  <Field
                    className="shadow appearance-none border min-h-24 rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="description_en"
                    name="description.en"
                    as="textarea"
                    placeholder={t("description")}
                  />
                  <ErrorMessage
                    name="description.en"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description_ka"
                  >
                    {t("descriptionKa")}
                  </label>
                  <Field
                    className="shadow appearance-none border min-h-24 rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="description_ka"
                    name="description.ka"
                    as="textarea"
                    placeholder={t("description")}
                  />
                  <ErrorMessage
                    name="description.ka"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("image")}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                    type="file"
                    ref={inputFileRef}
                    onChange={(event) => handleFileUpload(event, setFieldValue)}
                  />
                  <Field type="hidden" name="image_url" />
                  <ErrorMessage
                    name="image_url"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                  {loading && <p>{t("upload")}...</p>}
                </div>
                {initialValues.image_url && (
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      {t("currentImage")}
                    </label>
                    <Image
                      src={initialValues.image_url}
                      alt="Blog Image"
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                  </div>
                )}
                {previewImage && (
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      {t("previewImage")}
                    </label>
                    <Image
                      src={previewImage}
                      alt="Preview Image"
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <button
                    className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={isSubmitting || loading}
                  >
                    {t("edit")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
}
