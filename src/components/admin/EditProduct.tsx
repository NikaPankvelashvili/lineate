// "use client";
// import { Modal } from "@mui/material";
// import { useRouter } from "next/navigation";
// import React, { useState, useRef } from "react";
// import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useI18n } from "@/src/locales/client";
// import { Product, ProductImage } from "@/src/types/products";
// import { editProductAction } from "@/src/app/actions"; // Update with your action

// export default function EditProduct({ product }: { product: Product }) {
//   const [open, setOpen] = useState(false);
//   const inputFileRef = useRef(null);
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [imageGallery, setImageGallery] = useState<ProductImage[]>([]);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const t = useI18n();

//   const initialValues: Product = {
//     id: product.id,
//     title: product.title,
//     description: product.description,
//     price: product.price,
//     type: product.type,
//     stock: product.stock,
//     photos: product.photos || [],
//     ram: product.ram || [],
//     colors: product.colors || [{ colorName: "", colorCode: "" }],
//     memories: product.memories || [],
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
//     price: Yup.number().min(0, t("priceNumber")).required(t("priceRequired")),
//     stock: Yup.number().min(0, t("stockNumber")).required(t("stockRequired")),
//     type: Yup.string()
//       .oneOf(["iphone", "macbook", "ipad", "watch"], t("invalidType"))
//       .required(t("typeRequired")),
//     memories: Yup.array().of(
//       Yup.number().min(0, t("memoryNumber")).required(t("memoryRequired"))
//     ),
//     ram: Yup.array().of(
//       Yup.number().min(0, t("ramNumber")).required(t("ramRequired"))
//     ),
//     colors: Yup.array().of(
//       Yup.object().shape({
//         colorName: Yup.string().required(t("colorNameRequired")),
//         colorCode: Yup.string().required(t("colorCodeRequired")),
//       })
//     ),
//   });

//   const handleSubmit = async (values, { resetForm }) => {
//     const productData = { ...values, photos: imageGallery, id: product.id };

//     // if (imageGallery.length === 0) {
//     //   alert("Image cannot be empty");
//     //   return;
//     // }

//     try {
//       await editProductAction({ ...productData }); // Assuming product.id exists
//       resetForm();
//       setImageGallery([]);
//       handleClose();
//       router.refresh();
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };

//   return (
//     <>
//       <button
//         className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded"
//         onClick={handleOpen}
//       >
//         {t("editProduct")}
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
//             // validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ setFieldValue, isSubmitting, values }) => (
//               <Form className="w-full">
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">
//                     {t("title")}
//                   </label>
//                   <Field
//                     name="title"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
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
//                     name="description"
//                     as="textarea"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
//                   />
//                   <ErrorMessage
//                     name="description"
//                     component="div"
//                     className="text-red-500 text-xs italic"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">
//                     {t("price")}
//                   </label>
//                   <Field
//                     name="price"
//                     type="number"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
//                   />
//                   <ErrorMessage
//                     name="price"
//                     component="div"
//                     className="text-red-500 text-xs italic"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">
//                     {t("stock")}
//                   </label>
//                   <Field
//                     name="stock"
//                     type="number"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
//                   />
//                   <ErrorMessage
//                     name="stock"
//                     component="div"
//                     className="text-red-500 text-xs italic"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">
//                     {t("type")}
//                   </label>
//                   <Field
//                     name="type"
//                     as="select"
//                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
//                   >
//                     <option value="" label={t("selectType")} />
//                     <option value="iphone" label="iPhone" />
//                     <option value="macbook" label="MacBook" />
//                     <option value="ipad" label="iPad" />
//                     <option value="watch" label="Watch" />
//                   </Field>
//                   <ErrorMessage
//                     name="type"
//                     component="div"
//                     className="text-red-500 text-xs italic"
//                   />
//                 </div>

