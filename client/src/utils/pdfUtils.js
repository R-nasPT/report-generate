import html2pdf from "html2pdf.js";

const downloadPDF = async (name) => {
    const element = document.getElementById("element-to-print");
    const currentDate = new Date().toISOString().split("T")[0];
    const opt = {
      margin: 1,
      filename: `${name} ${currentDate}`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
    };

    // Convert the images to base64 data URLs before generating the PDF
    const imageElements = element.querySelectorAll("img");
    const promises = [];
    for (const imgElement of imageElements) {
      const imageUrl = imgElement.src;
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const dataUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
        imgElement.src = dataUrl;
      } catch (error) {
        console.error("Error converting image:", error);
      }
    }

    // Wait for all image conversions to finish before generating the PDF
    try {
      await Promise.all(promises);
    } catch (error) {
      console.error("Error converting images:", error);
    }

    try {
      await html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  export default downloadPDF