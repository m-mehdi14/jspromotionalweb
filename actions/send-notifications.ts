"use server";

import axios from "axios";

export const sendNotification = async (
  tokens: string | string[],
  title: string,
  body: string
) => {
  try {
    const response = await axios.post("/notifications/send", {
      tokens,
      title,
      body,
    });
    console.log("Notification sent successfully:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error sending notification:",
        error.response?.data || error.message
      );
    } else {
      console.error("Error sending notification:", (error as Error).message);
    }
    throw new Error("Failed to send notification.");
  }
};