//                 {/* Colors Field */}
//                 <div className="mb-4">
//                   <label className="block text-gray-700 text-sm font-bold mb-2">
//                     {t("colors")}
//                   </label>
//                   <FieldArray name="colors">
//                     {({ push, remove }) => (
//                       <div>
//                         {values.colors.map((color, index) => (
//                           <div key={index} className="flex mb-2">
//                             <Field
//                               name={`colors[${index}].colorName`}
//                               placeholder={t("colorName")}
//                               className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
//                             />
//                             <Field
//                               name={`colors[${index}].colorCode`}
//                               placeholder={t("colorCode")}
//                               className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline ml-2"
//                             />
//                             <button
//                               type="button"
//                               onClick={() => remove(index)}
//                               className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
//                             >
//                               {t("remove")}
//                             </button>
//                           </div>
//                         ))}
//                         <button
//                           type="button"
//                           onClick={() => push({ colorName: "", colorCode: "" })}
//                           className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded mt-2"
//                         >
//                           {t("addColor")}
//                         </button>
//                       </div>
//                     )}
//                   </FieldArray>
//                   <ErrorMessage
//                     name="colors"
//                     component="div"
//                     className="text-red-500 text-xs italic"
//                   />
//                 </div>

//                 {/* Memories Field */}
//                 <FieldArray name="memories">
//                   {({ push, remove }) => (
//                     <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-2">
//                         {t("memories")}
//                       </label>
//                       {values.memories.map((memory, index) => (
//                         <div key={index} className="flex mb-2">
//                           <Field
//                             name={`memories[${index}]`}
//                             placeholder={t("memory")}
//                             className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
//                             type="number"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => remove(index)}
//                             className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
//                           >
//                             {t("remove")}
//                           </button>
//                         </div>
//                       ))}
//                       <button
//                         type="button"
//                         onClick={() => push(0)}
//                         className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded mt-2"
//                       >
//                         {t("addMemory")}
//                       </button>
//                     </div>
//                   )}
//                 </FieldArray>

//                 {/* RAM Field */}
//                 <FieldArray name="ram">
//                   {({ push, remove }) => (
//                     <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-2">
//                         {t("ram")}
//                       </label>
//                       {values.ram.map((ram, index) => (
//                         <div key={index} className="flex mb-2">
//                           <Field
//                             name={`ram[${index}]`}
//                             placeholder={t("ram")}
//                             className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline"
//                             type="number"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => remove(index)}
//                             className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2"
//                           >
//                             {t("remove")}
//                           </button>
//                         </div>
//                       ))}
//                       <button
//                         type="button"
//                         onClick={() => push(0)}
//                         className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded mt-2"
//                       >
//                         {t("addRAM")}
//                       </button>
//                     </div>
//                   )}
//                 </FieldArray>

//                 <div className="flex items-center justify-between">
//                   <button
//                     type="submit"
//                     disabled={isSubmitting || loading}
//                     className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded"
//                   >
//                     {loading ? t("loading") : t("updateProduct")}
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

// // "use client";
// // import { Modal } from "@mui/material";
// // import Image from "next/image";
// // import { useRouter } from "next/navigation";
// // import { useEffect, useRef, useState } from "react";
// // import { CiEdit } from "react-icons/ci";
// // import { Formik, Form, Field, ErrorMessage } from "formik";
// // import * as Yup from "yup";
// // import { useI18n } from "@/src/locales/client";
// // import { Product } from "@/src/types/products";
// // import { editProductAction } from "@/src/app/actions";

// // export default function EditProduct({ product }: {product: Product}) {
// //   const [open, setOpen] = useState<boolean>(false);
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [imageGallery, setImageGallery] = useState<
// //     { id: number; image_url: string; name: string }[]
// //   >(product?.photos || []);

// //   const router = useRouter();
// //   const inputFileRef = useRef<HTMLInputElement>(null);
// //   const t = useI18n();

// //   const id = product.id;

// //   useEffect(() => {
// //     setImageGallery(product?.photos || []);
// //   }, [product?.photos]);

// //   const handleOpen = () => setOpen(true);
// //   const handleClose = () => setOpen(false);

// //   const initialValues: Product = {
// //     id: Number(id),
// //     title: product.title,
// //     description: product.description,
// //     price: product.price,
// //     stock: product.stock,
// //     photos: product.photos,
// //     colors: product.colors,
// //     memories: product.memories,
// //     ram: product.ram,
// //     type: product.type,
// //   };

