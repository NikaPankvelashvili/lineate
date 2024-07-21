"use client";
import { Modal } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Formik, Form, Field, ErrorMessage, FormikErrors } from "formik";
import * as Yup from "yup";
import { useI18n } from "@/src/locales/client";
import {
  Color,
  Product,
  ProductImage,
  ProductType,
} from "@/src/types/products";
import { editProductAction } from "@/src/app/actions";

export default function EditProduct({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageGallery, setImageGallery] = useState(product.photos || []);

  const router = useRouter();
  const inputFileRef = useRef(null);
  const t = useI18n();

  const id = product.id;

  useEffect(() => {
    setImageGallery(product.photos || []);
  }, [product.photos]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    id: Number(id),
    title: product.title,
    description: product.description,
    price: product.price,
    stock: product.stock,
    photos: product.photos,
    colors: product.colors,
    memories: product.memories,
    ram: product.ram,
    type: product.type,
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
    price: Yup.string()
      .matches(/^[0-9]+(\.[0-9]{1,2})?$/, t("priceNumber"))
      .required(t("priceRequired")),
    stock: Yup.string()
      .matches(/^[0-9]+$/, t("stockNumber"))
      .required(t("stockRequired")),
  });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    const productData = { ...values, photos: imageGallery };

    try {
      setLoading(true);
      const response = await fetch(`/api/update-product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        console.log("Product edited successfully");
        resetForm();
        handleClose();
        router.refresh();
        await editProductAction(productData);
      } else {
        const errorData = await response.json();
        console.error("Error editing product:", errorData);
      }
    } catch (error) {
      console.error("Error editing product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: {
      (
        field: string,
        value: any,
        shouldValidate?: boolean
      ): Promise<void | FormikErrors<{
        id: number;
        title: string;
        description: string;
        price: number;
        stock: number;
        photos: ProductImage[];
        colors: Color[];
        memories: number[];
        ram: number[];
        type: ProductType;
      }>>;
      (arg0: string, arg1: any[]): void;
    }
  ) => {
    if (!e.target.files) {
      throw new Error("No file selected");
    }

    const files = Array.from(e.target.files);
    const newImageUrls: { id: number; url: any; color: string }[] = [];
    setLoading(true);

    const startId = imageGallery.length + 1;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        const response = await fetch(`/api/upload?filename=${file.name}`, {
          method: "POST",
          body: file as BodyInit,
        });

        const newBlob = await response.json();
        console.log("File uploaded successfully:", newBlob);

        newImageUrls.push({
          id: startId + i,
          url: newBlob.url,
          color: product?.colors[0]?.colorCode,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setFieldValue(
      "photos",
      newImageUrls.map((img) => img.url)
    );
    setImageGallery((prev) => [...prev, ...newImageUrls]);
    setLoading(false);
  };

  const handleDeleteImage = (
    id: number,
    setFieldValue: {
      (
        field: string,
        value: any,
        shouldValidate?: boolean
      ): Promise<void | FormikErrors<{
        id: number;
        title: string;
        description: string;
        price: number;
        stock: number;
        photos: ProductImage[];
        colors: Color[];
        memories: number[];
        ram: number[];
        type: ProductType;
      }>>;
      (arg0: string, arg1: string[]): void;
    }
  ) => {
    const newImageGallery = imageGallery.filter((image) => image.id !== id);
    setImageGallery(newImageGallery);
    setFieldValue(
      "photos",
      newImageGallery.map((img) => img.url)
    );
  };

  // const handleMoveToFirst = (id, setFieldValue) => {
  //   setImageGallery((prev) => {
  //     const index = prev.findIndex((image) => image.id === id);
  //     if (index > -1) {
  //       const [selectedImage] = prev.splice(index, 1);
  //       const updatedGallery = [selectedImage, ...prev];
  //       setFieldValue(
  //         "photos",
  //         updatedGallery.map((img) => img.image_url)
  //       );
  //       return updatedGallery;
  //     }
  //     return prev;
  //   });
  // };

  return (
    <>
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
        <div className="bg-[#fff] shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl max-h-full overflow-y-auto dark:bg-dark-secondary">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="w-full">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    {t("title")}
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black bg-[white]  leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    name="title"
                    type="text"
                    placeholder={t("title")}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-[#ff0000] text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("description")}
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black bg-[white]  leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    name="description"
                    as="textarea"
                    placeholder={t("description")}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-[#ff0000] text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("image")}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white bg-[white] text-black  leading-tight focus:outline-none focus:shadow-outline"
                    type="file"
                    ref={inputFileRef}
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                    multiple
                  />
                  {loading && <p>{t("uploading")}...</p>}
                  <ErrorMessage
                    name="photos"
                    component="div"
                    className="text-[#ff0000] text-xs italic"
                  />
                </div>
                <div className="mb-4 flex flex-wrap gap-4">
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
                      <div>
                        <button
                          type="button"
                          className="bg-[#ef4444] hover:bg-[#b91c1c] text-white font-bold py-1 px-2 rounded"
                          onClick={() =>
                            handleDeleteImage(image.id, setFieldValue)
                          }
                        >
                          {t("delete")}
                        </button>
                        {/* <button
                          type="button"
                          className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-1 px-2 rounded ml-2"
                          onClick={() =>
                            handleMoveToFirst(image.id, setFieldValue)
                          }
                        >
                          {t("Makeprimary")}
                        </button> */}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("price")}
                  </label>
                  <Field
                    className="shadow appearance-none bg-[white] border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    name="price"
                    type="text"
                    placeholder={t("price")}
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-[#ff0000] text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("stock")}
                  </label>
                  <Field
                    className="shadow appearance-none bg-[white] border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
                    id="stock"
                    name="stock"
                    type="text"
                    placeholder={t("stock")}
                  />
                  <ErrorMessage
                    name="stock"
                    component="div"
                    className="text-[#ff0000] text-xs italic"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#0071e3] hover:bg-[#0056b3] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={isSubmitting}
                >
                  {loading ? t("loading") : t("submit")}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
}
