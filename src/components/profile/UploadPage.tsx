"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import type { PutBlobResult } from "@vercel/blob";
import { useI18n } from "@/src/locales/client";

export default function UploadPage({ userImage }: { userImage: string }) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const { user } = useUser();
  const [uploading, setUploading] = useState(false);
  const t = useI18n();

  useEffect(() => {
    const updateUser = async () => {
      if (!blob || !user) return;

      try {
        setUploading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/upload-user-picture`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              blobUrl: blob.url,
              userSub: user.sub,
            }),
          }
        );

        if (!response.ok) {
          console.error("Failed to update user picture");
        } else {
          console.log("User picture updated successfully");
        }
      } catch (error) {
        console.error("Error updating user picture:", error);
      } finally {
        setUploading(false);
      }
    };

    if (blob) {
      updateUser();
    }
  }, [blob, user]);

  const handleFileUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files || !inputFileRef.current.files[0]) {
      console.error("No file selected");
      return;
    }

    const file = inputFileRef.current.files[0];
    // console.log("Selected file:", file.name);

    try {
      setUploading(true);
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = (await response.json()) as PutBlobResult;
      setBlob(newBlob);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleClickImage = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className="relative rounded-full overflow-hidden w-36 h-36"
        onClick={handleClickImage}
      >
        {uploading && (
          <p className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm">
            uploading
          </p>
        )}
        {blob ? (
          <Image
            src={blob.url}
            alt="User Avatar"
            className="object-cover w-full h-full cursor-pointer"
            width={150}
            height={150}
          />
        ) : (
          <Image
            src={userImage}
            alt="User Avatar"
            className="object-cover w-full h-full cursor-pointer"
            width={150}
            height={150}
          />
        )}
        <label
          htmlFor="files"
          className="absolute bottom-2 right-2 cursor-pointer text-white"
        ></label>
        <input
          className="bg-red-500"
          name="file"
          ref={inputFileRef}
          type="file"
          id="files"
          required
        />
      </div>

      <form
        className="flex flex-col items-center space-y-2"
        onSubmit={(e) =>
          handleFileUpload(e as React.FormEvent<HTMLFormElement>)
        }
      >
        <button
          type="submit"
          className="bg-[#0071e3] rounded px-2 py-1 hover:bg-[#0056b3] ease-in-out duration-300 text-white"
        >
          {t("upload")}
        </button>
      </form>
    </div>
  );
}