// //   const validationSchema = Yup.object({
// //     title: Yup.string()
// //       .min(10, t("Tooshort"))
// //       .max(255, t("Toolong"))
// //       .required(t("titleRequired")),
// //     description: Yup.string()
// //       .min(10, t("Tooshort"))
// //       .max(255, t("Toolong"))
// //       .required(t("descriptionRequired")),
// //     image_url: Yup.string().required(t("imageRequired")),
// //     price: Yup.string()
// //       .matches(/^[0-9]+(\.[0-9]{1,2})?$/, t("PriceNumber"))
// //       .required(t("PriceRequiared")),
// //     category: Yup.string().required(t("categoryRequiared")),
// //     discount: Yup.string()
// //       .matches(/^[0-9]+(\.[0-9]{1,2})?$/, t("PriceNumber"))
// //       .required(t("discountRequiared")),
// //     stock: Yup.string()
// //       .matches(/^[0-9]+$/, t("StockNumber"))
// //       .required(t("StockRequired")),
// //   });

// //   const handleSubmit = async (values: Prod, { resetForm }: any) => {
// //     const productData = { ...values, imageGallery };

// //     if (imageGallery.length === 0) {
// //       alert("Image cannot be empty");
// //       return;
// //     }

// //     try {
// //       await editProductAction(productData);
// //       console.log("Product edited successfully");
// //       resetForm();
// //       handleClose();
// //       router.refresh();
// //     } catch (error) {
// //       console.error("Error editing product:", error);
// //     }
// //   };

// //   const handleFileChange = async (
// //     e: React.ChangeEvent<HTMLInputElement>,
// //     setFieldValue: any
// //   ) => {
// //     if (!e.target.files) {
// //       throw new Error("No file selected");
// //     }

// //     const files = Array.from(e.target.files);
// //     const newImageUrls: { id: number; image_url: string; name: string }[] = [];
// //     setLoading(true);

// //     const startId = imageGallery.length + 1;

// //     for (let i = 0; i < files.length; i++) {
// //       const file = files[i];

// //       try {
// //         const response = await fetch(`/api/upload?filename=${file.name}`, {
// //           method: "POST",
// //           body: file,
// //         });

// //         const newBlob = await response.json();
// //         console.log("File uploaded successfully:", newBlob);

// //         newImageUrls.push({
// //           id: startId + i,
// //           image_url: newBlob.url,
// //           name: file.name,
// //         });
// //       } catch (error) {
// //         console.error("Error uploading file:", error);
// //       }
// //     }

// //     setFieldValue("image_url", newImageUrls[0]?.image_url || ""); // Set the first image as the main image URL
// //     setImageGallery((prev) => [...prev, ...newImageUrls]);
// //     setLoading(false);
// //   };

// //   const handleDeleteImage = (id: number, setFieldValue: any) => {
// //     const newImageGallery = imageGallery.filter((image) => image.id !== id);
// //     setImageGallery(newImageGallery);
// //     if (newImageGallery.length > 0) {
// //       setFieldValue("image_url", newImageGallery[0].image_url);
// //     } else {
// //       setFieldValue("image_url", "");
// //     }
// //   };

// //   const handleMoveToFirst = (id: number, setFieldValue: any) => {
// //     setImageGallery((prev) => {
// //       const index = prev.findIndex((image) => image.id === id);
// //       if (index > -1) {
// //         const [selectedImage] = prev.splice(index, 1);
// //         const updatedGallery = [selectedImage, ...prev];
// //         setFieldValue("image_url", updatedGallery[0].image_url);
// //         return updatedGallery;
// //       }
// //       return prev;
// //     });
// //   };

// //   return (
// //     <>
// //       <CiEdit
// //         className="cursor-pointer mr-3"
// //         onClick={handleOpen}
// //         fontSize={30}
// //       />

