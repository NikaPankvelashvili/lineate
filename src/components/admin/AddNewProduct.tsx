// "use client";
// import { Modal } from "@mui/material";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useState, useRef } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useI18n } from "@/src/locales/client";
// import { AddProductType } from "@/src/types/products";
// import { createAddProductAction } from "@/src/app/actions";

// export default function AddNewProduct() {
//   const [open, setOpen] = useState<boolean>(false);
//   const inputFileRef = useRef<HTMLInputElement>(null);
//   const router = useRouter();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [imageGallery, setImageGallery] = useState<
//     { id: number; image_url: string; name: string }[]
//   >([]);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const t = useI18n();

//   const initialValues: AddProductType = {
//     title: "",
//     description: "",
//     price: 0,
//     type: "iphone",
//     stock: 0,
//     photos: [],
//     ram: [],
//     colors: [],
//     memories: [],
//   };

//   const validationSchema = Yup.object({
//     title: Yup.string()
//       .min(10, t("tooShort"))
//       .max(255, t("tooLong"))
//       .required(t("titleRequired")),
//     description: Yup.string()
//       .min(10, t("tooShort"))
//       .max(255, t("tooLong"))
//       .required(t("descriptionRequired")),
//     image_url: Yup.string().required(t("imageRequired")),
//     price: Yup.string()
//       .matches(/^[0-9]+(\.[0-9]{1,2})?$/, t("priceNumber"))
//       .required(t("priceRequired")),
//     category: Yup.string().required(t("categoryRequired")),
//     stock: Yup.string()
//       .matches(/^[0-9]+$/, t("stockNumber"))
//       .required(t("stockRequired")),
//   });

//   const handleSubmit = async (values: AddProductType, { resetForm }: any) => {
//     const productData = { ...values, imageGallery };

//     if (imageGallery.length === 0) {
//       alert("Image cannot be empty");
//       return;
//     }

//     try {
//       await createAddProductAction(productData);
//       resetForm();
//       setImageGallery([]);
//       handleClose();
//       router.refresh();
//     } catch (error) {
//       console.error("Error creating product:", error);
//     }
//   };

//   const handleFileChange = async (
//     e: React.ChangeEvent<HTMLInputElement>,
//     setFieldValue: any
//   ) => {
//     if (!e.target.files) {
//       throw new Error("No file selected");
//     }

//     const files = Array.from(e.target.files);

//     // Check if adding these files exceeds the limit
//     if (imageGallery.length + files.length > 3) {
//       alert("You can upload a maximum of 3 images.");
//       return;
//     }

//     const newImageUrls: { id: number; image_url: string; name: string }[] = [];
//     setLoading(true);

//     const startId = imageGallery.length + 1;

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];

//       try {
//         const response = await fetch(`/api/upload?filename=${file.name}`, {
//           method: "POST",
//           body: file,
//         });

//         const newBlob = await response.json();
//         console.log("File uploaded successfully:", newBlob);

//         newImageUrls.push({
//           id: startId + i,
//           image_url: newBlob.url,
//           name: file.name,
//         });
//       } catch (error) {
//         console.error("Error uploading file:", error);
//       }
//     }

//     setFieldValue("image_url", newImageUrls[0]?.image_url || "");
//     setImageGallery((prev) => [...prev, ...newImageUrls]);
//     setLoading(false);
//   };

//   const handleDeleteImage = (id: number, setFieldValue: any) => {
//     const newImageGallery = imageGallery.filter((image) => image.id !== id);
//     setImageGallery(newImageGallery);
//     setFieldValue("image_url", newImageGallery[0]?.image_url || "");
//   };

//   const handleMoveToFirst = (id: number, setFieldValue: any) => {
//     setImageGallery((prev) => {
//       const index = prev.findIndex((image) => image.id === id);
//       if (index > -1) {
//         const [selectedImage] = prev.splice(index, 1);
//         const updatedGallery = [selectedImage, ...prev];
//         setFieldValue("image_url", updatedGallery[0]?.image_url || "");
//         return updatedGallery;
//       }
//       return prev;
//     });
//   };

