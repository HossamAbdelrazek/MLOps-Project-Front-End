
async function getPredictedLabel(processed_t) {
  try {
    // Convert MediaPipe landmarks to flat array
    const flatData = [];
    for (let i = 0; i < processed_t.length; i++) {
      flatData.push(processed_t[i].x, processed_t[i].y, processed_t[i].z);
    }
    
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: flatData })
    });

    const prediction = await response.json();
    console.log("Predicted label:", prediction);
    return prediction; // Returns "up", "down", "left", "right", or null
  } catch (error) {
    console.error("Prediction failed:", error);
    return null;
  }
}