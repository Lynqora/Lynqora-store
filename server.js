const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// بياناتك من WhatsApp Cloud API (غير التوكن ورقم API الخاص بك)
const WHATSAPP_TOKEN = "ضع_توكنك_هنا";             // ضع توكنك هنا
const PHONE_NUMBER_ID = "ضع_PHONE_NUMBER_ID_هنا";   // ضع رقم الهاتف API هنا

// أرقام واتسابك بصيغة دولية (بدون +)
const MY_PHONE_1 = "212770824944";
const MY_PHONE_2 = "212694109358";

// يمكنك اختيار رقم الاستقبال (مثلاً الرقم الأول)
const MY_PHONE = MY_PHONE_1;

// استقبال الطلب وإرساله لواتساب
app.post("/send-order", async (req, res) => {
  const { orderDetails } = req.body;

  try {
    await axios.post(
      `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: MY_PHONE,
        type: "text",
        text: { body: orderDetails }
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).json({ message: "تم إرسال الطلب على واتساب بنجاح" });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: "فشل في إرسال الطلب" });
  }
});

app.listen(3000, () => {
  console.log("السيرفر شغال على http://localhost:3000");
});