//   return (
//     <>
//       <button
//         className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded"
//         onClick={handleOpen}
//       >
//         {t("addNewProduct")}
//       </button>

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         className="flex items-center justify-center"
//       >
//         <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-h-full overflow-y-auto w-full max-w-2xl">
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
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
//                   <label className="block text-gray-700 text-sm font-bold mb-2">
//                     {t("description")}
//                   </label>
//                   <Field
//                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
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
//                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
//                     type="file"
//                     ref={inputFileRef}
//                     onChange={(e) => handleFileChange(e, setFieldValue)}
//                     multiple
//                   />
//                   {loading && <p>{t("uploading")}...</p>}
//                   <ErrorMessage
//                     name="image_url"
//                     component="div"
//                     className="text-red-500 text-xs italic"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   {imageGallery.map((image) => (
//                     <div
//                       key={image.id}
//                       className="flex items-center mb-2 justify-between"
//                     >
//                       <Image
//                         src={image.image_url}
//                         alt={"gallery-image"}
//                         className="w-16 h-16 object-cover mr-2"
//                         width={64}
//                         height={64}
//                       />
//                       <button
//                         type="button"
//                         className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded mr-2"
//                         onClick={() =>
//                           handleMoveToFirst(image.id, setFieldValue)
//                         }
//                       >
//                         Move to First
//                       </button>
//                       <button
//                         type="button"
//                         className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
//                         onClick={() =>
//                           handleDeleteImage(image.id, setFieldValue)
//                         }
//                       >
//                         {t("delete")}
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">
//                     {t("price")}
//                   </label>
//                   <Field
//                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
//                     id="price"
//                     name="price"
//                     type="text"
//                     placeholder={t("price")}
//                   />
//                   <ErrorMessage
//                     name="price"
//                     component="div"
//                     className="text-red-500 text-xs italic"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">
//                     {t("category")}
//                   </label>
//                   <Field
//                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
//                     id="category"
//                     name="category"
//                     type="text"
//                     placeholder={t("category")}
//                   />
//                   <ErrorMessage
//                     name="category"
//                     component="div"
//                     className="text-red-500 text-xs italic"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">
//                     {t("stock")}
//                   </label>
//                   <Field
//                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
//                     id="stock"
//                     name="stock"
//                     type="text"
//                     placeholder={t("stock")}
//                   />
//                   <ErrorMessage
//                     name="stock"
//                     component="div"
//                     className="text-red-500 text-xs italic"
//                   />
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <button
//                     className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                     type="submit"
//                     disabled={loading || isSubmitting}
//                   >
//                     {t("addProduct")}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </Modal>
//     </>
//   );
// }

"use client";
import { Modal } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useI18n } from "@/src/locales/client";
import { AddProductType, ProductImage } from "@/src/types/products";
import { createAddProductAction } from "@/src/app/actions";

