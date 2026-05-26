import { httpClient } from "@/src/shared/api/http-client";

export async function uploadImages(files: File[]): Promise<string[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const response = await httpClient.post<{ imageUrls: string[] }>(
    "/offers/upload-images",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.imageUrls;
}
