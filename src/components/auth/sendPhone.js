export const sendFormData = async (data) => {
  const formattedData = { phone: "998" + data.phone };
  try {
    // Uncomment and use the line below if you want to actually send the SMS
    const response = await api.post("auth/send-sms", formattedData);

    if (!response?.data?.success) {
      toast?.error(response?.message);
      throw new Error("Error");
    }

    setPhoneNumber(formattedData);
    isVisable("newpass", onChangeIsOpenModalAuth);
  } catch (error) {
    if (error.response?.status === 400) {
      toast.error(error.response.data.message);
    }
  }
};