export default function AddNewProduct() {
  const [open, setOpen] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageGallery, setImageGallery] = useState<ProductImage[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const t = useI18n();

  const initialValues: AddProductType = {
    title: "",
    description: "",
    price: 0,
    type: "iphone",
    stock: 0,
    photos: [],
    ram: [],
    colors: [{ colorName: "", colorCode: "" }],
    memories: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(10, t("tooShort"))
      .max(255, t("tooLong"))
      .required(t("titleRequired")),
    description: Yup.string()
      .min(10, t("tooShort"))
      .max(255, t("tooLong"))
      .required(t("descriptionRequired")),
    price: Yup.number().min(0, t("priceNumber")).required(t("priceRequired")),
    stock: Yup.number().min(0, t("stockNumber")).required(t("stockRequired")),
    type: Yup.string()
      .oneOf(["iphone", "macbook", "ipad", "watch"], t("invalidType"))
      .required(t("typeRequired")),
    // colors: Yup.array().of(
    //   Yup.object().shape({
    //     colorName: Yup.string().required(t("colorNameRequired")),
    //     colorCode: Yup.string().required(t("colorCodeRequired")),
    //   })
    // ),
    memories: Yup.array().of(
      Yup.number().min(0, t("memoryNumber")).required(t("memoryRequired"))
    ),
    ram: Yup.array().of(
      Yup.number().min(0, t("ramNumber")).required(t("ramRequired"))
    ),
  });

  const handleSubmit = async (values: AddProductType, { resetForm }: any) => {
    const productData = { ...values, photos: imageGallery };

    if (imageGallery.length === 0) {
      alert("Image cannot be empty");
      return;
    }

    try {
      console.log(productData);
      await createAddProductAction(productData);
      resetForm();
      setImageGallery([]);
      handleClose();
      router.refresh();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    if (!e.target.files) {
      throw new Error("No file selected");
    }

    const files = Array.from(e.target.files);

    // if (imageGallery.length + files.length > 3) {
    //   alert("You can upload a maximum of 3 images.");
    //   return;
    // }

    const newImageUrls: ProductImage[] = [];
    setLoading(true);

    const startId = imageGallery.length + 1;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        const response = await fetch(`/api/upload?filename=${file.name}`, {
          method: "POST",
          body: file,
        });

        const newBlob = await response.json();
        console.log("File uploaded successfully:", newBlob);

        newImageUrls.push({
          id: startId + i,
          url: newBlob.url,
          color: "", // Default color, should be set by the user
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setFieldValue("photos", [...imageGallery, ...newImageUrls]);
    setImageGallery((prev) => [...prev, ...newImageUrls]);
    setLoading(false);
  };

  const handleDeleteImage = (id: number, setFieldValue: any) => {
    const newImageGallery = imageGallery.filter((image) => image.id !== id);
    setImageGallery(newImageGallery);
    setFieldValue("photos", newImageGallery);
  };

  const handleMoveToFirst = (id: number, setFieldValue: any) => {
    setImageGallery((prev) => {
      const index = prev.findIndex((image) => image.id === id);
      if (index > -1) {
        const [selectedImage] = prev.splice(index, 1);
        const updatedGallery = [selectedImage, ...prev];
        setFieldValue("photos", updatedGallery);
        return updatedGallery;
      }
      return prev;
    });
  };

  const handleColorChange = (id: number, value: string, setFieldValue: any) => {
    const updatedGallery = imageGallery.map((img) =>
      img.id === id ? { ...img, color: value } : img
    );
    setImageGallery(updatedGallery);
    setFieldValue("photos", updatedGallery);
  };

  return (
    <>
      <button
        className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded"
        onClick={handleOpen}
      >
        {t("addNewProduct")}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-h-full overflow-y-auto w-full max-w-2xl">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            // onSubmit={() => console.log("test")}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting, values }) => (
              <Form className="w-full">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    {t("title")}
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    name="title"
                    type="text"
                    placeholder={t("title")}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("description")}
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    name="description"
                    as="textarea"
                    placeholder={t("description")}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("image")}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
                    type="file"
                    ref={inputFileRef}
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                    multiple
                  />
                  {loading && <p>{t("uploading")}...</p>}
                  <ErrorMessage
                    name="photos"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  {imageGallery.map((image) => (
                    <div
                      key={image.id}
                      className="flex items-center mb-2 justify-between"
                    >
                      <Image
                        src={image.url}
                        alt={"gallery-image"}
                        className="w-16 h-16 object-cover mr-2"
                        width={64}
                        height={64}
                      />
                      {/* <Field
                        name={`photos[${imageGallery.findIndex(
                          (img) => img.id === image.id
                        )}].color`}
                        placeholder={t("color")}
                        className="shadow appearance-none border rounded py-1 px-2 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                      /> */}
                      <Field
                        name={`photos[${imageGallery.findIndex(
                          (img) => img.id === image.id
                        )}].color`}
                        placeholder={t("color")}
                        className="shadow appearance-none border rounded py-1 px-2 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e: any) =>
                          handleColorChange(
                            image.id,
                            e.target.value,
                            setFieldValue
                          )
                        }
                      />

                      <button
                        type="button"
                        className="bg-gray-200 hover:bg-gray-400 text-black font-bold py-1 px-2 rounded"
                        onClick={() =>
                          handleMoveToFirst(image.id, setFieldValue)
                        }
                      >
                        {t("first")}
                      </button>
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() =>
                          handleDeleteImage(image.id, setFieldValue)
                        }
                      >
                        {t("delete")}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("price")}
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    name="price"
                    type="number"
                    placeholder={t("price")}
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("category")}
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
                    id="type"
                    name="type"
                    as="select"
                    placeholder={t("category")}
                  >
                    <option value="iphone">iPhone</option>
                    <option value="macbook">MacBook</option>
                    <option value="ipad">iPad</option>
                    <option value="watch">Watch</option>
                  </Field>
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("stock")}
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
                    id="stock"
                    name="stock"
                    type="number"
                    placeholder={t("stock")}
                  />
                  <ErrorMessage
                    name="stock"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("colors")}
                  </label>
                  <FieldArray
                    name="colors"
                    render={(arrayHelpers) => (
                      <div>
                        {values.colors.map((color, index) => (
                          <div key={index} className="flex mb-2">
                            <Field
                              name={`colors[${index}].colorName`}
                              placeholder={t("colorName")}
                              className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <Field
                              name={`colors[${index}].colorCode`}
                              placeholder={t("colorCode")}
                              className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline ml-2"
                            />
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                            >
                              {t("remove")}
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() =>
                            arrayHelpers.push({ colorName: "", colorCode: "" })
                          }
                          className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded mt-2"
                        >
                          {t("addColor")}
                        </button>
                      </div>
                    )}
                  />
                  <ErrorMessage
                    name="colors"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("memories")}
                  </label>
                  <FieldArray
                    name="memories"
                    render={(arrayHelpers) => (
                      <div>
                        {values.memories.map((memory, index) => (
                          <div key={index} className="flex mb-2">
                            <Field
                              name={`memories[${index}]`}
                              placeholder={t("memory")}
                              className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                              type="number"
                            />
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                            >
                              {t("remove")}
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push(0)}
                          className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded mt-2"
                        >
                          {t("addMemory")}
                        </button>
                      </div>
                    )}
                  />
                  <ErrorMessage
                    name="memories"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("ram")}
                  </label>
                  <FieldArray
                    name="ram"
                    render={(arrayHelpers) => (
                      <div>
                        {values.ram.map((ram, index) => (
                          <div key={index} className="flex mb-2">
                            <Field
                              name={`ram[${index}]`}
                              placeholder={t("ram")}
                              className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
                              type="number"
                            />
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
                            >
                              {t("remove")}
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => arrayHelpers.push(0)}
                          className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded mt-2"
                        >
                          {t("addRam")}
                        </button>
                      </div>
                    )}
                  />
                  <ErrorMessage
                    name="ram"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={loading || isSubmitting}
                  >
                    {t("addProduct")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
}