// //       <Modal
// //         open={open}
// //         onClose={handleClose}
// //         aria-labelledby="modal-modal-title"
// //         aria-describedby="modal-modal-description"
// //         className="flex items-center justify-center"
// //       >
// //         <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl max-h-full overflow-y-auto">
// //           <Formik
// //             initialValues={initialValues}
// //             validationSchema={validationSchema}
// //             onSubmit={handleSubmit}
// //           >
// //             {({ setFieldValue, isSubmitting }) => (
// //               <Form className="w-full">
// //                 <div className="mb-4">
// //                   <label
// //                     className="block text-gray-700 text-sm font-bold mb-2"
// //                     htmlFor="title"
// //                   >
// //                     {t("title")}
// //                   </label>
// //                   <Field
// //                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
// //                     id="title"
// //                     name="title"
// //                     type="text"
// //                     placeholder={t("title")}
// //                   />
// //                   <ErrorMessage
// //                     name="title"
// //                     component="div"
// //                     className="text-red-500 text-xs italic"
// //                   />
// //                 </div>
// //                 <div className="mb-4">
// //                   <label className="block text-gray-700 text-sm font-bold mb-2">
// //                     {t("description")}
// //                   </label>
// //                   <Field
// //                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
// //                     id="description"
// //                     name="description"
// //                     as="textarea"
// //                     placeholder={t("description")}
// //                   />
// //                   <ErrorMessage
// //                     name="description"
// //                     component="div"
// //                     className="text-red-500 text-xs italic"
// //                   />
// //                 </div>
// //                 <div className="mb-4">
// //                   <label className="block text-gray-700 text-sm font-bold mb-2">
// //                     {t("image")}
// //                   </label>
// //                   <input
// //                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
// //                     type="file"
// //                     ref={inputFileRef}
// //                     onChange={(e) => handleFileChange(e, setFieldValue)}
// //                     multiple
// //                   />
// //                   {loading && <p>{t("uploading")}...</p>}
// //                   <ErrorMessage
// //                     name="image_url"
// //                     component="div"
// //                     className="text-red-500 text-xs italic"
// //                   />
// //                 </div>
// //                 <div className="mb-4">
// //                   {imageGallery.map((image) => (
// //                     <div
// //                       key={image.id}
// //                       className="flex items-center mb-2 justify-between"
// //                     >
// //                       <Image
// //                         src={image.image_url}
// //                         alt={"gallery-image"}
// //                         className="w-16 h-16 object-cover mr-2"
// //                         width={64}
// //                         height={64}
// //                       />
// //                       <div>
// //                         <button
// //                           type="button"
// //                           className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
// //                           onClick={() =>
// //                             handleDeleteImage(image.id, setFieldValue)
// //                           }
// //                         >
// //                           {t("delete")}
// //                         </button>
// //                         <button
// //                           type="button"
// //                           className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-1 px-2 rounded ml-2"
// //                           onClick={() =>
// //                             handleMoveToFirst(image.id, setFieldValue)
// //                           }
// //                         >
// //                           {t("Makeprimary")}
// //                         </button>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //                 <div className="mb-4">
// //                   <label className="block text-gray-700 text-sm font-bold mb-2">
// //                     {t("price")}
// //                   </label>
// //                   <Field
// //                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
// //                     id="price"
// //                     name="price"
// //                     type="text"
// //                     placeholder={t("price")}
// //                   />
// //                   <ErrorMessage
// //                     name="price"
// //                     component="div"
// //                     className="text-red-500 text-xs italic"
// //                   />
// //                 </div>
// //                 <div className="mb-4">
// //                   <label className="block text-gray-700 text-sm font-bold mb-2">
// //                     {t("category")}
// //                   </label>
// //                   <Field
// //                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
// //                     id="category"
// //                     name="category"
// //                     type="text"
// //                     placeholder={t("category")}
// //                   />
// //                   <ErrorMessage
// //                     name="category"
// //                     component="div"
// //                     className="text-red-500 text-xs italic"
// //                   />
// //                 </div>
// //                 <div className="mb-4">
// //                   <label className="block text-gray-700 text-sm font-bold mb-2">
// //                     {t("discount")}
// //                   </label>
// //                   <Field
// //                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
// //                     id="discount"
// //                     name="discount"
// //                     type="text"
// //                     placeholder={t("discount")}
// //                   />
// //                   <ErrorMessage
// //                     name="discount"
// //                     component="div"
// //                     className="text-red-500 text-xs italic"
// //                   />
// //                 </div>
// //                 <div className="mb-4">
// //                   <label className="block text-gray-700 text-sm font-bold mb-2">
// //                     {t("stock")}
// //                   </label>
// //                   <Field
// //                     className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
// //                     id="stock"
// //                     name="stock"
// //                     type="text"
// //                     placeholder={t("stock")}
// //                   />
// //                   <ErrorMessage
// //                     name="stock"
// //                     component="div"
// //                     className="text-red-500 text-xs italic"
// //                   />
// //                 </div>
// //                 <div className="flex items-center justify-between">
// //                   <button
// //                     className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
// //                     type="submit"
// //                     disabled={loading || isSubmitting}
// //                   >
// //                     {t("edit")}
// //                   </button>
// //                 </div>
// //               </Form>
// //             )}
// //           </Formik>
// //         </div>
// //       </Modal>
// //     </>
// //   );
// // }

import React from "react";

const EditProduct = () => {
  return <div>edit</div>;
};

export default EditProduct;
